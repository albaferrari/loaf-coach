import React, { Component } from "react";
import "./App.css";
import Map from "./components/map/Map";
import Sidebar from "./components/sidebar/Sidebar";
import { Route, Switch } from "react-router-dom";

import About from "./components/About";
import Something from "./components/Something";

class App extends Component {
  state = {  }
  render() { 
    return (
      <div className="App">
        <Sidebar />
        <Switch>
          <Route exact path="/" component={Map} />
          <Route path="/about" component={About} />
          <Route path="/something" component={Something} />
        </Switch>
    </div>
    );
  }
}
 
export default App;