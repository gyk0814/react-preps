import React from "react";
import { useState, useEffect, useRef } from "react";

const Collapse = ({ review }) => {
  const textRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const maxHeight = 60;
  const rating = review?.author_details.rating;
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  const formattedDate = new Date(review?.created_at).toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
  });

  return (
    <div>
      <h5 style={{ fontWeight: "600", marginBottom: "5px" }}>
        {review?.author}
      </h5>
      <div className="d-flex flex-row gap-2" style={{ color: "orange" }}>
        <div className="d-flex flex-row align-items-center">
          {"★".repeat(Math.floor(rating / 2))}
          {rating % 2 !== 0 && (
            <i
              className="bi bi-star-half"
              style={{ fontSize: "14.5px", alignSelf: "center" }}
            />
          )}
        </div>
        {` ${rating}`}
      </div>
      <div
        className="detail-info-collapse review-content"
        ref={textRef}
        style={{
          maxHeight: isExpanded ? "none" : "6rem", // 줄어든 높이
          overflow: "hidden",
          transition: "max-height 0.3s ease",
        }}
      >
        {review?.content}
      </div>
      <div style={{ color: "#808080", fontSize: "14px" }}>{formattedDate}</div>
      {review?.content.length > maxHeight && (
        <button onClick={toggleExpand} className="expand-button">
          <i
            className={`bi ${isExpanded ? "bi-chevron-up" : "bi-chevron-down"}`}
          ></i>
        </button>
      )}
    </div>
  );
};

export default Collapse;
