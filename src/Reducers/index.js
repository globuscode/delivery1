import { combineReducers, createStore } from "redux";

import cart from "./cart";
import user from "./user";
import recomendations from "./recomendations";
import modalController from "./modalController";
import address from "./address";
import favourite from "./favourite";

function lastAction(state = null, action) {
  return action;
}

combineReducers;
const store = createStore(
  combineReducers({
    cart,
    user,
    recomendations,
    modalController,
    lastAction,
    address,
    favourite
  })
);

export default store;
