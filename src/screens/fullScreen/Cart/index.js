import React from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
  Text
} from "react-native";
import { TextField } from "react-native-material-textfield";
import LinearGradient from "react-native-linear-gradient";
import Touchable from "react-native-platform-touchable";
import { connect } from "react-redux";
import propTypes from "prop-types";

import Counter from "../../../components/ui/Counter";
import { adaptWidth } from "../../../etc";
import IconD from "../../../components/ui/IconD";
import ButtonD from "../../../components/ui/ButtonD";
import { host } from "../../../etc";
import { fetchJson } from "../../../etc";
import renderButton from "./mockup";
import { getCartTotalCount } from "../../../utils";
import SummaryItem from "./SummaryItem";
import EmptyCart from "./EmptyCart";
import Plate from "../../../components/Plate";

const { width: viewportWidth } = Dimensions.get("window");

/**
 * Возвращает первый элемент объекта
 *
 * @param {Object} obj
 * @returns
 */
function getFirstItem(obj) {
  if (Object.keys(obj).length >= 1) {
    const firstItemId = Object.keys(obj)[0];
    const firstItem = obj[firstItemId];

    return firstItem;
  } else return undefined;
}

class Cart extends React.Component {
  navigationOptions = {
    tabBarVisible: false
  };

  static propTypes = {
    favourite: propTypes.shape({
      plates: propTypes.object,
      collections: propTypes.object,
      restaurants: propTypes.object
    }),
    navigation: propTypes.object,
    user: propTypes.object,
    cart: propTypes.object,
    removeFromFav: propTypes.func,
    addToFav: propTypes.func,
    addPlate: propTypes.func,
    removePlate: propTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedGift: null,
      gifts: [],
      sales: 0,
      promoDiscount: 0,
      price: 0,
      totalPrice: 0,
      // change: 0,
      promocode: "",
      withSales: 0,
      persons: 1,
      canNav: true,
      restaurant: {
        id: 0,
        title: "Джон Джоли",
        logoImage: "https://image.ibb.co/fPo4vm/meatless_logo.png",
        minOrder: 8888
      }
    };
  }
  componentWillReceiveProps = async newProps => {
    const { cart } = newProps;
    const firstItem = getFirstItem(cart);

    if (firstItem != undefined) {
      if (firstItem.plate.restaurant != this.state.restaurant.id) {
        const restJson = await fetchJson(
          `${host}/restaurant?restaurantId=${firstItem.plate.restaurant}`
        );
        this.setState({ restaurant: restJson["data"]["result"] });
      }

      // this.state.totalPrice = getCartTotalPrice(cart);
      // this.setState({ change: this.state.totalPrice });
      await this.getSalesPrice(newProps);
      // this.setState({ change: this.change() });
    }
  };

  componentWillMount = async () => {
    const { cart } = this.props;
    const firstItem = getFirstItem(cart);

    if (firstItem != undefined) {
      if (firstItem.plate.restaurant != this.state.restaurant.id) {
        const restJson = await fetchJson(
          `${host}/restaurant?restaurantId=${firstItem.plate.restaurant}`
        );
        this.setState({
          restaurant: restJson["data"]["result"]
        });
      }
      await this.getSalesPrice(this.props);
      // this.setState({
      //   totalPrice: getCartTotalPrice(cart)
      // });
    }
  };

  componentDidMount = async () => {
    const { cart } = this.props;
    const firstItem = getFirstItem(cart);
    if (firstItem != undefined) {
      if (firstItem.plate.restaurant != this.state.restaurant.id) {
        const restJson = await fetchJson(
          `${host}/restaurant?restaurantId=${firstItem.plate.restaurant}`
        );
        this.setState({
          restaurant: restJson["data"]["result"]
        });
      }
      await this.getSalesPrice(this.props);
      // this.setState({
      //   totalPrice: getCartTotalPrice(cart)
      // });
    }
  };

  renderButton = renderButton;

  isInFav = ({ id }) => {
    if (typeof id === undefined) {
      return false;
    }
    const { plates } = this.props.favourite;
    return plates[id] != undefined;
  };

  /**
   * true, если доставка будет бесплатной
   * false, иначе
   *
   * @memberof Cart
   */
  isFreeDelivery = () => {
    if (this.state.freeDelivery != undefined)
      return this.state.totalPrice >= this.state.restaurant.freeDelivery;
    else return false;
  };

  /**
   * Обрабатывает переход с экрана корзины на экран меню
   *
   * @memberof Cart
   */
  nav = () => {
    if (this.state.canNav) {
      this.props.navigation.navigate("Loader", {
        action: "navigateToMenu",
        id: this.state.restaurant.id
      });
      this.setState({ canNav: false });
      setTimeout(() => {
        this.setState({ canNav: true });
      }, 1500);
    }
  };

  /**
   * Возвращает сумму для оплаты с учетом скидок
   *
   * @memberof Cart
   */
  getSalesPrice = async ({ cart }) => {
    // if (cart.length == 0) return 0;
    // for (let i=0; i<cart.length; i++) {
    // }

    const cart_request = Object.keys(cart).map(element => {
      return {
        plateId: cart[element].plate.id,
        qty: cart[element].count
      };
    });
    let restJson = await fetchJson(`${host}/cart/create/`, {
      method: "post",
      body: JSON.stringify({
        promocode: this.state.promocode,
        items: cart_request,
        token: this.props.user.token,
        restaurantId: this.state.restaurant.id
      })
    });

    const { data } = restJson;
    this.setState({
      gifts: data.gifts !== undefined ? data.gifts : [],
      sales: data.rangDiscount,
      price: data.price,
      totalPrice: data.totalPrice,
      promoDiscount: data.promoDiscount,
      promocodeDiscount: data.promocodeDiscount
    });
    return {
      sales: restJson.rangDiscount,
      price: restJson.price,
      totalPrice: restJson.totalPrice
    };
  };

  /**
   * Возвращает сумму, которую нужно добрать для оформления заказа
   *
   * @returns {Number}
   * @memberof Cart
   */
  change = () => {
    const total = this.state.totalPrice;
    return total - this.state.restaurant.minOrder;
  };

  /**
   * Обрабатывает переход с экрана корзины на экран оформления заказа
   *
   * @memberof Cart
   */
  next = () => {
    if (this.state.totalPrice >= this.state.restaurant.minBill) {
      if (this.state.canNav) {
        this.setState({ canNav: false });
        setTimeout(() => {
          this.setState({ canNav: true });
        }, 1500);
        if (this.props.user.token)
          this.props.navigation.navigate("SetFullAddress", {
            price: this.state.totalPrice,
            gift: this.state.selectedGift,
            persons: this.state.persons
          });
        else
          this.props.navigation.navigate("Login", {
            nextScreen: "SetFullAddress"
          });
      }
    }
  };

  /**
   * Возвращает компонент,
   * содержащий одну позицию корзины
   *
   * @returns {JSX.Element}
   * @memberof Cart
   */
  _renderContent = (e, index) => {
    const imageHeight = adaptWidth(100, 117, 130);
    const isInFav = this.isInFav(e.plate);
    return (
      <View
        key={index}
        style={{
          flexDirection: "row",
          marginLeft: 10,
          width: viewportWidth - 10,
          marginTop: 10,
          justifyContent: "flex-start"
        }}
      >
        <View
          styel={{
            width: imageHeight,
            height: imageHeight,
            borderWidth: e.plate.image.indexOf(".png") > 0 ? 1.5 : 0,
            borderColor: "rgb(225, 199, 155)",
            borderRadius: 10
          }}
        >
          <Image
            source={{
              uri: "http:" + e.plate.image
            }}
            resizeMode={e.plate.image.indexOf(".png") > 0 ? "contain" : "cover"}
            style={{
              width: imageHeight,
              height: imageHeight,
              borderWidth: e.plate.image.indexOf(".png") > 0 ? 1.5 : 0,
              borderColor: "rgb(225, 199, 155)",
              borderRadius: 10
            }}
          />
          {e.plate.image.indexOf(".png") > 0 ? null : (
            <LinearGradient
              colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={{
                width: imageHeight,
                height: imageHeight,
                borderRadius: 10,
                position: "absolute"
              }}
            />
          )}
          <Touchable
            style={{ position: "absolute", right: 5, top: 5 }}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            foreground={Touchable.SelectableBackgroundBorderless()}
            onPress={() => {
              if (isInFav) {
                this.props.removeFromFav(e.plate);
              } else {
                this.props.addToFav(e.plate);
              }
              this.setState({});
            }}
          >
            <View style={{ backgroundColor: "transparent" }}>
              <IconD
                name={isInFav ? "heart_full" : "heart_empty"}
                size={18}
                color="#dcc49c"
              />
            </View>
          </Touchable>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            marginLeft: 10,
            width: viewportWidth - 20 - 20 - imageHeight
          }}
        >
          <View style={{ top: 4 }}>
            <Text
              style={{
                color: "#fff",
                fontSize: 14,
                fontFamily: "Stem-Medium",
                top: 3,
                lineHeight: 18,
                letterSpacing: 1
              }}
            >
              {e.plate.title}
            </Text>
            <Text
              style={{
                color: "rgb( 119, 122, 136)",
                fontSize: 14,
                lineHeight: 18,
                marginBottom: 5,
                fontFamily: "Stem-Medium"
              }}
            >
              {e.plate.weight}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <View style={{ top: -5 }}>
              <Counter
                value={e.count}
                onRemovePress={async () => {
                  this.props.removePlate({ id: e.plate.id });
                }}
                onAddPress={() => {
                  this.props.addPlate(e.plate);
                }}
              />
            </View>

            <Text
              style={{
                color: "rgb( 255, 255, 255)",
                fontSize: 16,
                fontFamily: "Stem-Medium"
              }}
            >
              {e.plate.price + " ₽"}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  /**
   * Возвращеает компонент,
   * содержащий форму для ввода промокода
   *
   * @returns {JSX.Element}
   * @memberof Cart
   */
  renderPromoCode() {
    const screen = adaptWidth(0, 1, 2);
    return (
      <View>
        <Text
          style={{
            fontFamily: "Stem-Medium",
            color: "#fff",
            letterSpacing: 1.1,
            textAlign: "center",
            marginTop: screen == 0 ? 28 : screen == 1 ? 34 : 38,
            marginBottom: screen == 0 ? 10 : screen == 1 ? 13 : 15
          }}
        >
          {"Есть сертификат?"}
        </Text>

        <Text
          style={{
            fontFamily: "OpenSans",
            color: "rgb( 119, 122, 136)",
            fontSize: 12,
            lineHeight: 13,
            letterSpacing: 0.8,
            textAlign: "center",
            maxWidth: 250,
            marginBottom: (screen == 0 ? 33 : screen == 1 ? 45 : 65) - 20
          }}
        >
          {"Если у вас есть сертификат, введите номер чтобы получить скидку"}
        </Text>
        <TextField
          value={this.state.promocode}
          tintColor="#dcc49c"
          baseColor="rgb(87, 88, 98)"
          textColor="#fff"
          returnKeyType="send"
          style={{
            alignItems: "center",
            textAlign: "center"
          }}
          onChangeText={code => this.setState({ promocode: code })}
          inputContainerStyle={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
          label="Введите номер сертификата"
        />
        <View style={{ height: screen == 0 ? 32 : screen == 1 ? 40 : 46 }} />
      </View>
    );
  }

  renderGift = plate => {
    const isInFav = this.isInFav(plate);
    return (
      <Plate
        gift
        giftSelected={this.state.selectedGift === plate.id}
        onPress
        onFavPress={() => {
          if (isInFav) {
            this.props.removeFromFav(plate);
          } else {
            this.props.addToFav(plate);
          }
          this.setState({});
        }}
        onPriceButtonPress={() => {
          this.setState({
            selectedGift: plate.id
          });
        }}
        onDeletePlatePress={null}
        key={plate.id}
        itemCount={0}
        data={plate}
        fav={isInFav}
      />
    );
  };

  renderGifts = () => {
    return (
      <View>
        <SummaryItem label="Акция: блюдо в подарок" />
        {this.state.gifts.map(this.renderGift)}
      </View>
    );
  };

  render() {
    const screen = adaptWidth(0, 1, 2);
    const change = this.change();
    const { cart } = this.props;
    const totalCount = getCartTotalCount(cart);
    if (Object.keys(cart).length != 0)
      return (
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={{
              justifyContent: "flex-start",
              alignItems: "center"
            }}
          >
            {/* Логотип ресторана в котором оформляется заказ */}
            <View
              style={[styles.row, { justifyContent: "center", marginTop: 30 }]}
            >
              <Image
                resizeMode="contain"
                source={{
                  uri: "http:" + this.state.restaurant.logoImage
                }}
                style={{
                  width: viewportWidth - 40,
                  height: 130,
                  alignSelf: "center",
                  backgroundColor: "transparent"
                }}
              />
            </View>
            {change > 0 ? null : (
              <Text
                style={{
                  fontFamily: "OpenSans",
                  fontSize: 12,
                  letterSpacing: 0.8,
                  textAlign: "center",
                  color: "rgb( 225, 199, 155)"
                }}
              >
                {"Ресторан установил ограничение \nна минимальную сумму заказа " +
                  this.state.restaurant.minOrder +
                  ".\nВам осталось выбрать еще на " +
                  -change +
                  " ₽"}
              </Text>
            )}

            {/* Кнопка Открыть меню ресторана */}
            <View
              style={{
                alignSelf: "center",
                marginVertical: 20
              }}
            >
              <ButtonD
                onPress={this.nav}
                title={["Открыть меню ресторана"]}
                width={screen == 0 ? 260 : screen == 1 ? 315 : 354}
              />
            </View>
            <View
              style={{
                width: viewportWidth - 32,
                height: 1,
                borderWidth: 1,
                borderColor: "rgb( 87, 88, 98)"
              }}
            />
            <Text
              style={{
                marginTop: screen == 0 ? 13 : screen == 1 ? 16 : 20,
                marginLeft: 20,
                alignSelf: "flex-start",
                color: "#fff",
                fontSize: 16,
                fontFamily: "Stem-Medium",
                letterSpacing: 0.8
              }}
            >
              {totalCount + " позиции на сумму " + this.state.totalPrice + "₽"}
            </Text>
            {Object.keys(cart).map((id, index) => {
              return (
                <View key={index} style={{ flexDirection: "row" }}>
                  {this._renderContent(cart[id], index)}
                </View>
              );
            })}
            <View style={{ height: adaptWidth(30, 34, 39.1) }} />
            <View
              style={{
                width: viewportWidth - 32,
                height: 1,
                borderWidth: 0,
                borderColor: "rgb(87, 88, 98)"
              }}
            />
            <View style={{ height: 20 }} />
            <SummaryItem label="Количество персон:">
              <Counter
                value={this.state.persons}
                onRemovePress={() => {
                  if (this.state.persons > 1)
                    this.setState({ persons: this.state.persons - 1 });
                }}
                onAddPress={() => {
                  this.setState({ persons: this.state.persons + 1 });
                }}
              />
            </SummaryItem>
            <SummaryItem label="Сумма заказа" text={this.state.price + " ₽"} />
            {this.state.gifts.length === 0 ? null : this.renderGifts()}
            {this.renderPromoCode()}
            {this.state.promoDiscount === undefined ? null : (
              <SummaryItem
                label="Скидка по акции"
                text={this.state.promoDiscount + " ₽"}
              />
            )}
            <SummaryItem label="Скидка" text={this.state.sales + " ₽"} />
            <SummaryItem
              label="Доставка"
              text={
                !this.isFreeDelivery()
                  ? "бесплатно"
                  : this.state.restaurant.delivery
              }
            />
            {this.state.promocodeDiscount === undefined ? null : (
              <SummaryItem
                label="Скидка по сертификату"
                text={this.state.promocodeDiscount + " ₽"}
              />
            )}
            <SummaryItem
              label="Итоговая сумма заказа"
              text={this.state.totalPrice + " ₽"}
            />
            <View style={{ height: 60 }} />
            <View
              style={{
                position: "absolute",
                alignSelf: "center",
                width: viewportWidth - 30,
                bottom: 0,
                height: 49,
                borderTopWidth: 2,
                borderColor: change >= 0 ? "#dcc49c" : "#575862",
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              <TouchableOpacity
                onPress={this.next}
                style={{
                  alignSelf: "center"
                }}
              >
                <Text
                  style={[
                    styles.nextButtonText,
                    {
                      color: change >= 0 ? "#dcc49c" : "#575862"
                    }
                  ]}
                >
                  {change >= 0
                    ? `Оформить заказ на ${this.state.totalPrice} ₽`
                    : `До покупки не хватает ${-change} ₽`}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      );
    return (
      <EmptyCart callback={() => this.props.navigation.navigate("Main")} />
    );
  }
}

export default connect(
  ({ cart, favourite, user }) => ({
    cart: cart,
    favourite: favourite,
    user: user
  }),
  dispatch => ({
    removePlate: data =>
      dispatch({ type: "REMOVE_PLATE_BY_OBJECT", payload: data }),
    addPlate: data => dispatch({ type: "ADD_PLATE", payload: data }),
    addToFav: data => {
      dispatch({ type: "ADD_PLATE_TO_FAV", payload: data });
    },
    removeFromFav: data => {
      dispatch({ type: "DELETE_PLATE", payload: data });
    }
  })
)(Cart);

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 20
  },
  row: {
    flexDirection: "row",
    alignSelf: "stretch"
  },
  nextButtonText: {
    fontSize: 16,
    color: "#dcc49c",
    marginTop: 17,
    marginBottom: 17,
    textAlign: "center",
    letterSpacing: 0.8,
    fontFamily: "Stem-Regular"
  },
  column: {
    flexDirection: "column",
    alignSelf: "stretch"
  },
  container: {
    flex: 1,
    elevation: -10
  }
});
