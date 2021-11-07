import * as types from "../constants/product.constant";
import api from "../../apiService";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const productAction = {};

productAction.getAllProduct = ({pageNum, limit, query}) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_PRODUCT_REQUEST , payload: null});
    let url = `/products?page=${pageNum}&limit=${limit}`;
    if (query) url += `&search=${query}`;
    const res = await api.get(url);
       
    dispatch({ type: types.GET_PRODUCT_SUCCESS, payload:res.data.data.products});
  } catch (err) {
    console.log(err);
    dispatch({ type: types.GET_PRODUCT_FAIL });
  }
};
//add
// productAction.getFavorites = () => {
//   return async (dispatch) => {
//       try {
//           dispatch({type: types.GET_PRODUCT_FAVORITE_REQUEST});
//           let url = `/favorites`;
//           const res = await api.get(url);
//           dispatch ({type: types.GET_PRODUCT_FAVORITE_SUCCESS, payload: res.data});
//       } catch (err) {
//           console.log(err);
//           dispatch ({type: types.GET_PRODUCT_FAVORITE_FAIL, payload: err.message});
//       }
//   };
// };

productAction.getProductDetail = ({productId}) => {
  return async (dispatch) => {
      try {
          dispatch({ type: types.GET_SINGLE_PRODUCT_REQUEST});
          const res = await api.get(`/products/${productId}`);
          toast.success("The book has been added to the reading list!");
          dispatch({ type: types.GET_SINGLE_PRODUCT_SUCCESS, payload: res.data.data.product});
      } catch (err) {
          console.log(err);
          dispatch({ type: types.GET_SINGLE_PRODUCT_FAIL})
      } 
  }
}


// productAction.addToFavorite = ({addingBook}) => {
//   return async (dispatch) => {
//       dispatch({ type: types.POST_BOOK_DETAIL_REQUEST})
//       try {
//           let url = `/favorites`;
//           const res = await api.post(url, addingBook);
//           toast.success("The book has been added to the reading list!");
//           dispatch({ type: types.POST_BOOK_DETAIL_SUCCESS })
//       } catch (err) {
//           console.log(err);
//           dispatch({ type: types.POST_BOOK_DETAIL_FAIL, payload: err.message})
//       } 
//   }
// }

// productAction.deleteFavorite = ({removedBookId}) => {
//   return async (dispatch) => {
//       dispatch({ type: types.DELETE_FAVORITE_BOOK_REQUEST})
//       try {
//           let url = `/favorites/${removedBookId}`;
//           const res = await api.delete(url);
//           toast.success("The book has been removed from the reading list!");
//           dispatch(bookActions.getFavorites());
//           dispatch({ type: types.DELETE_FAVORITE_BOOK_SUCCESS })
//       } catch (err) {
//           console.log(err);
//           dispatch({ type: types.DELETE_FAVORITE_BOOK_FAIL})
//       } 
//   }
// }
export default productAction;
