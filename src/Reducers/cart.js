import { AsyncStorage } from "react-native";

const initialState = [];

export default function cart(state = initialState, action) {
  if (action.type === "MAKE_ORDER") {
    let history;
    AsyncStorage.getItem("ORDERS_HISTORY", (err, value) => {
      if (value != null) {
        history = JSON.parse(value);
        history.push(state);
      } else {
        history = [JSON.parse.value];
      }
      AsyncStorage.setItem("ORDERS_HISTORY", JSON.stringify(history), () => {});
    });
    return initialState;
  }

  if (action.type === "ADD_PLATE") {
    var isNewPlate = true;
    var i = 0;
    while (isNewPlate && i < state.length) {
      let equalTitle = action.payload.title === state[i].plate.title;
      let equalId = action.payload.id === state[i].plate.id;
      let equalRestaurant =
        action.payload.restaurant === state[i].plate.restaurant;
      isNewPlate = !(equalTitle && equalRestaurant && equalId);
      i++;
      if (!equalRestaurant) {
        return [
          {
            plate: action.payload,
            count: 1
          }
        ];
      }
    }

    if (isNewPlate) {
      return [
        ...state,
        {
          plate: action.payload,
          count: 1
        }
      ];
    } else {
      state[i - 1].count++;
      return [...state];
    }
  }
  if (action.type === "REMOVE_PLATE") {
    if (state[action.index].count <= 1) state.splice(action.index, 1);
    else state[action.index].count--;
    return [...state];
  }

  if (action.type === "REMOVE_PLATE_BY_OBJECT") {
    for (let index = 0; index < state.length; index++) {
      if (action.payload.id == state[index].plate.id) {
        if (state[index].count <= 1) state.splice(index, 1);
        else state[index].count--;
        break;
      }
    }
    return [...state];
  }
  return state;
}
