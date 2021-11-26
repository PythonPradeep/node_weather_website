const request = require("request");

const forecast = (name, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    name +
    ",IN&appid=748630228660e0990c29e99c46c5ea01&units=metric";

  request({ url: url, json: true }, (error, response) => {
    // console.log(response.body.main);
    if (error) {
      callback(
        "Sorry! Unable to connect the weather! Try again or check the wifi!",
        undefined
      );
    } else if (response.body.error) {
      callback("Unable to find the location"), undefined;
    } else {
      callback(
        undefined,
        "The temperature is currently " +
          response.body.main.temp +
          " degrees out. But it is feels like " +
          response.body.main.feels_like +
          " degrees out!. So there will be " +
          response.body.weather[0].description
      );
    }
  });
};

module.exports = forecast;
