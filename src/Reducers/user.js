import { AsyncStorage } from "react-native";

const initialState = {};

export default function user(state = initialState, action) {
  if (action.type === "AUTH") {
    AsyncStorage.setItem("lastToken", action.payload.data.token, () => {});
    return action.payload.data;
  }
  if (action.type === "REGISTRATION_ERROR") {
    state.auth = action.payload;
    return state;
  }
  if (action.type === "LOGOUT") {
    AsyncStorage.setItem("lastToken", JSON.stringify(null), () => {});
    return initialState;
  }
  return state;
}
