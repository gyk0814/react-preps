import React, { useState } from "react";
import "./Filters.style.css";
import {
  Col,
  Row,
  DropdownButton,
  ButtonGroup,
  Dropdown,
  DropdownDivider,
} from "react-bootstrap";
import { useMovieGenreQuery } from "../../hooks/useMovieGenreQuery";

const Filters = ({ setSort, setGenre, sort, genre }) => {
  const { data: movieGenres } = useMovieGenreQuery();
  const sortList = [
    { name: "인기 많은 순", value: "popularity.desc" },
    { name: "인기 적은 순", value: "popularity.asc" },
    { name: "최신순", value: "release_date.desc" },
    { name: "오래된순", value: "release_date.asc" },
  ];
  const getSortTitle = () => {
    const sortItem = sortList.find((item) => item.value === sort);
    return sortItem ? sortItem.name : "Order By";
  };
  const getGenreTitle = () => {
    const genreItem = movieGenres?.find((item) => item.id === genre);
    return genreItem ? genreItem.name : "Genres";
  };

  return (
    <Col xs={12}>
      <Row
        style={{
          justifyContent: "space-between",
          marginTop: "2rem",
          width: "20%",
          paddingRight: "2rem",
          //   overflow: "visible",
          gap: "1rem",
          justifySelf: "flex-end",
        }}
      >
        <Col xs={6} lg={1}>
          <DropdownButton
            as={ButtonGroup}
            id="dropdown-sort"
            size="sm"
            variant="secondary"
            title={getSortTitle()}
            onSelect={(idx) => {
              setSort(sortList[idx].value);
            }}
          >
            {sortList.map((item, idx) => (
              <Dropdown.Item key={idx} eventKey={idx}>
                {item.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
        <Col xs={6} lg={1}>
          <DropdownButton
            as={ButtonGroup}
            id="dropdown-genre"
            size="sm"
            variant="secondary"
            title={getGenreTitle()}
          >
            <Dropdown.Item
              key={"-1"}
              onClick={() => {
                setGenre("");
              }}
            >
              선택 해제
            </Dropdown.Item>
            <DropdownDivider className="p-0 m-0" />
            {movieGenres?.map((genre, idx) => (
              <Dropdown.Item
                key={idx}
                onClick={() => {
                  setGenre(genre.id);
                }}
              >
                {genre.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
      </Row>
    </Col>
  );
};

export default Filters;
