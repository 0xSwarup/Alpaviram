// productList-slice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    productListLoading(state) {
      state.loading = true;
      state.error = null;
    },
    productListSuccess(state, action) {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    productListError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { productListLoading, productListSuccess, productListError } = productListSlice.actions;
export default productListSlice.reducer;
