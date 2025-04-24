import React from "react";
import "./MovieCard.style.css";
import Button from "react-bootstrap/Button";
import { useState, useEffect, useRef } from "react";
import Badge from "react-bootstrap/Badge";
import { useMovieGenreQuery } from "../../hooks/useMovieGenreQuery";
import { useTVGenreQuery } from "../../hooks/useTVGenreQuery";
import { useMovieTrailerQuery } from "../../hooks/useMovieTrailerQuery";
import YouTube from "react-youtube";

const MovieCard = ({ movie }) => {
  const [like, setLike] = useState(false);

  const handleTitle = (title) => {
    if (title.length > 10) {
      return <div className="title title-small">{title}</div>;
    } else {
      return <div className="title">{title}</div>;
    }
  };
  const { data: movieGenres } = useMovieGenreQuery();
  const { data: TVGenres } = useTVGenreQuery();

  const showGenres = (genreIdList, isMovieData) => {
    if (!genreIdList || !movieGenres || !TVGenres) return [];
    return genreIdList.map((genreId) => {
      const genre =
        isMovieData === undefined
          ? TVGenres.find((genre) => genre.id === genreId)
          : movieGenres.find((genre) => genre.id === genreId);
      return genre ? genre.name : null;
    });
  };
  const [playVideo, setPlayVideo] = useState(false);
  const { data: movieTrailerKey, isLoading } = useMovieTrailerQuery(
    movie.id,
    movie.title ? "movie" : "tv"
  );
  const timeoutRef = useRef(null);
  const movieImg = movie.backdrop_path
    ? `url(https://www.themoviedb.org/t/p/w1066_and_h600_bestv2${movie.backdrop_path})`
    : "url(https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png";

  const mouseOverAction = () => {
    timeoutRef.current = setTimeout(() => {
      console.log("mouse over");
      setPlayVideo(true);
      console.log(playVideo);
    }, 1000);
  };
  const mouseLeaveAction = () => {
    clearTimeout(timeoutRef.current);
    setPlayVideo(false);
  };

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 0,
      muted: 1,
    },
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <div
      className="movie-card"
      onMouseEnter={mouseOverAction}
      onMouseLeave={mouseLeaveAction}
    >
      <div className="movie-player-div" style={{ backgroundImage: movieImg }}>
        {playVideo && (
          //   <iframe
          //     className="trailer"
          //     src={`https://www.youtube.com/embed/${movieTrailerKey}?autoplay=1&mute=0&controls=0&loop=1&modestbranding=1&playlist=${movieTrailerKey}`}
          //     title="YouTube trailer"
          //     allow="autoplay; encrypted-media;"
          //   >
          //     브라우저가 영상을 지원하지 않습니다.
          //   </iframe>
          <YouTube className="trailer" videoId={movieTrailerKey} opts={opts} />
        )}
        {handleTitle(movie.title || movie.name)}
      </div>
      {/* <div className="overlay"> */}
      <div className="p-3 info">
        <div className="d-flex flex-row gap-3 justify-content-between">
          <Button variant="light" className="w-50">
            <i className="bi bi-play-fill" />
            Play
          </Button>
          <div style={{ fontSize: "25px" }}>
            <i
              className={like ? "bi bi-heart-fill" : "bi bi-heart"}
              onClick={() => setLike(!like)}
            />
          </div>
        </div>
        <div className="my-4 d-flex gap-1 flex-wrap badges-div">
          {showGenres(movie.genre_ids, movie?.title).map((genre, index) => (
            <Badge
              key={index}
              bg="danger"
              className="py-0"
              style={{
                margin: "1px",
                borderRadius: "0px",
              }}
            >
              {genre}
            </Badge>
          ))}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default MovieCard;
