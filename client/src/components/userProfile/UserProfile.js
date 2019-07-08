import React, { Component } from "react";
import axios from "axios";
import Menu from "../menu/Menu";
import { Redirect } from "react-router-dom";

import "../userProfile/userProfile.css";

class UserProfile extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: null,
            groceriesList: []
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

                    axios
                        .get("/groceriesName")
                        .then(groceriesFromServer => {
                            let groceriesArray = groceriesFromServer.data
                            let newGroceriesArray = [];
                            groceriesArray.forEach((element) => {
                                newGroceriesArray.push(element.name)
                            })
                            this.setState({ groceriesList: newGroceriesArray })
                        })
                        .catch(error => console.error(`Something went wrong when getting groceries NAMES from the server: ${error.stack}`))
                }
            })

            .catch(error => console.error(`Something went wrong when checking for cookies: ${error.stack}`))
    }
    
    render() {
        if (this.state.loggedIn === false) { return <Redirect to="/login" /> }
        else {
            let list = this.state.groceriesList;
            list.map((element) =>
                <h1 className="list-item">{element}</h1>
            )

            return (
                <div>
                    <Menu />
                    <h1>USER PROFILE FROM CLICKED MARKER</h1>
                    <h2>{this.props.location.state.name}</h2>
                    <h2>{this.props.location.state.email}</h2>
                    <div>{list}</div>
                </div>
            )
        }
    }
}

export default UserProfile;