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

const orderSlice = createSlice({
  name: "order",
  initialState: {
    shipping_address: null,
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
      });
  },
});

export const { setOrderItems } = orderSlice.actions;
export default orderSlice.reducer;
