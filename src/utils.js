import { Alert } from "react-native";
import Reducer from "./Reducers";

export const fetchJson = async (url, params) => {
  let response, responseJson;
  
  try {
    response = await fetch(url, params);
  } catch (e) {
    Alert.alert("Ошибка", "Сервер не отвечает. Запрос " + url);
    return {};
  }

  try {
    responseJson = await response.json();
  } catch (error) {
    Alert.alert(
      "Ошибка " + response.status.toString(),
      "Ответ не является JSON'ом. Запрос " + url
    );
    return {};
  }

  if (url.indexOf("http://dostavka1.com/v1/restaurant?restaurantId") != -1) {
    let restaurantId = url.substr(url.indexOf("restaurantId=")+13);
    let rest = Reducer.getState().restaurants[restaurantId];
    if (rest != undefined ) {
      return {
        data: {
          result: rest
        }
      };
    } else {
      Reducer.dispatch({type: "SAVE_REST", payload: responseJson.data.result});
    }
      
  }

  return responseJson;
};
