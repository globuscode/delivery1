import React from "react";
import {
  View,
  Platform,
  Text,
  Alert,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { NavigationActions } from "react-navigation";
import propTypes from "prop-types";
import { PaymentRequest } from "react-native-payments";

import IconD from "../../../components/ui/IconD";
import { connect } from "react-redux";
import { host } from "../../../etc";
import { fetchJson } from "../../../etc";
import { getCartTotalPrice } from "../../../utils";

const resetAction = NavigationActions.reset({
  index: 1,
  actions: [
    NavigationActions.navigate({ routeName: "Tabs" }),
    NavigationActions.navigate({ routeName: "MyOrders" })
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
    cards: propTypes.array,
    userStore: propTypes.object,
    navigation: propTypes.object,
    makeOrder: propTypes.func
  };

  togglePayment = (cart, callback) => {
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i] != undefined)
        totalPrice += cart[i].count * cart[i].plate.price;
    }
    let METHOD_DATA = [
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
    if (Platform.OS !== "ios")
      METHOD_DATA = [
        {
          supportedMethods: ["android-pay"],
          data: {
            supportedNetworks: ["visa", "mastercard"],
            currencyCode: "RUB",
            environment: "TEST", // defaults to production
            paymentMethodTokenizationParameters: {
              tokenizationType: "NETWORK_TOKEN",
              parameters: {
                publicKey:
                  "BIglErm9R5rgNnnieL7lLN5zycYv6h7L9R+xDNc3cWX1HvmvAumhsZIzg8qsKi3UUxD4HETdtX4VhKxUdrHx+AM="
              }
            }
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
        label: "Доставка №1",
        amount: { currency: "RUB", value: totalPrice.toString() }
      }
    };
    const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS);
    paymentRequest
      .show()
      .then(paymentResponse => {
        if (Platform.OS === "ios") {
          const { paymentData } = paymentResponse.details;
          callback(paymentData);
          paymentResponse.complete("success").then(() => {
            callback(paymentData);
          });
          return paymentResponse;
        } else {
          const { getPaymentToken } = paymentResponse.details;
          paymentResponse.complete("success");
          return getPaymentToken().then(callback);
        }
      })
      .catch(() => {
        // console.warn(error);
      });
  };

  renderMenuItem = (icon, title, callback) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            selected: title
          });
          callback();
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
            () => {
              this.setState({
                selectedCard: undefined
              });
            }
          )}
          {this.renderMenuItem("card", "Добавить новую карту", () => {
            this.setState({
              selectedCard: undefined
            });
            this.props.navigation.navigate("SetCreditCard", {
              token: this.props.userStore.token,
              nextScreen: "makeOrder"
            });
          })}
          {this.renderMenuItem("credit-card", "Наличными курьеру", () => {
            this.setState({
              selectedCard: undefined
            });
          })}
          {this.props.cards.map(card =>
            this.renderMenuItem("credit-card", card.cardName, () => {
              this.setState({
                selectedCard: card.cardId
              });
            })
          )}
          {this.renderMenuItem(
            Platform.OS === "ios" ? "apple" : "google",
            (Platform.OS === "ios" ? "Apple" : "Google") + " Pay",
            () => {
              this.setState({
                selectedCard: undefined
              });
            }
          )}
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
                let cartArray = Object.keys(cart).map(id => cart[id]);
                let body = {
                  token: this.props.userStore.token,
                  items: cartForRequest,
                  gift: this.props.navigation.state.params.gift,
                  address: navitagionParams.address,
                  client: navitagionParams.client,
                  deliveryDate:
                    navitagionParams.deliveryDate == null
                      ? getOrderDate()
                      : navitagionParams.deliveryDate,
                  restaurantId: cartArray[0].plate.restaurant,
                  persons: navitagionParams.persons,
                  orderStart: getOrderDate()
                };
                this.setState({ fetching: true });
                let result = await fetchJson(
                  `${host}/order/create/index.php?token=${
                    this.props.userStore.token
                  }`,
                  {
                    method: "post",
                    body: JSON.stringify(body)
                  }
                );
                if (result.errors === undefined) {
                  // Обрабатывает Apple и Google Pay
                  if (
                    this.state.selected === "Apple Pay" ||
                    this.state.selected === "Google Pay"
                  ) {
                    this.togglePayment(cartArray, async paymentData => {
                      let form = new FormData();
                      form.append("token", this.props.userStore.token);
                      form.append(
                        "system",
                        Platform.OS === "ios" ? "apple" : "android"
                      );
                      form.append("cart", result.data.cartId);
                      form.append("tokenPay", JSON.stringify(paymentData));
                      const paymentResponse = await fetchJson(
                        `${host}/pay/index.php`,
                        {
                          method: "POST",
                          body: form
                        }
                      );

                      if (paymentResponse.errors === undefined) {
                        this.props.makeOrder();
                        this.props.navigation.dispatch(resetAction);
                        this.state.canNav = true;
                      } else {
                        Alert.alert(paymentResponse.errors.title);
                      }
                      this.setState({ fetching: false });
                    });
                    this.setState({ fetching: false });
                  } else if (this.state.selectedCard !== undefined) {
                    // обрабатывает оплату через payture
                    let form = new FormData();
                    form.append("token", this.props.userStore.token);
                    form.append("system", "payture");
                    form.append("cart", result.data.cartId);
                    form.append(
                      "data",
                      JSON.stringify({
                        cardId: this.state.selectedCard,
                        ammount: result.data.total
                      })
                    );
                    const paymentResponse = await fetchJson(
                      `${host}/pay/index.php`,
                      {
                        method: "POST",
                        body: form
                      }
                    );

                    if (paymentResponse.errors === undefined) {
                      this.props.makeOrder();
                      this.props.navigation.dispatch(resetAction);
                      this.state.canNav = true;
                    }
                  } else {
                    // обрабатывает оплату курьеру
                    this.props.makeOrder();
                    this.props.navigation.dispatch(resetAction);
                    this.state.canNav = true;
                    this.setState({ fetching: false });
                  }
                }
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
  ({ cart, user, cards }) => ({
    cart: cart,
    userStore: user,
    cards: cards
  }),
  dispatch => ({
    makeOrder: () => dispatch({ type: "MAKE_ORDER" })
  })
)(MakeOrder);
