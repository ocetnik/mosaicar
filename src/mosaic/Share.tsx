import * as React from "react";

interface IShareProps {
    linkToUploadedImage: string | null;
    onShareButtonClick: () => void;
}

class Share extends React.Component<IShareProps, {}> {
    public render() {
        const linkToUploadedImage = this.props.linkToUploadedImage;

        return (
            <div>
                {
                    linkToUploadedImage !== null
                        ? <div>
                            <span>Link to uploaded image: </span>
                            <a href={linkToUploadedImage} target='_blank'>{linkToUploadedImage}</a>
                        </div>
                        : <div>
                            <span>Mosaic image is displayed below original image </span>
                            <button onClick={this.props.onShareButtonClick}>Share mosaic image</button>
                        </div>
                }
            </div>
        );
    }
}

export default Share;
