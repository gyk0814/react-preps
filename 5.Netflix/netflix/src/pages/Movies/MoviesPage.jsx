import React, { useEffect, useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router";
import { Container, Row, Col, Alert } from "react-bootstrap";
import MoviePosterCard from "../../components/MoviePosterCard/MoviePosterCard";
import ReactPaginate from "react-paginate";
import "./MoviesPage.style.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const query = searchParams.get("q");
  const { data, isLoading, error, iserror } = useSearchMovieQuery(query, page);

  useEffect(() => {
    setPage(1);
  }, [query]);

  if (isLoading) {
    console.log(query, page);
    return <h1>Loading...!</h1>;
  }
  if (iserror) {
    return <Alert variant="danger">Error: {error.message}</Alert>;
  }
  if (data == undefined || data?.results.length === 0 || data == null) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          fontSize: "1rem",
          fontWeight: "bold",
          color: "white",
          marginTop: "5rem",
        }}
      >
        <Alert variant="danger">Movie Not Found</Alert>
      </div>
    );
  }
  const handlePageClick = (page) => {
    console.log(page);
    setPage(page.selected + 1);
  };

  console.log(data);
  return (
    <div>
      <Container>
        <Row className="gap-3">
          <Col xs={12}>
            <Row style={{ justifyContent: "flex-end", marginTop: "2rem" }}>
              <Col xs={6} lg={1}>
                filter
              </Col>
              <Col xs={6} lg={1}>
                sorting
              </Col>
            </Row>
          </Col>
          <Col xs={12} className="movie-col">
            <Row className="px-2 ">
              {data?.results.map((movie, index) => (
                <Col
                  xs={6}
                  md={4}
                  lg={3}
                  xxl="auto"
                  key={index}
                  className="card-container"
                >
                  <MoviePosterCard movie={movie} />
                </Col>
              ))}
            </Row>
            <ReactPaginate
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              pageCount={Math.min(data?.total_pages, 500)}
              previousLabel="<"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              onPageActive="active"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
              initialPage={page - 1}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MoviesPage;
