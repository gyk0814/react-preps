import { useState, useEffect } from "react";

import "./App.css";
import WeatherBox from "./component/WeatherBox.jsx";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [weather, setWeather] = useState(null);
  const [air, setAir] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity(city);
    }
  }, [city]);

  const getWeatherByCity = async (city) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7a9bde308f867bd0eb400d7bd4fea4d3&units=metric`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setWeather(data);
    setLoading(false);
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lon = position.coords.longitude;
      const lat = position.coords.latitude;
      getWeatherByLocation(lon, lat);
      getAirPollutionByLocation(lon, lat);
    });
  };
  const getWeatherByLocation = async (lon, lat) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7a9bde308f867bd0eb400d7bd4fea4d3&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setWeather(data);
    setLoading(false);
  };
  const getAirPollutionByLocation = async (lon, lat) => {
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=7a9bde308f867bd0eb400d7bd4fea4d3`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    setAir(data);
  };

  return (
    <div>
      {loading ? (
        <div className="loading">
          <ClipLoader color={"#000000"} loading={loading} size={150} />
        </div>
      ) : (
        <WeatherBox weather={weather} air={air} setCity={setCity} city={city} />
      )}
    </div>
  );
}

export default App;
