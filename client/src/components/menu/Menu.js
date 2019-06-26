import React, { Component } from 'react';
import './menu.css';

const Menu = () => {
    return (
        <div>
            <div className="burger">
                <div className="lines">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
            </div>
            <div>
                <Link to="/about"><p>About</p></Link>
                <Link to="/something"><p>Contact</p></Link>

                <Switch>
                    <Route path="/about" component={About} />
                    <Route path="/contact" component={Something} />
                </Switch>
            </div>
        </div>
    );
}

export default Menu;