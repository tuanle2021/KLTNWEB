import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slides/authSlice";
import verifyReducer from "./slides/verifySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    verify: verifyReducer,
  },
});
