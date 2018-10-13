import { IGalleryState } from './Gallery';

export function decreasePageNumber(state: IGalleryState): IGalleryState {
    const pageNumber = state.pageNumber - 1;
    if (pageNumber < 1) {
        throw Error('Page number must be greater than 0');
    }
    return { pageNumber }
}

export function increasePageNumber(state: IGalleryState): IGalleryState {
    const pageNumber = state.pageNumber + 1;
    return { pageNumber }
}
