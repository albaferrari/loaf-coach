import React, { Component } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import axios from "axios";
import Geocoder from "react-map-gl-geocoder";
import { Redirect } from "react-router-dom";

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
    markerState: [],
    name:"",
    email:"",
    redirect: false
  };

  mapRef = React.createRef();

  componentDidMount() {
    this._isMounted = true;
    axios
      .get("/home")
      .then(dataFromServer => {
        if (this._isMounted) {
          console.log("COMPONENT MOUNTED!!!!!!")

          let coordinates = dataFromServer.data
          let coordsContainer = []
          for (const key in coordinates) {
            console.log("Longitude: ", JSON.parse(coordinates[key])[0], "Latitude: ", JSON.parse(coordinates[key])[1])
            let coords = {
              lat: JSON.parse(coordinates[key])[1],
              lng: JSON.parse(coordinates[key])[0]
            }
            coordsContainer.push(coords)
          }
          console.log("Container", coordsContainer[0])
          this.setState({
            markerState: coordsContainer
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

    let marker = this.state.markerState.map((coordinates, index) => {
      return <Marker
        key={index}
        latitude={coordinates.lat}
        longitude={coordinates.lng}
        offsetLeft={-20}
        offsetTop={-10}
      >
        <div className="marker-btn-container">
          <button className="marker-btn"
            onClick={e => {
              e.preventDefault()

              axios
                .post("/userProfileData", coordinates)
                .then(clickedMarkerInfo => {
                  console.log("Clicked marker info:", clickedMarkerInfo.data);
                  
                  this.setState({name: clickedMarkerInfo.data.name, email: clickedMarkerInfo.data.email, redirect: true})
                })
                .catch(error => console.error(`Something went wrong when sending coordinates to backend: ${error.stack}`))
            }}
          ></button>
        </div>
      </Marker>

    })

    if(this.state.redirect === true) return <Redirect to={{
      pathname: '/user',
      state: {
        name: this.state.name,
        email: this.state.email
       }
    }}
    />

    else return (
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

          {marker}

        </ReactMapGL>
      </div>
    );
  }
}

export default Map;
