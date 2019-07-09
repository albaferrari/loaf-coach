import React from 'react';
import {Link} from "react-router-dom";

import "../sidebar/sidebar.css";

const Sidebar = () => {
    return (
        <div className="Sidebar">
            <div className="sidebar-content">
                <img className="logo" src={require("../../public/images/logo.png")} alt="logo"></img>
                
                <h1 className="saveTheFood">Save the food!</h1>

                <p className="infoText1">Don't waste food, donate it!</p>
                <p className="infoText">Click the icons on the map to see what people have to donate.</p>

                    <Link to="/map" className="goToMenuLink"><p>Go to map</p></Link>
            </div>
        </div>
    );
};

export default Sidebar;