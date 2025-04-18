import { use, useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Books from "./pages/Books";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useBookStore from "./stores/BookStores";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route index element={<Main />} />
        <Route path="/my-books" element={<Books />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
