import React from 'react';
import './App.css';
import SearchForm from './components/SearchBox';
import SelectedTerms from './components/SelectedTerms';

class App extends React.Component {
    render(): React.ReactNode {
        // todo: check for status before rendering the elements with status
        return (
            <main>
                <h3>Selected terms:</h3>
                <SelectedTerms />
                <h3>Search terms:</h3>
                <SearchForm />
            </main>
        );
    }
}

export default App;
