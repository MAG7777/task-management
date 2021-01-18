import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ToDo from "./components/pages/ToDo";
import SingleTask from "./components/pages/SingleTask";
import NotFound from "./components/pages/NotFound";
import "./style.css";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBarMenu from "./components/NavBarMenu";

function App() {
  return (
    <div className="app">
      {/* <ToDo /> */}
      <NavBarMenu />
      <Switch>
        <Route exact path="/" component={ToDo} />
        <Route exact path="/task" component={SingleTask} />
        <Route exact path="/task" component={SingleTask} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </div>
  );
}

export default App;
