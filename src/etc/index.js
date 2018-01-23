import { Alert, Dimensions } from "react-native";
import Reducer from "../Reducers";

const { width: viewportWidth } = Dimensions.get("window");

const host = "http://dostavka1.com/v1";

const adaptWidth = (width320, width375, width414) => {
  if (viewportWidth <= 320) return width320;
  if (320 < viewportWidth && viewportWidth <= 375) return width375;
  if (viewportWidth >= 414) return width414;
};

export { adaptWidth };

export { host };

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
    let restaurantId = url.substr(url.indexOf("restaurantId=") + 13);
    let rest = Reducer.getState().restaurants[restaurantId];
    if (rest != undefined) {
      return {
        data: {
          result: rest
        }
      };
    } else {
      if (responseJson.data != undefined)
        if (responseJson.data.result != undefined)
          Reducer.dispatch({
            type: "SAVE_REST",
            payload: responseJson.data.result
          });
    }
  }

  return responseJson;
};
