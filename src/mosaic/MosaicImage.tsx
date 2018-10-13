import * as React from 'react';
import { RefObject } from 'react';

interface IMosaicImageProps {
    canvasRef: RefObject<HTMLCanvasElement>;
    mosaicSvgString: string;
}

class MosaicImage extends React.Component<IMosaicImageProps, {}> {
    public render() {
        return this.props.mosaicSvgString === ''
            ? <div>
                <canvas ref={this.props.canvasRef} />
            </div>
            : <div dangerouslySetInnerHTML={{ __html: this.props.mosaicSvgString }} />;
    }
}

export default MosaicImage;
