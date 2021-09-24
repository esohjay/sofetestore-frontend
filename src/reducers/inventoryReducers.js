import {
  INVENTORY_CREATE_REQUEST,
  INVENTORY_CREATE_FAIL,
  INVENTORY_CREATE_RESET,
  INVENTORY_CREATE_SUCCESS,
  INVENTORY_UPDATE_REQUEST,
  INVENTORY_UPDATE_FAIL,
  INVENTORY_UPDATE_RESET,
  INVENTORY_UPDATE_SUCCESS,
  INVENTORY_DELETE_REQUEST,
  INVENTORY_DELETE_FAIL,
  INVENTORY_DELETE_RESET,
  INVENTORY_DELETE_SUCCESS,
  INVENTORY_DETAILS_REQUEST,
  INVENTORY_DETAILS_FAIL,
  INVENTORY_DETAILS_SUCCESS,
  INVENTORY_LIST_REQUEST,
  INVENTORY_LIST_FAIL,
  INVENTORY_LIST_SUCCESS,
  INVENTORY_SALES_REQUEST,
  INVENTORY_SALES_FAIL,
  INVENTORY_SALES_SUCCESS,
  INVENTORY_SALES_RESET,
} from "../constants/inventoryConstants";

export const inventoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case INVENTORY_CREATE_REQUEST:
      return { loading: true };
    case INVENTORY_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        inventory: action.payload,
      };
    case INVENTORY_CREATE_RESET:
      return {};
    case INVENTORY_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const inventoryDetailsReducer = (
  state = { loading: true, inventory: [] },
  action
) => {
  switch (action.type) {
    case INVENTORY_DETAILS_REQUEST:
      return { loading: true };
    case INVENTORY_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        sales: action.payload.sales,
        products: action.payload.products,
        inventory: action.payload.inventory,
        analysis: action.payload.analysis,
      };
    case INVENTORY_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const inventoryListReducer = (
  state = { loading: true, inventory: [] },
  action
) => {
  switch (action.type) {
    case INVENTORY_LIST_REQUEST:
      return { loading: true };
    case INVENTORY_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        inventory: action.payload.docs,
        inventoryDetails: action.payload,
      };
    case INVENTORY_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const inventoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case INVENTORY_DELETE_REQUEST:
      return { loading: true };
    case INVENTORY_DELETE_SUCCESS:
      return { loading: false, success: true };
    case INVENTORY_DELETE_RESET:
      return {};
    case INVENTORY_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const inventoryUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case INVENTORY_UPDATE_REQUEST:
      return { loading: true };
    case INVENTORY_UPDATE_SUCCESS:
      return { loading: false, item: action.payload, success: true };
    case INVENTORY_UPDATE_RESET:
      return {};
    case INVENTORY_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const inventorySalesReducer = (state = {}, action) => {
  switch (action.type) {
    case INVENTORY_SALES_REQUEST:
      return { loading: true };
    case INVENTORY_SALES_SUCCESS:
      return { loading: false, sales: action.payload, success: true };
    case INVENTORY_SALES_RESET:
      return {};
    case INVENTORY_SALES_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
