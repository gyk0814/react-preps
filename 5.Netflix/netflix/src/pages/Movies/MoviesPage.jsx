import React, { use, useEffect, useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router";
import { Container, Row, Col, Alert } from "react-bootstrap";
import MoviePosterCard from "../../components/MoviePosterCard/MoviePosterCard";
import ReactPaginate from "react-paginate";
import "./MoviesPage.style.css";
import Filters from "../../components/Filters/Filters";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const [sortedData, setSortedData] = useState(null);
  const [genre, setGenre] = useState("");
  const [originalData, setOriginalData] = useState(null);

  const query = searchParams.get("q");
  const { data, isLoading, error, iserror } = useSearchMovieQuery(query, page);

  const sortBy = () => {
    if (sort !== "") {
      let sorted = [];
      if (sort === "popularity.desc") {
        sorted = data?.results.sort((a, b) => b.popularity - a.popularity);
        // setSortedData({ ...data, results: sorted });
      } else if (sort === "popularity.asc") {
        sorted = data?.results.sort((a, b) => a.popularity - b.popularity);
        // setSortedData({ ...data, results: sorted });
      } else if (sort === "release_date.desc") {
        sorted = data?.results.sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );
        // setSortedData({ ...data, results: sorted });
      } else if (sort === "release_date.asc") {
        sorted = data?.results.sort(
          (a, b) => new Date(a.release_date) - new Date(b.release_date)
        );
      } else if (sort === "Order By") {
        sorted = data?.results;
      }
      setSortedData({ ...data, results: sorted });
    }
  };

  const getByGenres = () => {
    if (genre !== "") {
      const filtered = data?.results.filter((item) => {
        return item.genre_ids.includes(genre);
      });
      setSortedData({ ...data, results: filtered });
    }
  };
  useEffect(() => {
    setSortedData(data);
    setSort("");
    setGenre("");
    setOriginalData(data);
  }, [query]);

  useEffect(() => {
    sortBy();
    console.log(sortedData);
  }, [sort]);
  useEffect(() => {
    getByGenres();
  }, [genre]);
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

  const handlePageClick = (page) => {
    console.log(page);
    setPage(page.selected + 1);
  };

  return (
    <Container>
      <Row className="gap-3">
        <Filters setSort={setSort} sort={sort} setGenre={setGenre} />
        {sortedData === undefined ||
        sortedData?.results.length === 0 ||
        sortedData === null ? (
          <Alert variant="danger">Movie Not Found</Alert>
        ) : (
          <Col xs={12} className="movie-col">
            <Row className="px-2 ">
              {sortedData?.results.map((movie, index) => (
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
              pageCount={Math.min(sortedData?.total_pages, 500)}
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
        )}
      </Row>
    </Container>
  );
};

export default MoviesPage;
