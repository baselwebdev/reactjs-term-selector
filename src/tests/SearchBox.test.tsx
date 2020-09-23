import React from 'react';
import { render } from './test-utils';
import SearchBox from '../features/terms/components/SearchBox';
import userEvent from '@testing-library/user-event';

describe('SearchBox searching showing found term results', () => {
    let foundTermOne: HTMLElement;
    let foundTermTwo: HTMLElement;
    let searchInput: HTMLElement;

    beforeEach(async () => {
        const { getByPlaceholderText, getByText } = render(<SearchBox />);
        searchInput = getByPlaceholderText('Terms');
        await userEvent.type(searchInput, 'Hand');
        // Hand search string is surrounded by a <strong> element, so we only can search for the non strong element.
        foundTermOne = getByText('protection');
        foundTermTwo = getByText('washing');
    });

    it('Renders found terms', async () => {
        expect(foundTermOne).toBeInTheDocument();
        expect(foundTermTwo).toBeInTheDocument();
    });

    it('Removes the search results when clearing the search input', async () => {
        await userEvent.type(searchInput, '{selectall}{del}');
        expect(foundTermOne).not.toBeInTheDocument();
        expect(foundTermTwo).not.toBeInTheDocument();
    });
});
