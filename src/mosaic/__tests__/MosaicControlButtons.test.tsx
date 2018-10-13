import * as React from 'react';
import * as renderer from 'react-test-renderer';
import MosaicControlButtons from '../MosaicControlButtons';

describe('MosaicControlButtons', () => {
    const onConvertButtonClick = jest.fn();
    const onShareButtonClick = jest.fn();

    test('Show loading when canvasImageLoaded === false', () => {
        const component = renderer.create(
            <MosaicControlButtons
                canvasImageLoaded={false}
                mosaicSvgString={''}
                onConvertButtonClick={onConvertButtonClick}
                onShareButtonClick={onShareButtonClick}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('Show Convert button when canvasImageLoaded === true && mosaicSvgString === \'\'', () => {
        const component = renderer.create(
            <MosaicControlButtons
                canvasImageLoaded={true}
                mosaicSvgString={''}
                onConvertButtonClick={onConvertButtonClick}
                onShareButtonClick={onShareButtonClick}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
