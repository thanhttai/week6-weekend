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
    console.log(res, 'huhuhuhuhhuhuhuhuhuhuhuhuhahah');  
    dispatch({ type: types.GET_SINGLE_USER_SUCCESS, payload:res.data.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: types.GET_SINGLE_USER_FAIL });
  }
};
userAction.getAllComment = ({productId}) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ALL_COMMENT_REQUEST });
    const res = await api.get(`/comments/${productId}`);
    dispatch({ type: types.GET_ALL_COMMENT_SUCCESS, payload:res.data.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: types.GET_ALL_COMMENT_FAIL });
  }
};

userAction.postReview = ({ productId, review, rating}) => {
  return async (dispatch) => {
      dispatch({type: types.POST_REVIEW_REQUEST});
      try {
          const res = await api.post(`/comments/${productId}`, {
              "content": review
        });
          dispatch({type: types.POST_REVIEW_SUCCESS});
          dispatch(productAction.getProductDetail({productId}));
          dispatch(userAction.getAllComment({productId}))
          toast.success("Your review has been received");
      } catch (err) {
          console.log(err);
          toast.error(err.message);
          dispatch({type: types.POST_REVIEW_FAIL});
      }
  }
}

userAction.putReview = ({ updateComment, comment, rating, productId}) => {
  return async (dispatch) => {
      dispatch({type: types.POST_REVIEW_REQUEST});
      try {
          const res = await api.put(`/comments/${updateComment}`, {
              "content": comment
        });
          dispatch({type: types.POST_REVIEW_SUCCESS});
          // dispatch(productAction.getProductDetail({productId}));
          dispatch(userAction.getAllComment({productId}))
          // toast.success("Your review has been received");
      } catch (err) {
          console.log(err);
          toast.error(err.message);
          dispatch({type: types.POST_REVIEW_FAIL});
      }
  }
}


userAction.postOrder = (cartId) => {
  return async (dispatch) => {
      dispatch({type: types.POST_ORDER_REQUEST}); 
      try {
          const res = await api.put(`/carts/payment/${cartId}`);
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
          const res = await api.put(`/users/me`, {name, email, avatar: image});
          console.log(res, 'heheheehehehe');
          dispatch({type: types.PUT_USER_SUCCESS});
          dispatch(userAction.getCurrentUser())
          // toast.success("We've received your order. Thanks for shopping with us!");
      } catch (err) {
          console.log(err);
          toast.error(err.message);
      }
  }
}


  userAction.deleteReview = ({deleteReview, productId}) => {
    return async (dispatch) => {
        dispatch({type: types.DELETE_REVIEW_REQUEST});
        try {
            const res = await api.delete(`comments/${deleteReview}`);
            dispatch({type: types.DELETE_REVIEW_SUCCESS});
            dispatch(userAction.getAllComment({productId}))
            // toast.success("We've received your order. Thanks for shopping with us!");
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    }
  }

  userAction.logout = () => async (dispatch) => {
    dispatch({ type: types.DELETE_REVIEW_REQUEST, payload: null });
  
    try {
      const token = api.defaults.headers.common["authorization"].replace(
        "Bearer ",
        ""
      );
      const url = "/auth/logout";
      const resp = await api.post(url, {
        token,
      });
      console.log(resp);
      delete api.defaults.headers.common["authorization"];
  
      dispatch({ type: types.DELETE_REVIEW_SUCCESS, payload: null });
      toast.success("Log out successfully!");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
export default userAction;
