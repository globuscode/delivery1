import { AsyncStorage } from "react-native";

const initialState = {
    "plates": [],
    "popular": [],
    "collections": [],
    "restaurants": [],
};

function compare(a,b) {
  if (a.last_nom < b.last_nom)
    return -1;
  if (a.last_nom > b.last_nom)
    return 1;
  return 0;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default function recomendations(state = initialState, action) {
  if (action.type == 'SET_RECOMENDATIONS') {
      var d = shuffle(action.payload.plates);
      action.payload.plates = [];
      let len = d.length < 7 ? d.length : 7;
      for (let i=0; i < len; i++) {
        action.payload.plates.push(d[i]);
      }

      d = shuffle(action.payload.restaurants);
      action.payload.restaurants = [];
      len = d.length < 7 ? d.length : 7;
      for (let i=0; i < len; i++) {
        action.payload.restaurants.push(d[i]);
      }
      //action.payload.plates = [d[0], d[1], d[2], d[3], d[4], d[5], d[6] ];
      return {          
          "plates": action.payload.plates,
          "popular": action.payload.popular,
          "collections": action.payload.collections,
          "restaurants": action.payload.restaurants,
        };
  }
  return state;
}
