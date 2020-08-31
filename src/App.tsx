import React from 'react';
import './App.css';
import SearchBox from './components/SearchBox';

function App() {
  return (
      <main>
        <h3>Selected terms:</h3>
          <div className={'row'}>
              <SearchBox />
              <div className={'col-6'}>
                  <h3>Parent terms:</h3>
                  <div className={'no_term_items col-3'}>None</div>
                  <h3>Child terms:</h3>
                  <div className={'no_term_items col-3'}>None</div>
                  <h3>Related terms:</h3>
                  <div className={'no_term_items col-3'}>None</div>
              </div>
          </div>
      </main>
  );
}

export default App;
