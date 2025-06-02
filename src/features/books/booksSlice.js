import { createSlice } from '@reduxjs/toolkit';
import booksData from './booksData';

const initialState = {
    books: booksData, 
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook(state, action) {
      state.books.push(action.payload);
    },
    removeBook: (state, action) => {
         state.books = state.books.filter(book => book.id !== action.payload);
      }
  },
});

export const { addBook } = booksSlice.actions;
export const { removeBook } = booksSlice.actions;

export const selectAllBooks = (state) => state.books.books;

export default booksSlice.reducer;
