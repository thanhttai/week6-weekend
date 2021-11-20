import api from "../../apiService";
import * as types from "../constants/cart.constant"
import { toast } from "react-toastify";

const cartActions = {};
    
cartActions.addToCart = ({addingProductToCart}) => {
    const productId = addingProductToCart
    return async (dispatch) => {
        dispatch({ type: types.POST_TO_CART_REQUEST})
        try {
            let url = `/carts/${productId}`;
            const res = await api.post(url, { qty:1});
         
            toast.success("The book has been successfully added to your cart!");
           
            dispatch({ type: types.POST_TO_CART_SUCCESS, payload: res });
        } catch (err) {
            console.log(err);
            dispatch({ type: types.POST_TO_CART_FAIL, payload: err.message})
        } 
    }
}

cartActions.updateCart = ({update}) => {
    return async (dispatch) => {
        dispatch({ type: types.POST_TO_CART_REQUEST})
        try {
            let url = `/carts/add-product-cart`;
            const res = await api.put(url,{productId: update, qty:1});
            console.log(res,'plzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz')
            toast.success("The book has been successfully added to your cart!");
           
            dispatch({ type: types.POST_TO_CART_SUCCESS, payload: res });
        } catch (err) {
            console.log(err);
            dispatch({ type: types.POST_TO_CART_FAIL, payload: err.message})
        } 
    }
}


    

cartActions.getCart = () => {
    return async (dispatch) => {
        try {
            dispatch({type: types.GET_TO_CART_REQUEST});
            // let url = `/carts/single-cart?cartId=6198d27f128de20f5c420bf7`;
            let url = `/carts/single-cart`;
            const res = await api.get(url);
            dispatch ({type: types.GET_TO_CART_SUCCESS, payload: res.data.data.products});
        } catch (err) {
            console.log(err);
            dispatch ({type: types.GET_TO_CART_FAIL, payload: err.message});
        }
    };
};


cartActions.deleteCart = (bookId) => {
    return async (dispatch) => {
        dispatch({ type: types.DELETE_FROM_CART_REQUEST})
        console.log(bookId,'delete id')
        try {
            let url = `/users/cart`;
            const res = await api.delete(url);
            
            dispatch(cartActions.getCart());
            dispatch({ type: types.DELETE_FROM_CART_SUCCESS })
        } catch (err) {
            console.log(err);
            dispatch({ type: types.DELETE_FROM_CART_FAIL})
        } 
    }
}

export default cartActions