import { Route, Routes } from "react-router";
import "./App.css";
import MainNavbar from "./component/MainNavbar";
import ProductAll from "./page/ProductAll";
import Login from "./page/Login";
import { useEffect, useState } from "react";
import PrivateRoute from "./route/PrivateRoute";
import { useRef } from "react";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    console.log("authenticated", authenticated);
  }, [authenticated]);
  return (
    <div className="app-body">
      <MainNavbar
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
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
