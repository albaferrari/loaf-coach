import React from 'react';
import {Link} from "react-router-dom";

import "../sidebar/sidebar.css";

const Sidebar = () => {
    return (
        <div className="Sidebar">
            <div className="sidebar-content">
                <img className="logo" src={require("../../public/images/logo.png")} alt="logo"></img>
                
                <h1 className="saveTheFood">Save the food!</h1>

                <p className="infoText">lorem ipsum dolor sit amet bla bla bla. Info text info text this is info text.
                    Info text la la la.</p>

                    <Link to="/map" className="goToMenuLink"><p>Go to map</p></Link>
            </div>
        </div>
    );
};

export default Sidebar;