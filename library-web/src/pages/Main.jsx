import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Container, Row, Col } from "react-bootstrap";
import useBookStore from "../stores/BookStores";
import BookCard from "../components/BookCard";
import useGetBooks from "../hooks/useGetBooks";

const Main = () => {
  const { data: books, isLoading, isError, error } = useGetBooks();
  console.log("books", books);
  return (
    <div>
      <div className="header">
        <div className="header-title">
          <h1>코딩알려주는 누나 도서관</h1>
          <h2>oo님 환영합니다!</h2>
        </div>
        <InputGroup className="mb-3 search-bar">
          <Form.Control
            placeholder="책 제목이나 저자를 검색하세요"
            aria-label="책 제목이나 저자를 검색하세요"
            aria-describedby="basic-addon2"
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            style={{
              backgroundColor: "rgb(230, 200, 140)",
              color: "black",
              height: "50px",
              border: "none",
            }}
          >
            검색
          </Button>
        </InputGroup>
      </div>
      <div className="main-content">
        <h1>인기 도서</h1>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Container>
            <Row className="row-cols-2 row-cols-md-3 row-cols-lg-6 g-3">
              {books?.map((book, index) => (
                <Col sm={2} key={index}>
                  <BookCard book={book} />
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </div>
    </div>
  );
};

export default Main;
