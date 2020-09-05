import React from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import { ApplicationState } from './store';

const initialState = (): ApplicationState => {
    return {
        userInput: {
            searchText: 'Hello',
        },
    };
};

const store = configureStore(initialState());

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
