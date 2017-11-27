import { AsyncStorage } from "react-native";

const initialState = {
    "plates": [],
    "popular": [],
    "collections": [],
    "restaurants": [],
};

export default function recomendations(state = initialState, action) {
  if (action.type == 'SET_RECOMENDATIONS') {
      var d = action.payload.plates.sort( function() { return 0.5 - Math.random() } );
      action.payload.plates = [];
      const len = d.length < 7 ? d.length : 7;
      for (let i=0; i < len; i++) {
        action.payload.plates.push(d[i]);
      }
      //action.payload.plates = [d[0], d[1], d[2], d[3], d[4], d[5], d[6] ];
      return {
          ...state,
          ...action.payload
        };
  }
  return state;
}
