export interface IImage {
    id: string,
    link: string
}

export interface IGallery {
    data: IImage[],
    status: number,
    success: boolean
}
