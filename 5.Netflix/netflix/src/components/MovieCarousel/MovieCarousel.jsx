import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import { useTrendingMoviesQuery } from "../../hooks/useTrendingMovies";
import "./MovieCarousel.style.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    // slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    // slidesToSlide: 1, // optional, default to 1.
  },
};

const MovieCarousel = ({ listTitle, useQuery, autoPlay }) => {
  const { data, isLoading, error, isError } = useQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  console.log("data", data);
  return (
    <div className="outer-div" style={{ overflow: "hidden" }}>
      <h3 style={{ marginTop: "2rem", paddingLeft: "3rem" }}>{listTitle}</h3>
      <Carousel
        swipeable={true}
        draggable={true}
        responsive={responsive}
        infinite={false}
        customTransition="transform 300ms ease-in-out"
        transitionDuration={500}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        autoPlay={autoPlay}
        autoPlaySpeed={1000}
        rewind={true}
        rewindWithAnimation={true}
        itemClass="carousel-item-padding-10-px"
        sliderClass="slider"
      >
        {data?.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </Carousel>
    </div>
  );
};

export default MovieCarousel;
