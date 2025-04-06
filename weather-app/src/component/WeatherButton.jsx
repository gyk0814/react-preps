import React from "react";
import Button from "react-bootstrap/Button";

const WeatherButton = ({ setCity, selectedCity }) => {
  const cities = ["Paris", "New York", "London", "Tokyo"];

  return (
    <div className="moreloca">
      <Button
        className={`${selectedCity === "" ? "active" : ""}`}
        onClick={() => {
          setCity("");
        }}
      >
        current location
      </Button>
      {cities.map((city, index) => {
        return (
          <Button
            className={`${selectedCity === city ? "active" : ""}`}
            key={index}
            onClick={() => {
              setCity(city);
            }}
          >
            {city}
          </Button>
        );
      })}
    </div>
  );
};

export default WeatherButton;
