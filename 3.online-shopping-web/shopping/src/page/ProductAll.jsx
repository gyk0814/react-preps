import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Container, Row, Col } from "react-bootstrap";

const ProductAll = () => {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://my-json-server.typicode.com/gyk0814/react-preps/products"
      );
      const data = await response.json();
      console.log(data);
      setProductList(data);
    };

    fetchProducts();
  }, []);
  return (
    <div>
      <video width="100%" autoPlay muted>
        <source
          src="https://www.jomalone.co.kr/media/export/cms/campaigns/FY25_JustBecause/25C08_Just-Because-Gifting.mp4"
          type="video/mp4"
        />
        브라우저가 video 태그를 지원하지 않습니다.
      </video>
      <div className="product-all">
        <div className="title">완벽한 선물</div>
        <Container>
          <Row>
            {productList.map((product, index) => (
              <Col
                sm={3}
                key={index}
                className="product-card postcard-hover-scale"
              >
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ProductAll;
