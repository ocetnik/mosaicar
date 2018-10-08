export interface IImage {
    id: string,
    link: string
}

export interface IImageResponse {
    data: IImage,
    status: number,
    success: boolean
}

export interface IGalleryResponse {
    data: IImage[],
    status: number,
    success: boolean
}
