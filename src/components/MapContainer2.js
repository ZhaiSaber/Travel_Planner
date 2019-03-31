import React from 'react';
import { GOOGLE_API_KEY } from './constants'

var map;

export default class MapContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    initMap() {
        let cord_LA = { lat: 34.052235, lng: -118.243683 };
        // The map, centered at LA
        map = new window.google.maps.Map(
            document.getElementById('map'),
            { zoom: 10, center: cord_LA }
        );
        // The marker, positioned at LA
        let marker = new window.google.maps.Marker({
            position: cord_LA,
            map: map
        });
    }

    loadScript() {
        let scriptEl = this.createMapScript();
        let scriptsOnPage = document.getElementsByTagName('script');
        let script = scriptsOnPage[0];
        script.parentNode.insertBefore(scriptEl, script);
        window.initMap = this.initMap;
    }

    createMapScript() {
        let mapScript = document.createElement("script");
        mapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&callback=initMap`;
        mapScript.async = true;
        mapScript.defer = true;
        return mapScript;
    }

    render() {
        this.loadScript();
        return (
            <div id="map">
            </div>
        )
    }
}

export function createMarkerAt(lat, lng) {
    console.log("Create Marker At");
    //removeMarkers();
    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
        '<div id="bodyContent">' +
        '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        'sandstone rock formation in the southern part of the ' +
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
        'south west of the nearest large town, Alice Springs; 450&#160;km ' +
        '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
        'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
        'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
        'Aboriginal people of the area. It has many springs, waterholes, ' +
        'rock caves and ancient paintings. Uluru is listed as a World ' +
        'Heritage Site.</p>' +
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
        'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
        '(last visited June 22, 2009).</p>' +
        '</div>' +
        '</div>';

    var infowindow = new window.google.maps.InfoWindow({
        content: contentString
    });
    var marker = new window.google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: 'test 1',
    });
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
    //markers.push(marker);
}

// export function removeMarkers() {
//     for (var i = 0; i < markers.length; i++) {
//         markers[i].setMap(null);
//     }
// }