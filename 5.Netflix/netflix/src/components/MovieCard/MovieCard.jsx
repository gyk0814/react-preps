import React from "react";
import "./MovieCard.style.css";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Badge from "react-bootstrap/Badge";

const MovieCard = ({ movie }) => {
  const [like, setLike] = useState(false);

  const handleTitle = (title) => {
    if (title.length > 10) {
      return <div className="title title-small">{title}</div>;
    } else {
      return <div className="title">{title}</div>;
    }
  };
  return (
    <div
      className="movie-card"
      style={{
        backgroundImage: `url(https://www.themoviedb.org/t/p/w1066_and_h600_bestv2${movie.backdrop_path})`,
      }}
    >
      <div className="overlay">
        <div className="trailer">{handleTitle(movie.title || movie.name)}</div>
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
            {movie.genre_ids.map((genre, index) => (
              <Badge key={index} bg="danger" style={{ margin: "1px" }}>
                {genre}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
