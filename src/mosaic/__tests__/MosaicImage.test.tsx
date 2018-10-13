import * as React from 'react';
import * as renderer from 'react-test-renderer';
import MosaicImage from '../MosaicImage';

describe('MosaicImage', () => {
    const ref = React.createRef<HTMLCanvasElement>();

    test('Should display canvas when mosaicSvgString === \'\'', () => {
        const component = renderer.create(
            <MosaicImage
                canvasRef={ref}
                mosaicSvgString={''}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('Should display SVG string when mosaicSvgString !== \'\'', () => {
        const svgString = '<svg width="100" height="100"><circle cx="50" cy="50" r="40"' +
            ' stroke="green" stroke-width="4" fill="yellow" /></svg>';

        const component = renderer.create(
            <MosaicImage
                canvasRef={ref}
                mosaicSvgString={svgString}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
