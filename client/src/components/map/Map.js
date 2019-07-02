import React, { Component } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import axios from "axios";
import Geocoder from "react-map-gl-geocoder";

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

import "../map/map.css";

class Map extends Component {
  state = {
    viewport: {
      latitude: 52.3745403,
      longitude: 4.8979755,
      width: "100vw",
      height: "100vh",
      zoom: 13
    },
    searchResultLayer: null,
    lat: null,
    lng: null
  };

  mapRef = React.createRef();

  componentDidMount(){
    axios
      .get("/home")
      .then(address => {
        let addressArray = address.data

        addressArray.forEach(address => {
          /* console.log(address.location) */
          axios
          .get(`https://api.tiles.mapbox.com/geocoding/v5/mapbox.places/${address.location}.json?&access_token=pk.eyJ1IjoiYWxiYWZlcnJhcmkiLCJhIjoiY2p4Yms3dzJ3MDN5dTNwcDkxdmxnbjVkNyJ9._65MsNa773gvPiLm26vtxw`)
          .then(results =>
            console.log(results))
          .catch(error => console.error(`Something went wrong when getting coordinates from addess ${error.stack}`))
        })
      })
      .catch(error =>
        console.error(
          `Something went wrong when getting ADDRESS data from server:${error.stack}`
        )
      );
  }

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  };

  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };

  handleOnResult = event => {
    /* console.log(event.result); */
    this.setState({
      searchResultLayer: new GeoJsonLayer({
        id: "search-result",
        data: event.result.geometry,
        getFillColor: [255, 0, 0, 128],
        getRadius: 1000,
        pointRadiusMinPixels: 10,
        pointRadiusMaxPixels: 10
      })
    });
  };


  render() {
    const { viewport, searchResultLayer } = this.state;

    return (
      <div className="Map">
        <div></div>
        <ReactMapGL
          ref={this.mapRef}
          {...viewport}
          onViewportChange={this.handleViewportChange}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/albaferrari/cjxblw98b1bwg1cn0a09b34p3"
        >

          <Geocoder
            mapRef={this.mapRef}
            onResult={this.handleOnResult}
            onViewportChange={this.handleGeocoderViewportChange}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            position="top-right"
          />
          <DeckGL {...viewport} layers={[searchResultLayer]} />

          {/* <Marker
            latitude = {this.state.lat}
            longitude = {this.state.lng}
            >
              <button class="marker-btn"></button>
            </Marker> */}

        </ReactMapGL>
      </div>
    );
  }
}

export default Map;
