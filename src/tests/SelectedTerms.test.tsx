import React from 'react';
import { render } from './test-utils';
import SelectedTerms from '../features/terms/components/SelectedTerms';

test('renders learn react link', () => {
    const { getByText } = render(<SelectedTerms />);
    const linkElement = getByText(/My term/i);
    expect(linkElement).toBeInTheDocument();
});
