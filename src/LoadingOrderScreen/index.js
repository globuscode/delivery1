import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  AsyncStorage,
  Image
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import IconD from "../IconD";

import { connect } from "react-redux";
import { host } from "../etc";
var kitchenPhoto = require("../../assets/img/kitchen.jpg");

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      freeDelivery: 1500
    };
  }

  totalPrice = () => {
    let result = 0;
    this.props.cart.forEach(e => {
      result += e.count * e.plate.price;
    });
    return result;
  };

  componentWillMount() {
    kitchenPhoto = require("../../assets/img/kitchen.jpg");
  }

  async componentDidMount() {
    const cityId = await AsyncStorage.getItem("city");
    const cityIdJson = JSON.parse(cityId);

    const tags = await AsyncStorage.getItem("tags");
    const tagsJson = JSON.parse(tags);
    let tagsIds = "";
    tagsJson.forEach(element => {
      tagsIds += element.id.toString() + ",";
    });

    const tastes = await AsyncStorage.getItem("tastes");
    const tastesJson = JSON.parse(tastes);
    let tastesIds = "";
    tastesJson.forEach(element => {
      tastesIds += element.id.toString() + ",";
    });

    fetch(
      `${host}/recommendations/?cityid=${
        cityIdJson.id
      }&tagId=${tastesIds}&tagGroup=${tagsIds}`
    )
      .then(response => response.json())
      .then(responseJson => {
        this.props.auth();
        this.props.loadRecomendations(responseJson.data);
        this.props.navigation.navigate("Feed");
        return responseJson;
      });
  }

  render() {
    kitchenPhoto = require("../../assets/img/kitchen.jpg");
    const orderPrice = this.totalPrice();
    return (
      <Image style={styles.backgroundImage} source={kitchenPhoto}>
        <View style={styles.container}>
          <LinearGradient
            colors={["rgba(44,45,55, 1)", "rgba(44,45,55, 0.5)"]}
            style={{
              height: viewportHeight,
              position: "absolute",
              width: viewportWidth
            }}
          />
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
            {"Загружаем рекомендации"}
          </Text>
          <View
            style={{
              position: "absolute",
              backgroundColor: "#292b37",
              top: viewportHeight / 2
            }}
          >
            <IconD name="dostavka" color="#dcc49c" size={90} />
          </View>

          <View
            style={{
              alignSelf: "stretch",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexDirection: "row"
            }}
          >
            <View>
              <Bar
                progress={orderPrice / this.state.freeDelivery}
                width={popupWidth - 24 - 40}
                animated
                height={3}
                color="rgb(225, 199, 155)"
                unfilledColor="rgb(119, 122, 136)"
                borderRadius={0}
                borderWidth={0}
              />
            </View>
            <View>
              <Text
                style={{
                  fontFamily: "OpenSans",
                  fontWeight: "600",
                  fontSize: 10,
                  textAlign: "center",
                  color: "rgb(225, 199, 155)",
                  paddingBottom: 4,
                  maxWidth: 56
                }}
              >{`${this.state.freeDelivery} ₽`}</Text>
              <IconD color="rgb(231, 208, 172)" size={35} name="truck" />
            </View>

            {!freeDelivery ? null : (
              <View
                style={{
                  bottom: -5,
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  left: freeDelivery
                    ? orderPrice /
                        this.state.freeDelivery *
                        (popupWidth - 24 - 40) -
                      20
                    : viewportWidth - 50
                }}
              >
                <Text
                  style={{
                    fontFamily: "OpenSans",
                    fontWeight: "600",
                    fontSize: 10,
                    textAlign: "center",
                    color: "rgb(225, 199, 155)",
                    paddingBottom: 4,
                    maxWidth: 56
                  }}
                >{`Заказ на\n${orderPrice} ₽`}</Text>
                <View
                  style={{
                    backgroundColor: "rgb(37, 38, 46)"
                  }}
                >
                  <IconD
                    color="rgb(231, 208, 172)"
                    size={20}
                    name="cart-small"
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </Image>
    );
  }
}

export default connect(
  ({ user, cart }) => ({
    userData: user,
    cart: cart
  }),
  dispatch => ({
    loadRecomendations: data =>
      dispatch({ type: "SET_RECOMENDATIONS", payload: data }),
    auth: () => {
      AsyncStorage.getItem("lastToken", (error, token) => {
        token = JSON.parse(token);
        var data = new FormData();
        data.append("token", token);
        if (token != null)
          fetch(`${host}/auth/auth/`, {
            method: "POST",
            body: data
          })
            .then(res => {
              return res.json();
            })
            .then(data => {
              if (data.errors) {
                if (data.errors.code != 200) {
                  //Alert.alert(data.errors.title, "Авторизируйтесь повторно");
                }
              } else {
                dispatch({ type: "AUTH", payload: data });
              }
            });
      });
    }
  })
)(Loading);

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover"
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
