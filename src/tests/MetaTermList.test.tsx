import React from 'react';
import { render } from './test-utils';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { RenderResult } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';

let app: RenderResult;
let searchInput: HTMLElement;
const searchTerm = 'Working at height';

beforeEach(async () => {
    app = render(<App />);
    searchInput = app.getByPlaceholderText('Terms');
    await userEvent.type(searchInput, searchTerm);
});

afterEach(() => {
    unmountComponentAtNode(app.container);
});

describe('When searching for terms the meta terms section', () => {
    it('Populates the parent term section', () => {
        expect(app.getByText('Physical hazards')).toBeInTheDocument();
    });

    it('Populates the child term section', () => {
        expect(app.getByText('Scaffolding')).toBeInTheDocument();
    });

    it('Populates the related term section', () => {
        expect(app.getByText('Roofs')).toBeInTheDocument();
    });

    it('Populates the search input when clicking on them', async () => {
        app.getByText('Physical hazards').click();
        expect(searchInput.closest('input')?.value).toBe('Physical hazards');
    });
});

describe('When searching for terms the meta terms section and then removing a character', () => {
    beforeEach(async () => {
        await userEvent.type(searchInput, `${searchTerm}{backspace}`);
    });

    it('Clears the parent term list', () => {
        expect(app.queryByText('Physical hazards')).not.toBeInTheDocument();
    });

    it('Clears the child term list', () => {
        expect(app.queryByText('Scaffolding')).not.toBeInTheDocument();
    });

    it('Clears the related term list', () => {
        expect(app.queryByText('Roofs')).not.toBeInTheDocument();
    });
});
