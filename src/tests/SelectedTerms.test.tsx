import React from 'react';
import { render } from './test-utils';
import SelectedTerms from '../features/terms/components/SelectedTerms';

describe('Selected terms', () => {
    const { getByText } = render(<SelectedTerms />);
    const selectedTerm = getByText(/My term/i);
    it('Renders selected terms', () => {
        expect(selectedTerm).toBeInTheDocument();
    });
    it('Removes selected term when clicking on the selected terms', () => {
        selectedTerm.click();
        expect(selectedTerm).not.toBeInTheDocument();
    });
});
