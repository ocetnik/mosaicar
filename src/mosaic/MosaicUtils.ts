// final (mosaic) image width will be multiple of tile size to avoid incomplete tiles
export function calculateImageWidth(origImgWidth: number, tileSize: number): number {
    return Math.floor(origImgWidth / tileSize) * tileSize;
}

// final (mosaic) image height will be multiple of tile size to avoid incomplete tiles
export function calculateImageHeight(origImgHeight: number, tileSize: number): number {
    return Math.floor(origImgHeight / tileSize) * tileSize;
}

function rgbToHex(r: number, g: number, b: number) {
    function componentToHex(component: number) {
        const hex = component.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }

    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function getAverageTileColor(tile: ImageData): string {
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

    // ~~ is faster than Math.floor (the largest integer less than or equal to a given number)
    // tslint:disable:no-bitwise
    return rgbToHex(
        ~~(r / pixelLength),
        ~~(g / pixelLength),
        ~~(b / pixelLength)
    );
    // tslint:enable:no-bitwise
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
