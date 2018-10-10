import { inject, observer } from "mobx-react";
import * as React from "react";

import MosaicStore from "./MosaicStore";

interface IShareProps {
    mosaicStore?: MosaicStore;
    base64Image: string;
}

@inject('mosaicStore')
@observer
class Share extends React.Component<IShareProps, {}> {
    public render() {
        const linkToUploadedImage = this.props.mosaicStore!.sharedMosaicLink;
        const onShareButtonClick = () => this.props.mosaicStore!.shareMosaic(this.props.base64Image);
        // TODO add loading (click -> shared)

        return (
            <div>
                {
                    linkToUploadedImage
                        ? <a href={linkToUploadedImage} target='_blank'>{linkToUploadedImage}</a>
                        : <button onClick={onShareButtonClick}>Share image</button>
                }
            </div>
        );
    }
}

export default Share;
