import React from "react";
import Collapse from "./Collapse";

const Reviews = ({ reviews }) => {
  return (
    <div className="reviews detail-info">
      {reviews?.results.length === 0 ? (
        <div className="detail-info-collapse">작성된 리뷰가 없습니다.</div>
      ) : (
        <></>
      )}
      {reviews?.results.map((review, index) => {
        return (
          <div key={index} className="detail-info-collapse">
            <Collapse review={review} />
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
