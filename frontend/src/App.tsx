import React from 'react';
import logo from './logo.svg';
import './App.css';
import EngagementsDisplay from './screens/EngagementsDisplay';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Placeholder page for DSO App
        </p>
      </header> */}
      <EngagementsDisplay />
    </div>
  );
}

export default App;
