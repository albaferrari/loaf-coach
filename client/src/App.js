import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Profile from "./components/profile/Profile";
import MapForMobile from "./components/MapForMobile/MapForMobile";
import UserProfile from "./components/userProfile/UserProfile";
import Order from "./components/order/Order";


class App extends Component {

  render() { 
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/map" component={MapForMobile} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/user" component={UserProfile} />
          <Route path="/order" component={Order} />
        </Switch>
    </div>
    );
  }
}
 
export default App;