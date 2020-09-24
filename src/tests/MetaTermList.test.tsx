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

describe('Searching for term, the meta term section', () => {
    it('Populates the section with the relevant terms for the searched term', async () => {
        await userEvent.type(searchInput, 'Working at height');
        expect(app.getByText('Physical hazards')).toBeInTheDocument();
        expect(app.getByText('Scaffolding')).toBeInTheDocument();
        expect(app.getByText('Roofs')).toBeInTheDocument();
    });
});
