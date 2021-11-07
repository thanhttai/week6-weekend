import * as types from "../constants/auth.constant";

const initialState = {
  user: null,
  loading: false,
  isAuthenticated: false,
};
const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.POST_LOGIN_REQUEST:
      return { ...state, loading: true };
    case types.POST_LOGIN_SUCCESS:
      return { ...state, user: payload, loading: false };
    case types.POST_LOGIN_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default authReducer;
