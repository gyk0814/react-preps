import React from "react";
import Button from "react-bootstrap/Button";

const WeatherButton = ({ setCity }) => {
  const cities = ["Paris", "New York", "London", "Tokyo", "Sydney"];

  return (
    <div className="moreloca">
      {cities.map((city, index) => {
        return (
          <Button variant="primary" key={index} onClick={() => setCity(city)}>
            {city}
          </Button>
        );
      })}
    </div>
  );
};

export default WeatherButton;
