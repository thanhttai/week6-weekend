import * as types from "../constants/cart.constant"

const getLocalStorage = () => {
    let cart = localStorage.getItem('cart')
    if(cart){
      return JSON.parse(localStorage.getItem('cart'))  
    }else{
      return null
    }
  }
  const getLocalStorageShipping = () => {
    let shippingAddress = localStorage.getItem('shippingAddress')
    if(shippingAddress){
      return JSON.parse(localStorage.getItem('shippingAddress'))  
    }else{
      return null
    }
  }
  const getLocalStoragePaymentMethod = () => {
    let PaymentMethod = localStorage.getItem('PaymentMethod')
    if(PaymentMethod){
      return JSON.parse(localStorage.getItem('PaymentMethod'))  
    }else{
      return null
    }
  }
  
const initialState = {
    books: [],
    loading: false,
    errorMessage: "", 
    cart:[] ,
    total_amount: 0,
    paymentMethod: getLocalStoragePaymentMethod(),
    cartLocal:getLocalStorage(),
    shippingAddressFromLocal: getLocalStorageShipping()
};

const cartReducer = (state=initialState, action) => {
    const { type, payload } = action;
    switch (type) {

        case types.POST_TO_CART_REQUEST:
        case types.GET_TO_CART_REQUEST:
        case types.DELETE_FROM_CART_REQUEST:
        
            return {...state, loading: true};
        case types.SHIPPING_ADRESS:
          return {...state, shippingAddressFromLocal: payload}
        case types.GET_TO_CART_SUCCESS:
            return {...state, cart: payload, loading: false, cartLocal:payload}
        case types.GET_NEW_CART_SUCCESS:
          return {...state, total_amount: payload}
        case types.GET_CART_LOCAL_SUCCESS:
            return {...state, cartLocal: payload}
        case types.POST_TO_CART_FAIL:
        case types.POST_TO_CART_SUCCESS:
        case types.CART_SAVE_PAYMENT_METHOD:
          return {...state, paymentMethod: payload}
        case types.GET_TO_CART_FAIL:
        case types.DELETE_FROM_CART_SUCCESS:
          return {...state,cart:[]}
        // case types.RESET_CART:
        //   return {...state,cart:[],paymentMethod:null, shippingAddressFromLocal:{} }
        case types.DELETE_FROM_CART_FAIL:
             return {...state, loading: false};
        default:
            return state
    }
}

export default cartReducer;