import React from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import Touchable from "react-native-platform-touchable";
import { connect } from "react-redux";
import propTypes from "prop-types";

import { host, line } from "../../../etc";

class MyOrders extends React.Component {
  static propTypes = {
    user: propTypes.shape({
      token: propTypes.string
    }),
    navigation: propTypes.shape({
      navigate: propTypes.func
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      history: null,
      logos: []
    };
  }
  componentDidMount = async () => {
    const response = await fetch(
      `${host}/cart/orders?token=${this.props.user.token}`
    );
    const responseJson = await response.json();
    this.state.history = responseJson["data"];
    for (var i = 0; i < this.state.history.length; i++) {
      if (this.state.history[i].restaurantId != "") {
        var restRaw = await fetch(
          `${host}/restaurant?restaurantId=${
            this.state.history[i].restaurantId
          }`
        );
        var restaurant = await restRaw.json();
        this.state.logos.push(restaurant.data.result.logoImage);
      } else this.state.logos.push("//dostavka1.com/img/app-icon.png");
    }
    this.setState({});
  };
  render = () => {
    if (this.state.history === null)
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" style={{ alignSelf: "center" }} />
        </View>
      );
    var history = this.state.history.map((element, index) => {
      return (
        <Touchable
          key={index}
          onPress={() =>
            this.props.navigation.navigate("MyOrderDetail", {
              order: element,
              restaurantLogo: this.state.logos[index]
            })
          }
        >
          <View
            style={{
              borderBottomWidth: index != this.state.history.length - 1 ? 1 : 0,
              borderColor: "rgb(87, 88, 98)",
              marginHorizontal: 15,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 16
            }}
          >
            <View style={{ alignSelf: "flex-start" }}>
              <Text
                style={{
                  fontFamily: "OpenSans",
                  fontSize: 14,
                  color: "#fff"
                }}
              >{`Заказ на ${
                  element.deliveryTime ? element.deliveryTime : element.orderTime
                }\nСумма заказа ${element.total} ₽`}</Text>
              <Text
                style={{
                  fontFamily: "OpenSans",
                  fontWeight: "600",
                  fontSize: 13,
                  color: "rgb(225, 199, 155)",
                  marginTop: 11
                }}
              >
                {element.status}
              </Text>
            </View>

            <Image
              resizeMode="contain"
              source={{
                uri: "http:" + this.state.logos[index]
              }}
              style={{
                height: 50,
                width: 100
              }}
            />
          </View>
        </Touchable>
      );
    });
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          flexDirection: "column"
        }}
      >
        {line()}
        <ScrollView>{history}</ScrollView>
      </View>
    );
  };
}

export default connect(({ user }) => ({
  user: user
}))(MyOrders);
