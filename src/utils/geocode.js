const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoicHJhZGVlcHRoYW1pemgiLCJhIjoiY2t2dWZyaDBmMzRtZTJ3a2w3Yzd1cm5lZSJ9.5VLFZYLfUJljEeMxZ6Xzpw&limit=1";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to find location services!", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try another Search!", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports =  geocode;
