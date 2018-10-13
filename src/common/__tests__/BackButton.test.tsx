import { shallow } from 'enzyme';
import * as React from 'react';
import BackButton from '../BackButton';

describe('BackButton', () => {
    it('test click event', () => {
        const mockCallBack = jest.fn();
        const button = shallow(<BackButton onBackButtonClick={mockCallBack} />);
        button.find('button').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });
});
