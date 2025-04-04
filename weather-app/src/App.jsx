import { useState, useEffect } from "react";

import "./App.css";
import WeatherBox from "./component/WeatherBox.jsx";

function App() {
  const [weather, setWeather] = useState(null);
  const [air, setAir] = useState(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lon = position.coords.longitude;
      const lat = position.coords.latitude;
      console.log(lon, lat);
      getWeatherByLocation(lon, lat);
      getAirPollutionByLocation(lon, lat);
    });
  };
  const getWeatherByLocation = async (lon, lat) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7a9bde308f867bd0eb400d7bd4fea4d3&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    setWeather(data);
  };
  const getAirPollutionByLocation = async (lon, lat) => {
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=7a9bde308f867bd0eb400d7bd4fea4d3`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setAir(data);
  };

  return (
    <div>
      <WeatherBox weather={weather} air={air} />
    </div>
  );
}

export default App;
