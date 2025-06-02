
import { createSelector } from '@reduxjs/toolkit';

export const selectBooks = createSelector(
  state => state.books.books,
  books => books
);
