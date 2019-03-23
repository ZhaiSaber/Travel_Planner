var map;
var markers = [];

function initMap() {
    var la = { lat: 34.052235, lng: -118.243683 };
    // The map, centered at Los Angeles
    map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 10,
            center: la
        });
    //map.setTilt(45);

}

function createMarketAt(lat, lng) {
    removeMarkers();
    var marker = new google.maps.Marker({ position: { lat, lng }, map: map });
    markers.push(marker);
}

function removeMarkers() {
    for(var i = 0; i < markers.length; i++){
        markers[i].setMap(null);
    }
}

class Root extends React.Component {
    constructor(props) {
        super(props);
        var recommendations = [];
        const pop = {
            categoryName: "Top 10 Popular",
            items: [
                { placeId: "id1", lat: 34.0087686, lng: -118.5000063, imgUrl: "https://lh5.googleusercontent.com/p/AF1QipP0mlxIkwrRtFcxkytXEHrxELz91EsZwTSH7-Na=w408-h544-k-no", name: "Santa Monica Pier", rating: 4.6 },
                { placeId: "id2", lat: 34.0619951, lng: -118.5369877, imgUrl: "https://lh5.googleusercontent.com/p/AF1QipOe-Wj4utK3Xa5KIHD3zHKmtnj3GqGNpy2MZwpU=w408-h306-k-no", name: "The Getty", rating: 4.8 },
                { placeId: "id3", lat: 34.1184341, lng: -118.3025822, imgUrl: "https://lh5.googleusercontent.com/p/AF1QipMxx2EwT-isCRsWt_UP5gGZvrLb44-0980J2tbG=w408-h229-k-no", name: "Griffith Observatory", rating: 4.7 },
                { placeId: "id4", lat: 33.9875499, lng: -118.4792247, imgUrl: "https://lh5.googleusercontent.com/p/AF1QipPEgD1xOTg50XG9-y3T60rA_hn4qKQRAxd0Ea-A=w408-h302-k-no", name: "Venice Beach", rating: 4.5 }
            ],
            listFolded: false,
        };
        recommendations = [
            ...recommendations,
            pop
        ];

        // <RecommendCategory categoryName='Museum' />
        var newPop = Object.assign({}, pop);
        newPop.categoryName = 'Museum';
        newPop.listFolded = true;
        recommendations = [
            ...recommendations,
            newPop
        ];
        // <RecommendCategory categoryName='Restaurant' />
        newPop = Object.assign({}, pop);
        newPop.categoryName = 'Restaurant';
        newPop.listFolded = true;
        recommendations = [
            ...recommendations,
            newPop
        ];
        // <RecommendCategory categoryName='Hotel' />
        newPop = Object.assign({}, pop);
        newPop.categoryName = 'Hotel';
        newPop.listFolded = true;
        recommendations = [
            ...recommendations,
            newPop
        ];
        // <RecommendCategory categoryName='Amusement Park' />
        newPop = Object.assign({}, pop);
        newPop.categoryName = 'Amusement Park';
        newPop.listFolded = true;
        recommendations = [
            ...recommendations,
            newPop
        ];
        this.state = {
            recommendations,
        };
    }

    foldList = (i) => {
        const newState = this.state.recommendations[i].listFolded;
        this.setState((prevState) => {
            prevState.recommendations[i].listFolded = !newState;
        });
    }

    render() {
        return (
            <RecommendDiv recommendations={this.state.recommendations} handleClickCategoryTitle={this.foldList} />
        );
    }
}

class RecommendDiv extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id='recommendDiv'>
                <RecommendTitle />
                {
                    this.props.recommendations.map(
                        (category, index) => {
                            return (
                                <RecommendCategory key={category.categoryName} recommendationIndex={index} category={category} handleClickCategoryTitle={this.props.handleClickCategoryTitle} />
                            );
                        }
                    )
                }
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
    }
    render() {
        return (
            <div className='recommendCategory'>
                <RecommendCategoryTitle recommendationIndex={this.props.recommendationIndex} categoryName={this.props.category.categoryName} handleClickCategoryTitle={this.props.handleClickCategoryTitle} />
                {this.props.category.listFolded ? null : <RecommendCategoryList items={this.props.category.items} />}
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
            <div className='recommendCategoryTitle' onClick={() => { this.props.handleClickCategoryTitle(this.props.recommendationIndex) }}>
                <p>{this.props.categoryName}</p>
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
                    this.props.items.map((item) =>
                        <RecommendCategoryListItem key={item.placeId} placeId={item.placeId} lat={item.lat} lng={item.lng} imgUrl={item.imgUrl} name={item.name} rating={item.rating} />
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
            var newPlaceName = placeName.replace(' ', '+');
            url = "https://www.google.com/maps/search/?api=1&query=" + newPlaceName;
            window.open(url);
        }
    }
    render() {
        return (
            <div className='recommendCategoryListItem'>
                <div className='recommendCategoryListItemImg'>
                    <img src={this.props.imgUrl} />
                </div>
                <div className='recommendCatogoryListItemNameAndRating'>
                    <div className='recommendCategoryListItemName' onClick={() => { createMarketAt(this.props.lat, this.props.lng); }}>{this.props.name}</div>
                    <div className='recommendCategoryListItemRating'>{this.props.rating}</div>
                </div>
                <div className='recommendCategoryListItemBtnAddToPlan'>
                    <button onClick={() => {console.log("Add to plan")}}>
                        <span className="btnAddToPlan">
                            <i className="fas fa-shopping-cart"></i>
                        </span>
                    </button>
                </div>
                <div className='recommendCategoryListItemBtnLinkToWebsite'>
                    <button onClick={() => {this.getLinkToWebsite(this.props.name)}}>
                        <span className="btnLinkToWebsite">
                            <i className="fas fa-location-arrow"></i>
                        </span>
                    </button>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById('recommend')
)

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