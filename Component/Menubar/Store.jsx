
import { configureStore, createSlice } from "@reduxjs/toolkit";

const savedBooks = JSON.parse(localStorage.getItem("books")) || [];

const bookSlice = createSlice({
  name: "books",
  initialState: savedBooks,
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("books", JSON.stringify(state));
    },
    deleteBook: (state, action) => {
      const updated = state.filter((_, index) => index !== action.payload);
      localStorage.setItem("books", JSON.stringify(updated));
      return updated;
    },
     updateBook: (state, action) => {
      const { index, updatedBook } = action.payload;
      state[index] = updatedBook;
      localStorage.setItem("books", JSON.stringify(state));
    },
  },
});

export const { addBook, deleteBook,updateBook   } = bookSlice.actions;

const store = configureStore({
  reducer: {
    books: bookSlice.reducer,
  },
});

export default store;
