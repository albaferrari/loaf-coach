import React from 'react';
import Menu from "../menu/Menu";
import Sidebar from "../sidebar/Sidebar";
import Map from "../map/Map"

import "../home/home.css"

const Home = () => {
    return(
        <div className="Home">
            <div className="Menu"><Menu /></div>
            <div className="Sidebar"><Sidebar /></div>
            <div className="Map"><Map /></div>
        </div>
    )
};

export default Home;