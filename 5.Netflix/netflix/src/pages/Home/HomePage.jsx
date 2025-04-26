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
        listTitle={"Latest Polular Movies"}
        useQuery={useTrendingMoviesQuery}
      />
      <MovieCarousel
        listTitle={"Polular TV Series"}
        useQuery={useTrendingTVSeriesQuery}
      />
      <MovieCarousel
        listTitle={"Top Rated Movies"}
        useQuery={useTopRatedMoviesQuery}
      />
      <div className="py-5"></div>
    </div>
  );
};

export default HomePage;
