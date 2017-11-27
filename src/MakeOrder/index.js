import React from "react";
import { View, Text, TouchableOpacity, Dimensions, Alert } from "react-native";
import IconD from "../IconD";
import { connect } from 'react-redux';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

const screen =
  viewportWidth >= 320 && viewportWidth < 375
    ? 0
    : viewportWidth >= 375 && viewportWidth < 414 ? 1 : 2;

class MakeOrder extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
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
                const cart = this.props.globalStore.map((element) => { 
                  return {
                    "plateId": element.plate.id,
                    "qty": element.count,
                    "token": this.props.userStore.token
                  }
                }) ;
                const response = await fetch(`http://dostavka1.com/v1/cart/create/index.php?token=${this.props.userStore.token}`, { method: 'post', body: JSON.stringify({"items": cart}) });
                const responseJson = await response.json();
                Alert.alert(JSON.stringify(responseJson));
                this.props.makeOrder(); 
                this.props.navigation.goBack(null)
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
