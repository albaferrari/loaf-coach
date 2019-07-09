import React, { Component } from "react";
import axios from "axios";
import Menu from "../menu/Menu";
import { Redirect } from "react-router-dom";

class UserProfile extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: null
        };
    }

    componentDidMount() {
        this._isMounted = true;
        console.log("UserProfile component MOUNTED");

        axios
            .get("/user")
            .then(results => {
                console.log("cookies:", results.data);
                if (this._isMounted) {
                    this.setState({ loggedIn: results.data });
                }
            })

            .catch(error => console.error(`Something went wrong when checking for cookies: ${error.stack}`))
    }

    render() {
        let availableFood = this.props.location.state.userProfile.food.map((element, index) => {
            return <div key={index}>
                <h2>{element.name}</h2>
            </div>
        })

        if (this.state.loggedIn === false) return <Redirect to="/login" />;
        else
            return (
                <div>
                    <Menu />
                    <h1>USER PROFILE FROM CLICKED MARKER</h1>
                    <h2>{this.props.location.state.userProfile.name}</h2>
                    <h2>{this.props.location.state.userProfile.email}</h2>
                    {availableFood}
                </div>
            );
    }
}

export default UserProfile;