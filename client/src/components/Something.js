import React, { Component } from 'react';
import axios from "axios";

class Something extends Component {
    constructor(props) {
        super(props);
        this.state = {
          test: []
        };
      }

    componentDidMount() {
        console.log("componentdidmount!!!!")
        axios
          .get("http://localhost:5000/something")
          .then(resultsFromServer =>
            this.setState({ test: resultsFromServer.data })
          )
          .catch(error =>
            console.error(
              `Something went wrong when getting data from server:${error.stack}`
            )
          );
      }

    render(){
        return(
            <div>
                <h2>{this.state.test}</h2>
                <h1>Something</h1>
            </div>
        )        
    }
};

export default Something;