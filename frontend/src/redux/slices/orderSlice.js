import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk để tạo đơn hàng
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.user.token;

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/orders`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Async thunk để lấy orders theo user ID
export const fetchOrdersByUserId = createAsyncThunk(
  "orders/fetchOrdersByUserId",
  async (userId, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.user.token;

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/orders/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const orderSlice = createSlice({
  name: "order",
  initialState: {
    shipping_address: " ",
    items: [],
    order: null,
    loading: false,
    error: null,
  },
  reducers: {
    setOrderItems: (state, action) => {
      state.items = action.payload.items;
      state.shipping_address = action.payload.shipping_address;
    },
    clearOrders: (state) => {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(fetchOrdersByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { setOrderItems, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
