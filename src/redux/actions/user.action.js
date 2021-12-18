import * as types from "../constants/user.constant";
import * as typesCart from "../constants/cart.constant";
import api from "../../apiService";
import {toast} from 'react-toastify'
import productAction from './product.action'
import cartActions from "./cart.action";

const userAction = {};

userAction.getCurrentUser = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_USER_REQUEST });
    console.log();
    const res = await api.get("/users/me",{
      headers: {
        'authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))  
        
      }
    });
    
    dispatch({ type: types.GET_SINGLE_USER_SUCCESS, payload:res.data.data });
      localStorage.setItem('user', JSON.stringify(res.data.data))
  } catch (err) {
    console.log(err);
    dispatch({ type: types.GET_SINGLE_USER_FAIL });
  }
};

userAction.getAllUser = ({role}) => async (dispatch) => {
  try {
   if( role !== 'admin') throw new Error('You must be an administrator')
    dispatch({ type: types.GET_ALL_USER_REQUEST });
    // console.log();
    const res = await api.get("/users", {
      headers: {
        'role' : role
      }
    });
  
    dispatch({ type: types.GET_ALL_USER_SUCCESS, payload:res.data.data.result });
    localStorage.setItem('allUser', JSON.stringify(res.data.data.result))
  } catch (err) {
    console.log(err);
    dispatch({ type: types.GET_ALL_USER_FAIL });
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


userAction.postOrder = ({cartId, city, country, postalCode, phoneNumber, address, paymentMethod, totalPrice}) => {
  return async (dispatch) => {
      dispatch({type: types.POST_ORDER_REQUEST}); 
      try {
        console.log(cartId, city, country, postalCode, phoneNumber, address, paymentMethod,totalPrice,'cartId');
          const res = await api.put(`/carts/payment/${cartId}`, { city, country, postalCode, phoneNumber, address, paymentMethod,totalPrice},{
            headers: {
              'authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))  
            }
          });
          dispatch({type: typesCart.RESET_CART});
          dispatch({type: types.RESET_SHIPPING});
          localStorage.removeItem('paymentMethod');
          localStorage.removeItem('cart');
          localStorage.removeItem('shippingAddress');

          dispatch(cartActions.getCart())
          toast.success("We've received your order. Thanks for shopping with us!");
      } catch (err) {
          console.log(err);
          toast.error(err.message);
          dispatch({type: types.POST_REVIEW_FAIL});
      }
  }
}

userAction.shippingAddress = (data) => {
  return async (dispatch) => {
      // dispatch({type: types.POST_ORDER_REQUEST}); 
      try {
          // const res = await api.put(`/carts/payment/${cartId}`);
          console.log(data);
          dispatch({type: types.POST_SHIPPING_ADDRESS,payload: data});
          dispatch({type: typesCart.SHIPPING_ADRESS,payload: data});
          localStorage.setItem('shippingAddress', JSON.stringify(data))
          // dispatch(cartActions.getCart())
          // toast.success("We've received your order. Thanks for shopping with us!");
      } catch (err) {
          // dispatch({type: types.POST_REVIEW_FAIL});
      }
  }
}



userAction.putUser = ({name, email, avatar, id}) => {
  return async (dispatch) => {
      dispatch({type: types.PUT_USER_REQUEST});
      try {
          const res = await api.put(`/users/me`, {name, email, avatar});
         
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
      const token = JSON.parse(localStorage.getItem('token'))
      console.log(token, 'token logout');
      const url = "/users/logout";
      const resp = await api.post(url, {
        token,
      });
      console.log(resp);
      delete api.defaults.headers.common["authorization"];
      localStorage.removeItem("token");
      dispatch({ type: types.DELETE_REVIEW_SUCCESS, payload: null });
      toast.success("Log out successfully!");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };


  userAction.getSingleOrder = ({ ownerId}) => {
    return async (dispatch) => {
        dispatch({type: types.GET_SINGLE_ORDER_REQUEST});
        try {
            const res = await api.get(`/orders/${ownerId}`);
            console.log(res, 'get single order');
            dispatch({type: types.GET_SINGLE_ORDER_SUCCESS});
            
            // toast.success("Your review has been received");
        } catch (err) {
            console.log(err);
            toast.error(err.message);
            dispatch({type: types.GET_SINGLE_ORDER_FAIL});
        }
    }
  }

  userAction.getAllOrder = ({ role}) => {
    return async (dispatch) => {
        dispatch({type: types.GET_ALL_ORDER_REQUEST});
        try {
            const res = await api.get(`/orders`,{
              headers: {
                'role': role
              }
            });
            console.log(res, 'get ALL order');
            dispatch({type: types.GET_ALL_ORDER_SUCCESS , payload: res.data.data.result});
            
            // toast.success("Your review has been received");
        } catch (err) {
            console.log(err);
            toast.error(err.message);
            dispatch({type: types.GET_ALL_ORDER_FAIL});
        }
    }
  }
export default userAction;
