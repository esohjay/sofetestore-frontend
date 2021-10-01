import {
  CART_CREATE_REQUEST,
  CART_CREATE_FAIL,
  CART_CREATE_RESET,
  CART_CREATE_SUCCESS,
  CART_UPDATE_REQUEST,
  CART_UPDATE_FAIL,
  CART_UPDATE_SUCCESS,
  CART_DELETE_REQUEST,
  CART_DELETE_FAIL,
  CART_DELETE_SUCCESS,
  CART_REMOVE_REQUEST,
  CART_REMOVE_FAIL,
  CART_REMOVE_SUCCESS,
  CART_DETAILS_REQUEST,
  CART_DETAILS_FAIL,
  CART_DETAILS_SUCCESS,
  //CART_ADD_ITEM,
  // CART_REMOVE_ITEM,
  // CART_EMPTY,
  CART_SAVE_SHIPPING_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const cartCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_CREATE_REQUEST:
      return { loading: true };
    case CART_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        cart: action.payload,
      };
    case CART_CREATE_RESET:
      return {};
    case CART_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const cartDetailsReducer = (
  state = { loading: true, items: [] },
  action
) => {
  switch (action.type) {
    case CART_DETAILS_REQUEST:
      return { loading: true };
    case CART_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        allItems: action.payload,
        items: action.payload.myCartItems,
        total: action.payload.totalPrice,
        noItem: action.payload.message,
      };
    case CART_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const cartDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_DELETE_REQUEST:
      return { loading: true };
    case CART_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CART_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const cartUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_UPDATE_REQUEST:
      return { loading: true };
    case CART_UPDATE_SUCCESS:
      return { loading: false, item: action.payload, success: true };
    case CART_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const cartRemoveReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_REMOVE_REQUEST:
      return { loading: true };
    case CART_REMOVE_SUCCESS:
      return { loading: false, item: action.payload, success: true };
    case CART_REMOVE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_CREATE_SUCCESS:
      return {
        ...state,
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    case CART_SAVE_SHIPPING_METHOD:
      return { ...state, shippingMethod: action.payload };
    /* case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_EMPTY:
      return { ...state, cartItems: [] };*/
    default:
      return state;
  }
};
