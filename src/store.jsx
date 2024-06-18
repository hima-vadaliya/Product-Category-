
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './components/login/LoginSlice'
// import categoriesReducer from "./categoriesSlices"

const store = configureStore({
  reducer: {
    login: loginReducer,
    // categories: categoriesReducer,
  },
});

export default store;
