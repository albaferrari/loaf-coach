import React, { Component } from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom";

class Profile extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: null
        }
    }

    componentDidMount(){
        this._isMounted = true;
        console.log("HEEEEERRRREEE")
        console.log("Mount value:", this._isMounted)

        axios
        .get("/profile")
        .then(results => {
            console.log("Results value:", results.data)
            if(this._isMounted) {
                this.setState({loggedIn: results.data})
            }})
        .catch(error => console.error("Something went wrong when getting data from /profile", error.stack));
    }

    componentWillUnmount() {
        console.log("UNMOUNTED")
        this._isMounted = false;
      }

    render(){
        if(this.state.loggedIn === false) return <Redirect to="/login" />
        else return (
            <div><h1>PROFILE</h1></div>
        ) 
    }
}


export default Profile;