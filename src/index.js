// /*global CustomElement*/
import React from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import App from './App';

// CustomElement.init((element, _context) => {
//
// });

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// CustomElement.setHeight(250);
