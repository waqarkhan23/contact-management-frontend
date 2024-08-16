import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    user: authSlice,
  },
});

export default store;
