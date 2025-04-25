import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MoviePosterCard from "../../../components/MoviePosterCard/MoviePosterCard";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const Recommendations = ({ movieList }) => {
  const hasResults = movieList?.results?.length > 0;
  return (
    <div className="detail-info w-100 p-0">
      {!hasResults ? (
        <div className="detail-info">추천 영화를 준비중 입니다.</div>
      ) : (
        <Carousel
          swipeable={true}
          draggable={true}
          responsive={responsive}
          infinite={true}
          arrows={true}
          customTransition="all .5"
          transitionDuration={1000}
          containerClass="detail-carousel-container"
          itemClass="detail-carousel-item"
        >
          {movieList?.results.map((movie, index) => (
            <MoviePosterCard movie={movie} />
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Recommendations;
