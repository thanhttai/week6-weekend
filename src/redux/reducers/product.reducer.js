import * as types from "../constants/product.constant";

const initialState = {
  product: null,
  loading: false,
  singleProduct: null,
};
const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_PRODUCT_REQUEST:
    case types.GET_SINGLE_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case types.GET_PRODUCT_SUCCESS:
      return { ...state, product: payload, loading: false };
    case types.GET_SINGLE_PRODUCT_SUCCESS:
      return { ...state, singleProduct: payload, loading: false };
    case types.GET_PRODUCT_FAIL:
    case types.GET_SINGLE_PRODUCT_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default productReducer;
