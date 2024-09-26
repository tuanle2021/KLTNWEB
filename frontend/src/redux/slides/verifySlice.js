import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// Async thunk for account activation
export const activateAccount = createAsyncThunk(
  "verify/activateAccount",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/activate/${token}`
      );
      Cookies.set("user", JSON.stringify({ ...data.user, verified: true }));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

const verifySlice = createSlice({
  name: "verify",
  initialState: {
    loading: false,
    error: null,
    success: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(activateAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(activateAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(activateAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default verifySlice.reducer;
