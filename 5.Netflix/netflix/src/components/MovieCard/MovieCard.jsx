import React from "react";
import "./MovieCard.style.css";
import Button from "react-bootstrap/Button";
import { useState, useEffect, useRef } from "react";
import Badge from "react-bootstrap/Badge";
import { useMovieGenreQuery } from "../../hooks/useMovieGenreQuery";
import { useTVGenreQuery } from "../../hooks/useTVGenreQuery";
import { useMovieTrailerQuery } from "../../hooks/useMovieTrailerQuery";
import YouTube from "react-youtube";
import { useNavigate } from "react-router";
import { opts } from "../../constants/videoOpts";

const MovieCard = ({ movie }) => {
  const [like, setLike] = useState(false);
  const navigate = useNavigate();

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

  const [showVolumeBtn, setShowVolumeBtn] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef(null);

  const mouseOverAction = () => {
    timeoutRef.current = setTimeout(() => {
      console.log("mouse over");
      setPlayVideo(true);
    }, 500);
  };
  const mouseLeaveAction = () => {
    clearTimeout(timeoutRef.current);
    setPlayVideo(false);
  };

  const handleVolumeToggle = (e) => {
    e.stopPropagation();

    setShowVolumeBtn(true);
    setIsMuted(false);
    setTimeout(() => {
      setShowVolumeBtn(false);
    }, 1500);
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <div
      className="movie-card"
      onMouseEnter={mouseOverAction}
      onMouseLeave={mouseLeaveAction}
      onClick={() => {
        navigate(`/movies/${movie.id}`);
      }}
    >
      <div className="movie-player-div" style={{ backgroundImage: movieImg }}>
        {playVideo && (
          <YouTube
            className="trailer"
            videoId={movieTrailerKey}
            opts={{
              ...opts,
              playerVars: {
                autoplay: 1,
                mute: isMuted ? 1 : 0,
                controls: 0,
                modestbranding: 1,
              },
            }}
          />
        )}
        {playVideo && showVolumeBtn && (
          <Button
            variant="light"
            className="volume-toggle"
            onClick={handleVolumeToggle}
            style={{
              position: "absolute",
              top: "60px",
              right: "10px",
              zIndex: 2,
              borderColor: "rgb(225,225,225)",
              borderRadius: "40px",
              padding: "1px 7px",

              backgroundColor: "rgba(94, 93, 93, 0.5)",
            }}
          >
            <i
              className={`bi ${
                isMuted ? "bi-volume-mute-fill" : "bi-volume-up-fill"
              }`}
              style={{ fontSize: "22px", color: "rgb(225,225,225)" }}
            />
          </Button>
        )}
        {handleTitle(movie.title || movie.name)}
      </div>
      <div className="p-3 info">
        <div className="d-flex flex-row gap-3 justify-content-between">
          <Button variant="light" className="w-50">
            <i className="bi bi-play-fill" />
            Play
          </Button>
          <div style={{ fontSize: "25px" }}>
            <i
              className={like ? "bi bi-heart-fill" : "bi bi-heart"}
              onClick={(e) => {
                e.stopPropagation();
                setLike(!like);
              }}
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
    </div>
  );
};

export default MovieCard;
