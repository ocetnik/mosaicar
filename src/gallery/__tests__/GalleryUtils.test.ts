import { decreasePageNumber, increasePageNumber } from "../GalleryUtils";

describe('decreasePageNumber', () => {
    test('returns 1 when actual page number is 2', () => {
        expect(decreasePageNumber(
            { pageNumber: 2 })
        ).toEqual(
            { pageNumber: 1 }
        );
    });

    test('throws error during decreasing when actual page number is 1', () => {
        expect(() => decreasePageNumber(
            { pageNumber: 1 }
        )).toThrowError();
    })
});

describe('increasePageNumber', () => {
    test('returns 2 when actual page number is 1', () => {
        expect(increasePageNumber(
            { pageNumber: 1 })
        ).toEqual(
            { pageNumber: 2 }
        );
    });
});
