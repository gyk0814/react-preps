import React, { use, useEffect, useRef, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Container, Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router";

const ProductAll = ({ imgUrlFormatter }) => {
  const [productList, setProductList] = useState([]);
  const [query, setQuery] = useSearchParams();
  const scrollRef = useRef(null);

  const fetchProducts = async () => {
    const search = query.get("q");
    console.log(search, "search");
    // const response = await fetch("http://localhost:4000/products?q=" + search);
    let url;
    if (search === undefined || search === null)
      url = "https://my-json-server.typicode.com/gyk0814/react-preps/products";
    else
      url =
        "https://my-json-server.typicode.com/gyk0814/react-preps/products?q=" +
        search;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setProductList(data);
  };

  useEffect(() => {
    fetchProducts();
    console.log("change query");
  }, [query]);

  useEffect(() => {
    const q = query.get("q");
    if (productList.length > 0 && q !== null) {
      scrollRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [productList]);

  return (
    <div>
      <video width="100%" autoPlay muted playsInline loop>
        <source
          src="https://www.jomalone.co.kr/media/export/cms/campaigns/FY25_JustBecause/25C08_Just-Because-Gifting.mp4"
          type="video/mp4"
        />
        브라우저가 video 태그를 지원하지 않습니다.
      </video>
      <div className="product-all">
        <div className="title">완벽한 선물</div>
        <Container className="product-all-container">
          <Row ref={scrollRef}>
            {productList.map((product, index) => (
              <Col sm={3} key={index} className="postcard-hover-scale">
                <ProductCard
                  product={product}
                  imgUrlFormatter={imgUrlFormatter}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ProductAll;
