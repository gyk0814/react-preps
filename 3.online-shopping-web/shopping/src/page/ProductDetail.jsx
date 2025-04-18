import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClipLoader } from "react-spinners";

const ProductDetail = () => {
  let { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);

  const range = (n) => Array.from({ length: n }, (_, i) => i);
  const imgUrlFormatter = (code, num) => {
    return `https://www.jomalone.co.kr/media/export/cms/products/1000x1000/jo_sku_${code}_1000x1000_${num}.png`;
  };

  const getProductDetail = async () => {
    // const response = await fetch(`http://localhost:4000/products/${id}`);
    setLoading(true);
    const response = await fetch(
      `https://my-json-server.typicode.com/gyk0814/react-preps/products/${id}`
    );
    const data = await response.json();
    setProduct(data);
    setSelectedImg(imgUrlFormatter(data?.code, 0));
    setSelectedOption(data?.options[0]);
    setLoading(false);
  };
  useEffect(() => {
    getProductDetail();
  }, []);
  return (
    <div className={`detail-main`}>
      {!loading ? (
        <>
          {" "}
          <div style={{ width: "100%", margin: "50px" }}>
            <img
              className="detail-bg-img"
              draggable="false"
              src={product?.bg_img}
            />
          </div>
          <div className="detail-container">
            <div className="img-options">
              {range(product?.img_num).map((i) => {
                const url = imgUrlFormatter(product?.code, i);
                console.log("url", url);
                return (
                  <div
                    key={i}
                    className={`small-img ${
                      selectedImg === url ? "selected" : ""
                    }`}
                    onClick={() => setSelectedImg(url)}
                  >
                    <img
                      style={{ width: "100%" }}
                      draggable="false"
                      src={url}
                    />
                  </div>
                );
              })}
            </div>
            <div className="detail-img-box">
              <img className="detail-img" draggable="false" src={selectedImg} />
            </div>
            <div className="detail-text">
              <div className="detail-title">
                <h2>{product?.title_eng}</h2>
                <FontAwesomeIcon
                  style={{ fontSize: "20px", margin: "10px 0px 10px 30px" }}
                  icon={faHeart}
                />
              </div>
              <h5>{product?.title_kor}</h5>

              <div className="cute-font" style={{ margin: "20px 0px" }}>
                ₩{selectedOption?.price}
              </div>
              <div className="detail-option">
                {product?.options.map((item) => (
                  <button
                    className={`option-btn cute-font ${
                      selectedOption === item ? "selected" : ""
                    }`}
                    onClick={() => setSelectedOption(item)}
                  >
                    {item?.size}
                  </button>
                ))}
              </div>
              <button
                className="option-btn selected cute-font"
                style={{ padding: "15px 0", fontSize: "14px" }}
              >
                장바구니에 담기
              </button>
              <div className="detail-info">
                <h5>Details</h5>
                <div className="cute-font" style={{ fontSize: "14px" }}>
                  {product?.info}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="loading">
          <ClipLoader color="#1c1c1c" loading={loading} size={50} />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
