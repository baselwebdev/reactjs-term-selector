import React from 'react';
import './App.css';
import SearchForm from './components/SearchBox';
import NoneButton from './components/NoneButton';

export interface P {
    status: boolean;
}

class App extends React.Component<P> {
    render() {
        // todo: check for status before rendering the elements with status
        return (
            <main>
                <h3>Selected terms:</h3>
                <div className={'row'}>
                    <SearchForm value={''} />
                    <div className={'col-6'}>
                        <h3>Parent terms:</h3>
                        <NoneButton />
                        <h3>Child terms:</h3>
                        <NoneButton />
                        <h3>Related terms:</h3>
                        <NoneButton />
                    </div>
                </div>
            </main>
        );
    }
}

export default App;
