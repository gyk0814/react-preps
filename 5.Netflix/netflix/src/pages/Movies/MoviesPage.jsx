import React, { useEffect, useState } from "react";
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
  const [sort, setSort] = useState("popularity.desc");
  const [genre, setGenre] = useState("");
  const [sortedData, setSortedData] = useState(null);

  const query = searchParams.get("q");
  const { data, isLoading, error, iserror } = useSearchMovieQuery(
    query,
    page,
    sort,
    genre
  );

  const sortBy = () => {
    console.log("query", query, "data", data, "page", page, "genre", genre);

    if (data === undefined || data?.results.length === 0) {
      setSortedData({ ...data, results: [] });
      return;
    }
    console.log("data", data);
    let sorted = [...data.results];
    if (sort === "popularity.desc") {
      sorted?.sort((a, b) => b.popularity - a.popularity);
    } else if (sort === "popularity.asc") {
      sorted?.sort((a, b) => a.popularity - b.popularity);
    } else if (sort === "release_date.desc") {
      sorted?.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date)
      );
    } else if (sort === "release_date.asc") {
      sorted?.sort(
        (a, b) => new Date(a.release_date) - new Date(b.release_date)
      );
    }
    setSortedData({ ...data, results: sorted });
  };

  const getByGenres = () => {
    if (query !== "") {
      const filtered = data?.results.filter((item) => {
        return item.genre_ids.includes(genre);
      });
      setSortedData({ ...data, results: filtered });
    }
  };

  useEffect(() => {
    setSort("popularity.desc");
    setGenre("");
    sortBy();
    setPage(1);
  }, [query]);

  useEffect(() => {
    setPage(1);
  }, [sort, genre]);

  useEffect(() => {
    sortBy();
    if (genre !== "") {
      getByGenres();
    }
  }, [genre, sort, data]);

  if (isLoading) {
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
        <Filters
          setSort={setSort}
          sort={sort}
          setGenre={setGenre}
          genre={genre}
        />
        {sortedData === undefined || sortedData === null ? (
          <h1>Loading...!</h1>
        ) : (
          <></>
        )}

        <Col xs={12} className="movie-col">
          {sortedData?.results?.length === 0 ? (
            <Alert variant="danger">Movie Not Found</Alert>
          ) : (
            <Row className="px-2 ">
              {sortedData?.results?.map((movie, index) => (
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
          )}
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
            forcePage={page - 1}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MoviesPage;
