import React, { Component } from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newUser : {
                name: "",
                email: "",
                password: "",
                location: "",
                phone: ""
            }
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            location: this.state.location,
            phone: this.state.phone
        }

        axios
            .post("/register", user)
            .then(resultsFromServer => {
                this.setState({
                    id: resultsFromServer.data.id,
                    name: resultsFromServer.data.name,
                    email: resultsFromServer.data.email,
                    password: resultsFromServer.data.password,
                    location: resultsFromServer.data.location,
                    phone: resultsFromServer.data.phone
                });
                /* console.log(resultsFromServer); */
            })
            .catch(error =>
                console.error(
                    `Something went wrong when getting data from server:${error.stack}`
                )
            );
    }

    render() {
            return (
            <div>
                <div>
                    <h1>Register</h1>
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
                            <label>Email:</label>
                            <br />
                            <input
                                type="email"
                                name="email"
                                value={this.state.email}
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
                        <div>
                            <label>Location:</label>
                            <br />
                            <input
                                type="text"
                                name="location"
                                value={this.state.location}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Phone:</label>
                            <br />
                            <input
                                type="text"
                                name="phone"
                                value={this.state.phone}
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

export default Register;