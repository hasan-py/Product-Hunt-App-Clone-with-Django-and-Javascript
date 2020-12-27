import React from 'react';
import ProviderFlow from './components/Main';
import './style.css';

function App() {
  return (
    <div className="App">
      <div className="flow">
        <h4 className="title">iBOS Flow</h4>
        <ProviderFlow />
      </div>
    </div>
  );
}

export default App;
