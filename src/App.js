import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ToDo from "./components/ToDo";
import "./style.css";
// import './demo/functional';
import Hoc from "./demo/HOC";

function App() {
  return (
    <div className="app">
      {/* <ToDo /> */}
      <Hoc>
        <h1>Title</h1>
        <p>Lorerin ipsum enem</p>
      </Hoc>
    </div>
  );
}

export default App;
