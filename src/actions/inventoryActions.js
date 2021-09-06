import Axios from "axios";
import {
  INVENTORY_CREATE_FAIL,
  INVENTORY_CREATE_SUCCESS,
  INVENTORY_UPDATE_REQUEST,
  INVENTORY_UPDATE_FAIL,
  INVENTORY_CREATE_REQUEST,
  INVENTORY_UPDATE_SUCCESS,
  INVENTORY_DETAILS_FAIL,
  INVENTORY_DETAILS_REQUEST,
  INVENTORY_DETAILS_SUCCESS,
  INVENTORY_SALES_FAIL,
  INVENTORY_SALES_REQUEST,
  INVENTORY_SALES_SUCCESS,
  INVENTORY_LIST_FAIL,
  INVENTORY_LIST_REQUEST,
  INVENTORY_LIST_SUCCESS,
  INVENTORY_DELETE_FAIL,
  INVENTORY_DELETE_REQUEST,
  INVENTORY_DELETE_SUCCESS,
} from "../constants/inventoryConstants";

export const createInventory = (info) => async (dispatch, getState) => {
  dispatch({ type: INVENTORY_CREATE_REQUEST, payload: info });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(`/api/inventory`, info, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: INVENTORY_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: INVENTORY_CREATE_FAIL, payload: message });
  }
};

export const updateInventory = (info) => async (dispatch, getState) => {
  dispatch({ type: INVENTORY_UPDATE_REQUEST, payload: info });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/inventory/${info.id}`, info, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: INVENTORY_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: INVENTORY_UPDATE_FAIL, payload: message });
  }
};

export const inventorySales = (info) => async (dispatch, getState) => {
  dispatch({ type: INVENTORY_SALES_REQUEST, payload: info });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(
      `/api/inventory/addsales/${info.id}`,
      info,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: INVENTORY_SALES_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: INVENTORY_SALES_FAIL, payload: message });
  }
};

export const detailsInventory = (id) => async (dispatch, getState) => {
  dispatch({ type: INVENTORY_DETAILS_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/inventory/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: INVENTORY_DETAILS_SUCCESS, payload: data });
    //localStorage.setItem("myCartDetails", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: INVENTORY_DETAILS_FAIL, payload: message });
  }
};

export const allInventory = () => async (dispatch, getState) => {
  dispatch({ type: INVENTORY_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/inventory`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: INVENTORY_LIST_SUCCESS, payload: data });
    //localStorage.setItem("myCartDetails", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: INVENTORY_LIST_FAIL, payload: message });
  }
};

export const deleteInventory = (productId) => async (dispatch, getState) => {
  dispatch({ type: INVENTORY_DELETE_REQUEST, payload: productId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(`/api/inventory/${productId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: INVENTORY_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: INVENTORY_DELETE_FAIL, payload: message });
  }
};
