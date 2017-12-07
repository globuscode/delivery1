import React from "react";
import { View, Text, TouchableOpacity, Dimensions, Alert, ActivityIndicator } from "react-native";
import IconD from "../IconD";
import { connect } from 'react-redux';

import { NavigationActions } from 'react-navigation'

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Tabs'}),
    NavigationActions.navigate({ routeName: 'MyOrders'}),
  ]
});

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

function getOrderDate(date) {
  if (date == undefined) {
    date = new Date();
  }

  const dateOfMonth = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  

  return `${dateOfMonth}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

const screen =
  viewportWidth >= 320 && viewportWidth < 375
    ? 0
    : viewportWidth >= 375 && viewportWidth < 414 ? 1 : 2;

class MakeOrder extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        canNav: true,
        fetching: false,
        price: this.totalPrice(),
        selected: "Наличными курьеру",
      }
  }

  totalPrice = () => {
    let result = 0;
    for (var i = 0; i < this.props.globalStore.length; i++) {
      result +=
        parseFloat(this.props.globalStore[i].plate.price) *
        parseFloat(this.props.globalStore[i].count);
    }

    return result;
  };

  renderMenuItem = (icon, title, nav) => {
    return (
      <TouchableOpacity
        onPress={() => {this.setState({selected: title})}}
        style={{
          flexDirection: "row",
          marginTop: screen == 0 ? 22 : screen == 1 ? 28 : 33,
          alignSelf: "flex-start",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingLeft: screen == 0 ? 16 : screen == 1 ? 19 : 20
        }}
      >
        <View
          style={{
            width: 20,
            height: 10,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <IconD
            name={icon}
            size={icon != "credit-card" ? 20 : 15}
            color="rgb( 225, 199, 155)"
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              marginLeft: 10,
              fontFamily: "open-sans",
              fontSize: 14,
              letterSpacing: 0.4,
              color: this.state.selected != title ? "rgb(119, 122, 136)" : "#dcc49c",
            }}
          >
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render = () => {
    return (
      <View style={{flex: 1}}>        
        <View
          style={{
            flexDirection: "column"
          }}
        >
          <Text
            style={{
              fontFamily: "stem-medium",
              fontSize: 16,
              lineHeight: 20,
              letterSpacing: 1.1,
              color: "#fff",
              marginTop: screen == 0 ? 45 : screen == 1 ? 58 : 67,
              marginBottom: screen == 0 ? 28 : screen == 1 ? 38 : 45,
              alignSelf: "stretch",
              textAlign: "center"
            }}
          >
            {"Оплатить \nпри получении заказа"}
          </Text>

          {this.renderMenuItem("credit-card", "Банковской картой курьеру", null)}
          {this.renderMenuItem("credit-card", "Наличными курьеру", null)}

          
        </View>
        {!this.state.fetching ? null : <ActivityIndicator style={{position: 'absolute', alignSelf: 'center', top: viewportHeight /2}}/>}
        <View
            style={{
              position: "absolute",
              alignSelf: "center",
              width: viewportWidth - 30,
              bottom: 0,
              height: 49,
              borderTopWidth: 2,
              borderColor: "#dcc49c",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <TouchableOpacity
              onPress={async () => {
                if (this.state.canNav) {
                  this.state.canNav = false;
                  const cart = this.props.globalStore.map((element) => { 
                    return {
                      "plateId": element.plate.id,
                      "qty": element.count,
                    }
                  });
                  let body = {
                    "token": this.props.userStore.token,
                    "items": cart,
                    "address": this.props.navigation.state.params.address,
                    "client": this.props.navigation.state.params.client,
                    "deliveryDate": this.props.navigation.state.params.deliveryDate == null ? getOrderDate() : this.props.navigation.state.params.deliveryDate,
                    "restaurantId": this.props.globalStore[0].plate.restaurant,
                    "persons": this.props.navigation.state.params.persons,
                    "orderStart": getOrderDate(),
                  };
                  console.log(body);
                  this.setState({fetching: true});
                  const response = await fetch(`http://dostavka1.com/v1/order/create/index.php?token=${this.props.userStore.token}`, {
                    method: 'post',
                    body: JSON.stringify(body)
                  });
                  
                  const responseJson = await response.json();
                  //Alert.alert(JSON.stringify(responseJson));
                  this.setState({fetching: false});
                  this.props.makeOrder(); 
                  this.props.navigation.dispatch(resetAction);
                  this.props.navigation.goBack(null);
                  this.state.canNav = true;
                }
              }}
              style={{
                alignSelf: "center"
              }}
            >
              <Text
                style={[
                  {
                    fontSize: 16,
                    marginTop: 17,
                    marginBottom: 17,
                    textAlign: "center",
                    letterSpacing: 0.8,
                    fontFamily: "stem-regular",
                    color: "#dcc49c",
                  }
                ]}
              >
                {`Оплатить ${this.state.price} ₽`}
              </Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  };
}

export default connect(
    state => ({
      globalStore: state.cart,
      userStore: state.user
    }),
    dispatch => ({
      makeOrder: () => dispatch({ type: "MAKE_ORDER" }),
    })
  )(MakeOrder);
