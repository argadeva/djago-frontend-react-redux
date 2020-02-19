import { combineReducers } from "redux";
import userReducer from "./users";
import productsReducer from "./products";
import checkoutReducer from "./checkout";
import categoriesReducer from "./categories";
import historyReducer from "./history";

const reducers = combineReducers({
  user: userReducer,
  products: productsReducer,
  checkout: checkoutReducer,
  categories: categoriesReducer,
  history: historyReducer
});

export default reducers;
