import React, { Component } from "react";
import Menu from "../menu/Menu";
import {Link} from "react-router-dom";

class Order extends Component {
    state = {}
    render() {
        return (
            <div>
                <Menu />
                <h1>Thank you for your order!</h1>
                <p>You will be contacted as soon as possible</p>
                <div>
                    <Link to="/" className="not-user"><p>Back to the map</p></Link>
                </div>
            </div>
        );
    }
}

export default Order;