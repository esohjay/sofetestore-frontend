import Axios from "axios";
import {
  CART_CREATE_REQUEST,
  CART_CREATE_FAIL,
  CART_CREATE_SUCCESS,
  CART_UPDATE_REQUEST,
  CART_UPDATE_FAIL,
  CART_UPDATE_SUCCESS,
  CART_REMOVE_REQUEST,
  CART_REMOVE_FAIL,
  CART_REMOVE_SUCCESS,
  CART_DETAILS_FAIL,
  CART_DETAILS_REQUEST,
  CART_DETAILS_SUCCESS,
  CART_DELETE_FAIL,
  CART_DELETE_REQUEST,
  CART_DELETE_SUCCESS,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/products/${productId}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const createCart = (productId, size) => async (dispatch, getState) => {
  dispatch({ type: CART_CREATE_REQUEST, payload: productId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(`/api/cart/${productId}`, size, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: CART_CREATE_SUCCESS, payload: data.cart });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CART_CREATE_FAIL, payload: message });
  }
};

export const updateCart = (productId, info) => async (dispatch, getState) => {
  dispatch({ type: CART_UPDATE_REQUEST, payload: productId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/cart/update/${productId}`, info, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: CART_UPDATE_SUCCESS, payload: data.cart });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CART_UPDATE_FAIL, payload: message });
  }
};
export const removeCartItem = (productId) => async (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_REQUEST, payload: productId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/cart/remove/${productId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: CART_REMOVE_SUCCESS, payload: data.cart });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CART_REMOVE_FAIL, payload: message });
  }
};

export const detailsCart = () => async (dispatch) => {
  dispatch({ type: CART_DETAILS_REQUEST });

  try {
    const { data } = await Axios.get(`/api/cart/cartitems`);
    dispatch({ type: CART_DETAILS_SUCCESS, payload: data });
    //localStorage.setItem("myCartDetails", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CART_DETAILS_FAIL, payload: message });
  }
};

export const deleteCart = () => async (dispatch) => {
  dispatch({
    type: CART_DELETE_REQUEST,
  });
  try {
    const { data } = await Axios.put(`/api/cart`);
    dispatch({ type: CART_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CART_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};
export const saveShippingMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_METHOD, payload: data });
  localStorage.setItem("shippingMethod", JSON.stringify(data));
};
