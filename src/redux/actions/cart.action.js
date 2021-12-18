import api from "../../apiService";
import * as types from "../constants/cart.constant"
import { toast } from "react-toastify";

const cartActions = {};
    
cartActions.addToCart = ({_id, color, amount, total}) => {

    return async (dispatch) => {
        dispatch({ type: types.POST_TO_CART_REQUEST})
      
        try {
            let url = `/carts/${_id}`;
            const res = await api.post(url, [{productId: _id,color,qty:amount}],{
                headers: {
                  'authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))  
                }
              });
            toast.success("The book has been successfully added to your cart!");
           
            dispatch({ type: types.POST_TO_CART_SUCCESS, payload: res });
            // dispatch(cartActions.getCart())
         localStorage.setItem('cart', JSON.stringify(res.data.data.result.products))
        } catch (err) {
            console.log(err);
            dispatch({ type: types.POST_TO_CART_FAIL, payload: err.message})
        } 
    }
}

cartActions.updateCart = ({_id, amount}) => {
    return async (dispatch) => {
        dispatch({ type: types.POST_TO_CART_REQUEST})
        try {
           
            let url = `/carts/add-product-cart`;
            const res = await api.put(url,[{productId: _id, qty:amount}]);
            toast.success("The book has been successfully added to your cart!");
             dispatch(cartActions.getCart())
            dispatch({ type: types.POST_TO_CART_SUCCESS, payload: res });
        } catch (err) {
            console.log(err);
            dispatch({ type: types.POST_TO_CART_FAIL, payload: err.message})
        } 
    }
}

cartActions.updateNewCarts = ({cart, toggleAmount,_id}) => {
    return async (dispatch) => {    
        try {
        // //   const numberQty = await cart.products.map((product) => {
        // //         return product.qty
        // //     })
        // // const totalQty = await numberQty.reduce((sum, quantity) => sum + quantity)
        // //     const numberPrice = await cart.products.map((product) => {
        // //         return product.productId.price
        // //     })
        // //     const totalPrice = await totalPrice.reduce((sum, quantity) => sum + quantity)
        
        //     const total = cart.products.map((product) => {
        //         return product.qty * product.productId.price
        //     })
        //     const totalPrice = total.reduce((sum, quantity) => sum + quantity)
            

        //     console.log( totalPrice, 'ngooo thanh tiaiiiii nee')
            // dispatch ({type: types.GET_NEW_CART_SUCCESS, payload: totalPrice});
  
       const newCart =  cart.map((product) => {
            if( product.productId._id === _id){
                return {...product, qty: toggleAmount}
            }else{
                return product
            }
        })
     
        
        localStorage.setItem('cart', JSON.stringify(newCart))
        // localStorage.removeItem('cart')
        } catch (err) {
            console.log(err);
            dispatch ({type: types.GET_TO_CART_FAIL, payload: err.message});
        }
    };
};

    

cartActions.getCart = () => {
    return async (dispatch) => {
        try {
            dispatch({type: types.GET_TO_CART_REQUEST});
            // let url = `/carts/single-cart?cartId=6198d27f128de20f5c420bf7`;
            let url = `/carts/single-cart`;
            const res = await api.get(url,{
                headers: {
                  'authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))  
                }
              });
            console.log(res.data.data,'huhuh tôi roi1 11')
            dispatch ({type: types.GET_TO_CART_SUCCESS, payload: res.data.data});
            
            if(res.data.data){
                localStorage.setItem('cart', JSON.stringify(res.data.data)) 
            }
     
            // dispatch({type: types.GET_CART_LOCAL_SUCCESS,payload: res.data.data.products })
        } catch (err) {
            console.log(err);
            dispatch ({type: types.GET_TO_CART_FAIL, payload: err.message});
        }
    };
};


cartActions.deleteCart = ({cartId }) => {
    return async (dispatch) => {
        dispatch({ type: types.DELETE_FROM_CART_REQUEST})
        try {
            let url = `/carts/${cartId}`;
            const res = await api.delete(url);
            console.log(res, 'deleteCart');
            dispatch({ type: types.DELETE_FROM_CART_SUCCESS, payload: []})
            // dispatch(cartActions.getCart());
        } catch (err) {
            console.log(err);
            dispatch({ type: types.DELETE_FROM_CART_FAIL})
        } 
    }
}
cartActions.savePaymentMethod = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: types.CART_SAVE_PAYMENT_METHOD, payload:data})
            localStorage.setItem('paymentMethod', JSON.stringify(data))
        } catch (err) {
            console.log(err);
        } 
    }
}

export default cartActions



