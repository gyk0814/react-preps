import React from "react";
import Banner from "../../components/Banner/Banner";
import MovieCarousel from "../../components/MovieCarousel/MovieCarousel";
import { useTrendingMoviesQuery } from "../../hooks/useTrendingMovies";
import { useTrendingTVSeriesQuery } from "../../hooks/useTrendingTVSeries";
import { useTopRatedMoviesQuery } from "../../hooks/useTopRatedMovies";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <MovieCarousel
        listTitle={"Latest Polular Movies in Korea"}
        useQuery={useTrendingMoviesQuery}
        autoPlay={true}
      />
      <MovieCarousel
        listTitle={"Polular TV Series"}
        useQuery={useTrendingTVSeriesQuery}
        autoPlay={false}
      />
      <MovieCarousel
        listTitle={"Top Rated Movies in Korea"}
        useQuery={useTopRatedMoviesQuery}
        autoPlay={false}
      />
      <div className="py-5"></div>
    </div>
  );
};

export default HomePage;
