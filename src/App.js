import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ToDo from "./components/pages/ToDo";
import SingleTask from "./components/pages/SingleTask/SingleTask";
import NotFound from "./components/pages/NotFound";
import "./public/css/style.css";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBarMenu from "./components/NavBarMenu";

function App() {
  return (
    <div className="app">
      <NavBarMenu />
      <Switch>
        <Route exact path="/" component={ToDo} />
        <Route exact path="/task/:id" component={SingleTask} />
        <Route exact path="/task/1" component={SingleTask} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </div>
  );
}

export default App;
