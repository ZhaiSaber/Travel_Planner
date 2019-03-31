import React, { Component } from 'react';

import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  onMarkerClick = (props, marker, e) => {
    console.log("OnMarkerClick");
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    },
      console.log(this.state));
  }
  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  render() {
    const mapStyles = {
      width: '100%',
      height: '100%'
    };
    const cord_LA = {
      lat: 34.052235,
      lng: -118.243683
    };
    return (
      <Map
        className='map'
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={cord_LA}
        onClick={this.onMapClick}
      >
        {this.props.markers.map((marker) => {
          const cord = {
            lat: marker.lat,
            lng: marker.lng,
          };
          const infoWindowStyles = {
            width: '50px',
            height: '100px',
          }
          return (
            <Marker key={"marker" + marker.placeId}
              onClick={this.onMarkerClick}
              title={marker.name}
              position={{ lat: marker.lat, lng: marker.lng }}
              name={marker.name}
            // icon={{
            //   url: "../assets/images/logo.svg",
            //   anchor: new window.google.maps.Point(32,32),
            //   scaledSize: new window.google.maps.Size(64,64)
            // }}
            >
              <InfoWindow key={"infowindow" + marker.placeId}
                //onOpen={this.windowHasOpened}
                //onClose={this.windowHasClosed}
                //marker={this.state.activeMarker}
                //position={{ lat: marker.lat, lng: marker.lng }}
                visible={true}//{this.state.showingInfoWindow}
              //style={infoWindowStyles}
              >
                <div id={"infowindowContent" + marker.placeId}>
                  <h1>ecijensivdkc{this.state.selectedPlace.name}</h1>
                </div>
              </InfoWindow>
            </Marker>
          );
        })}

      </Map>
    );
  }
}

const LoadingContainer = (props) => (
  <div>Welcome to your travel plan!!!</div>
)

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDOGcI77FXPTVdM3UIuujo6XljLEMxac7M',
  LoadingContainer: LoadingContainer,
})(MapContainer);

export function createMarkerAt(lat, lng) {
  // removeMarkers();
  // var marker = new google.maps.Marker({ position: { lat, lng }, map: map });
  // markers.push(marker);
}

export function removeMarkers() {
  // for (var i = 0; i < markers.length; i++) {
  //     markers[i].setMap(null);
  // }
}