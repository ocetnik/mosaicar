import * as React from 'react';

import { IImage } from '../imgur/ImgurTypes';
import ImageThumbnail from './ImageThumbnail';

interface IImageThumbnailsProps {
    images: IImage[];
}

class ImageThumbnails extends React.Component<IImageThumbnailsProps, {}> {
    public render() {
        return this.props.images.map(
            (image: IImage) => <ImageThumbnail key={image.id} imageUri={image.link} />
        );
    }
}

export default ImageThumbnails;
