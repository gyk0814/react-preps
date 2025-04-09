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
    <div className="product-all">
      <Container>
        <Row>
          {productList.map((product) => (
            <Col sm={3} className="product-card">
              <ProductCard key={product.id} product={product} />
            </Col>
          ))}
        </Row>
      </Container>
      {/* {productList.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))} */}
      {/* <br></br> */}
    </div>
  );
};

export default ProductAll;
