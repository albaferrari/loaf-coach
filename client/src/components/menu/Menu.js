import React from 'react';
import {Link} from "react-router-dom";

import './menu.css';

const toggleMenuClasses = () => {
    let hamburgerIcon = document.getElementById("burger");
    hamburgerIcon.classList.toggle("is-active");

    let burgerMenu = document.getElementById("menu-container");
    burgerMenu.classList.toggle("opened");
}

const Menu = () => {
    return (
        <div>
            <div className="burger" id="burger" onClick={toggleMenuClasses}>
                <div className="lines">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
            </div>
            <div className="menu-container" id="menu-container">
                <div className="links-container">
                    <Link to="/" className="menu-link"><p>Home</p></Link>
                    <Link to="/about" className="menu-link"><p>About</p></Link>
                    <Link to="/login" className="menu-link"><p>Login/SignIn</p></Link>
                    <Link to="/profile" className="menu-link"><p>Profile</p></Link>
                </div>
            </div>
        </div>
    );
}

export default Menu;