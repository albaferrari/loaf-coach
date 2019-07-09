import React, { Component } from "react";
import axios from "axios";
import Menu from "../menu/Menu";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import "../userProfile/userProfile.css";

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
                <h2 className="list-item">{element.name}</h2>
            </div>
        })

        if (this.state.loggedIn === false) return <Redirect to="/login" />;
        else
            return (
                <div>
                    <Menu />
                    <div className="user-main">
                        <h1>{this.props.location.state.userProfile.name}</h1>
                        {/* <p>{this.props.location.state.userProfile.email}</p> */}
                        <div className="list-container">
                            {availableFood}
                        </div>
                            <Link to="/order" className="order-button"><p>Order {this.props.location.state.userProfile.name}'s food</p></Link>
                    </div>
                </div>
            );
    }
}

export default UserProfile;