import React from "react";
import { Dimensions, Platform, View } from "react-native";
import Reducer from "../Reducers";

const { width: viewportWidth } = Dimensions.get("window");

const host = "https://dostavka1.com/v1";

const adaptWidth = (width320, width375, width414) => {
  if (viewportWidth <= 320) return width320;
  if (320 < viewportWidth && viewportWidth <= 375) return width375;
  if (viewportWidth >= 414) return width414;
};

export { adaptWidth };

export { host };

export const line = () =>
  Platform.OS !== "ios" ? null : (
    <View
      style={{
        marginHorizontal: 20,
        height: 1,
        alignSelf: "stretch",
        backgroundColor: "rgb(87, 88, 98)"
      }}
    />
  );

export const fetchJson = async (url, params) => {
  let response, responseJson;

  if (url.indexOf(`${host}/restaurant?restaurantId`) != -1) {
    let restaurantId = url.substr(url.indexOf("restaurantId=") + 13);
    let rest = Reducer.getState().restaurants[restaurantId];
    if (rest != undefined) {
      return {
        data: {
          result: rest
        }
      };
    }
  }

  if (url.indexOf(`${host}/plate?plate=`) != -1) {
    let plateId = url.substr(url.indexOf("plate=") + 6);
    let plate = Reducer.getState().plates[plateId];
    if (plate != undefined) {
      return {
        data: [plate]
      };
    }
  }
  try {
    response = await fetch(url, params);
  } catch (e) {
    // Alert.alert(
    //   "Ошибка",
    //   "Сервер не отвечает. Запрос " + url,
    //   callback === undefined ? undefined : [{ text: "OK", onPress: callback }]
    // );
    return {
      errors: {
        code: 404,
        title: "Сервер не отвечает",
        detail: "Проверьте ваше интернет соединение"
      }
    };
  }

  try {
    responseJson = await response.json();
  } catch (error) {
    // Alert.alert(
    //   "Ошибка " + response.status.toString(),
    //   "Ответ не является JSON'ом. Запрос " + url,
    //   callback === undefined ? undefined : [{ text: "OK", onPress: callback }]
    // );
    return {
      errors: {
        code: response.status.toString(),
        title: "Ответ не является JSON'ом.",
        detail: "Запрос " + url
      }
    };
  }

  if (url.indexOf(`${host}/restaurant?restaurantId`) != -1) {
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

  if (url.indexOf(`${host}/plate?plate=`) != -1) {
    let plateId = url.substr(url.indexOf("plate=") + 6);
    let plate = Reducer.getState().plates[plateId];
    if (plate != undefined) {
      return {
        data: [plate]
      };
    } else {
      if (responseJson.data != undefined)
        Reducer.dispatch({
          type: "SAVE_PLATE",
          payload: responseJson.data[0]
        });
    }
  }

  return responseJson;
};
