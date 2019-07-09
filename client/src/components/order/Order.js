import React, { Component } from "react";
import Menu from "../menu/Menu";
import { Link } from "react-router-dom";

import "../order/order.css";

class Order extends Component {
    state = {}
    render() {
        return (
            <div>
                <Menu />
                    <div className="order-main">
                    <h1 className="order-title">Confirm order</h1>
                    <p className="order-info">After confirming your order, you will be contacted with all the informations you need to pick up the food.</p>
                    <Link to="/confirm" className="order-button"><p>Confirm</p></Link>
                </div>
            </div>
        );
    }
}

export default Order;