import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Async thunk để lấy tất cả sản phẩm
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/products/all`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
// Async thunk để lấy sản phẩm với bộ lọc
export const fetchFilterProduct = createAsyncThunk(
  "products/fetchFilterProduct",
  async (
    { page, limit, category, filter, minPrice, maxPrice, sortByPrice },
    { rejectWithValue }
  ) => {
    try {
      const queryParams = new URLSearchParams();

      if (page) queryParams.append("page", page);
      if (limit) queryParams.append("limit", limit);
      if (category) queryParams.append("category", category);
      if (filter) queryParams.append("filter", filter);
      if (minPrice) queryParams.append("minPrice", minPrice);
      if (maxPrice) queryParams.append("maxPrice", maxPrice);
      if (sortByPrice) queryParams.append("sortByPrice", sortByPrice);

      const { data } = await axios.get(
        `${
          process.env.REACT_APP_BACKEND_URL
        }/products?${queryParams.toString()}`
      );

      console.log("Fetched products:", data);
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

// Async thunk để lấy chi tiết sản phẩm
export const fetchProductById = createAsyncThunk(
  "product/fetchById",
  async (id, thunkAPI) => {
    try {
      console.log("Fetching product with ID:", id); // Add this line to log the ID
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/products/${id}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk để cập nhật sản phẩm
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ productId, productData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/products/${productId}`,
        productData
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: null,
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    productsPerPage: 5,
    totalProducts: 0,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFilterProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilterProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(fetchFilterProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setPage } = productSlice.actions;
export default productSlice.reducer;
