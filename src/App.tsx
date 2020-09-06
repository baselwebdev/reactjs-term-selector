import React from 'react';
import './App.css';
import SearchForm from './components/SearchBox';

export interface P {
    status: boolean;
}

class App extends React.Component<P> {
    render() {
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
