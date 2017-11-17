import React, { Component } from "react";
import { View, Dimensions, AsyncStorage, Text, Image } from "react-native";
import Touchable from "react-native-platform-touchable";

export default class MyOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          id: 1,
          restaurantId: 0, //id ресторана
          status: "Доставлен", //статус заказа (доставлен, оплачен, отменен)
          address: "ул. Пушкина", //адрес заказа
          orderTime: new Date(2017, 11, 22, 13, 30), //время в которое был выполнен заказ
          deliveryTime: new Date(2017, 11, 22, 15, 30), //время в которое был выполнен заказ
          payment: "Наличные", //способ оплаты
          total: 500
        },
        {
          id: 1,
          restaurantId: 0, //id ресторана
          status: "Активный", //статус заказа (доставлен, оплачен, отменен)
          address: "ул. Пушкина", //адрес заказа
          orderTime: new Date(2017, 11, 20, 3, 30), //время в которое был выполнен заказ
          deliveryTime: new Date(2017, 11, 20, 5, 30), //время в которое был выполнен заказ
          payment: "Наличные", //способ оплаты
          total: 1500
        },
        {
          id: 1,
          restaurantId: 0, //id ресторана
          status: "Доставлен", //статус заказа (доставлен, оплачен, отменен)
          address: "ул. Пушкина", //адрес заказа
          orderTime: new Date(2017, 11, 22, 13, 30), //время в которое был выполнен заказ
          deliveryTime: new Date(2017, 11, 22, 15, 30), //время в которое был выполнен заказ
          payment: "Наличные", //способ оплаты
          total: 590
        }
      ],
      logos: []
    };
  }
  componentWillMount = async () => {
    for (var i = 0; i < this.state.history.length; i++) {
      var restRaw = await fetch(
        "http://dostavka1.com/v1/restaurant?restaurantId=" +
          this.state.history[i]
      );
      var restaurant = await restRaw.json();
      this.state.logos.push(restaurant.data.result.logoImage);
    }
    this.setState({});
    /*var h = JSON.parse(await AsyncStorage.getItem('ORDERS_HISTORY'));
        if (h != null)
            this.setState({history: h});*/
  };
  render = () => {
    if (this.state.history.length == 0)
      return (
        <View>
          <Text>{"Вы еще ничего не заказали"}</Text>
        </View>
      );
    var history = this.state.history.map((element, index) => {
      return (
        <Touchable
          key={index}
          onPress={() => this.props.navigation.navigate("MyOrderDetail")}
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
              >{`Заказ на ${element.deliveryTime.getDate()}.${element.deliveryTime.getMonth()} к ${element.deliveryTime.getHours()}:${element.deliveryTime.getMinutes()}\nСумма заказа ${element.total} ₽`}</Text>
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
                uri: this.state.logos[index]
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
    return <View>{history}</View>;
  };
}
