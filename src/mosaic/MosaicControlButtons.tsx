import * as React from 'react';
import Share from './Share';

interface IMosaicControlButtonsProps {
    canvasImageLoaded: boolean;
    mosaicSvgString: string;
    onConvertButtonClick: () => Promise<void>
    onShareButtonClick: () => Promise<void>
}

class MosaicControlButtons extends React.Component<IMosaicControlButtonsProps, {}> {
    public render() {
        if (!this.props.canvasImageLoaded) {
            return <div>Loading original image</div>;
        }

        return this.props.mosaicSvgString === ''
            ? <div>
                <button onClick={this.props.onConvertButtonClick}>
                    Convert image into a mosaic
                </button>
            </div>
            : <Share onShareButtonClick={this.props.onShareButtonClick} />;
    }
}

export default MosaicControlButtons;
