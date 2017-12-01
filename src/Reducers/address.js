import { AsyncStorage } from "react-native";

const initialState = {
    'street': '',
    'house': ''
};

export default function address(state = initialState, action) {
  if (action.type == 'SAVE_ADDRESS') {
      return action.payload;
  }
  return state;
}
