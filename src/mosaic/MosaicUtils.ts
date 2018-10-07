import { IRgbColor } from "./MosaicTypes";

// final canvas width will be multiple of tile size to avoid incomplete tiles
export function calculateCanvasWidth(origImgWidth: number, tileSize: number): number {
    return Math.floor(origImgWidth / tileSize) * tileSize;
}

// final canvas height will be multiple of tile size to avoid incomplete tiles
export function calculateCanvasHeight(origImgHeight: number, tileSize: number): number {
    return Math.floor(origImgHeight / tileSize) * tileSize;
}

export function getAverageTileColor(tile: ImageData): IRgbColor {
    const data = tile.data;
    const dataLength = data.length;
    const pixelLength = dataLength / 4;

    let r = 0;
    let g = 0;
    let b = 0;

    for (let i = 0; i < dataLength; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
    }

    // tslint:disable:object-literal-sort-keys
    return {
        r: r / pixelLength,
        g: g / pixelLength,
        b: b / pixelLength
    };
    // tslint:enable:object-literal-sort-keys
}

export async function getImageElementFromUri(imageUri: string): Promise<HTMLImageElement> {
    return new Promise<HTMLImageElement>(resolve => {
        const imageElement = new Image();
        imageElement.crossOrigin = 'Anonymous';
        imageElement.src = imageUri;
        imageElement.onload = () => {
            resolve(imageElement);
        };
    });
}
