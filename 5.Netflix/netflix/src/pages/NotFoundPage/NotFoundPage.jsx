import React from "react";
import { useNavigate } from "react-router";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      NotFoundPage
      <button onClick={() => navigate(-1)}>돌아가기</button>
    </div>
  );
};

export default NotFoundPage;
