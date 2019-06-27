import React from 'react';
import Menu from "../menu/Menu";

import "../sidebar/sidebar.css";

const Sidebar = () => {
    return (
        <div className="Sidebar">
            <Menu />
            <div className="sidebar-content">
                <img className="logo" src={require("../../public/images/logo.png")} alt="logo"></img>
                
                <h1 className="saveTheFood">Save the food!</h1>

                <p className="infoText">lorem ipsum dolor sit amet bla bla bla. Info text info text this is info text.
                    Info text la la la.</p>
            </div>
        </div>
    );
};

export default Sidebar;