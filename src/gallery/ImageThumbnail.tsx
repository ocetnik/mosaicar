import { inject } from "mobx-react";
import * as React from "react";

import { RouterStore } from "mobx-react-router";
import { getPathToMosaicConversion } from "../routing/RoutingUtils";

interface IImageThumbnailProps {
    routing?: RouterStore;
    imageUri: string;
}

@inject('routing')
class ImageThumbnail extends React.Component<IImageThumbnailProps, {}> {
    public render() {
        const { imageUri } = this.props;

        const onImageClick = () => {
            this.props.routing!.push(getPathToMosaicConversion(imageUri));
        };

        return (
            <img
                srcSet={imageUri}
                width="50"
                height="50"
                onClick={onImageClick}
            />
        );
    }
}

export default ImageThumbnail;
