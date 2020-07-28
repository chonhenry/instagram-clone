import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import "./App.css";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
    </Switch>
  </Router>
);

export default App;
