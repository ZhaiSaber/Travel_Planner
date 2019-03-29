import React from 'react';
import { Icon } from 'antd';
import '../styles/Recommendation.css';
import { getRecommendationByCategory } from './Endpoint';

import { createMarkerAt, removeMarkers } from './MapContainer';

export default class Recommendation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendations: getRecommendationByCategory("Top 10 Popular"),
        }
    }
    handleClickCategoryTitle = (categoryName) => {
        console.log("Click");
        const response = getRecommendationByCategory(categoryName);
        this.setState(
            (prevState) => {
                return {
                    recommendations: response
                }
            }
        );
    }
    render() {
        return (
            <div id='recommend'>
                <RecommendTitle />
                <RecommendCategory handleClickCategoryTitle={this.handleClickCategoryTitle} />
                <RecommendCategoryList recommendations={this.state.recommendations} App={this.props.App} />
            </div>
        )
    }
}

class RecommendTitle extends React.Component {
    render() {
        return (
            <div id='recommendTitle'>
                <p>Recommendations</p>
            </div>
        )
    }
}

class RecommendCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryArray: ["Top 10 Popular", "Museum", "Restaurant", "Hotel"],
            categoryIcon: ["star", "camera", "rest", "home"],
            currentCategoryIndex: 0,
        }
    }
    render() {
        return (
            <div className='recommendCategory'>
                {this.state.categoryArray.map((name, index) => {
                    return (
                        <RecommendCategoryTitle
                            key={index}
                            categoryIndex={index}
                            categoryName={name}
                            categoryIcon={this.state.categoryIcon[index]}
                            currentCategoryIndex={this.state.currentCategoryIndex}
                            handleClickCategoryTitle={this.props.handleClickCategoryTitle}
                        />
                    );
                })}


            </div>
        )
    }
}
class RecommendCategoryTitle extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='recommendCategoryTitle'
                onClick={() => { this.props.handleClickCategoryTitle(this.props.categoryName) }}>
                <Icon type={this.props.categoryIcon} />
                {this.props.currentCategoryIndex === this.props.categoryIndex ?
                    <span>{this.props.categoryName}</span> :
                    null
                }
            </div>
        );
    }
}
class RecommendCategoryList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='recommendCategoryList'>
                {
                    this.props.recommendations.items.map((item) =>
                        <RecommendCategoryListItem
                            key={item.placeId}
                            placeId={item.placeId}
                            lat={item.lat}
                            lng={item.lng}
                            imgUrl={item.imgUrl}
                            name={item.name}
                            rating={item.rating}
                            App={this.props.App}
                        />
                    )
                }
            </div>
        );
    }
}

class RecommendCategoryListItem extends React.Component {
    constructor(props) {
        super(props);
    }
    getLinkToWebsite = (placeName) => {
        var url;
        if (placeName != "") {
            var newPlaceName = placeName.replace(' ', '_');
            // url = "https://www.google.com/maps/search/?api=1&query=" + newPlaceName;
            url = "https://en.wikipedia.org/wiki/" + newPlaceName;
            window.open(url);
        }
    }
    render() {
        const App = this.props.App;
        return (
            <div className='recommendCategoryListItem'>
                <div className='recommendCategoryListItemImg'>
                    <img src={this.props.imgUrl} />
                </div>
                <div className='recommendCatogoryListItemNameAndRating'>
                    <div className='recommendCategoryListItemName' onClick={() => { App.createMarkerAt(this.props.lat, this.props.lng); }}>
                        {this.props.name}
                    </div>
                    <div className='recommendCategoryListItemRating'>
                        {this.props.rating}
                    </div>
                </div>
                <div className='recommendCategoryListItemBtnAddToPlan'>
                    <button onClick={() => { App.addToTravelPlan(this.props.placeId) }}>
                        <Icon type="shopping" className="btnAddToPlan" />
                    </button>
                </div>
                <div className='recommendCategoryListItemBtnLinkToWebsite'>
                    <button onClick={() => { this.getLinkToWebsite(this.props.name) }}>
                        <Icon type="cloud" className="btnLinkToWebsite" />
                    </button>
                </div>
            </div>
        )
    }
}