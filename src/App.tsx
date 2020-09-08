import React from 'react';
import './App.css';
import SearchForm from './components/SearchBox';

class App extends React.Component {
    render(): React.ReactNode {
        // todo: check for status before rendering the elements with status
        return (
            <main>
                <h3>Selected terms:</h3>
                <SearchForm value={''} />
            </main>
        );
    }
}

export default App;
