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

/**
 * Сортирует массив с объектами в случайном порядке
 * @param {Array<Object>} array 
 */
function shuffle(array) {
  const LENGTH = array.length;

  // генерирует массив с индексами
  let randIndexes = [];
  for (let i = 0; i < LENGTH; i += 1) {
    let randIndex = parseInt(Math.random()*LENGTH);
    let isNew = true;
    for (let j=0; j<randIndexes.length; j++) {
      isNew = randIndexes[j] !== randIndex;
      if (!isNew)
        break;
    }
    if (isNew)
      randIndexes.push(randIndex);
    else
      i -= 1;
  }

  let result = [];
  for (let i = 0; i < LENGTH; i += 1) {
    result.push(array[randIndexes[i]]);
  }
  if (result.length == LENGTH)
    return result;
  else
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
