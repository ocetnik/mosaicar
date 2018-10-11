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
                        ? <a href={linkToUploadedImage} target='_blank'>{linkToUploadedImage}</a>
                        : <button onClick={this.props.onShareButtonClick}>Share</button>
                }
            </div>
        );
    }
}

export default Share;
