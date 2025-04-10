import React from "react";
import ProductDetail from "../page/ProductDetail";
import { Navigate } from "react-router";

const PrivateRoute = ({ authenticated }) => {
  return authenticated ? <ProductDetail /> : <Navigate to="/login" />;
};

export default PrivateRoute;
