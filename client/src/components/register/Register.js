import React, { Component } from 'react';
import axios from "axios";
import Menu from "../menu/Menu";
import "../register/register.css"

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newUser: {
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
            <div >
                <Menu />

                <div className="Register-main">
                    <form onSubmit={this.handleSubmit}>
                        <h1 className="register-title">Register</h1>
                        <div className="field">
                            <input
                                placeholder="Username"
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="field">
                            <input
                                placeholder="Email"
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="field">
                            <input
                                placeholder="Password"
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="field">
                            <input
                                placeholder="Address (ex. Damrak 28 Amsterdam)"
                                type="text"
                                name="location"
                                value={this.state.location}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="field">
                            <input
                                placeholder="Phone"
                                type="text"
                                name="phone"
                                value={this.state.phone}
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

export default Register;