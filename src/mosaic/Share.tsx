import { inject, observer } from "mobx-react";
import * as React from "react";
import MosaicStore from "./MosaicStore";

interface IShareProps {
    mosaicStore?: MosaicStore;
    onShareButtonClick: () => void;
}

@inject('mosaicStore')
@observer
class Share extends React.Component<IShareProps, {}> {
    public render() {
        const linkToUploadedImage = this.props.mosaicStore!.sharedMosaicLink;

        if (this.props.mosaicStore!.loading) {
            return <div>Uploading image ...</div>
        }

        return (
            <div>
                {
                    linkToUploadedImage !== null
                        ? <div>
                            <span>Link to uploaded image: </span>
                            <a href={linkToUploadedImage} target='_blank'>{linkToUploadedImage}</a>
                        </div>
                        : <div>
                            <button onClick={this.props.onShareButtonClick}>
                                Share mosaic image to Imgur
                            </button>
                        </div>
                }
            </div>
        );
    }
}

export default Share;
