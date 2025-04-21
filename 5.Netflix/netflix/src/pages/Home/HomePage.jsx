import React from "react";
import Banner from "../../components/Banner/Banner";
import MovieCarousel from "../../components/MovieCarousel/MovieCarousel";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <MovieCarousel deviceType={false} />
    </div>
  );
};

export default HomePage;
