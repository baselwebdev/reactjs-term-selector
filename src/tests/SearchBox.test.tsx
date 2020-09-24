import React from 'react';
import { render } from './test-utils';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { RenderResult } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';

let app: RenderResult;
let searchInput: HTMLElement;

beforeEach(() => {
    app = render(<App />);
    searchInput = app.getByPlaceholderText('Terms');
});

afterEach(() => {
    unmountComponentAtNode(app.container);
});

describe('Using SearchBox to search', () => {
    let foundTermOne: HTMLElement;
    let foundTermTwo: HTMLElement;

    beforeEach(async () => {
        await userEvent.type(searchInput, 'Hand');
        // Hand search string is surrounded by a <strong> element, so we only can search for the non strong element.
        foundTermOne = app.getByText('protection');
        foundTermTwo = app.getByText('washing');
    });

    it('Renders found terms', () => {
        expect(foundTermOne).toBeInTheDocument();
        expect(foundTermTwo).toBeInTheDocument();
    });

    it('Removes the search results when clearing the search input', async () => {
        await userEvent.type(searchInput, '{selectall}{del}');
        expect(foundTermOne).not.toBeInTheDocument();
        expect(foundTermTwo).not.toBeInTheDocument();
    });

    it('Populates the search input with the clicked on item from the search results', () => {
        foundTermOne.click();
        expect(searchInput.closest('input')?.value).toBe('Hand protection');
    });
});

describe('When adding terms', () => {
    let addButton: HTMLElement;

    beforeEach(async () => {
        await userEvent.type(searchInput, 'Hand washing');
        addButton = app.getByText('Add');
    });

    it('Renders the newly added term in the selected terms section', async () => {
        addButton.click();
        await userEvent.type(searchInput, '{selectall}{del}');
        expect(app.getByText('Hand washing')).toBeInTheDocument();
    });

    it('Disables the add button when term is already in the selected terms section', () => {
        addButton.click();
        expect(addButton.closest('input')).toBeDisabled();
    });
});
