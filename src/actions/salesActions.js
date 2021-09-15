import Axios from "axios";
import {
  SALES_CREATE_FAIL,
  SALES_CREATE_SUCCESS,
  SALES_UPDATE_REQUEST,
  SALES_UPDATE_FAIL,
  SALES_CREATE_REQUEST,
  SALES_UPDATE_SUCCESS,
  SALES_DETAILS_FAIL,
  SALES_DETAILS_REQUEST,
  SALES_DETAILS_SUCCESS,
  SALES_LIST_FAIL,
  SALES_LIST_REQUEST,
  SALES_LIST_SUCCESS,
  SALES_DELETE_FAIL,
  SALES_DELETE_REQUEST,
  SALES_DELETE_SUCCESS,
  SALES_BATCH_FAIL,
  SALES_BATCH_REQUEST,
  SALES_BATCH_SUCCESS,
} from "../constants/salesConstants";

export const createSales = (info) => async (dispatch, getState) => {
  dispatch({ type: SALES_CREATE_REQUEST, payload: info });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `${process.env.REACT_APP_URL}/api/sales`,
      info,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: SALES_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SALES_CREATE_FAIL, payload: message });
  }
};

export const updateSales = (info) => async (dispatch, getState) => {
  dispatch({ type: SALES_UPDATE_REQUEST, payload: info });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(
      `${process.env.REACT_APP_URL}/api/sales/${info.id}`,
      info,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: SALES_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SALES_UPDATE_FAIL, payload: message });
  }
};

export const detailsSales = (id) => async (dispatch, getState) => {
  dispatch({ type: SALES_DETAILS_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_URL}/api/sales/${id}`,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: SALES_DETAILS_SUCCESS, payload: data });
    //localStorage.setItem("myCartDetails", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SALES_DETAILS_FAIL, payload: message });
  }
};

export const allSales =
  ({
    dateMin = "",
    dateMax = "",
    priceMin = "",
    priceMax = "",
    batch = "",
    nameSku = "",
  }) =>
  async (dispatch, getState) => {
    dispatch({ type: SALES_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.get(
        `${process.env.REACT_APP_URL}/api/sales?batch=${batch}&nameSku=${nameSku}&priceMin=${priceMin}&priceMax=${priceMax}&dateMin=${dateMin}&dateMax=${dateMax}`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: SALES_LIST_SUCCESS, payload: data });
      //localStorage.setItem("myCartDetails", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: SALES_LIST_FAIL, payload: message });
    }
  };

export const deleteSales = (productId) => async (dispatch, getState) => {
  dispatch({ type: SALES_DELETE_REQUEST, payload: productId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(
      `${process.env.REACT_APP_URL}/api/sales/${productId}`,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: SALES_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SALES_DELETE_FAIL, payload: message });
  }
};
export const batchSales = (batch) => async (dispatch, getState) => {
  dispatch({ type: SALES_BATCH_REQUEST, payload: batch });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_URL}/api/sales/batch/${batch}`,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: SALES_BATCH_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SALES_BATCH_FAIL, payload: message });
  }
};
