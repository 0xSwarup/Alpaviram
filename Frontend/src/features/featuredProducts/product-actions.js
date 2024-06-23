// productActions.js

// import axios from "axios";
// import {
//   productListRequest,
//   productListSuccess,
//   productListFailure,
// } from "./productList-slice";

// export const getFeaturedProductList = () => {
//   return async (dispatch) => {
//     try {
//       dispatch(productListRequest());
//       const { data } = await axios.get(
//         "http://localhost:3001/api/v1/product/"
//       );
//       dispatch(productListSuccess(data.products)); // Assuming 'data.products' is the array of products
//     } catch (error) {
//       dispatch(productListFailure(error.message));
//     }
//   };
// };

// product-actions.js
import axios from "axios";
import { productListSuccess } from "./productList-slice";

export const getFeaturedProductList = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/api/v1/product/");
      dispatch(productListSuccess(data.products)); // Assuming 'products' is the array of products in your response
    } catch (error) {
      throw new Error(error);
    }
  };
};
