import React from "react";
// import ProviderFlow from "./components/Main";
import DnDFlow from "./components/New";
import "./style.css";

function App() {
  return (
    <div className="App">
      <div className="flow ibos_flow">
        <h4 className="title">iBOS Flow</h4>
        <DnDFlow />
      </div>
    </div>
  );
}

export default App;
