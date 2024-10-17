import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import orderReducer from "./slices/orderSlice";
import productReducer from "./slices/productSlice";
import categoryReducer from "./slices/categorySlice";
const store = configureStore({
  reducer: {
    users: userReducer,
    auth: authReducer,
    orders: orderReducer,
    products: productReducer,
    categories: categoryReducer,
  },
});

export default store;
