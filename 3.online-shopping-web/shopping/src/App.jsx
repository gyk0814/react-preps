import { Route, Routes } from "react-router";
import "./App.css";
import Navbar from "./component/Navbar";
import ProductAll from "./page/ProductAll";
import ProductDetails from "./page/ProductDetail";
import Login from "./page/Login";
import { useEffect, useState } from "react";
import PrivateRoute from "./route/PrivateRoute";
import { useRef } from "react";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    console.log("authenticated", authenticated);
  }, [authenticated]);
  return (
    <div className="app-body">
      <Navbar
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
        inputRef={inputRef}
      />
      <Routes>
        <Route index element={<ProductAll />} i />
        <Route
          path="/product/:id"
          element={<PrivateRoute authenticated={authenticated} />}
        />
        <Route
          path="/login"
          element={<Login setAuthenticated={setAuthenticated} />}
        />
      </Routes>
    </div>
  );
}

export default App;
