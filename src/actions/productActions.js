import Axios from "axios";
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DEAL_FAIL,
  PRODUCT_DEAL_REQUEST,
  PRODUCT_DEAL_SUCCESS,
  PRODUCT_VARIATION_FAIL,
  PRODUCT_VARIATION_REQUEST,
  PRODUCT_VARIATION_SUCCESS,
  PRODUCT_VARIATION_UPDATE_FAIL,
  PRODUCT_VARIATION_UPDATE_REQUEST,
  PRODUCT_VARIATION_UPDATE_SUCCESS,
  PRODUCT_IMAGES_FAIL,
  PRODUCT_IMAGES_REQUEST,
  PRODUCT_IMAGES_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
} from "../constants/productConstants";

export const listProducts =
  ({
    name = "",
    category = "",
    tag = "",
    avRating = "",
    priceMin = 0,
    priceMax = 0,
    order = "",
    nameSku = "",
    page = 1,
  }) =>
  async (dispatch) => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.get(
        `${process.env.REACT_APP_URL}/api/products?name=${name}&nameSku=${nameSku}&category=${category}&tag=${tag}&priceMax=${priceMax}&priceMin=${priceMin}&avRating=${avRating}&order=${order}&page=${page}`
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  };

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_URL}/api/products/${productId}`
    );
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = (product) => async (dispatch, getState) => {
  dispatch({
    type: PRODUCT_CREATE_REQUEST,
    payload: product,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `${process.env.REACT_APP_URL}/api/products`,
      product,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch) => {
  dispatch({
    type: PRODUCT_UPDATE_REQUEST,
    payload: product,
  });

  try {
    const { data } = await Axios.put(
      `${process.env.REACT_APP_URL}/api/products/${product._id}`,
      product
    );
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const manageImages = (product) => async (dispatch) => {
  dispatch({
    type: PRODUCT_IMAGES_REQUEST,
    payload: product,
  });

  try {
    const { data } = await Axios.put(
      `${process.env.REACT_APP_URL}/api/products/${product._id}/manageimages`,
      product
    );
    dispatch({ type: PRODUCT_IMAGES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_IMAGES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  dispatch({
    type: PRODUCT_DELETE_REQUEST,
  });
  try {
    const { data } = await Axios.delete(
      `${process.env.REACT_APP_URL}/api/products/${productId}`
    );
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createReview =
  (productId, review) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_REVIEW_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        `${process.env.REACT_APP_URL}/api/products/${productId}/reviews`,
        review,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: PRODUCT_REVIEW_CREATE_SUCCESS,
        payload: data.review,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_REVIEW_CREATE_FAIL, payload: message });
    }
  };
export const createVariation = (variations) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_VARIATION_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `${process.env.REACT_APP_URL}/api/products/${variations._id}/variation`,
      variations,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: PRODUCT_VARIATION_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_VARIATION_FAIL, payload: message });
  }
};

export const dealProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DEAL_REQUEST, payload: productId });
  try {
    const { data } = await Axios.put(
      `${process.env.REACT_APP_URL}/api/products/${productId}/hotdeal`
    );
    dispatch({ type: PRODUCT_DEAL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DEAL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateVariation = (info) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_VARIATION_UPDATE_REQUEST, payload: info });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(
      `${process.env.REACT_APP_URL}/api/products/variationupdate/${info.id}`,
      info,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: PRODUCT_VARIATION_UPDATE_SUCCESS,
      payload: data.variation,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_VARIATION_UPDATE_FAIL, payload: message });
  }
};
