import * as types from "../constants/product.constant";
import * as typeFilter from "../constants/filter.constant";

import api from "../../apiService";
import 'react-toastify/dist/ReactToastify.css';
const productAction = {};

productAction.getAllProduct = ({pageNum = 1, limit, query}) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_PRODUCT_REQUEST , payload: null});
    let url = `/products?page=${pageNum}&limit=${limit}`;
    if (query) url += `&search=${query}`;
 
    const res = await api.get(url);
    dispatch({ type: types.GET_PRODUCT_SUCCESS, payload:res.data.data.result});
    dispatch({type: typeFilter.GET_PRODUCT_FILTER_SUCCESS, payload:res.data.data.result})
  } catch (err) {
    console.log(err);
    dispatch({ type: types.GET_PRODUCT_FAIL });
  }
};


productAction.getProductDetail = ({id}) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.GET_SINGLE_PRODUCT_REQUEST});
      const res = await api.get(`/products/${id}`);
      // toast.success("The book has been added to the reading list!");
          dispatch({ type: types.GET_SINGLE_PRODUCT_SUCCESS, payload: res.data.data.result});
      } catch (err) {
          console.log(err);
          dispatch({ type: types.GET_SINGLE_PRODUCT_FAIL})
      } 
  }
}



export default productAction;
