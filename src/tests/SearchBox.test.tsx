import React from 'react';
import { render } from './test-utils';
import SearchBox from '../features/terms/components/SearchBox';
import userEvent from '@testing-library/user-event';

describe('SearchBox', () => {
    const { getByPlaceholderText, getByText } = render(<SearchBox />);

    it('Render found terms', async () => {
        await userEvent.type(getByPlaceholderText('Terms'), 'Hand');
        // The Hand search string is surrounded by a <strong> element.
        expect(getByText('protection')).toBeInTheDocument();
        expect(getByText('washing')).toBeInTheDocument();
    });
});
