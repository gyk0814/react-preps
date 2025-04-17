import React from "react";
import useBookStore from "../stores/BookStores";

const BookCard = (book) => {
  return (
    <div className="book-card">
      <img
        className="book-cover"
        src="https://neelkanthpublishers.com/assets/bookcover_cover.png"
        alt="Book Cover"
      />
      <div>{book?.title}타이틀</div>
      <div>{book?.author}작가</div>
    </div>
  );
};

export default BookCard;
