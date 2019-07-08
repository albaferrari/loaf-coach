import React, { Component } from 'react';
import axios from "axios";
import { Redirect } from "react-router-dom";
import {Link} from "react-router-dom";

import Menu from "../menu/Menu";

import "../login/login.css"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: "",
            redirect: false,
            loggedIn: null
        }
    }

    componentDidMount(){
        axios
            .get("/login")
            .then(results => {
                console.log("cookies:", results.data);
                    this.setState({ loggedIn: results.data });
                })
                .catch(error => console.error(`Something went wrong when checking for cookies: ${error.stack}`))
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
        if (this.state.loggedIn === true) return <Redirect to="/profile" />
        else return (
            <div>
                <Menu />
                <div className="Register-main">
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
                        <div className="buttons-container">

                        <input type="submit" value="Submit" className="submit-button" />
                        <div className="not-user-container">
                    <Link to="/register" className="not-user"><p>Sign in</p></Link>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
};

export default Login;