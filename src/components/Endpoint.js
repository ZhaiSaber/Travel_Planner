export function getRecommendationByCategory(categoryName) {
    if (categoryName === "Museum") {
        return {
            categoryName: categoryName,
            items: [
              { placeId: "id5", lat: 34.0619951, lng: -118.5369877, imgUrl: "https://lh5.googleusercontent.com/p/AF1QipOe-Wj4utK3Xa5KIHD3zHKmtnj3GqGNpy2MZwpU=w408-h306-k-no", name: "The Getty", address: "ABCD", rating: 4.8 },
              { placeId: "id6", lat: 34.1184341, lng: -118.3025822, imgUrl: "https://lh5.googleusercontent.com/p/AF1QipMxx2EwT-isCRsWt_UP5gGZvrLb44-0980J2tbG=w408-h229-k-no", name: "Griffith Observatory", address: "ABCD", rating: 4.7 },
              { placeId: "id7", lat: 33.9875499, lng: -118.4792247, imgUrl: "https://lh5.googleusercontent.com/p/AF1QipPEgD1xOTg50XG9-y3T60rA_hn4qKQRAxd0Ea-A=w408-h302-k-no", name: "Venice Beach", address: "ABCD", rating: 4.5 }
            ]
          };
    }


    return {
        categoryName: categoryName,
        items: [
          { placeId: "id1", lat: 34.0087686, lng: -118.5000063, imgUrl: "https://lh5.googleusercontent.com/p/AF1QipP0mlxIkwrRtFcxkytXEHrxELz91EsZwTSH7-Na=w408-h544-k-no", name: "Santa Monica Pier", address: "ABCD", rating: 4.6 },
          { placeId: "id2", lat: 34.0619951, lng: -118.5369877, imgUrl: "https://lh5.googleusercontent.com/p/AF1QipOe-Wj4utK3Xa5KIHD3zHKmtnj3GqGNpy2MZwpU=w408-h306-k-no", name: "The Getty", address: "ABCD", rating: 4.8 },
          { placeId: "id3", lat: 34.1184341, lng: -118.3025822, imgUrl: "https://lh5.googleusercontent.com/p/AF1QipMxx2EwT-isCRsWt_UP5gGZvrLb44-0980J2tbG=w408-h229-k-no", name: "Griffith Observatory", address: "ABCD", rating: 4.7 },
          { placeId: "id4", lat: 33.9875499, lng: -118.4792247, imgUrl: "https://lh5.googleusercontent.com/p/AF1QipPEgD1xOTg50XG9-y3T60rA_hn4qKQRAxd0Ea-A=w408-h302-k-no", name: "Venice Beach", address: "ABCD", rating: 4.5 }
        ]
      };
}