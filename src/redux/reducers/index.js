import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import productReducer from "./product.reducer";
import cartReducer from "./cart.reducer";
import userReducer from "./user.reducer";
export default combineReducers({
  auth: authReducer,
  product: productReducer,
  carts: cartReducer,
  user: userReducer,
});
