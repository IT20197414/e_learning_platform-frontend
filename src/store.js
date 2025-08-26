import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice'; // <-- 1. IMPORT

const store = configureStore({
  reducer: {
    user: userReducer, // <-- 2. ADD TO THE STORE
  },
  devTools: true,
});

export default store;