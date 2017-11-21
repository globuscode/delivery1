import { AsyncStorage } from "react-native";

const initialState = {
    "plates": [],
    "popular": [],
    "collections": [],
    "restaurants": [],
};

export default function recomendations(state = initialState, action) {
  if (action.type == 'SET_RECOMENDATIONS') {
      return {
          ...state,
          ...action.payload
        };
  }
  return state;
}
