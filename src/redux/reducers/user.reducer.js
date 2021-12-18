import * as types from "../constants/user.constant";

const getLocalStorage = () => {
  let user = localStorage.getItem('user')
  if(user){
    return JSON.parse(localStorage.getItem('user'))  
  }else{
    return null
  }
}

const getLocalStorageSingleOrder = () => {
  let singleOrder = localStorage.getItem('singleOrder')
  if(singleOrder){
    return JSON.parse(localStorage.getItem('singleOrder'))  
  }else{
    return null
  }
}

const getLocalStorageAllUser = () => {
  let allUser = localStorage.getItem('allUser')
  if(allUser){
    return JSON.parse(localStorage.getItem('allUser'))  
  }else{
    return null
  }
}
const initialState = {
  user: null,
  comment: null,
  checkout:false,
  userLocal: getLocalStorage(),
 allUser: getLocalStorageAllUser(),
 singleOrder: getLocalStorageSingleOrder(),
 orders:null
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
      return { ...state, user: payload, checkout: true, userLocal: payload };
      case types.GET_ALL_COMMENT_SUCCESS:
      return { ...state, comment: payload};
    case types.POST_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: payload };
    case types.DELETE_REVIEW_SUCCESS:
      return { ...state, checkout: false, userLocal: null };
    case types.GET_ALL_ORDER_SUCCESS:
      return { ...state,orders: payload}
    // case types.RESET_SHIPPING:
    //   return { ...state, shippingAddress: {}};
    // case types.RESET_TOKEN:
      // return { ...state,userLocal:initialState.user }
    case types.GET_ALL_USER_SUCCESS:
        return { ...state, allUser: payload}
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