// store.js
import { configureStore } from "@reduxjs/toolkit";
import userRegisterReducer from "./userRegister/userRegister-slice";
import authUserReducer from "./authUser/authUser-slice";
import tokenReducer from "./token/token-slice";
import cartReducer from "./cart/cart-slice";
import categoryListReducer from "./category/categoryList-slice";
import productListReducer from "./featuredProducts/productList-slice";

const store = configureStore({
  reducer: {
    userRegister: userRegisterReducer,
    authUser: authUserReducer,
    token: tokenReducer,
    cart: cartReducer,
    categoryList: categoryListReducer,
    featuredProductList: productListReducer,
    // Add other reducers as needed
  },
  // Add middleware, enhancers, etc. if needed
});

export default store;
