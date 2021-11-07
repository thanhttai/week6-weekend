import * as types from "../constants/cart.constant"

const initialState = {
    books: [],
    loading: false,
    errorMessage: "",
    cartBooks: null,
};

const cartReducer = (state=initialState, action) => {
    const { type, payload } = action;
    switch (type) {

        case types.POST_TO_CART_REQUEST:
        case types.GET_TO_CART_REQUEST:
        case types.DELETE_FROM_CART_REQUEST:
        
            return {...state, loading: true};

        case types.GET_TO_CART_SUCCESS:
            return {...state, cartBooks: payload, loading: false}

        case types.POST_TO_CART_FAIL:
        case types.POST_TO_CART_SUCCESS:
        case types.GET_TO_CART_FAIL:
        case types.DELETE_FROM_CART_SUCCESS:
        case types.DELETE_FROM_CART_FAIL:
             return {...state, loading: false};
        default:
            return state
    }
}

export default cartReducer;