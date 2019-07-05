import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import Menu from "../menu/Menu";

import "../profile/profile.css";

class Profile extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: null,
            name: null
        };
    }

    handleChange = e => {
        this.setState({name: e.target.value});
      }

    handleSubmit = e => {
        e.preventDefault();

        const food = {
            name: this.state.name,
        }

        axios
            .post("/profile", food)
            .then(resultsFromServer => {
                this.setState({
                    id: resultsFromServer.data.id,
                    name: resultsFromServer.data.name,
                    points: resultsFromServer.data.points,
                });
                console.log(resultsFromServer);
            })
            .catch(error =>
                console.error(
                    `Something went wrong when getting data from server:${error.stack}`
                )
            );
    }

    componentDidMount() {
        this._isMounted = true;
        console.log("Mount value:", this._isMounted);

        axios
            .get("/profile")
            .then(results => {
                console.log("Results value:", results.data);
                if (this._isMounted) {
                    this.setState({ loggedIn: results.data });
                }
            })
            .catch(error =>
                console.error("Something went wrong when getting data from /profile", error.stack));
    }

    componentWillUnmount() {
        console.log("UNMOUNTED");
        this._isMounted = false;
    }

    render() {
        if (this.state.loggedIn === false) return <Redirect to="/login" />;
        else
            return (
                <div>
                    <Menu />
                    <h1>PROFILE</h1>
                    <form onSubmit={this.handleSubmit}>
                        <select
                            value={this.state.name}
                            onChange={this.handleChange}
                        >
                            <option value="Milk">Milk</option>
                            <option value="Bread">Bread</option>
                            <option value="Fruit">Fruit</option>
                            <option value="Chicken">Chicken</option>
                            <option value="Pork">Pork</option>
                            <option value="Beef">Beef</option>
                            <option value="Other meat">Other meat</option>
                            <option value="Seafood">Seafood</option>
                            <option value="Soups and canned goods">Soups and canned goods</option>
                            <option value="Frozen food">Frozen food</option>
                            <option value="Pasta and rice">Pasta and rice</option>
                            <option value="Dairy and Cheese">Dairy and Cheese</option>
                            <option value="Eggs">Eggs</option>
                            <option value="Cereals and Breakfast Foods">Cereals and Breakfast Foods</option>
                            <option value="Drinks">Drinks</option>
                        </select>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            );
    }
}

export default Profile;
