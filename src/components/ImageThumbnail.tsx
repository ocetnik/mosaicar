import { inject } from "mobx-react";
import * as React from "react";

import { RouterStore } from "mobx-react-router";
import { MOSAIC } from "../constants/routes";

interface IImageThumbnailProps {
    routing?: RouterStore;
    link: string;
}

@inject('routing')
class ImageThumbnail extends React.Component<IImageThumbnailProps, {}> {
    public render() {
        const { link } = this.props;

        const onImageClick = () => {
            this.props.routing!.push(`${MOSAIC}?link=${encodeURIComponent(link)}`);
        };

        return (
            <img
                srcSet={link}
                width="50"
                height="50"
                onClick={onImageClick}
            />
        );
    }
}

export default ImageThumbnail;
