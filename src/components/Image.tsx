import * as React from "react";

interface IImageProps {
    link: string;
}

class Image extends React.Component<IImageProps, {}> {
    public render() {
        return (
            <img srcSet={this.props.link} width="50" height="50" />
        );
    }
}

export default Image;
