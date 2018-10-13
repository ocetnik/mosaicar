import {
    calculateNewImageEdgeLength,
    getAverageTileColor, getCanvasContextForDrawing,
    rgbToHex
} from '../MosaicUtils';

describe('calculateNewImageEdgeLength', () => {
    test('returns 32 when orig image edge length is 40 and tile size is 16', () => {
        expect(calculateNewImageEdgeLength(40, 16)).toEqual(32);
    });
});

describe('rgbToHex', () => {
    test('returns #000000 (black) when r=0, g=0, b=0', () => {
        expect(rgbToHex(0, 0, 0)).toEqual('#000000');
    });

    test('returns #ffffff (white) when r=255, g=255, b=255', () => {
        expect(rgbToHex(255, 255, 255)).toEqual('#ffffff');
    });

    test('returns #00ff00 (lime) when r=0, g=255, b=0', () => {
        expect(rgbToHex(0, 255, 0)).toEqual('#00ff00');
    });

    test('returns #800080 (purple) when r=128, g=0, b=128', () => {
        expect(rgbToHex(128, 0, 128)).toEqual('#800080');
    });
});

describe('getAverageTileColor', () => {
    test('returns #000000 (black) when data=[0, 0, 0, 0, 0, 0, 0, 0]', () => {
        const data = new Uint8ClampedArray(
            [0, 0, 0, 0, 0, 0, 0, 0]
        );
        expect(getAverageTileColor(data)).toEqual('#000000');
    });

    test('returns #ffffff (white) when data=[255, 255, 255, 255, 255, 255, 255, 255]', () => {
        const data = new Uint8ClampedArray(
            [255, 255, 255, 255, 255, 255, 255, 255]
        );
        expect(getAverageTileColor(data)).toEqual('#ffffff');
    });

    test('returns #7f7f7f (grey) when data=[0, 0, 0, 0, 255, 255, 255, 255]', () => {
        const data = new Uint8ClampedArray(
            [0, 0, 0, 0, 255, 255, 255, 255]
        );
        expect(getAverageTileColor(data)).toEqual('#7f7f7f');
    });
});

describe('getCanvasContextForDrawing', () => {
    test('throws error when canvas=null', () => {
        expect(() => getCanvasContextForDrawing(12, 3, null))
            .toThrowError();
    })
});
