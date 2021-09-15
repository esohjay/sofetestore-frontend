import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  cartReducer,
  cartCreateReducer,
  cartRemoveReducer,
  cartUpdateReducer,
  cartDeleteReducer,
  cartDetailsReducer,
} from "./reducers/cartReducers";
import {
  wishlistCreateReducer,
  wishItemsReducer,
  wishlistUpdateReducer,
  wishlistDeleteReducer,
  wishlistDetailsReducer,
  findWishlistDetailsReducer,
} from "./reducers/wishlistReducers";
import {
  inventoryCreateReducer,
  inventoryUpdateReducer,
  inventoryDeleteReducer,
  inventoryDetailsReducer,
  inventoryListReducer,
  inventorySalesReducer,
} from "./reducers/inventoryReducers";
import {
  salesCreateReducer,
  salesUpdateReducer,
  salesDeleteReducer,
  salesDetailsReducer,
  salesListReducer,
  salesBatchReducer,
} from "./reducers/salesReducers";
import {
  productDetailsReducer,
  productDealReducer,
  productListReducer,
  productCreateReducer,
  productUpdateReducer,
  productVariationUpdateReducer,
  productImagesReducer,
  productDeleteReducer,
  productReviewCreateReducer,
  createVariationReducer,
} from "./reducers/productReducers";
import {
  orderCreateReducer,
  orderMineListReducer,
  orderListReducer,
  orderTrackReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailsReducer,
} from "./reducers/orderReducers";

import {
  userRegisterReducer,
  userDetailsReducer,
  userSigninReducer,
  userListReducer,
  enquiryReducer,
  subscriptionReducer,
  userDeleteReducer,
  userUpdateReducer,
  bulkMailReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  wishItems: {
    wishlistId: localStorage.getItem("wishlistId")
      ? JSON.parse(localStorage.getItem("wishlistId"))
      : { idWishlist: "empty" },
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    cartId: localStorage.getItem("cartId")
      ? JSON.parse(localStorage.getItem("cartId"))
      : { idCart: "empty" },
  },
};

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDeal: productDealReducer,
  productReviewCreate: productReviewCreateReducer,
  variationCreate: createVariationReducer,
  variationUpdate: productVariationUpdateReducer,
  cartCreate: cartCreateReducer,
  cartDetails: cartDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderTrack: orderTrackReducer,
  orderMineList: orderMineListReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productImages: productImagesReducer,
  productDelete: productDeleteReducer,
  cartDelete: cartDeleteReducer,
  cartUpdate: cartUpdateReducer,
  cartRemove: cartRemoveReducer,
  wishlistUpdate: wishlistUpdateReducer,
  wishlistDelete: wishlistDeleteReducer,
  wishlistCreate: wishlistCreateReducer,
  wishlistDetails: wishlistDetailsReducer,
  wishItems: wishItemsReducer,
  findWishlist: findWishlistDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  inventoryCreate: inventoryCreateReducer,
  inventoryDetails: inventoryDetailsReducer,
  inventoryUpdate: inventoryUpdateReducer,
  inventoryList: inventoryListReducer,
  inventoryDelete: inventoryDeleteReducer,
  inventorySales: inventorySalesReducer,
  enquiry: enquiryReducer,
  subscription: subscriptionReducer,
  salesCreate: salesCreateReducer,
  salesDetails: salesDetailsReducer,
  salesUpdate: salesUpdateReducer,
  salesList: salesListReducer,
  salesDelete: salesDeleteReducer,
  salesBatch: salesBatchReducer,
  bulkMail: bulkMailReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
