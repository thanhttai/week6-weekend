import * as types from "../constants/auth.constant";
import api from "../../apiService";

const authAction = {};

authAction.register =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.POST_REGISTER_REQUEST });
      const res = await api.post("/auth/register", { name, email, password });
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
      dispatch({ type: types.POST_LOGIN_REQUEST });
      const res = await api.post("/auth/login", { email, password });
      dispatch({ type: types.POST_LOGIN_SUCCESS, payload: res.data.data.user });
      api.defaults.headers.common["authorization"] =
        "Bearer " + res.data.data.accessToken;
      localStorage.setItem("token", res.data.data.accessToken);
    } catch (err) {
      console.log(err);
      dispatch({ type: types.POST_LOGIN_FAIL });
    }
  };

export default authAction;
//localStorage
