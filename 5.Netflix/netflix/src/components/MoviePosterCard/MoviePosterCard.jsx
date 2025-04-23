import React from "react";
import "./MoviePosterCard.style.css";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Badge from "react-bootstrap/Badge";
import { useMovieGenreQuery } from "../../hooks/useMovieGenreQuery";
import { useTVGenreQuery } from "../../hooks/useTVGenreQuery";

const MoviePosterCard = ({ movie }) => {
  const [like, setLike] = useState(false);

  const handleTitle = (title) => {
    if (title.length > 7) {
      return <div className="info-title-small">{title}</div>;
    } else {
      return <div style={{ fontSize: "25px", color: "white" }}>{title}</div>;
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

  return (
    <div
      className="poster-card"
      style={
        movie.poster_path
          ? {
              backgroundImage: `url(https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path})`,
            }
          : {
              backgroundImage:
                "url(https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png",
            }
      }
    >
      <div className="p-3 overlay info info-movies ">
        <div style={{ height: "40%" }}>
          {handleTitle(movie.title || movie.name)}
        </div>
        <div className="d-flex flex-row gap-3 justify-content-between ">
          <Button variant="light" className="w-50 play-button">
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
    </div>
  );
};

export default MoviePosterCard;
