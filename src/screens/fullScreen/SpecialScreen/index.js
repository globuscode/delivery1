import React from "react";
import {
  StyleSheet,
  Text,
  Alert,
  View,
  Dimensions,
  ImageBackground,
  AsyncStorage
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import propTypes from "prop-types";

import IconD from "../../../components/ui/IconD";
import { host } from "../../../etc";
var kitchenPhoto = require("../../../../assets/img/kitchen.jpg");

const { width: viewportWidth } = Dimensions.get("window");
class Screen extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    kitchenPhoto = await require("../../../../assets/img/kitchen.jpg");
  }

  async componentDidMount() {
    var city = await AsyncStorage.getItem("city");
    var nan = await AsyncStorage.getItem("nan");
    const response = await fetch(`${host}/classificator/cities`);
    if (response.status != 200) {
      Alert.alert("Ошибка", "Ошибка соединения с сервером.");
    } else {
      if (city == nan) {
        this.props.navigation.navigate("SelectCity");
      } else {
        this.props.navigation.navigate("LoadingScreen");
      }
    }
  }

  render() {
    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={kitchenPhoto}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <LinearGradient
            colors={["rgba(0, 0, 0, 0.9)", "transparent"]}
            style={{
              height: 80,
              position: "absolute",
              width: viewportWidth
            }}
          />
          <LinearGradient
            colors={["transparent", "rgba(0, 0, 0, 0.9)"]}
            style={{
              height: 80,
              position: "absolute",
              width: viewportWidth,
              bottom: 0
            }}
          />
          <Text
            style={{
              color: "#ffffff",
              width: viewportWidth * 0.8,
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
              backgroundColor: "transparent"
            }}
          >
            {"Первый рекомендательный сервис еды"}
          </Text>
          <IconD name="dostavka" color="#dcc49c" size={90} />
          <Text
            style={{
              color: "#ffffff",
              width: viewportWidth * 0.8,
              textAlign: "center",
              fontSize: 12,
              backgroundColor: "transparent"
            }}
          >
            {
              "Москва" /*, Санкт-Петербург, Екатеренбург, Казань, Краснодар, Нижний Новгород'*/
            }
          </Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  },
  text: {
    color: "white",
    fontSize: 20
  },
  container: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: "transparent",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

Screen.propTypes = {
  navigation: propTypes.object
};

export default Screen;
