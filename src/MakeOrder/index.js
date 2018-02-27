import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { NavigationActions } from "react-navigation";
import propTypes from "prop-types";
import { PaymentRequest } from "react-native-payments";

import IconD from "../components/ui/IconD";
import { connect } from "react-redux";
import { host } from "../etc";
import { fetchJson } from "../etc";
import { getCartTotalPrice } from "../utils";

const resetAction = NavigationActions.reset({
  index: 1,
  actions: [
    NavigationActions.navigate({ routeName: "Tabs" }),
    NavigationActions.navigate({ routeName: "MyOrders" })
  ]
});

const togglePayment = cart => {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].count * cart[i].plate.price;
  }
  const METHOD_DATA = [
    {
      supportedMethods: ["apple-pay"],
      data: {
        merchantIdentifier: "merchant.com.delivery1.payment",
        supportedNetworks: ["visa", "mastercard"],
        countryCode: "RU",
        currencyCode: "RUB"
      }
    }
  ];
  const DETAILS = {
    id: "basic-example",
    displayItems: cart.map(({ plate, count }) => ({
      label: plate.title,
      amount: { currency: "RUB", value: (count * plate.price).toString() }
    })),
    total: {
      label: "Merchant Name",
      amount: { currency: "RUB", value: totalPrice.toString() }
    }
  };
  const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS);
  paymentRequest
    .show()
    .then(() => {})
    .catch(() => {});
};

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

  return `${dateOfMonth}.${month + 1}.${year} ${hours}:${minutes}:${seconds}`;
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
      price: getCartTotalPrice(props.cart),
      selected: "Наличными курьеру"
    };
  }

  static propTypes = {
    cart: propTypes.object,
    userStore: propTypes.object,
    navigation: propTypes.object,
    makeOrder: propTypes.func
  };

  renderMenuItem = (icon, title) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ selected: title });
        }}
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
              fontFamily: "OpenSans",
              fontSize: 14,
              letterSpacing: 0.4,
              color:
                this.state.selected != title ? "rgb(119, 122, 136)" : "#dcc49c"
            }}
          >
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render = () => {
    const { cart } = this.props;
    const navitagionParams = this.props.navigation.state.params;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "column"
          }}
        >
          <Text
            style={{
              fontFamily: "Stem-Medium",
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

          {this.renderMenuItem(
            "credit-card",
            "Банковской картой курьеру",
            null
          )}
          {this.renderMenuItem("credit-card", "Наличными курьеру", null)}
          {this.renderMenuItem("credit-card", "Apple Pay", null)}
        </View>
        {!this.state.fetching ? null : (
          <ActivityIndicator
            size="large"
            style={{
              position: "absolute",
              alignSelf: "center",
              top: viewportHeight / 2
            }}
          />
        )}
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
                const cartForRequest = Object.keys(cart).map(id => {
                  return {
                    plateId: cart[id].plate.id,
                    qty: cart[id].count
                  };
                });
                if (this.state.selected === "Apple Pay") {
                  togglePayment(Object.keys(cart).map(id => cart[id]));
                }
                let body = {
                  token: this.props.userStore.token,
                  items: cartForRequest,
                  address: navitagionParams.address,
                  client: navitagionParams.client,
                  deliveryDate:
                    navitagionParams.deliveryDate == null
                      ? getOrderDate()
                      : navitagionParams.deliveryDate,
                  restaurantId: cart[0].plate.restaurant,
                  persons: navitagionParams.persons,
                  orderStart: getOrderDate()
                };
                this.setState({ fetching: true });
                await fetchJson(
                  `${host}/order/create/index.php?token=${
                    this.props.userStore.token
                  }`,
                  {
                    method: "post",
                    body: JSON.stringify(body)
                  }
                );
                //Alert.alert(JSON.stringify(responseJson));
                this.setState({ fetching: false });
                this.props.makeOrder();
                this.props.navigation.dispatch(resetAction);
                //this.props.navigation.goBack(null);
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
                  fontFamily: "Stem-Regular",
                  color: "#dcc49c"
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
  ({ cart, user }) => ({
    cart: cart,
    userStore: user
  }),
  dispatch => ({
    makeOrder: () => dispatch({ type: "MAKE_ORDER" })
  })
)(MakeOrder);
