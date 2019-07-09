import React, { Component } from "react";
import Menu from "../menu/Menu";
import { Link } from "react-router-dom";

class Confirm extends Component {
    state = {}
    render() {
        return (
            <div>
                <Menu />
                <div className="order-main">
                    <h1 className="order-title">Thank you for your order!</h1>
                    <p className="order-info">You will be contacted as soon as possible</p>
                    <Link to="/" className="order-button"><p>Back to the map</p></Link>
                </div>
            </div>
        );
    }
}

export default Confirm;