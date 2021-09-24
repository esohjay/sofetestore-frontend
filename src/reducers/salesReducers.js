import {
  SALES_CREATE_REQUEST,
  SALES_CREATE_FAIL,
  SALES_CREATE_RESET,
  SALES_CREATE_SUCCESS,
  SALES_UPDATE_REQUEST,
  SALES_UPDATE_FAIL,
  SALES_UPDATE_RESET,
  SALES_UPDATE_SUCCESS,
  SALES_DELETE_REQUEST,
  SALES_DELETE_FAIL,
  SALES_DELETE_RESET,
  SALES_DELETE_SUCCESS,
  SALES_DETAILS_REQUEST,
  SALES_DETAILS_FAIL,
  SALES_DETAILS_SUCCESS,
  SALES_LIST_REQUEST,
  SALES_LIST_FAIL,
  SALES_LIST_SUCCESS,
  SALES_BATCH_REQUEST,
  SALES_BATCH_FAIL,
  SALES_BATCH_SUCCESS,
} from "../constants/salesConstants";

export const salesCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SALES_CREATE_REQUEST:
      return { loading: true };
    case SALES_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        sales: action.payload,
      };
    case SALES_CREATE_RESET:
      return {};
    case SALES_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const salesDetailsReducer = (
  state = { loading: true, sales: {} },
  action
) => {
  switch (action.type) {
    case SALES_DETAILS_REQUEST:
      return { loading: true };
    case SALES_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        sales: action.payload,
      };
    case SALES_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const salesListReducer = (
  state = { loading: true, sales: [] },
  action
) => {
  switch (action.type) {
    case SALES_LIST_REQUEST:
      return { loading: true };
    case SALES_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        sales: action.payload.docs,
        sale: action.payload,
      };
    case SALES_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const salesBatchReducer = (
  state = { loading: true, sales: [] },
  action
) => {
  switch (action.type) {
    case SALES_BATCH_REQUEST:
      return { loading: true };
    case SALES_BATCH_SUCCESS:
      return {
        loading: false,
        success: true,
        sales: action.payload,
      };
    case SALES_BATCH_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const salesDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SALES_DELETE_REQUEST:
      return { loading: true };
    case SALES_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SALES_DELETE_RESET:
      return {};
    case SALES_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const salesUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case SALES_UPDATE_REQUEST:
      return { loading: true };
    case SALES_UPDATE_SUCCESS:
      return { loading: false, sales: action.payload, success: true };
    case SALES_UPDATE_RESET:
      return {};
    case SALES_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
