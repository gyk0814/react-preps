import React, { useState, useEffect } from "react";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import { useParams } from "react-router";
import { useMovieReviewsQuery } from "../../hooks/useMovieReviews";
import { IMAGE_URL } from "../../constants/imageUrl";
import { Container, Row, Col } from "react-bootstrap";
import "./MovieDetailPage.style.css";
import { Button, Badge } from "react-bootstrap";
import Reviews from "./components/Reviews";
import Recommendations from "./components/Recommendations";

const MovieDetailPage = () => {
  const { id } = useParams();

  console.log("id", id);
  const { data: detail, isLoading: detailLoading } = useMovieDetailQuery(id);
  const { data: reviews, isLoading: reviewsLoading } = useMovieReviewsQuery(id);
  const [playVideo, setPlayVideo] = useState(false);

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Container className="movie-detail d-flex justify-content-center flex-column">
      <div className="detail-screen" style={{ position: "relative" }}>
        <div style={{ backgroundColor: "black" }}>
          <h2 className="mb-0 ps-4" style={{ color: "white" }}>
            {detail?.original_title}
          </h2>
        </div>
        <img
          className="detail-screen-img"
          src={`${IMAGE_URL.BACKDROP}${detail?.backdrop_path}`}
          alt={detail?.original_title}
        />
        <Button
          variant="light"
          className="play-button p-0 d-flex align-items-center justify-content-center gap-1"
          onClick={() => setPlayVideo(true)}
        >
          <i className="bi bi-play-fill" style={{ fontSize: "3rem" }} /> Play
        </Button>
      </div>
      <div className="detail-content p-2">
        <div className="detail-info-div " style={{ padding: "16px 60px" }}>
          <div className="detail-info-upper">
            <img
              className="detail-poster mt-4"
              src={`${IMAGE_URL.POSTER}${detail?.poster_path}`}
              alt={detail?.original_title}
            />
            <div className="detail-info">
              <h1>{detail?.title}</h1>
              <div className="detail-info-list">
                {detail?.release_date} ★ {detail?.vote_average.toFixed(1)}
                {` (${detail?.vote_count}) `}
                {formatRuntime(detail?.runtime)} $
                {detail?.budget.toLocaleString()}{" "}
                {detail?.spoken_languages[0]?.english_name.toUpperCase()}{" "}
              </div>
              <div>
                {detail?.genres.map((genre, index) => {
                  return (
                    <Badge
                      key={index}
                      bg="danger"
                      className="py-0"
                      style={{
                        margin: "5px",
                        borderRadius: "0px",
                      }}
                    >
                      {genre.name}
                    </Badge>
                  );
                })}
              </div>
              <hr />
              <p>
                {detail?.overview ? detail.overview : "요약을 준비 중 입니다."}{" "}
              </p>
            </div>
          </div>
          <div className="detail-info mt-3 w-100">출연진:</div>
          <div
            className="detail-reviews-div"
            style={{ fontSize: "20px", marginTop: "10px" }}
          >
            Reviews{` (${reviews?.total_results})`}
            <Reviews reviews={reviews} />
          </div>
          <div className="detail-recommendations">
            <div style={{ margin: "20px 0px", fontSize: "20px" }}>
              {" "}
              More Like This
            </div>
            <Recommendations movieList={detail?.recommendations} />
          </div>
        </div>

        <div className="recommendations"></div>
      </div>
    </Container>
  );
};

export default MovieDetailPage;
