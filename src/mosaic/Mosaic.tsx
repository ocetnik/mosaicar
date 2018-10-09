import { Location } from 'history';
import { inject } from "mobx-react";
import * as React from "react";
import { createRef, RefObject } from "react";

import MosaicStore from "./MosaicStore";
import {
    calculateImageHeight,
    calculateImageWidth,
    getAverageTileColor,
    getImageElementFromUri
} from "./MosaicUtils";
import Share from "./Share";
import Tiles from "./Tiles";

const TILE_SIZE = 16;

interface IMosaicProps {
    routing?: any;
    mosaicStore?: MosaicStore;
    location: Location;
}

interface IMosaicState {
    base64Image?: string;
    imageHeight: number;
    imageWidth: number;
    tiles: JSX.Element[];
}

@inject('mosaicStore', 'routing')
class Mosaic extends React.Component<IMosaicProps, IMosaicState> {
    private canvasRef: RefObject<HTMLCanvasElement>;

    constructor(props: IMosaicProps) {
        super(props);
        this.state = {
            base64Image: undefined,
            imageHeight: 0,
            imageWidth: 0,
            tiles: []
        };
        this.canvasRef = createRef<HTMLCanvasElement>();
        this.handleConvertClick = this.handleConvertClick.bind(this);
        this.props.mosaicStore!.resetSharedMosaicLink();
    }

    public render() {
        const { goBack } = this.props.routing;
        const onBackClick = () => goBack();

        return (
            <div>
                <button onClick={onBackClick}>Back</button>
                {
                    this.state.base64Image
                        ? <Share
                            base64Image={this.state.base64Image}
                        />
                        : <button onClick={this.handleConvertClick}>
                            Convert image into a mosaic
                        </button>
                }
                <canvas ref={this.canvasRef} />
                <Tiles
                    tiles={this.state.tiles}
                    imageWidth={this.state.imageWidth}
                    imageHeight={this.state.imageHeight}
                />
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

    private getCanvasContext(width: number, height: number): CanvasRenderingContext2D {
        const canvas = this.canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                canvas.width = width;
                canvas.height = height;
                return ctx;
            }
        }

        throw Error('Failed to get canvas context');
    }

    private async createCanvasImage() {
        const imageElement = await getImageElementFromUri(this.getOrigImageUri());
        const imageWidth = calculateImageWidth(imageElement.width, TILE_SIZE);
        const imageHeight = calculateImageHeight(imageElement.height, TILE_SIZE);

        const ctx = this.getCanvasContext(imageWidth, imageHeight);
        ctx.drawImage(imageElement, 0, 0);

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

        this.setState({ imageHeight, imageWidth, tiles });
    }

    private async handleConvertClick() {
        await this.createCanvasImage().then(() => {
            this.setState({
                base64Image: this.canvasRef.current!.toDataURL().replace('data:image/png;base64,', '')
            });
        });
    }
}

export default Mosaic;
