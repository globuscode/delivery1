import React from "react";
import { View, Dimensions, Text, Image, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Bar } from "react-native-progress";
import HTMLView from "react-native-htmlview";
import propTypes from "prop-types";

import Counter from "../ui/Counter";
import ButtonD from "../ui/ButtonD";
import IconD from "../ui/IconD";
import Store from "../../Reducers";
import { getCartTotalPrice } from "../../utils";
import { host, adaptWidth, fetchJson } from "../../etc";

const { width: viewportWidth } = Dimensions.get("window");
const screen =
  viewportWidth >= 320 && viewportWidth < 375
    ? 0
    : viewportWidth >= 375 && viewportWidth < 414 ? 1 : 2;

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canNav: true,
      freeDelivery: 4400,
      plate: {
        id: 0,
        title: "Салат с клецками и хрустящими шариками из сулугуни",
        favorite: false,
        tagGroup: 0,
        image: "",
        price: 0,
        description:
          "С хрустящими шариками из сулугуни и кукурузной муки с домашними соусами",
        shortTitle: "Салат с клецками и хрустящими шариками из сулугуни",
        weight: "",
        restaurant: 0
      },
      restaurant: {
        id: "0",
        title: "",
        image: "//dostavka1.com/img/app-icon.png",
        logoImage: "//dostavka1.com/img/app-icon.png",
        favorite: false,
        minOrder: "",
        description: {
          title: "",
          description: ""
        },
        time: "",
        averageBill: "",
        minBill: "",
        discount: 0
      }
    };
  }

  componentWillMount = async () => {
    const responseJson = await fetchJson(
      `${host}/restaurant?restaurantId=${this.state.plate.restaurant}`
    );
    if (responseJson.data && responseJson.data.result)
      this.setState({
        restaurant: responseJson.data.result,
        freeDelivery: responseJson.data.result.freeDelivery
      });
  };

  componentWillReceiveProps = async newProps => {
    this.setState({ plate: newProps.modal.plate });

    if (newProps.modal.plate.id != this.state.plate.id) {
      const responseJson = await fetchJson(
        `${host}/restaurant?restaurantId=${newProps.modal.plate.restaurant}`
      );
      if (responseJson.data != undefined) {
        this.setState({
          restaurant: responseJson.data.result,
          freeDelivery: responseJson.data.result.minOrder
        });
      }
    }
  };

  render = () => {
    const { cart } = this.props;
    const { plate } = this.state;

    let itemCount = 0;
    if (cart[this.props.modal.plate.id] != undefined) {
      itemCount = cart[this.props.modal.plate.id].count;
    }
    const totalPrice = getCartTotalPrice(cart);

    const freeDelivery = itemCount * plate.price < this.state.freeDelivery;
    if (Object.keys(cart).length === 0) return null;
    const popupWidth = adaptWidth(290, 340, 375);

    return (
      <View
        style={{
          height: 550,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderWidth: 1,
          borderBottomWidth: 0,
          borderColor: "rgb(255,199,155)",
          alignSelf: "center",
          backgroundColor: "rgb(37, 38, 46)",
          paddingTop: adaptWidth(15, 17, 20),
          paddingHorizontal: 12,
          width: popupWidth
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Stem-Medium",
              fontSize: 14,
              marginTop: 0,
              alignSelf: "stretch",
              textAlign: "center",
              marginBottom: 15,
              color: "#fff"
            }}
          >
            {"Вы переходите в ресторан:"}
          </Text>
          <Image
            resizeMode="contain"
            source={{
              uri: "http:" + this.state.restaurant.logoImage
            }}
            style={{
              width: viewportWidth - 50,
              height: 118,
              alignSelf: "center"
            }}
          />
          <Text
            style={{
              fontFamily: "Stem-Medium",
              fontSize: 14,
              alignSelf: "stretch",
              textAlign: "left",
              marginTop: 34,
              color: "#fff"
            }}
          >
            {plate.title}
          </Text>
          {/*<Text style={{
                fontFamily: "OpenSans",
                fontSize: 10,
                alignSelf: 'stretch',
                textAlign: 'left',
                marginTop: 34,
                marginTop: 10,
                marginBottom: screen == 0 ? 31 : screen == 1 ? 66 : 79,
                color: 'rgb(135, 136, 140)'
            }}>{plate.description}</Text>*/}
          <View
            style={{
              marginTop: 10,
              height: 50,
              marginBottom: screen == 0 ? 31 : screen == 1 ? 66 : 79,
              alignSelf: "stretch"
            }}
          >
            <HTMLView
              value={`<p>${plate.description}</p>`}
              stylesheet={styles}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flex: 2,
                flexDirection: "column",
                marginBottom: screen == 0 ? 15 : screen == 1 ? 20 : 25
              }}
            >
              <Text
                style={{
                  fontFamily: "OpenSans",
                  fontSize: 10,
                  color: "rgb(135, 136, 140)",
                  marginBottom: 5
                }}
              >
                {"Количество"}
              </Text>
              <Counter
                large
                value={itemCount}
                onRemovePress={async () => {
                  this.props.removePlate(plate);
                  if (itemCount == 1) {
                    this.props.hide();
                  }
                  this.setState({});
                }}
                onAddPress={() => {
                  this.props.addPlate(plate);
                  this.setState({});
                }}
              />
            </View>
            <View
              style={{
                flex: 2,
                flexDirection: "column",
                marginBottom: screen == 0 ? 15 : screen == 1 ? 20 : 25
              }}
            >
              <Text
                style={{
                  fontFamily: "OpenSans",
                  fontSize: 10,
                  color: "rgb(135, 136, 140)",
                  marginBottom: 5
                }}
              >
                {"Стоимость"}
              </Text>
              <Text
                style={{
                  fontFamily: "Stem-Medium",
                  top: 4,
                  fontSize: 20,
                  letterSpacing: 1.4,
                  color: "#fff"
                }}
              >
                {`${plate.price} руб.`}
              </Text>
            </View>
          </View>
          <ButtonD
            title={["Добавить к заказу ", "и перейти в ресторан"]}
            onPress={() => {
              if (this.state.canNav) {
                this.setState({ canNav: false });
                setTimeout(() => {
                  this.setState({ canNav: true });
                }, 2000);
                if (
                  Store.getState().lastViewed.restaurant ===
                  this.state.restaurant.id
                )
                  this.props.hide();
                else this.props.close();
              }
            }}
            width={popupWidth - 2 * 12}
          />

          <View style={{ height: screen == 0 ? 15 : screen == 1 ? 20 : 25 }} />

          <View
            style={{
              position: "absolute",
              bottom: 10,
              alignSelf: "stretch",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexDirection: "row"
            }}
          >
            <View>
              <Bar
                progress={totalPrice / this.state.freeDelivery}
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
              <IconD
                color={
                  freeDelivery ? "rgb(231, 208, 172)" : "rgb(119, 122, 136)"
                }
                size={35}
                name="truck"
              />
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
                    ? totalPrice /
                        this.state.freeDelivery *
                        (popupWidth - 24 - 40) -
                      20
                    : popupWidth
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
                >{`Заказ на\n${totalPrice} ₽`}</Text>
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

          <View style={{ height: 15 }} />
        </View>
      </View>
    );
  };
}

Popup.propTypes = {
  cart: propTypes.object,
  modal: propTypes.object,
  removePlate: propTypes.func,
  hide: propTypes.func,
  addPlate: propTypes.func,
  close: propTypes.func
};

const styles = StyleSheet.create({
  p: {
    fontFamily: "OpenSans",
    fontSize: 10,
    textAlign: "left",
    color: "rgb(135, 136, 140)"
  }
});

export default connect(
  ({ modalController, cart }) => ({
    modal: modalController,
    cart: cart
  }),
  dispatch => ({
    removePlate: plate =>
      dispatch({ type: "REMOVE_PLATE_BY_OBJECT", payload: plate }),
    addPlate: plate => dispatch({ type: "ADD_PLATE", payload: plate }),
    open: () => dispatch({ type: "OPEN_MODAL" }),
    hide: () => dispatch({ type: "HIDE_MODAL" }),
    close: () => dispatch({ type: "CLOSE_MODAL" })
  })
)(Popup);
