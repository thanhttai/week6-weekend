import * as types from "../constants/user.constant";

const initialState = {
  user: null,
  comment: null
};
const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_SINGLE_USER_REQUEST:
    case types.PUT_USER_REQUEST:
    case types.DELETE_REVIEW_REQUEST:
    case types.GET_ALL_COMMENT_REQUEST:
      return { ...state};
    case types.PUT_USER_SUCCESS:
    case types.GET_SINGLE_USER_SUCCESS:
      return { ...state, user: payload};
      case types.GET_ALL_COMMENT_SUCCESS:
      return { ...state, comment: payload};

    case types.DELETE_REVIEW_SUCCESS:
    case types.DELETE_REVIEW_FAIL:
    case types.PUT_USER_FAIL:
    case types.GET_SINGLE_USER_FAIL:
    case types.GET_ALL_COMMENT_FAIL:
    
      return { ...state};
    default:
      return state;
  }
};

export default productReducer;