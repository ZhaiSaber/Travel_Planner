import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import { MAP_STYLES, CORD_LA } from './constants'
import '../styles/MapContainer.css';

export class MapContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const App = this.props.App;
    return (
      <Map
        google={this.props.google}
        zoom={10}
        style={MAP_STYLES}
        initialCenter={CORD_LA}
        onClick={App.onMapClick}
      >
        {this.props.markers.map((marker) => {
          return (
            <Marker key={marker.placeId}
              onClick={App.onMarkerClick}
              title={marker.name}
              position={{ lat: marker.lat, lng: marker.lng }}
              name={marker.name}
              placeId={marker.placeId}
            // icon={{
            //   url: "../assets/images/logo.svg",
            //   anchor: new window.google.maps.Point(32,32),
            //   scaledSize: new window.google.maps.Size(64,64)
            // }}
            >
            </Marker>
          );
        })}
        <InfoWindow
          onOpen={App.onInfoWindowOpen}
          onClose={App.onInfoWindowClose}
          marker={this.props.activeMarker}
          visible={this.props.showingInfoWindow}
        >
          <div id={"infoWindow"}>
          </div>
        </InfoWindow>
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