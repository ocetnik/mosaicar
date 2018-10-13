import { Location } from 'history';
import { inject, observer } from "mobx-react";
import * as React from "react";
import { createRef, RefObject } from "react";
import { renderToString } from 'react-dom/server';
import { svgAsPngUri } from 'save-svg-as-png';

import { MAX_IMGUR_API_FILE_UPLOAD_SIZE } from "../imgur/ImgurConstants";

import BackButton from "../common/BackButton";
import MosaicControlButtons from "./MosaicControlButtons";
import MosaicImage from "./MosaicImage";
import MosaicStore from "./MosaicStore";
import {
    calculateNewImageEdgeLength,
    getAverageTileColor,
    getCanvasContextForDrawing,
    getImageElementFromUri
} from "./MosaicUtils";

const MOSAIC_SVG_ELEMENT_ID = 'mosaic-image';
const TILE_SIZE = 16;

interface IMosaicProps {
    mosaicStore: MosaicStore;
    location: Location;
    routing?: any;
}

interface IMosaicState {
    canvasImageLoaded: boolean;
    mosaicSvgString: string;
}

@inject('mosaicStore', 'routing')
@observer
class Mosaic extends React.Component<IMosaicProps, IMosaicState> {
    private static getMosaicSvgStringFromTiles(
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
            mosaicSvgString: ''
        };
        this.canvasRef = createRef<HTMLCanvasElement>();
        this.handleOnConvertButtonClick = this.handleOnConvertButtonClick.bind(this);
        this.handleOnShareButtonClick = this.handleOnShareButtonClick.bind(this);
        this.props.mosaicStore!.resetSharedMosaicLink();
    }

    public async componentDidMount() {
        await this.drawCanvasImage();
        this.setState({ canvasImageLoaded: true });
    }

    public render() {
        const { canvasImageLoaded, mosaicSvgString } = this.state;

        return (
            <div>
                <BackButton onBackButtonClick={this.props.routing.goBack} />
                <MosaicControlButtons
                    canvasImageLoaded={canvasImageLoaded}
                    mosaicSvgString={mosaicSvgString}
                    onConvertButtonClick={this.handleOnConvertButtonClick}
                    onShareButtonClick={this.handleOnShareButtonClick}
                />
                <MosaicImage
                    canvasRef={this.canvasRef}
                    mosaicSvgString={mosaicSvgString}
                />
            </div>
        );
    }

    private getOrigImageUri(): string {
        const origImageUri = this.props.location.state.imageUri;

        if (!origImageUri) {
            throw Error('Missing image URI');
        }

        return origImageUri;
    }

    private async getMosaicSvgString(): Promise<string> {
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
                const avgColor = getAverageTileColor(origTile.data);

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

        return Mosaic.getMosaicSvgStringFromTiles(imageWidth, imageHeight, tiles);
    }

    private async drawCanvasImage(): Promise<void> {
        const imageElement = await getImageElementFromUri(this.getOrigImageUri());
        const imageWidth = calculateNewImageEdgeLength(imageElement.width, TILE_SIZE);
        const imageHeight = calculateNewImageEdgeLength(imageElement.height, TILE_SIZE);

        const canvas = this.canvasRef.current;
        const ctx = getCanvasContextForDrawing(imageWidth, imageHeight, canvas);
        ctx.drawImage(imageElement, 0, 0);
    }

    private async handleOnConvertButtonClick(): Promise<void> {
        const mosaicSvgString = await this.getMosaicSvgString();
        this.setState({ mosaicSvgString });
    }

    private async handleOnShareButtonClick(): Promise<void> {
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
