import React from "react";
import { useTrendingMoviesQuery } from "../../hooks/useTrendingMovies";
import { Alert } from "bootstrap";
import "./Banner.style.css";

const Banner = () => {
  const { data, isLoading, error, isError } = useTrendingMoviesQuery();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">Error: {error.message}</Alert>;
  }
  if (data) console.log("data", data);
  return (
    <div
      style={{
        backgroundImage: `url(https://www.themoviedb.org/t/p/w1066_and_h600_bestv2${data[0].poster_path})`,
      }}
      className="banner"
    >
      <div className="d-flex flex-column banner-text">
        <h1>{data[0].title}</h1>
        <p>{data[0].overview}</p>
      </div>
    </div>
  );
};

export default Banner;
