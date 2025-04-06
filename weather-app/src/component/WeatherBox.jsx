import React from "react";
import "./WeatherBox.css";

import sunny from "../assets/sunny copy.png";
import cloudy from "../assets/cloudy.jpeg";
import rain from "../assets/rainy.jpeg";
import snow from "../assets/snow.jpg";
import WeatherButton from "./WeatherButton";
import Button from "react-bootstrap/Button";

const getWeatherImg = (id) => {
  if (id >= 200 && id <= 531) {
    return rain;
  } else if ((id >= 601 && id <= 622) || id === 906) {
    return snow;
  } else if ((id >= 701 && id <= 781) || (id >= 803 && id <= 902)) {
    return cloudy;
  } else if (id === 905 || (id >= 952 && id <= 962)) {
    return cloudy; //windy
  } else {
    return sunny;
  }
};
const getAirInfo = (id) => {
  if (id === 1) {
    return "Good";
  } else if (id === 2) {
    return "Fair";
  } else if (id === 3) {
    return "Moderate";
  } else if (id === 4) {
    return "Poor";
  } else {
    return "Very Poor";
  }
};

const color = (id) => {
  if (id === 1) {
    return { color: "blue" };
  } else if (id === 2) {
    return { color: "green" };
  } else if (id === 3) {
    return { color: "yellow" };
  } else if (id === 4) {
    return { color: "red" };
  } else {
    return { color: "purple" };
  }
};

// const getWeatherImg = (id) => {
//   return snow;
// };

const WeatherBox = ({ weather, air, setCity }) => {
  return (
    <div className="container">
      <div className="main">
        <div className="header">
          {/* <h3 className="curloc">CURRENT LOCATION</h3> */}
          <Button
            className="curloc"
            variant="primary"
            onClick={() => setCity("")}
          >
            CURRENT LOCATION
          </Button>
          <h3 className="more">Discover More Cities</h3>
        </div>
        <div className="current">
          <h1 className="cityname">{weather?.name}</h1>
          <img src={getWeatherImg(weather?.weather[0].id)} alt="weather icon" />
          <h1 className="temperature">{weather?.main.temp}°C</h1>
          <h3 className="weather">{weather?.weather[0].description}</h3>
        </div>
        <div className="details">
          <div className="infobox">
            <h3>humidity</h3>
            <h1>{weather?.main.humidity}%</h1>
          </div>
          <div className="infobox">
            <h3>air pollution</h3>
            <h1 style={air && color(air.list[0].main.aqi)}>
              {air && getAirInfo(air.list[0].main.aqi)}
            </h1>
          </div>
          <div className="sunInfo">
            <div className="infobox">
              <h3>sunrise</h3>
              <h2>
                {weather &&
                  new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
              </h2>
            </div>
            <div className="infobox">
              <h3>sunset</h3>
              <h2>
                {weather &&
                  new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
              </h2>
            </div>
          </div>
        </div>
        <WeatherButton setCity={setCity} />
      </div>
    </div>
  );
};

export default WeatherBox;
