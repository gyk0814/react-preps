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
  const { setBooks, books } = useBookStore();
  const fetchBooks = () => {
    return axios.get("https://openlibrary.org/subjects/love.json");
  };
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
    retry: 1,
    select: (data) => {
      return data.data.works.map((book) => ({
        title: book.title,
        author: book.authors?.[0]?.name,
      }));
    },
  });

  useEffect(() => {
    setBooks(data);
  }, [data]);
  console.log("book", books);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

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
