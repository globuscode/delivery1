import { combineReducers, createStore } from "redux";

import cart from "./cart";
import user from "./user";
import recomendations from "./recomendations";
import modalController from "./modalController";
import spinnerController from "./spinnerController";
import address from "./address";
import favourite from "./favourite";
import lastViewed from "./lastViewed";
import restaurants from "./restaurants";
import plates from "./plates";

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
    spinnerController,
    lastAction,
    address,
    favourite,
    lastViewed,
    restaurants,
    plates
  })
);

export default store;
