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

const Filters = ({ setSort, setGenre }) => {
  const { data: movieGenres } = useMovieGenreQuery();
  const sortList = [
    { name: "인기 많은 순", value: "popularity.desc" },
    { name: "인기 적은 순", value: "popularity.asc" },
    { name: "최신순", value: "release_date.desc" },
    { name: "오래된순", value: "release_date.asc" },
  ];
  const [sortTitle, setSortTitle] = useState("Order By");
  const [genreTitle, setGenreTitle] = useState("Genres");

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
            title={sortTitle}
            onSelect={(idx) => {
              if (idx === "-1") {
                setSort("");
                setSortTitle("Order By");
                return;
              }
              setSort(sortList[idx].value);
              setSortTitle(sortList[idx].name);
            }}
          >
            {sortList.map((item, idx) => (
              <Dropdown.Item key={idx} eventKey={idx}>
                {item.name}
              </Dropdown.Item>
            ))}
            {/* <DropdownDivider />
            <Dropdown.Item key={"-1"} eventKey={"-1"}>
              선택 해제
            </Dropdown.Item> */}
          </DropdownButton>
        </Col>
        <Col xs={6} lg={1}>
          <DropdownButton
            as={ButtonGroup}
            id="dropdown-genre"
            size="sm"
            variant="secondary"
            title={genreTitle}
          >
            {movieGenres?.map((genre, idx) => (
              <Dropdown.Item
                key={idx}
                onClick={() => {
                  setGenre(genre.id);
                  setGenreTitle(genre.name);
                }}
              >
                {genre.name}
              </Dropdown.Item>
            ))}
            {/* <DropdownDivider />
            <Dropdown.Item
              key={"-1"}
              onClick={() => {
                setGenre("");
                setGenreTitle("Genres");
              }}
            >
              선택 해제
            </Dropdown.Item> */}
          </DropdownButton>
        </Col>
      </Row>
    </Col>
  );
};

export default Filters;
