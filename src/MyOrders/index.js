import React, { Component } from "react";
import { View, Dimensions, AsyncStorage, Text, Image, ScrollView, ActivityIndicator} from "react-native";
import Touchable from "react-native-platform-touchable";
import { connect } from "react-redux";

class MyOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      logos: []
    };
  }
  componentDidMount = async () => {
    const response = await fetch(`http://dostavka1.com/v1/cart/orders?token=${this.props.user.token}`);
    const responseJson = await response.json();
    this.state.history = responseJson["data"];
    for (var i = 0; i < this.state.history.length; i++) {
      if (this.state.history[i].restaurantId != '') {
        var restRaw = await fetch(
          "http://dostavka1.com/v1/restaurant?restaurantId=" + this.state.history[i].restaurantId
        );
        var restaurant = await restRaw.json();
        this.state.logos.push(restaurant.data.result.logoImage);
      }
      else this.state.logos.push("//dostavka1.com/img/app-icon.png");
    }
    this.setState({});
    /*var h = JSON.parse(await AsyncStorage.getItem('ORDERS_HISTORY'));
        if (h != null)
            this.setState({history: h});*/
  };
  render = () => {
    if (this.state.history.length == 0)
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size='large' style={{alignSelf: 'center'}} />
        </View>
      );
    var history = this.state.history.map((element, index) => {
      return (
        <Touchable
          key={index}
          onPress={() => this.props.navigation.navigate("MyOrderDetail", {order: element})}
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
                  fontFamily: "open-sans",
                  fontSize: 14,
                  color: "#fff"
                }}
              >{`Заказ на ${element.deliveryTime}\nСумма заказа ${element.total} ₽`}</Text>
              <Text
                style={{
                  fontFamily: "open-sans-semibold",
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
                uri: 'http:' + this.state.logos[index]
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
    return <ScrollView>{history}</ScrollView>;
  };
}

export default connect(
  state => ({
    user: state.user
  }),
)(MyOrders);