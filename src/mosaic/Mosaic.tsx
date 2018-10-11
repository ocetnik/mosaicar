import { Location } from 'history';
import { inject, observer } from "mobx-react";
import * as React from "react";
import { createRef, RefObject } from "react";
import { renderToString } from 'react-dom/server';
import { svgAsPngUri } from 'save-svg-as-png';

import { MAX_IMGUR_API_FILE_UPLOAD_SIZE } from "../imgur/ImgurConstants";

import BackButton from "../common/BackButton";
import MosaicStore from "./MosaicStore";
import {
    calculateImageHeight,
    calculateImageWidth,
    getAverageTileColor,
    getCanvasContextForDrawing,
    getImageElementFromUri
} from "./MosaicUtils";
import Share from './Share';

const MOSAIC_SVG_ELEMENT_ID = 'mosaic-image';
const TILE_SIZE = 16;

interface IMosaicProps {
    routing?: any;
    mosaicStore?: MosaicStore;
    location: Location;
}

interface IMosaicState {
    canvasImageLoaded: boolean;
    svgMosaicString: string;
}

@inject('mosaicStore', 'routing')
@observer
class Mosaic extends React.Component<IMosaicProps, IMosaicState> {
    private static getSvgMosaicString(
        imageWidth: number,
        imageHeight: number,
        tiles: JSX.Element[]
    ): string {
        return renderToString(
            <svg
                width={imageWidth}
                height={imageHeight}
                viewBox={`0 0 ${imageWidth} ${imageHeight}`}
                id={MOSAIC_SVG_ELEMENT_ID}
            >
                {tiles}
            </svg>
        );
    }

    private static async getPngDataUriFromSvgDocumentElement(): Promise<string> {
        return await svgAsPngUri(
            document.getElementById(MOSAIC_SVG_ELEMENT_ID),
            {},
            (uri: string) => uri
        );
    }

    private canvasRef: RefObject<HTMLCanvasElement>;

    constructor(props: IMosaicProps) {
        super(props);
        this.state = {
            canvasImageLoaded: false,
            svgMosaicString: ''
        };
        this.canvasRef = createRef<HTMLCanvasElement>();
        this.handleConvertButtonClick = this.handleConvertButtonClick.bind(this);
        this.handleShareButtonClick = this.handleShareButtonClick.bind(this);
        this.props.mosaicStore!.resetSharedMosaicLink();
    }

    public async componentDidMount() {
        await this.drawCanvasImage();
        this.setState({ canvasImageLoaded: true });
    }

    public render() {
        const handleBackButtonClick = () => this.props.routing.goBack();
        const linkToUploadedImage = this.props.mosaicStore!.sharedMosaicLink;

        return (
            <div>
                <BackButton onBackButtonClick={handleBackButtonClick} />
                {
                    this.state.svgMosaicString === ''
                        ? <div>
                            <button onClick={this.handleConvertButtonClick}>
                                Convert image into a mosaic
                            </button>
                        </div>
                        : (
                            this.state.canvasImageLoaded
                                ? <Share
                                    linkToUploadedImage={linkToUploadedImage}
                                    onShareButtonClick={this.handleShareButtonClick}
                                />
                                : <div>Loading original image</div>
                        )
                }
                <div>
                    <canvas ref={this.canvasRef} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: this.state.svgMosaicString }} />
            </div>
        );
    }

    private getOrigImageUri(): string {
        const origImageUri = this.props.location.state.imageUri;

        // TODO better error handling
        if (!origImageUri) {
            throw Error('Missing image URI');
        }

        return origImageUri;
    }

    private async getSvgMosaicString(): Promise<string> {
        const canvas = this.canvasRef.current;
        if (!canvas) {
            throw Error('Cannot get canvas');
        }

        const imageWidth = canvas.width;
        const imageHeight = canvas.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw Error('Cannot get canvas context');
        }

        const tiles = [];
        const radius = TILE_SIZE / 2;

        for (let sx = 0; sx < imageWidth; sx += TILE_SIZE) {
            for (let sy = 0; sy < imageHeight; sy += TILE_SIZE) {
                const origTile = ctx.getImageData(sx, sy, TILE_SIZE, TILE_SIZE);
                const avgColor = getAverageTileColor(origTile);

                tiles.push(
                    <ellipse
                        key={`${sx}_${sy}`}
                        cx={sx + radius}
                        cy={sy + radius}
                        rx={radius}
                        ry={radius}
                        style={{ fill: avgColor }}
                    />
                );
            }
        }

        return Mosaic.getSvgMosaicString(imageWidth, imageHeight, tiles);
    }

    private async drawCanvasImage(): Promise<void> {
        const imageElement = await getImageElementFromUri(this.getOrigImageUri());
        const imageWidth = calculateImageWidth(imageElement.width, TILE_SIZE);
        const imageHeight = calculateImageHeight(imageElement.height, TILE_SIZE);

        const canvas = this.canvasRef.current;
        const ctx = getCanvasContextForDrawing(imageWidth, imageHeight, canvas);
        ctx.drawImage(imageElement, 0, 0);
    }

    private async handleConvertButtonClick(): Promise<void> {
        const svgMosaicString = await this.getSvgMosaicString();
        this.setState({ svgMosaicString });
    }

    private async handleShareButtonClick(): Promise<void> {
        const pngDataUri = await Mosaic.getPngDataUriFromSvgDocumentElement();
        const base64ImageData = pngDataUri.replace('data:image/png;base64,', '');
        const fileSize = atob(base64ImageData).length;
        if (fileSize > MAX_IMGUR_API_FILE_UPLOAD_SIZE) {
            // TODO
            console.log(`Cannot upload image bigger than ${MAX_IMGUR_API_FILE_UPLOAD_SIZE.toLocaleString()} bytes.`); // tslint:disable-line
        } else {
            this.props.mosaicStore!.shareMosaic(base64ImageData);
        }
    }
}

export default Mosaic;
