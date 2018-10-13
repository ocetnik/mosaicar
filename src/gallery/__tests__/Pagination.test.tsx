import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Pagination from '../Pagination';

describe('Pagination', () => {
    const mockOnPrevPageClick = jest.fn();
    const mockOnNextPageClick = jest.fn();

    test('Back button is disabled when pageNumber=1', () => {
        const component = renderer.create(
            <Pagination
                onPrevPageClick={mockOnPrevPageClick}
                onNextPageClick={mockOnNextPageClick}
                pageNumber={1}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('Back button is enabled when pageNumber=2', () => {
        const component = renderer.create(
            <Pagination
                onPrevPageClick={mockOnPrevPageClick}
                onNextPageClick={mockOnNextPageClick}
                pageNumber={2}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
