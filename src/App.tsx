import React from 'react';
import './App.css';

function App() {
  return (
      <main>
        <h3>Selected terms:</h3>
        <input placeholder={"Terms"}/>
        <input type={"submit"} value={"Add"} disabled/>
      </main>
  );
}

export default App;
