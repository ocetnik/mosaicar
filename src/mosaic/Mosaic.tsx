import { Location } from 'history';
import { inject } from "mobx-react";
import * as React from "react";
import { createRef } from "react";

import {
    calculateCanvasHeight,
    calculateCanvasWidth,
    getAverageTileColor,
    getImageElementFromUri
} from "./mosaicUtils";

const TILE_SIZE = 16;

interface IMosaicProps {
    routing?: any;
    location: Location;
}

@inject('routing')
class Mosaic extends React.Component<IMosaicProps, {}> {
    private canvasRef = createRef<HTMLCanvasElement>();

    public async componentDidMount() {
        await this.createCanvasImage();
    }

    public render() {
        const { goBack } = this.props.routing;
        const onBackClick = () => goBack();

        return (
            <div>
                <button onClick={onBackClick}>Back</button>
                <canvas ref={this.canvasRef} />
            </div>
        );
    }

    private getOrigImageLink(): string {
        const uriParams = new URLSearchParams(this.props.location.search);
        const origImageLink = uriParams.get('link');

        // TODO better error handling
        if (!origImageLink) {
            throw Error('Missing image link');
        }

        return origImageLink;
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
        const imageElement = await getImageElementFromUri(this.getOrigImageLink());

        const canvasWidth = calculateCanvasWidth(imageElement.width, TILE_SIZE);
        const canvasHeight = calculateCanvasHeight(imageElement.height, TILE_SIZE);

        const ctx = this.getCanvasContext(canvasWidth, canvasHeight);

        ctx.drawImage(imageElement, 0, 0);

        for (let sx = 0; sx < canvasWidth; sx += TILE_SIZE) {
            for (let sy = 0; sy < canvasHeight; sy += TILE_SIZE) {
                const origTile = ctx.getImageData(sx, sy, TILE_SIZE, TILE_SIZE);
                const avgColor = getAverageTileColor(origTile);
                ctx.clearRect(sx, sy, TILE_SIZE, TILE_SIZE);
                ctx.beginPath();
                const radius = TILE_SIZE / 2;
                ctx.fillStyle = `rgb(${avgColor.r}, ${avgColor.g}, ${avgColor.b})`;
                ctx.arc(sx + radius, sy + radius, radius, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
    }
}

export default Mosaic;
