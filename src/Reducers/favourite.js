import { AsyncStorage } from "react-native";

const initialState = {
  plates: [],
  collections: [],
  restaurants: []
};
/**
 *
 *
 * @export
 * @param {any} [state=initialState]
 * @param {any} action
 * @returns
 */
export default function favourite(state = initialState, action) {
  if (action.type == "DELETE_PLATE") {
    let i = 0;
    for (i = 0; i < state.plates.length; i += 1) {
      if (state.plates[i] === action.payload.id) break;
    }
    state.plates.splice(i, 1);
    return {
      ...state
    };
  }

  if (action.type == "ADD_PLATE_TO_FAV") {
    for (let i = 0; i < state.plates.length; i += 1) {
      if (state.plates[i] == action.payload.id) {
        return {
          ...state
        };
      }
    }
    state.plates.push(action.payload.id);
  }


  if (action.type == "DELETE_RESTAURANT") {
    let i = 0;
    for (i = 0; i < state.restaurants.length; i += 1) {
      if (state.restaurants[i] === action.payload.id) break;
    }
    state.restaurants.splice(i, 1);
    return {
      ...state
    };
  }

  if (action.type == "ADD_RESTAURANT_TO_FAV") {
    for (let i = 0; i < state.restaurants.length; i += 1) {
      if (state.restaurants[i] == action.payload.id) {
        return {
          ...state
        };
      }
    }
    state.restaurants.push(action.payload.id);
  }

  return {
    ...state
  };
}
