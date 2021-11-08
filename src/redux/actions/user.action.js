import * as types from "../constants/user.constant";
import api from "../../apiService";
import {toast} from 'react-toastify'
import productAction from './product.action'
import cartActions from "./cart.action";
const userAction = {};

userAction.getCurrentUser = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_USER_REQUEST });
    const res = await api.get("/users/me");
    dispatch({ type: types.GET_SINGLE_USER_SUCCESS, payload:res.data.data.user });
  } catch (err) {
    console.log(err);
    dispatch({ type: types.GET_SINGLE_USER_FAIL });
  }
};

userAction.postReview = ({ productId, review, rating}) => {
  return async (dispatch) => {
      dispatch({type: types.POST_REVIEW_REQUEST});
      try {
          const res = await api.post(`/reviews`, {
              "productId": [productId],
              "content": review,
              "rating": rating,
        });
          dispatch({type: types.POST_REVIEW_SUCCESS});
          dispatch(productAction.getProductDetail({productId}));
          toast.success("Your review has been received");
      } catch (err) {
          console.log(err);
          toast.error(err.message);
          dispatch({type: types.POST_REVIEW_FAIL});
      }
  }
}

userAction.postOrder = () => {
  return async (dispatch) => {
      dispatch({type: types.POST_ORDER_REQUEST});
      try {
          const res = await api.post(`/orders`);
          dispatch({type: types.POST_REVIEW_SUCCESS});
          dispatch(cartActions.getCart())
          toast.success("We've received your order. Thanks for shopping with us!");
      } catch (err) {
          console.log(err);
          toast.error(err.message);
          dispatch({type: types.POST_REVIEW_FAIL});
      }
  }
}
userAction.putUser = ({name, email, image}) => {
  return async (dispatch) => {
      dispatch({type: types.PUT_USER_REQUEST});
      try {
          const res = await api.put(`/users/me`, {name, email, avatarUrl: image});
          dispatch({type: types.PUT_USER_SUCCESS});
          dispatch(userAction.getCurrentUser())
          // toast.success("We've received your order. Thanks for shopping with us!");
      } catch (err) {
          console.log(err);
          toast.error(err.message);
      }
  }
}


userAction.deleteReview = ({deleteReview}) => {
  return async (dispatch) => {
      dispatch({type: types.DELETE_REVIEW_REQUEST});
      try {
          const res = await api.delete(`reviews/:${deleteReview}`);
          dispatch({type: types.DELETE_REVIEW_SUCCESS});
          // toast.success("We've received your order. Thanks for shopping with us!");
      } catch (err) {
          console.log(err);
          toast.error(err.message);
      }
  }
}
export default userAction;
