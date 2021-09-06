import Axios from "axios";
import {
  WISHLIST_CREATE_FAIL,
  WISHLIST_CREATE_SUCCESS,
  WISHLIST_UPDATE_REQUEST,
  WISHLIST_UPDATE_FAIL,
  WISHLIST_CREATE_REQUEST,
  WISHLIST_UPDATE_SUCCESS,
  WISHLIST_DETAILS_FAIL,
  WISHLIST_DETAILS_REQUEST,
  WISHLIST_DETAILS_SUCCESS,
  FIND_WISHLIST_DETAILS_FAIL,
  FIND_WISHLIST_DETAILS_REQUEST,
  FIND_WISHLIST_DETAILS_SUCCESS,
  WISHLIST_DELETE_FAIL,
  WISHLIST_DELETE_REQUEST,
  WISHLIST_DELETE_SUCCESS,
} from "../constants/wishlistConstants";

export const createWishlist = (productId, size) => async (dispatch) => {
  dispatch({ type: WISHLIST_CREATE_REQUEST, payload: productId });

  try {
    const { data } = await Axios.post(`/api/wishlist/${productId}`, size);
    dispatch({ type: WISHLIST_CREATE_SUCCESS, payload: data.wishlist });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: WISHLIST_CREATE_FAIL, payload: message });
  }
};

export const updateWishlist = (productId, info) => async (dispatch) => {
  dispatch({ type: WISHLIST_UPDATE_REQUEST, payload: productId });

  try {
    const { data } = await Axios.put(`/api/wishlist/update/${productId}`, info);
    dispatch({ type: WISHLIST_UPDATE_SUCCESS, payload: data.wishlist });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: WISHLIST_UPDATE_FAIL, payload: message });
  }
};

export const detailsWishlist = () => async (dispatch) => {
  dispatch({ type: WISHLIST_DETAILS_REQUEST });

  try {
    const { data } = await Axios.get(`/api/wishlist/wishlistitems`);
    dispatch({ type: WISHLIST_DETAILS_SUCCESS, payload: data });
    //localStorage.setItem("myCartDetails", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: WISHLIST_DETAILS_FAIL, payload: message });
  }
};

export const findWishlistDetails = (wishlist) => async (dispatch) => {
  dispatch({ type: FIND_WISHLIST_DETAILS_REQUEST, payload: wishlist });

  try {
    const { data } = await Axios.get(`/api/wishlist/findwishlist/${wishlist}`);
    dispatch({ type: FIND_WISHLIST_DETAILS_SUCCESS, payload: data });
    //localStorage.setItem("myCartDetails", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: FIND_WISHLIST_DETAILS_FAIL, payload: message });
  }
};

export const deleteWishlist = (productId) => async (dispatch) => {
  dispatch({ type: WISHLIST_DELETE_REQUEST, payload: productId });

  try {
    const { data } = await Axios.put(`/api/wishlist/remove/${productId}`);
    dispatch({ type: WISHLIST_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: WISHLIST_DELETE_FAIL, payload: message });
  }
};
