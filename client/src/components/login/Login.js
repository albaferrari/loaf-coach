import React, { Component } from 'react';
import axios from "axios";
import { Redirect } from "react-router-dom";

import Menu from "../menu/Menu";
/* import "../register/register.css"; */

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
        if (this.state.redirect) return <Redirect to="/profile" />
        else return (
            <div>
                <Menu />
                <div className="Register-main">
                    <div>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <h1 className="register-title">Login</h1>
                        <div className="field">
                            <input
                                type="text"
                                name="name"
                                placeholder="Username"
                                value={this.state.name}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="field">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <br />
                        <input type="submit" value="Submit" className="submit-button" />
                    </form>
                </div>
            </div>
        )
    }
};

export default Login;