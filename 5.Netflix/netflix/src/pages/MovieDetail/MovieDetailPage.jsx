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
import YouTube from "react-youtube";
import { opts } from "../../constants/videoOpts";

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
  useEffect(() => {
    setPlayVideo(false);
  }, []);

  return (
    <Container className="movie-detail d-flex justify-content-center flex-column mt-3">
      <div
        className={`detail-screen ${playVideo ? "no-gradient" : ""}`}
        style={{ position: "relative" }}
      >
        <div
          className="d-flex flex-row justify-content-between"
          style={{ backgroundColor: "black" }}
        >
          <h2 className="mb-0 ps-4" style={{ color: "white" }}>
            {detail?.original_title}
          </h2>
          <i
            className="bi bi-x-lg pe-3 pt-1"
            style={{ fontSize: "25px" }}
            onClick={() => setPlayVideo(false)}
          />
        </div>
        <hr className="p-0 m-0" />
        {playVideo ? (
          <YouTube
            className="w-100"
            videoId={detail?.videos.results[0]?.key}
            opts={opts}
            style={{ height: "687px" }}
          />
        ) : (
          <>
            <img
              className="detail-screen-img"
              src={`${IMAGE_URL.BACKDROP}${detail?.backdrop_path}`}
              alt={detail?.original_title}
            />
            <Button
              variant="light"
              className="detail-play-button p-0 d-flex align-items-center justify-content-center gap-1"
              onClick={() => setPlayVideo(true)}
            >
              <i className="bi bi-play-fill" style={{ fontSize: "3rem" }} />{" "}
              Play
            </Button>
          </>
        )}
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
          <div className="detail-info mt-3 w-100 d-flex flex-row gap-5">
            <span>총 예산: ${detail?.budget.toLocaleString()}</span>{" "}
            <span>
              언어: {detail?.spoken_languages[0]?.english_name.toUpperCase()}{" "}
            </span>
            <span>러닝타임: {formatRuntime(detail?.runtime)} </span>
          </div>
          <div
            className="detail-reviews-div"
            style={{ fontSize: "15px", marginTop: "20px" }}
          >
            <div style={{ fontSize: "22px" }}>
              Reviews{` (${reviews?.total_results})`}
            </div>
            <Reviews reviews={reviews} />
          </div>
          <div className="detail-recommendations">
            <div style={{ margin: "20px 0px", fontSize: "28px" }}>
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
