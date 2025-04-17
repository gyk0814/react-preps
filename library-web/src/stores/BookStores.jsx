import { create } from "zustand";

const useBookStore = create((set) => ({
  books: [],
  likedBooks: [],
  addLikedBooks: (book) =>
    set((state) => ({
      likedBooks: [...state.likedBooks, book],
    })),
  removeLikedBooks: (bookId) =>
    set((state) => ({
      likedBooks: state.likedBooks.filter((book) => book.id !== bookId),
    })),
  setBooks: (fetchedBooks) =>
    set(() => ({
      books: fetchedBooks,
    })),
}));

export default useBookStore;
