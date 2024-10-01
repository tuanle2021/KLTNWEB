import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk để lấy tất cả sản phẩm
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    // try {
    //   const { data } = await axios.get(
    //     `${process.env.REACT_APP_BACKEND_URL}/products`
    //   );
    //   return data;
    // } catch (error) {
    //   return rejectWithValue(error.response.data.message);
    // }
    const data = [
      {
        _id: "1",
        name: "Iphone 12",
        description: "Iphone 12 pro 256 gb, best choice in price",
        price: 1350,
        stock: 50,
        category_id: "66fa513908238537f54999c5",
        images: [
          "https://res.cloudinary.com/dihhw7jo1/image/upload/v1727691871/products/iphone-13_2_.webp.webp",
        ],
        ratings: 0,
        createdAt: "2024-09-30T10:24:34.252Z",
        updatedAt: "2024-09-30T10:24:34.252Z",
        __v: 0,
      },
      {
        _id: "2",
        name: "Samsung Galaxy S21",
        description: "Samsung Galaxy S21 Ultra, 128GB",
        price: 1200,
        stock: 30,
        category_id: "66fa513908238537f54999c6",
        images: [
          "https://res.cloudinary.com/dihhw7jo1/image/upload/v1727691871/products/iphone-13_2_.webp.webp",
        ],
        ratings: 0,
        createdAt: "2024-09-30T10:24:34.252Z",
        updatedAt: "2024-09-30T10:24:34.252Z",
        __v: 0,
      },
      {
        _id: "3",
        name: "Google Pixel 5",
        description: "Google Pixel 5, 128GB",
        price: 700,
        stock: 20,
        category_id: "66fa513908238537f54999c7",
        images: [
          "https://res.cloudinary.com/dihhw7jo1/image/upload/v1727691872/products/download.jpg.jpg",
        ],
        ratings: 0,
        createdAt: "2024-09-30T10:24:34.252Z",
        updatedAt: "2024-09-30T10:24:34.252Z",
        __v: 0,
      },
    ];
    return data;
  }
);

// Async thunk để lấy chi tiết sản phẩm
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId, { rejectWithValue }) => {
    // try {
    //   const { data } = await axios.get(
    //     `${process.env.REACT_APP_BACKEND_URL}/products/${productId}`
    //   );
    //   return data;
    // } catch (error) {
    //   return rejectWithValue(error.response.data.message);
    // }
    const data = {
      _id: "1",
      name: "Iphone 12",
      description: "Iphone 12 pro 256 gb, best choice in price",
      price: 1350,
      stock: 50,
      category_id: "66fa513908238537f54999c5",
      images: [
        "https://res.cloudinary.com/dihhw7jo1/image/upload/v1727691871/products/iphone-13_2_.webp.webp",
      ],
      ratings: 0,
      createdAt: "2024-09-30T10:24:34.252Z",
      updatedAt: "2024-09-30T10:24:34.252Z",
      __v: 0,
    };
    return data;
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
  },
  reducers: {},
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

export default productSlice.reducer;
