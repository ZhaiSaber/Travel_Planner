import React, { Component } from 'react';
import { Icon } from 'antd';
import '../styles/TravelPlan.css';

export default class TravelPlan extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.allTravelPlan);
    }
    render() {
        return (
            <div id='travelPlan'>
                <TravelPlanTitle
                    allTravelPlan={this.props.allTravelPlan}
                    currentTravelPlanIndex={this.props.currentTravelPlanIndex}
                    App={this.props.App}
                />
                {/* <TravelPlanDayNav /> */}
                <TravelPlanList
                    currentTravelPlan={this.props.currentTravelPlan}
                    App={this.props.App}
                />
            </div>
        );
    }
}

class TravelPlanTitle extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.allTravelPlan);
    }
    render() {
        return (
            <div id='travelPlanTitle'>
                <div id='travelPlanTitleSelect'>
                    <select>
                        {
                            this.props.allTravelPlan.map((plan) => {
                                return <option key={plan.itineraryId} value={plan.itineraryId}>{plan.name}</option>
                            }
                            )
                        }
                    </select>
                </div>
                <TravelPlanCalendarBtn
                    App={this.props.App} />
                <TravelPlanCreateBtn 
                    App={this.props.App} />
                <TravelPlanDeleteBtn 
                    App={this.props.App} />
            </div>
        );
    }
}

class TravelPlanCalendarBtn extends React.Component {
    render() {
        const App = this.props.App;
        return (
            <div id='travelPlanCalendar'>
                <button onClick={() => { App.showTravelPlanCalendar() }}>
                    <Icon type="calendar" className="btnTravelPlanCalendar" />
                </button>
            </div>
        );
    };
}

class TravelPlanCreateBtn extends React.Component {
    render() {
        const App = this.props.App;
        return (
            <div id='travelPlanCreate'>
                <button onClick={() => {App.showTravelPlanCreate()}}>
                    <Icon type="plus" className="btnTravelPlanCreate" />
                </button>
            </div>
        );
    }
}

class TravelPlanDeleteBtn extends React.Component {
    render() {
        const App = this.props.App;
        return (
            <div id='travelPlanDelete'>
                <button onClick={() => {App.showTravelPlanDelete()}}>
                    <Icon type="delete" className="btnTravelPlanDelete" />
                </button>
            </div>
        );
    }
}

class TravelPlanDayNav extends React.Component {
    render() {
        return (
            <div id='travelPlanDayNav'>
                <button id='btnDayMoveToPrevious'>last</button>
                <div id='currentTravelPlanDay'>Day 1</div>
                <button id='btnDayMoveToNext'>next</button>
            </div>
        );
    }
}

class TravelPlanList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id='travelPlanList'>
                {
                    this.props.currentTravelPlan.places.map((place) => {
                        return <TravelPlanListItem key={place.placeId} place={place} App={this.props.App} />
                    }
                    )
                }
            </div>
        );
    }
}

class TravelPlanListItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const App = this.props.App;
        return (
            <div className='travelPlanItem'>
                <div className='travelPlanItemNameAndDuration'>
                    <div className='travelPlanItemName'>{this.props.place.name}</div>
                    <div className='travelPlanItemDuration'>{this.props.place.duration / 60 + ' min'}</div>
                </div>
                <button className="btnItemMoveUp" onClick={() => { App.movePlaceInTravelPlan(this.props.place.placeId, -1) }} >
                    <Icon type="up-circle" />
                </button>
                <button className="btnItemMoveDown" onClick={() => { App.movePlaceInTravelPlan(this.props.place.placeId, 1) }} >
                    <Icon type="down-circle" />
                </button>
                <button className="btnItemDelete" onClick={() => { App.deleteFromTravelPlan(this.props.place.placeId) }}>
                    <Icon type="close-circle" />
                </button>
            </div>
        );
    }
}