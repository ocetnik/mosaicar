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
    constructor(props: IImageThumbnailProps) {
        super(props);

        this.handleOnImageClick = this.handleOnImageClick.bind(this);
    }

    public render() {
        return (
            <img
                srcSet={this.props.imageUri}
                width="50"
                height="50"
                onClick={this.handleOnImageClick}
            />
        );
    }

    private handleOnImageClick() {
        this.props.routing!.push(getPathToMosaicConversion(this.props.imageUri));
    };
}

export default ImageThumbnail;
