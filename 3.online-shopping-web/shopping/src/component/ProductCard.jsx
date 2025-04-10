import React from "react";
import { useNavigate } from "react-router";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const productDetail = () => {
    navigate(`/product/${product?.id}`);
  };
  return (
    <div className="product-card" onClick={productDetail}>
      <img className="product-img" src={product?.img} alt="product" />
      <div className="choice">{product?.choice ? "Conscious choice" : ""}</div>
      <div>{product?.title}</div>
      <div style={{ margin: 0 }}>₩{product?.price}</div>
      <div className="choice">{product?.new ? "New" : ""}</div>
    </div>
  );
};

export default ProductCard;
