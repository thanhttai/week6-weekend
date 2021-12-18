import * as types from "../constants/auth.constant";
// import * as typesUser from "../constants/user.constant";
import api from "../../apiService";
import userAction from "./user.action";
const authAction = {};

authAction.register =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.POST_REGISTER_REQUEST });
      const res = await api.post("/users", { name, email, password });
      dispatch({ type: types.POST_REGISTER_SUCCESS });
    } catch (err) {
      console.log(err);
      dispatch({ type: types.POST_REGISTER_FAIL });
    }
  };

  authAction.login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      localStorage.removeItem('token');
      dispatch({ type: types.POST_LOGIN_REQUEST });
      const res = await api.post("/users/login", { email, password });
      // console.log(res,'user thanh tai nè ' );
      dispatch({ type: types.POST_LOGIN_SUCCESS, payload: res.data.data.user });
  
      api.defaults.headers.common["authorization"] =
        "Bearer " + res.data.data;
        localStorage.setItem('token', JSON.stringify(res.data.data))
        dispatch(userAction.getCurrentUser());
    } catch (err) {
      console.log(err);
      dispatch({ type: types.POST_LOGIN_FAIL });
    }
  };

  authAction.loginFacebookRequest = (userId, access_token) => async (dispatch) => {
    dispatch({ type: types.LOGIN_FACEBOOK_REQUEST, payload: null });
    try {
      const res = await api.post("/auth/login/facebook", { userId, access_token });
      // const name = res.data.data.user.firstName;
      // toast.success(`Welcome ${name}`);
      dispatch({ type: types.LOGIN_FACEBOOK_SUCCESS, payload: res.data.data });
      // api.defaults.headers.common["authorization"] =
      //   "Bearer " + res.data.data.accessToken;
    } catch (error) {
      dispatch({ type: types.LOGIN_FACEBOOK_FAILURE, payload: error });
    }
  };
  
  authAction.loginGoogleRequest = (idToken) => async (dispatch) => {
    dispatch({ type: types.LOGIN_GOOGLE_REQUEST, payload: null });
    try {
      const res = await api.post("/auth/login/google", { idToken });
      // const name = res.data.data.user.firstName;
      // toast.success(`Welcome ${name}`);
      dispatch({ type: types.LOGIN_GOOGLE_SUCCESS, payload: res.data.data });
      // api.defaults.headers.["authorization"] =
      //   "Bearer " + res.data.data.accessToken;
    } catch (error) {
      dispatch({ type: types.LOGIN_GOOGLE_FAILURE, payload: error });
    }
  };

export default authAction;
//localStorage
