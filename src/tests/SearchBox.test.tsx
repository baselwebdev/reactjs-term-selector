import React from 'react';
import { render } from './test-utils';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { RenderResult } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';

let app: RenderResult;

beforeEach(() => {
    app = render(<App />);
});

afterEach(() => {
    unmountComponentAtNode(app.container);
});

describe('SearchBox searching showing found term results', () => {
    let foundTermOne: HTMLElement;
    let foundTermTwo: HTMLElement;
    let searchInput: HTMLElement;

    beforeEach(async () => {
        searchInput = app.getByPlaceholderText('Terms');
        await userEvent.type(searchInput, 'Hand');
        // Hand search string is surrounded by a <strong> element, so we only can search for the non strong element.
        foundTermOne = app.getByText('protection');
        foundTermTwo = app.getByText('washing');
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
