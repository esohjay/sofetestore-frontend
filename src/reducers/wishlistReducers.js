import {
  WISHLIST_CREATE_REQUEST,
  WISHLIST_CREATE_FAIL,
  WISHLIST_CREATE_SUCCESS,
  WISHLIST_CREATE_RESET,
  WISHLIST_UPDATE_REQUEST,
  WISHLIST_UPDATE_FAIL,
  WISHLIST_UPDATE_SUCCESS,
  WISHLIST_DELETE_REQUEST,
  WISHLIST_DELETE_FAIL,
  WISHLIST_DELETE_SUCCESS,
  WISHLIST_DETAILS_REQUEST,
  WISHLIST_DETAILS_FAIL,
  WISHLIST_DETAILS_SUCCESS,
  FIND_WISHLIST_DETAILS_REQUEST,
  FIND_WISHLIST_DETAILS_FAIL,
  FIND_WISHLIST_DETAILS_SUCCESS,
} from "../constants/wishlistConstants";

export const wishlistCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case WISHLIST_CREATE_REQUEST:
      return { loading: true };
    case WISHLIST_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        wishlistId: action.payload,
      };
    case WISHLIST_CREATE_RESET:
      return {};
    case WISHLIST_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const wishItemsReducer = (state = {}, action) => {
  switch (action.type) {
    case WISHLIST_CREATE_SUCCESS:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export const wishlistDetailsReducer = (
  state = { loading: true, items: [] },
  action
) => {
  switch (action.type) {
    case WISHLIST_DETAILS_REQUEST:
      return { loading: true };
    case WISHLIST_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        wishlistId: action.payload.wishlistId,
        items: action.payload.myWishlistItems,
      };
    case WISHLIST_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const findWishlistDetailsReducer = (
  state = { loading: true, items: [] },
  action
) => {
  switch (action.type) {
    case FIND_WISHLIST_DETAILS_REQUEST:
      return { loading: true };
    case FIND_WISHLIST_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,

        items: action.payload.myWishlistItems,
      };
    case FIND_WISHLIST_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const wishlistDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case WISHLIST_DELETE_REQUEST:
      return { loading: true };
    case WISHLIST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case WISHLIST_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const wishlistUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case WISHLIST_UPDATE_REQUEST:
      return { loading: true };
    case WISHLIST_UPDATE_SUCCESS:
      return { loading: false, item: action.payload, success: true };
    case WISHLIST_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
