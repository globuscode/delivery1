import { combineReducers, createStore } from "redux";

import cart from "./cart";
import user from "./user";
import recomendations from "./recomendations";

combineReducers;
const store = createStore(
  combineReducers({
    cart,
    user,
    recomendations
  })
);

export default store;
