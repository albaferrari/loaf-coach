import React, { Component } from "react";
import "./App.css";
import Map from "./components/map/Map";
import Sidebar from "./components/sidebar/Sidebar";
import { Route, Switch } from "react-router-dom";

import About from "./components/About";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Profile from "./components/profile/Profile";


class App extends Component {

  render() { 
    return (
      <div className="App">
        <Sidebar />
        <Switch>
          <Route exact path="/" component={Map} />
          <Route path="/about" component={About} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
        </Switch>
    </div>
    );
  }
}
 
export default App;