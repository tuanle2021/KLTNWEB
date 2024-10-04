import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slides/authSlice";
import verifyReducer from "./slides/verifySlice";
import productReducer from "./slides/productSlice";
import cartReducer from "./slides/cartSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    verify: verifyReducer,
    products: productReducer,
    cart: cartReducer,
  },
});
