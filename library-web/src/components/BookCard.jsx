import React, { useEffect } from "react";
import useBookStore from "../stores/BookStores";

const BookCard = ({ book }) => {
  console.log("book 내용", book);
  return (
    <div className="book-card">
      <img
        className="book-cover"
        src="https://neelkanthpublishers.com/assets/bookcover_cover.png"
        alt="Book Cover"
      />
      <div className="book-info">
        <div>{book?.title}</div>
        <div>{book?.author}</div>
      </div>
    </div>
  );
};

export default BookCard;
