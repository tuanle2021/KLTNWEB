import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import verifyReducer from "./slices/verifySlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    verify: verifyReducer,
    products: productReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
