import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img className="product-img" src={product.img} alt="product" />
      <p>{product.choice ? "conscious choice" : ""}</p>
      <h6>{product.title}</h6>
      <h6 style={{ margin: 0 }}>₩{product.price}</h6>
      <p>{product.new ? "new" : ""}</p>
    </div>
  );
};

export default ProductCard;
