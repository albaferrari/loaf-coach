import React, { Component } from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: "",
            redirect: false
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

        const user = {
            name: this.state.name,
            password: this.state.password
        }

        axios
            .post("/login", user)
            .then(resultsFromServer => {
                console.log(resultsFromServer.data)
                this.setState({
                    id: resultsFromServer.data.id,
                    name: resultsFromServer.data.name,
                    password: resultsFromServer.data.password,
                    redirect: true
                });
            })
            .catch(error =>
                console.error(
                    `Something went wrong when getting data from server:${error.stack}`
                )
            );
    }

    render() {
        if(this.state.redirect) return <Redirect to="/profile" />
        else return (
        <div>
            <div>
                <h1>Login</h1>
            </div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <br />
                        <input
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <br />
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
};

export default Login;