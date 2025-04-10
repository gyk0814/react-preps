import React from "react";
import { useNavigate } from "react-router";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const productDetail = () => {
    navigate(`/product/${product?.id}`);
  };
  const imgUrlFormatter = (code, num) => {
    return `https://www.jomalone.co.kr/media/export/cms/products/1000x1000/jo_sku_${code}_1000x1000_${num}.png`;
  };

  return (
    <div className="product-card" onClick={productDetail}>
      <img
        className="product-img"
        src={imgUrlFormatter(product?.code, 0)}
        alt="product"
      />
      <div className="choice">
        {product?.choice ? "베스트 셀러" : ""}
        {product?.choice && product?.new ? "      " : ""}
        {product?.new ? "New" : ""}
      </div>
      <div>{product?.title_eng}</div>
      <div>{product?.title_kor}</div>
      <div style={{ marginTop: "13px" }}>
        ₩{product?.options[0]?.price}
        {"     "}
        {product?.options[0]?.size}
      </div>
    </div>
  );
};

export default ProductCard;
