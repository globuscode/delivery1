import React from "react";
import {
  Image,
  Alert,
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions
} from "react-native";
import propTypes from "prop-types";
import LinearGradient from "react-native-linear-gradient";
import { connect } from "react-redux";

import IconD from "../../components/ui/IconD";
import { host, fetchJson } from "../../etc";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

class Loader extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    navigation: propTypes.object,
    cacheImage: propTypes.func
  };

  componentWillMount = async () => {
    const { navigation } = this.props;

    if (navigation.state.params.action === "navigate") {
      const { screen } = navigation.state.params;
      const { props } = navigation.state.params;
      navigation.navigate(screen, props);
    }

    if (navigation.state.params.action === "navigateToMenu") {
      const { id } = navigation.state.params;
      let response = await fetchJson(
        `${host}/restaurantMenu?restaurantId=${id}`
      );
      // if (response["data"]) {
      //   if (response["data"]["result"]) {
      //     for (let i = 0; i < response["data"]["result"].length; i++) {
      //       for (let j = 0; j < response.data.result[i].plates.length; j++) {
      //         let { image } = response.data.result[i].plates[j];
      //         Image.prefetch(`http:${image}`);
      //       }
      //     }
      //   }
      // }

      let responseRestaurant = await fetchJson(
        `${host}/restaurant?restaurantId=${id}`
      );

      if (responseRestaurant.data === undefined) {
        Alert.alert("Ошибка", "Ошибка запроса");
        throw Error("Упс...");
      }
      if (responseRestaurant.data.result === undefined) {
        Alert.alert("Ошибка", "Ошибка запроса");
        throw Error("Упс...");
      }

      await Image.prefetch("http:" + responseRestaurant.data.result.logoImage);
      await Image.prefetch("http:" + responseRestaurant.data.result.image);

      navigation.navigate("RestaurantMenu", {
        id: id,
        menu: response.data.result,
        restaurant: responseRestaurant.data.result
      });
    }

    if (navigation.state.params.action === "navigateToRestaurant") {
      const { id } = navigation.state.params;

      let response = await fetchJson(`${host}/restaurant?restaurantId=${id}`);

      if (response.errors != undefined) {
        let { title, detail, code } = response.errors;
        Alert.alert(`${title} ${code}`, detail);
        return -1;
      }

      let restaurant = response.data.result;
      await Image.prefetch("http:" + restaurant.logoImage);
      await Image.prefetch("http:" + restaurant.image);

      navigation.navigate("Restaurant", {
        id: id,
        restaurant: restaurant
      });
    }

    if (navigation.state.params.action === "navigateToCollection") {
      const { props } = this;
      const { params } = props.navigation.state;
      if (params.collection != undefined) {
        const response = await fetchJson(
          `${host}/collection?id=${params.collection.id}`
        );
        if (response.errors === undefined) {
          // console.log(response);
          navigation.navigate("Collection", {
            id: params.collection.id,
            collection: response
          });
        }
        if (response.errors != undefined) {
          let { title, detail, code } = response.errors;
          Alert.alert(`${title} ${code}`, detail);
          return -1;
        }
      }
    }
  };

  render() {
    let kitchenPhoto = require("../../../assets/img/kitchen.jpg");
    const { action } = this.props.navigation.state.params;
    return (
      <ImageBackground
        resizeMode="cover"
        style={styles.backgroundImage}
        source={kitchenPhoto}
      >
        <View style={styles.container}>
          <LinearGradient
            colors={["rgba(44,45,55, 1)", "rgba(44,45,55, 0.5)"]}
            style={{
              height: viewportHeight,
              position: "absolute",
              width: viewportWidth
            }}
          />
          <View
            style={{
              position: "absolute",
              backgroundColor: "#292b37",
              top: viewportHeight / 2
            }}
          >
            <IconD name="dostavka" color="#dcc49c" size={90} />
          </View>
          {action !== "navigateToMenu" ? null : (
            <Text
              style={{
                color: "#ffffff",
                width: viewportWidth * 0.4,
                textAlign: "center",
                fontSize: 16,
                fontWeight: "bold",
                backgroundColor: "transparent"
              }}
            >
              {"Загружаем меню ресторана"}
            </Text>
          )}
        </View>
      </ImageBackground>
    );
  }
}

export default connect(
  () => ({}),
  dispatch => ({
    cacheImage: link => dispatch({ type: "SAVE_IMG_TO_CACHE", payload: link })
  })
)(Loader);

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
