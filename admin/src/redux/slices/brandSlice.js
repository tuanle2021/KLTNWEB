import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk để fetch danh sách brands theo category
export const fetchBrandsByCategory = createAsyncThunk(
  "brands/fetchBrandsByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/brands/category/${categoryId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const brandSlice = createSlice({
  name: "brands",
  initialState: {
    brands: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrandsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrandsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrandsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default brandSlice.reducer;
