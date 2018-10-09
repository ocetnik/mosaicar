import * as React from "react";

interface ITilesProps {
    tiles: JSX.Element[];
    imageWidth: number;
    imageHeight: number;
}

class Tiles extends React.Component<ITilesProps, {}> {
    public render() {
        const { imageWidth, imageHeight } = this.props;

        return (
            <div>
                <svg
                    width={imageWidth}
                    height={imageHeight}
                    viewBox={`0 0 ${imageWidth} ${imageHeight}`}
                >
                    {this.props.tiles}
                </svg>
            </div>
        );
    }
}

export default Tiles;
