import { Alert } from "react-native";

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

  return responseJson;
};
