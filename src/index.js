import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import RefDemo from "../src/demo/RefDemo"
import Hooks from "../src/demo/Hooks";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
      {/* <RefDemo /> */}
      <Hooks />
        {/* <App /> */}
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
