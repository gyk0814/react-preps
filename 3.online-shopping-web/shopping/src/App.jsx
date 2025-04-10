import { Route, Routes } from "react-router";
import "./App.css";
import Navbar from "./component/Navbar";
import ProductAll from "./page/ProductAll";
import ProductDetails from "./page/ProductDetail";
import Login from "./page/Login";

function App() {
  return (
    <div className="app-body">
      <Navbar />
      <Routes>
        <Route index element={<ProductAll />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
