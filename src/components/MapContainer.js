import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
         lat: -1.2884,
         lng: 36.8233
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDOGcI77FXPTVdM3UIuujo6XljLEMxac7M'
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