import React from "react";
import Banner from "../../components/Banner/Banner";
import MovieCarousel from "../../components/MovieCarousel/MovieCarousel";
import { useTrendingMoviesQuery } from "../../hooks/useTrendingMovies";
import { useTrendingTVSeriesQuery } from "../../hooks/useTrendingTVSeries";
import { useTopRatedMoviesQuery } from "../../hooks/useTopRatedMovies";
import { useUpcomingMovieQuery } from "../../hooks/useUpcomingMovie";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <MovieCarousel
        listTitle={"Latest Trending Movies"}
        useQuery={useTrendingMoviesQuery}
      />
      <MovieCarousel
        listTitle={"Upcoming Movies"}
        useQuery={useUpcomingMovieQuery}
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
