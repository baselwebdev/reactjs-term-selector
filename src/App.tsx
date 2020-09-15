import React from 'react';
import './App.css';
import SearchBox from './features/terms/components/SearchBox';
import SelectedTerms from './features/terms/components/SelectedTerms';
import { createStore } from 'redux';
import reducer from './store/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { ISelectedTerms } from './react-app-env';

interface P {}

class App extends React.Component<P> {
    selectedTerms: ISelectedTerms;
    store: any;
    constructor(props: P) {
        super(props);
        this.store = createStore(reducer, composeWithDevTools());
        this.selectedTerms = this.store.getState();
    }

    render(): React.ReactNode {
        return (
            <main>
                <Provider store={this.store}>
                    <h3>Selected terms:</h3>
                    <SelectedTerms />
                    <h3>Search terms:</h3>
                    <SearchBox />
                </Provider>
            </main>
        );
    }
}

export default App;
