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
            loggedOut: null,
            name: "",
            pointsCount: 0,
            groceriesList: []
        };
    }

    handleChange = e => {
        this.setState({ name: e.target.value });
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
            })
            .catch(error =>
                console.error(
                    `Something went wrong when getting data from server:${error.stack}`
                )
            );
    }

    componentDidMount() {
        this._isMounted = true;
        axios
            .get("/profile")
            .then(results => {
                if (this._isMounted) {
                    this.setState({ loggedIn: results.data });

                    axios
                        .get("/points")
                        .then(totalPoints => {
                            this.setState({
                                pointsCount: totalPoints.data.points
                            })
                        })
                        .catch(error => console.error(`Something went wrong when getting points from server: ${error.stack}`))

                    axios
                        .get("/groceriesName")
                        .then(groceriesFromServer => {
                            let groceriesArray = groceriesFromServer.data
                            let newGroceriesArray = [];
                            groceriesArray.forEach((element) => {
                                newGroceriesArray.push({ id: element.id, groceries: element.name })
                            })
                            this.setState({ groceriesList: newGroceriesArray })
                        })
                        .catch(error => console.error(`Something went wrong when getting groceries NAMES from the server: ${error.stack}`))
                }
            })
            .catch(error =>
                console.error("Something went wrong when getting data from /profile", error.stack));
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleLogout = e => {
        e.preventDefault();

        axios
            .get("/logout")
            .then(results => {
                console.log("cookies", results.data)
                this.setState({ loggedOut: true })
            })
            .catch(error =>
                console.error("Something went wrong when getting cookies data from /profile", error.stack));
    }

    render() {
        let list = this.state.groceriesList.map((element, index) => {
            return <div key={index}>
                <p className="list-item">{element.groceries}</p>
            </div>
        })

        if (this.state.loggedIn === false) return <Redirect to="/login" />
        if (this.state.loggedOut === true) return <Redirect to="/" />
        else return (
            <div>
                <Menu />
                <h1 className="profile-title">YOUR PROFILE</h1>

                <form onSubmit={this.handleLogout} className="LogoutForm">
                    <input type="submit" value="Logout" className="logout-button" />
                </form>
                <div className="profile-main">
                        <form onSubmit={this.handleSubmit} className="groceries-form">
                            <select
                                value={this.state.name}
                                onChange={this.handleChange}
                                className="groceries-select"
                            >
                                <option>Select</option>
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
                            <input type="submit" value="Submit" className="groceries-submit" />
                        </form>


                        <div className="point-list-container">
                            <h2>Points: {this.state.pointsCount}</h2>
                            <p className="your-food">Your food:</p>
                            <div className="list-container">
                                {list}
                            </div>
                        </div>

                    </div>
                </div>
        );
    }
}

export default Profile;
