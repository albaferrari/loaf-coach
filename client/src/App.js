import React, { Component } from "react";
import "./App.css";
import Map from "./components/map/Map";
import Sidebar from "./components/sidebar/Sidebar";
import { Route, Switch } from "react-router-dom";

import About from "./components/About";
import Something from "./components/Something";
import Register from "./components/register/Register";

class App extends Component {

  addUser = formState => {
    this.setState({users: [...this.formState.users, formState]});
  };

  render() { 
    return (
      <div className="App">
        <Sidebar />
        <Switch>
          <Route exact path="/" component={Map} />
          <Route path="/about" component={About} />
          <Route path="/something" component={Something} />
          <Route path="/register" component={Register} />
        </Switch>
    </div>
    );
  }
}
 
export default App;