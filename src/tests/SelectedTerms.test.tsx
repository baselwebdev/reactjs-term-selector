import React from 'react';
import { render } from './test-utils';
import { RenderResult } from '@testing-library/react';
import App from '../App';
import { unmountComponentAtNode } from 'react-dom';

let app: RenderResult;
let selectedTerm: HTMLElement;

beforeEach(async () => {
    app = render(<App />);
});

afterEach(() => {
    unmountComponentAtNode(app.container);
});

describe('Selected terms', () => {
    beforeEach(() => {
        selectedTerm = app.getByText('My term');
    });
    it('Renders selected terms', () => {
        expect(selectedTerm).toBeInTheDocument();
    });
    it('Removes selected term when clicking on the selected terms', () => {
        selectedTerm.click();
        expect(selectedTerm).not.toBeInTheDocument();
        expect(app.queryAllByText('None').length).toBe(4);
    });
});
