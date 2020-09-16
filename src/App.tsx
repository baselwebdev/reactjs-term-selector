import React from 'react';
import './App.css';
import SearchBox from './features/terms/components/SearchBox';
import SelectedTerms from './features/terms/components/SelectedTerms';

class App extends React.Component {
    render(): React.ReactNode {
        return (
            <main>
                <h3>Selected terms:</h3>
                <SelectedTerms />
                <h3>Search terms:</h3>
                <SearchBox />
            </main>
        );
    }
}

export default App;
