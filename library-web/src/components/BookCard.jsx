import React from "react";
import useBookStore from "../stores/BookStores";

const BookCard = (book) => {
  return (
    <div>
      <div>
        <img src="https://via.placeholder.com/150" alt="Book Cover" />
      </div>
      <div>{book?.title}</div>
      <div>{book?.author}</div>
    </div>
  );
};

export default BookCard;
