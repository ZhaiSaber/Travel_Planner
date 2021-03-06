import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from '../assets/images/logo.svg';
import '../styles/App.css';
import MapContainer from './MapContainer';
import TravelPlan from './TravelPlan';
import Recommendation from './Recommendation';
import Header from './Header';
import TravelPlanCalendar from './TravelPlanCalendar';
import { message, Modal, Input } from 'antd';
import TravelPlanCreate from './TravelPlanCreate';
import { TOKEN_KEY } from './constants';
import { getRecommendationByCategory } from './Endpoint';

class App extends Component {

  constructor(props) {
    super(props);
    var allTravelPlan = [
      {
        itineraryId: "envilkjemklsdmckd01",
        name: "Plan 1"
      },
      {
        itineraryId: "envilkjemklsdmckd02",
        name: "Plan 2"
      },
      {
        itineraryId: "envilkjemklsdmckd03",
        name: "Plan 3"
      },
    ];
    var currentTravelPlanIndex = 0;
    var currentTravelPlan =
    {
      itineraryId: "envilkjemklsdmckd01",
      name: "Plan to LA",
      startDate: "2019-03-10",
      endDate: "2019-03-12",
      places: [
        {
          placeId: "id4",
          name: "Venice Beach",
          lat: 34.0087686,
          lng: -118.5000063,
          address: "1000 ABC Ave, LA, CA 95000",
          imgUrl: "https://lh5.googleusercontent.com/p/AF1QipP0mlxIkwrRtFcxkytXEHrxELz91EsZwTSH7-Na=w408-h544-k-no",
          duration: 3600,
        },
        {
          placeId: "id2",
          name: "The Getty",
          lat: 34.0619951,
          lng: -118.5369877,
          address: "1000 ABC Ave, LA, CA 95000",
          imgUrl: "https://lh5.googleusercontent.com/p/AF1QipOe-Wj4utK3Xa5KIHD3zHKmtnj3GqGNpy2MZwpU=w408-h306-k-no",
          duration: 3600
        },
        {
          placeId: "id3",
          name: "Griffith Observatory",
          lat: 34.1184341,
          lng: -118.3025822,
          address: "1000 ABC Ave, LA, CA 95000",
          imgUrl: "https://lh5.googleusercontent.com/p/AF1QipMxx2EwT-isCRsWt_UP5gGZvrLb44-0980J2tbG=w408-h229-k-no",
          duration: 3600
        }
      ]
    }
    var calendarVisible = false;
    var createTravelPlanVisible = false;
    var deleteTravelPlanVisible = false;
    var markers = [
      // {
      //   placeId: "id1",
      //   name: "Venice Beach",
      //   lat: 34.0087686,
      //   lng: -118.5000063,
      //   address: "1000 ABC Ave, LA, CA 95000",
      //   imgUrl: "https://lh5.googleusercontent.com/p/AF1QipP0mlxIkwrRtFcxkytXEHrxELz91EsZwTSH7-Na=w408-h544-k-no",
      //   duration: 3600,
      // },
      // {
      //   placeId: "id2",
      //   name: "The Getty",
      //   lat: 34.0619951,
      //   lng: -118.5369877,
      //   address: "1000 ABC Ave, LA, CA 95000",
      //   imgUrl: "https://lh5.googleusercontent.com/p/AF1QipOe-Wj4utK3Xa5KIHD3zHKmtnj3GqGNpy2MZwpU=w408-h306-k-no",
      //   duration: 3600
      // },
      // {
      //   placeId: "id3",
      //   name: "Griffith Observatory",
      //   lat: 34.1184341,
      //   lng: -118.3025822,
      //   address: "1000 ABC Ave, LA, CA 95000",
      //   imgUrl: "https://lh5.googleusercontent.com/p/AF1QipMxx2EwT-isCRsWt_UP5gGZvrLb44-0980J2tbG=w408-h229-k-no",
      //   duration: 3600
      // }
    ];
    var activeMarkers = [
    ]
    var map;
    var showingInfoWindow = false;
    var activeMarker = {};
    var selectedPlace = {};
    var isLoggedIn = Boolean(localStorage.getItem(TOKEN_KEY));
    this.state = {
      allTravelPlan,
      currentTravelPlan,
      currentTravelPlanIndex,
      calendarVisible,
      createTravelPlanVisible,
      deleteTravelPlanVisible,
      markers: getRecommendationByCategory("").items,
      activeMarkers,
      showingInfoWindow,
      activeMarker,
      selectedPlace,
      isLoggedIn,
    };
  }

  handleLogin = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
    this.setState({ isLoggedIn: true });
  }

  handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    this.setState({ isLoggedIn: false });
  }

  createTravelPlan = (userId, name) => {

  }
  deleteTravelPlan = (userId, itineraryId) => {

  }

  movePlaceInTravelPlan = (placeId, offset) => {
    offset = offset > 0 ? 1 : -1;
    var index;
    var len = this.state.currentTravelPlan.places.length;
    for (var i = 0; i < len; i++) {
      if (placeId === this.state.currentTravelPlan.places[i].placeId) {
        index = i;
        break;
      }
    }
    if (index + offset < 0) {
      message.warn("It is already the first on the travel plan.");
      return;
    } else if (index + offset >= len) {
      message.warn("It is already the last of the travel plan.");
      return;
    }
    this.setState((prevState) => {
      const newTravelPlan = Object.assign({}, prevState.currentTravelPlan);
      var swappedPlace = newTravelPlan.places[index];
      newTravelPlan.places[index] = newTravelPlan.places[index + offset];
      newTravelPlan.places[index + offset] = swappedPlace;
      return ({ currentTravelPlan: newTravelPlan });
    }, () => { message.success("Successfully moved the place in the travel plan.") });
  }
  deleteFromTravelPlan = (placeId) => {
    const newPlaces = [];
    for (var i = 0; i < this.state.currentTravelPlan.places.length; i++) {
      if (placeId != this.state.currentTravelPlan.places[i].placeId) {
        newPlaces.push(this.state.currentTravelPlan.places[i]);
      }
    }
    this.setState((prevState) => {
      const newTravelPlan = Object.assign({}, prevState.currentTravelPlan);
      newTravelPlan.places = newPlaces;
      return ({ currentTravelPlan: newTravelPlan });
    }, () => { message.success("Successfully removed from the travel plan.") });
  }
  addToTravelPlan = (placeId) => {
    console.log("Add to plan " + placeId);
    for (var i = 0; i < this.state.currentTravelPlan.places.length; i++) {
      if (placeId === this.state.currentTravelPlan.places[i].placeId) {
        message.warn("This place is already in your travel plan.");
        return;
      }
    }
    const jsonRsp = getPlaceInfoFromServer(placeId);
    if (jsonRsp === null) {
      message.error("Failed to find the place in database @ " + placeId);
      return;
    }
    this.setState((prevState) => {
      const newTravelPlan = Object.assign({}, prevState.currentTravelPlan);
      newTravelPlan.places.push(jsonRsp);
      return ({ currentTravelPlan: newTravelPlan });
    }, () => { message.success("Successfully added to the travel plan.") });
  }

  showTravelPlanCalendar = () => {
    this.setState({
      calendarVisible: true,
    });
  }

  handleTravelPlanCalendarConfirm = (startDate, endDate) => {
    this.setState((prevState) => {
      const newTravelPlan = Object.assign({}, prevState.currentTravelPlan);
      newTravelPlan.startDate = startDate;
      newTravelPlan.endDate = endDate;
      return ({
        calendarVisible: false,
        currentTravelPlan: newTravelPlan,
      });
    });
  }

  handleTravelPlanCalendarCancel = () => {
    this.setState({
      calendarVisible: false,
    });
  }

  showTravelPlanCreate = () => {
    this.setState({
      createTravelPlanVisible: true,
    });
  }

  handleTravelPlanCreateConfirm = () => {
    this.setState({
      createTravelPlanVisible: false,
    });
    //TODO
  }

  handleTravelPlanCreateCancel = () => {
    this.setState({
      createTravelPlanVisible: false,
    });
  }

  showTravelPlanDelete = () => {
    // this.setState({
    //   deleteTravelPlanVisible: true,
    // });
    var handleOk = this.handleTravelPlanDeleteConfirm;
    Modal.confirm({
      title: 'Are you sure delete this travel plan?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleOk();
      },
      onCancel() {
      },
    });
  }

  handleTravelPlanDeleteConfirm = () => {
    console.log("Delete this trip plan");
    // this.setState({
    //   deleteTravelPlanVisible: false,
    // });
    //TODO
  }

  createMarkerAt = (placeId, name, lat, lng, address, imgUrl) => {
    const newMarkers = this.state.markers.slice();
    const newMarker = {
      placeId,
      name,
      lat,
      lng,
      address,
      imgUrl,
      duration: 0
    }
    for (var i = 0; i < newMarkers.length; i++) {
      if (newMarkers[i].placeId == newMarker.placeId) {
        return false;
      }
    }
    console.log(newMarkers);
    console.log(newMarker);
    newMarkers.push(newMarker);
    this.setState({
      markers: newMarkers,
    });
  }

  removeAllMarkers = () => {
    // for (var i = 0; i < markers.length; i++) {
    //     markers[i].setMap(null);
    // }
  }

  onMarkerClick = (props, marker, e) => {
    console.log("OnMarkerClick");
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    },
      console.log(props));
  }

  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  onInfoWindowOpen = (props, e) => {
    const button = (
      <button
        onClick={e => { this.addToTravelPlan(this.state.selectedPlace.placeId) }}
      >
        Add to plan
      </button>
    );
    ReactDOM.render(React.Children.only(button), document.getElementById("infoWindow"));
  }
  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  render() {
    return (
      <div id="App">
        <div id="panelContainer">
        {this.state.isLoggedIn ? 
          <TravelPlan
            allTravelPlan={this.state.allTravelPlan}
            currentTravelPlan={this.state.currentTravelPlan}
            currentTravelPlanIndex={this.state.currentTravelPlanIndex}
            App={this}
          /> : null}
          <Recommendation
            recommendations={this.state.recommendations}
            App={this}
          />
          {this.state.calendarVisible ?
            <TravelPlanCalendar
              visible={this.state.calendarVisible}
              startDate={this.state.currentTravelPlan.startDate}
              endDate={this.state.currentTravelPlan.endDate}
              App={this}
            /> : null
          }
          {this.state.createTravelPlanVisible ?
            <TravelPlanCreate
              visible={this.state.createTravelPlanVisible}
              App={this}
            /> : null
          }
        </div>
        <div id="mapContainer">
          <div id="headerContainer">
            <Header
              isLoggedIn={this.state.isLoggedIn}
              handleLogout={this.handleLogout}
              handleLogin={this.handleLogin}
              showLoginModal={this.showLoginModal}
              showRegisterModal={this.showRegisterModal}
            />
          </div>
          <div id="map">
            <MapContainer
              markers={this.state.markers}
              showingInfoWindow={this.state.showingInfoWindow}
              activeMarker={this.state.activeMarker}
              selectedPlace={this.state.selectedPlace}
              App={this}
            />
          </div>
          <div id="searchbarContainer">
            <Input.Search
              className="searchbar"
              placeholder="type in place name"
              onSearch={value => message.info(value)}
              enterButton
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;








function getPlaceInfoFromServer(placeId) {
  return (
    {
      placeId: "id1",
      name: "Santa Monica Pier",
      lat: 34.0619951,
      lng: -118.5369877,
      address: "1000 ABC Ave, LA, CA 95000",
      imgUrl: "https://lh5.googleusercontent.com/p/AF1QipOe-Wj4utK3Xa5KIHD3zHKmtnj3GqGNpy2MZwpU=w408-h306-k-no",
      duration: 3600
    }
  );
}

function ajax(method, url, data, successCallback, errorCallback) {
  var xhr = new XMLHttpRequest();

  xhr.open(method, url, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      successCallback(xhr.responseText);
    } else {
      errorCallback();
    }
  };

  xhr.onerror = function () {
    console.error("The request couldn't be completed.");
    errorCallback();
  };

  if (data === null) {
    xhr.send();
  } else {
    xhr.setRequestHeader("Content-Type",
      "application/json;charset=utf-8");
    xhr.send(data);
  }
}

function errorCallback() {
  console.log("Error");
}
