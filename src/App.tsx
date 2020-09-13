import React from 'react';
import './App.css';
import SearchBox from './components/SearchBox';
import SelectedTerms from './components/SelectedTerms';
import { createStore } from 'redux';
import reducer from './store/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

interface P {}

class App extends React.Component<P> {
    selectedTerms;
    constructor(props: P) {
        super(props);
        const store = createStore(reducer, composeWithDevTools());
        this.selectedTerms = store.getState();
    }

    render(): React.ReactNode {
        return (
            <main>
                <h3>Selected terms:</h3>
                <SelectedTerms selectedTerms={this.selectedTerms} />
                <h3>Search terms:</h3>
                <SearchBox selectedTerms={this.selectedTerms} />
            </main>
        );
    }
}

export default App;
