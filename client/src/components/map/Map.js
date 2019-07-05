import React, { Component } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import axios from "axios";
import Geocoder from "react-map-gl-geocoder";

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

import "../map/map.css";

class Map extends Component {
  _isMounted = false;

  state = {
    viewport: {
      latitude: 52.3745403,
      longitude: 4.8979755,
      width: "100vw",
      height: "100vh",
      zoom: 13
    },
    searchResultLayer: null,
    lat: 0,
    lng: 0,
    test:[]
  };

  mapRef = React.createRef();

  componentDidMount() {
    this._isMounted = true;
    axios
      .get("/home")
      .then(dataFromServer => {
        if(this._isMounted){
          console.log("COMPONENT MOUNTED!!!!!!")

          let coordinates = dataFromServer.data
          let coordsContainer = []
          for(const key in coordinates) {
            console.log("Longitude: ", JSON.parse(coordinates[key])[0], "Latitude: ", JSON.parse(coordinates[key])[1])
            let coords = {
              lat:JSON.parse(coordinates[key])[1],
              lng:JSON.parse(coordinates[key])[0]}
            coordsContainer.push(coords)
          }
          console.log("Container", coordsContainer[0])
          this.setState({
            test:coordsContainer
          })
        }
      })
      .catch(error =>
        console.error(
          `Something went wrong when getting ADDRESS data from server:${error.stack}`
        )
      );
        
  }


  componentWillUnmount() {
    this._isMounted = false;
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

    let x = this.state.test.map((y, index) => {
      return <Marker
      key={index}
          latitude={y.lat}
          longitude={y.lng}
          offsetLeft={-20}
          offsetTop={-10}>
          <div className="marker-btn"></div>
          <button></button>
      </Marker>
    })

    return (
      <div className="Map">
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
          latitude={this.state.lat}
          longitude={this.state.lng}
          offsetLeft={-20}
          offsetTop={-10}>
          <div className="marker-btn"></div>
        </Marker> */}
        {x}
        
        </ReactMapGL>
      </div>
    );
  }
}

export default Map;
