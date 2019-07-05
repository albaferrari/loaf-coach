import React from 'react';
import Menu from "../menu/Menu";
import Map from "../map/Map";

import "../map/map.css";


const MapForMobile = () => {
    return(
        <div className="MapForMobile">
            <div className="Menu"><Menu /></div>
            <div className="Map"><Map /></div>
        </div>
    )
};

export default MapForMobile;