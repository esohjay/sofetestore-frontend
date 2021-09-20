const {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DEAL_REQUEST,
  PRODUCT_DEAL_SUCCESS,
  PRODUCT_DEAL_FAIL,
  PRODUCT_VARIATION_REQUEST,
  PRODUCT_VARIATION_SUCCESS,
  PRODUCT_VARIATION_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_IMAGES_REQUEST,
  PRODUCT_IMAGES_SUCCESS,
  PRODUCT_IMAGES_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_RESET,
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
  PRODUCT_REVIEW_CREATE_RESET,
  PRODUCT_VARIATION_UPDATE_REQUEST,
  PRODUCT_VARIATION_UPDATE_SUCCESS,
  PRODUCT_VARIATION_UPDATE_FAIL,
  PRODUCT_VARIATION_RESET,
} = require("../constants/productConstants");

export const productListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.docs,
        // prodPage: [...state.products.docs, newProductPage],
        prod: action.payload,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: {}, loading: true },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productDealReducer = (
  state = { product: [], loading: true },
  action
) => {
  switch (action.type) {
    case PRODUCT_DEAL_REQUEST:
      return { loading: true };
    case PRODUCT_DEAL_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DEAL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, product: action.payload, success: true };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, product: action.payload, updated: true };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productImagesReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_IMAGES_REQUEST:
      return { loading: true };
    case PRODUCT_IMAGES_SUCCESS:
      return { loading: false, product: action.payload, success: true };
    case PRODUCT_IMAGES_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { deleting: true };
    case PRODUCT_DELETE_SUCCESS:
      return { deleting: false, deleted: true };
    case PRODUCT_DELETE_RESET:
      return {};
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const createVariationReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_VARIATION_REQUEST:
      return { loading: true };
    case PRODUCT_VARIATION_SUCCESS:
      return { loading: false, success: true, variation: action.payload };
    case PRODUCT_VARIATION_RESET:
      return {};
    case PRODUCT_VARIATION_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_REVIEW_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true, review: action.payload };
    case PRODUCT_REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const productVariationUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_VARIATION_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_VARIATION_UPDATE_SUCCESS:
      return { loading: false, product: action.payload, success: true };
    case PRODUCT_VARIATION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
