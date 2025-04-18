import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBooks = () => {
  return axios.get("https://openlibrary.org/subjects/love.json");
};

const selectData = (data) => {
  return data.data.works.map((book, index) => ({
    key: index,
    title: book.title,
    author: book.authors?.[0]?.name,
    img: `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`,
  }));
};

const useGetBooks = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
    select: selectData,
  });
};

export default useGetBooks;
