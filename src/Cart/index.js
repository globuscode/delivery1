import React from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  Text,
  Alert
} from "react-native";
import { TextField } from "react-native-material-textfield";
import { LinearGradient } from "expo";
import Touchable from "react-native-platform-touchable";
import { connect } from "react-redux";
import propTypes from "prop-types";

import Counter from "../Counter";
import { adaptWidth } from "../etc";
import IconD from "../IconD";
import ButtonD from "../ButtonD";
import { host } from "../etc";
import { fetchJson } from "../utils";

const { width: viewportWidth } = Dimensions.get("window");

class Cart extends React.Component {
  navigationOptions = {
    tabBarVisible: false
  };
  constructor(props) {
    super(props);

    this.state = {
      sales: 0,
      change: 0,
      totalPrice: 0,
      promocode: "",
      withSales: 0,
      persons: 1,
      cart: [],
      canNav: true,
      cartSet: [],
      restaurant: {
        id: 0,
        title: "Джон Джоли",
        image:
          "http://lamcdn.net/the-village.ru/post_image-image/stUDrX37wGq1g-9mFWRl4A-article.jpg",
        logoImage: "https://image.ibb.co/fPo4vm/meatless_logo.png",
        favorite: false,
        tagGroups: [
          {
            title: "Россия",
            size: 15,
            icon: "http://gg.svg"
          },
          {
            id: 12,
            title: "Италия",
            size: 15,
            icon: "http://gg.svg"
          }
        ],
        minOrder: 8888,
        description: {
          title:
            "Настоящее грузинское гостеприимство в ресторанах «Джон Джоли»",
          description:
            "Хлебосольная, щедрая, сказочная, гостеприимная Грузия! Удивительная страна, которая известна своими застольями, подарила Москве частичку своей души."
        }
      }
    };
  }
  isInFav = ({ id }) => {
    if (typeof id === undefined) {
      return false;
    }
    for (let i = 0; i < this.props.favourite.plates.length; i++) {
      if (id === this.props.favourite.plates[i]) {
        return true;
      }
    }
  };
  componentWillReceiveProps = async newProps => {
    if (newProps.cart.length >= 1) {
      if (newProps.cart[0].plate.restaurant != this.state.restaurant.id) {
        const rest = await fetch(
          `${host}/restaurant?restaurantId=` + newProps.cart[0].plate.restaurant
        );
        const restJson = await rest.json();
        this.setState({ restaurant: restJson["data"]["result"] });
      }
    }

    this.state.totalPrice = this.totalPrice();
    const priceWithSales = await this.getSalesPrice(newProps);
    this.state.withSales = priceWithSales;
    this.setState({ change: this.change() });
  };

  componentWillMount = async () => {
    if (this.props.cart.length >= 1) {
      if (this.props.cart[0].plate.restaurant != this.state.restaurant.id) {
        const restJson = await fetchJson(
          `${host}/restaurant?restaurantId=` + this.props.cart[0].plate.restaurant
        );
        this.setState({ 
          restaurant: restJson["data"]["result"]
        });
      }
      this.setState({
        totalPrice: this.totalPrice()
      });
    }
  };

  componentDidMount = async () => {
    if (this.props.cart.length >= 1) {
      if (this.props.cart[0].plate.restaurant != this.state.restaurant.id) {
        const restJson = await fetchJson(
          `${host}/restaurant?restaurantId=` + this.props.cart[0].plate.restaurant
        );
        this.setState({ 
          restaurant: restJson["data"]["result"]
        });
      }
      this.setState({
        totalPrice: this.totalPrice()
      });
    }
  };

  clear = async () => {};

  renderButton = (title, callback) => {
    return (
      <View style={{ alignSelf: "stretch" }}>
        <View
          style={[
            styles.row,
            {
              justifyContent: "center",
              position: "absolute",
              width: viewportWidth - 30,
              borderWidth: 1,
              height: adaptWidth(44, 52, 57),
              marginTop: 31,
              marginBottom: 10,
              marginHorizontal: 15,
              alignItems: "center",
              alignContent: "center",
              borderRadius: 4,
              borderColor: "white"
            }
          ]}
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: 14,
              top: 2,
              fontFamily: "stem-medium"
            }}
          >
            {title}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0}
          onPress={callback}
          style={[
            styles.row,
            {
              justifyContent: "center",
              borderWidth: 1,
              height: adaptWidth(44, 52, 57),
              marginTop: 31,
              marginBottom: 10,
              marginHorizontal: 15,
              alignItems: "center",
              alignContent: "center",
              borderRadius: 4,
              borderColor: "#dcc49c"
            }
          ]}
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: 14,
              top: 2,
              fontFamily: "stem-medium"
            }}
          >
            {"Открыть меню ресторана"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  update = async () => {
    this.setState({});
  };

  totalPrice = () => {
    let result = 0;
    for (var i = 0; i < this.props.cart.length; i++) {
      result +=
        parseFloat(this.props.cart[i].plate.price) *
        parseFloat(this.props.cart[i].count);
    }

    return result;
  };

  _renderContent = (e, index) => {
    const imageHeight = adaptWidth(100, 117, 130);
    return (
      <View
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
          <Touchable
            style={{ position: "absolute", right: 5, top: 5 }}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            foreground={Touchable.SelectableBackgroundBorderless()}
            onPress={() => {
              if (this.isInFav(e.plate)) {
                this.props.removeFromFav(e.plate);
              } else {
                this.props.addToFav(e.plate);
              }
              this.setState({});
            }}
          >
            <View style={{ backgroundColor: "transparent" }}>
              <IconD
                name={this.isInFav(e.plate) ? "heart_full" : "heart_empty"}
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
                fontFamily: "stem-medium",
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
                fontFamily: "stem-medium"
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
                  this.props.removePlate(index);
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
                fontFamily: "stem-medium"
              }}
            >
              {e.plate.price.toString() + " ₽"}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  isFreeDelivery = () => {
    if (this.state.freeDelivery != undefined)
      return this.state.totalPrice >= this.state.restaurant.freeDelivery;
    else return false;
  };

  nav = () => {
    if (this.state.canNav) {
      this.props.navigation.navigate("RestaurantMenu", {
        id: this.state.restaurant.id
      });
      this.setState({ canNav: false });
      setTimeout(() => {
        this.setState({ canNav: true });
      }, 1500);
    }
  };

  getSalesPrice = async props => {
    if (props.cart.length == 0) return 0;
    const cart = props.cart.map(element => {
      return {
        plateId: element.plate.id,
        qty: element.count
      };
    });
    this.setState({ sales: this.state.totalPrice });
    let rest, restJson;
    try {
      rest = await fetch(`${host}/cart/create/`, {
        method: "post",
        body: JSON.stringify({ items: cart })
      });
    } catch (err) {
      Alert.alert("Ошибка", "Сервер не отвечает");
      this.setState({ sales: this.state.totalPrice });
      return 0;
    }
    try {
      restJson = await rest.json();
    } catch (err) {
      Alert.alert("Ошибка", "Сервер отвечает не правильно");
      this.setState({ sales: this.state.totalPrice });
      return 0;
    }

    if (restJson["data"]["items"] === undefined) {
      this.setState({ sales: this.state.totalPrice });
      return 0;
    }
    let result = 0;
    for (let i = 0; i < restJson["data"]["items"].length; i++) {
      result += parseInt(restJson["data"]["items"][i].price);
    }

    this.setState({ sales: result });
    return result;
  };

  change = () => {
    const total = this.state.totalPrice;
    return total - this.state.restaurant.minOrder;
  };

  render() {
    /*Storage.subscribe(() => {
      this.setState({});
    });*/
    const screen = adaptWidth(0, 1, 2);
    const change = this.change();
    if (this.props.cart.length != 0)
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
                  fontFamily: "open-sans",
                  fontSize: 12,
                  letterSpacing: 0.8,
                  textAlign: "center",
                  color: "rgb( 225, 199, 155)"
                }}
              >
                {"Ресторан установил ограничение \nна минимальную сумму заказа " +
                  this.state.restaurant.minOrder +
                  ".\nВам осталось выбрать еще на " +
                  (-change).toString() +
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
                fontFamily: "stem-medium",
                letterSpacing: 0.8
              }}
            >
              {this.getItemsCount().toString() +
                " позиции на сумму " +
                this.state.totalPrice +
                "₽"}
            </Text>
            {this.props.cart.map((e, i) => {
              return (
                <View key={i} style={{ flexDirection: "row" }}>
                  {this._renderContent(e, i)}
                </View>
              );
            })}
            <View
              style={{ height: screen == 0 ? 30 : screen == 1 ? 34 : 39.1 }}
            />
            <View
              style={{
                width: viewportWidth - 32,
                height: 1,
                borderWidth: 0,
                borderColor: "rgb(87, 88, 98)"
              }}
            />
            <View style={{ height: 20 }} />
            <View
              style={{
                height: 40,
                borderTopWidth: 1.5,
                borderColor: "rgb(87, 88, 98)",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginHorizontal: 16,
                alignSelf: "stretch"
              }}
            >
              <Text
                style={{
                  fontFamily: "stem-medium",
                  fontSize: 16,
                  color: "rgb(225, 199, 155)"
                }}
              >
                {"Количество персон: "}
              </Text>
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
            </View>
            {/*this.renderPromoCode()*/}
            <View
              style={{
                width: viewportWidth - 32,
                height: 1,
                borderWidth: 1,
                borderColor: "rgb( 87, 88, 98)"
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                height: screen == 0 ? 39 : screen == 1 ? 45 : 50,
                alignItems: "center",
                alignContent: "center",
                alignSelf: "stretch",
                marginHorizontal: 20
                //paddingTop: screen == 0 ? 10 : screen == 1 ? 13 : 15,
                //paddingBottom: screen == 0 ? 15 : screen == 1 ? 18 : 21,
              }}
            >
              <Text
                style={{
                  fontFamily: "stem-medium",
                  fontSize: 16,
                  lineHeight: 16,
                  top: 3,
                  letterSpacing: 1.1,
                  color: "rgb( 225, 199, 155)"
                }}
              >
                {"Сумма заказа"}
              </Text>
              <Text
                style={{
                  fontFamily: "stem-medium",
                  fontSize: 16,
                  textAlignVertical: "center",
                  top: 3,
                  lineHeight: 16,
                  letterSpacing: 1.1,
                  color: "rgb( 255, 255, 255)"
                }}
              >
                {this.state.totalPrice.toString() + " ₽"}
              </Text>
            </View>
            <View
              style={{
                width: viewportWidth - 32,
                height: 1,
                borderWidth: 1,
                borderColor: "rgb( 87, 88, 98)"
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                height: screen == 0 ? 39 : screen == 1 ? 45 : 50,
                alignItems: "center",
                alignContent: "center",
                alignSelf: "stretch",
                marginHorizontal: 20
                //paddingTop: screen == 0 ? 10 : screen == 1 ? 13 : 15,
                //paddingBottom: screen == 0 ? 15 : screen == 1 ? 18 : 21,
              }}
            >
              <Text
                style={{
                  fontFamily: "stem-medium",
                  fontSize: 16,
                  lineHeight: 16,
                  top: 3,
                  letterSpacing: 1.1,
                  color: "rgb( 225, 199, 155)"
                }}
              >
                {"Скидка"}
              </Text>
              <Text
                style={{
                  fontFamily: "stem-medium",
                  fontSize: 16,
                  textAlignVertical: "center",
                  top: 3,
                  lineHeight: 16,
                  letterSpacing: 1.1,
                  color: "rgb( 255, 255, 255)"
                }}
              >
                {(this.state.totalPrice - this.state.sales).toString() + " ₽"}
              </Text>
            </View>
            <View
              style={{
                width: viewportWidth - 32,
                height: 1,
                borderWidth: 1,
                borderColor: "rgb( 87, 88, 98)"
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                height: screen == 0 ? 39 : screen == 1 ? 45 : 50,
                alignItems: "center",
                alignContent: "center",
                alignSelf: "stretch",
                marginHorizontal: 20
                //paddingTop: screen == 0 ? 10 : screen == 1 ? 13 : 15,
                //paddingBottom: screen == 0 ? 15 : screen == 1 ? 18 : 21,
              }}
            >
              <Text
                style={{
                  fontFamily: "stem-medium",
                  fontSize: 16,
                  lineHeight: 16,
                  top: 3,
                  letterSpacing: 1.1,
                  color: "rgb( 225, 199, 155)"
                }}
              >
                {"Доставка"}
              </Text>
              <Text
                style={{
                  fontFamily: "stem-medium",
                  fontSize: 16,
                  textAlignVertical: "center",
                  top: 3,
                  lineHeight: 16,
                  letterSpacing: 1.1,
                  color: "rgb( 255, 255, 255)"
                }}
              >
                {!this.isFreeDelivery()
                  ? "бесплатно"
                  : this.state.restaurant.delivery}
              </Text>
            </View>
            <View
              style={{
                width: viewportWidth - 32,
                height: 1,
                borderWidth: 1,
                borderColor: "rgb( 87, 88, 98)"
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                height: screen == 0 ? 39 : screen == 1 ? 45 : 50,
                alignItems: "center",
                alignContent: "center",
                alignSelf: "stretch",
                marginHorizontal: 20
                //paddingTop: screen == 0 ? 10 : screen == 1 ? 13 : 15,
                //paddingBottom: screen == 0 ? 15 : screen == 1 ? 18 : 21,
              }}
            >
              <Text
                style={{
                  fontFamily: "stem-medium",
                  fontSize: 16,
                  lineHeight: 16,
                  top: 3,
                  letterSpacing: 1.1,
                  color: "rgb( 225, 199, 155)"
                }}
              >
                {"Итоговая сумма заказа"}
              </Text>
              <Text
                style={{
                  fontFamily: "stem-medium",
                  fontSize: 16,
                  textAlignVertical: "center",
                  top: 3,
                  lineHeight: 16,
                  letterSpacing: 1.1,
                  color: "rgb( 255, 255, 255)"
                }}
              >
                {this.state.sales + " ₽"}
              </Text>
            </View>
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
    return this.renderEmpty();
  }

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
            persons: this.state.persons
          });
        else
          this.props.navigation.navigate("Login", {
            nextScreen: "SetFullAddress"
          });
      }
    }
  };

  renderPromoCode() {
    const screen = adaptWidth(0, 1, 2);
    return (
      <View>
        <Text
          style={{
            fontFamily: "stem-medium",
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
            fontFamily: "open-sans",
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
          tintColor="#dcc49c"
          baseColor="rgb(87, 88, 98)"
          textColor="#fff"
          returnKeyType="send"
          style={{
            alignItems: "center",
            textAlign: "center"
          }}
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

  getItemsCount = () => {
    let result = 0;
    this.props.cart.map(e => {
      result += e.count;
    });
    return result;
  };

  renderEmpty = () => {
    const screen = adaptWidth(0, 1, 2);
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontFamily: "stem-medium",
              fontSize: 14,
              color: "rgb( 225, 199, 155)",
              letterSpacing: 0.9,
              alignSelf: "stretch",
              marginHorizontal: screen == 0 ? 32 : screen == 1 ? 37.5 : 41.4,
              marginTop: screen == 0 ? 18 : screen == 1 ? 21.1 : 23.3,
              marginBottom: screen == 0 ? 19 : screen == 1 ? 24.8 : 28.7
            }}
          >
            {"Начните заказ с любимого блюда"}
          </Text>
          <View
            style={{ height: screen == 0 ? 18 : screen == 1 ? 28.5 : 35.2 }}
          />
          <View
            style={{
              flexDirection: "row",
              alignSelf: "stretch",
              justifyContent: "space-between",
              marginLeft: 20,
              marginRight: screen == 0 ? 36.3 : screen == 1 ? 36.5 : 36.7
            }}
          >
            <Text
              style={{
                fontFamily: "open-sans",
                color: "#fff",
                fontSize: 12,
                lineHeight: 14,
                maxWidth: screen == 0 ? 195 : screen == 1 ? 230.8 : 273,
                letterSpacing: 0.8,
                top: Platform.OS == "ios" ? 2 : 0,
                textAlignVertical: "bottom"
              }}
            >
              {
                "Нажмите на значек корзины на карточке или рядом с описанием блюда"
              }
            </Text>
            <View>
              <IconD name="cart" size={40} color="rgb( 225, 199, 155)" />
            </View>
          </View>
          <View
            style={{ height: screen == 0 ? 18 : screen == 1 ? 28.5 : 35.2 }}
          />
          <View
            style={{
              width: viewportWidth - 30,
              height: 1,
              borderTopWidth: 1,
              borderColor: "rgb(87, 88, 98)"
            }}
          />
          <View
            style={{
              width: viewportWidth - 30,
              borderBottomWidth: 1,
              borderColor: "rgb(87, 88, 98)",
              paddingHorizontal: 5,
              paddingVertical: screen == 0 ? 22 : screen == 1 ? 26 : 39,
              justifyContent: "space-between",
              flexDirection: "row",
              alignSelf: "center"
            }}
          >
            <Text
              style={{
                maxWidth: 140,
                fontFamily: "open-sans",
                color: "#fff",
                fontSize: 12,
                letterSpacing: 0.8
              }}
            >
              {"Выберите кол-во блюд для заказа"}
            </Text>
            <Counter value={1} />
          </View>
          <View style={{ height: screen == 0 ? 22 : screen == 1 ? 26 : 39 }} />

          <View
            style={{
              alignSelf: "center"
            }}
          >
            <ButtonD
              onPress={() => this.props.navigation.navigate("Main")}
              title={["Добавить к заказу", "и перейти в ресторан"]}
              width={viewportWidth - 60}
            />
          </View>

          <View style={{ height: screen == 0 ? 22 : screen == 1 ? 26 : 39 }} />
          <Text
            style={{
              fontFamily: "open-sans",
              fontSize: 12,
              marginHorizontal: 20,
              letterSpacing: 0.8,
              color: "#fff"
            }}
          >
            {
              "При добавлении первого блюда в корзину, вы перейдете в меню ресторана, где сможете дополнить заказ другими блюдами"
            }
          </Text>
        </ScrollView>
        <View
          pointerEvents="none"
          style={{
            height: 60,
            position: "absolute",
            bottom: 0,
            width: viewportWidth
          }}
        >
          <LinearGradient
            colors={["rgba(39, 40, 48, 0)", "rgba(39, 40, 48, 1)"]}
            style={{
              flex: 1
            }}
          />
        </View>
      </View>
    );
  };
}

Cart.propTypes = {
  favourite: propTypes.object,
  navigation: propTypes.object,
  user: propTypes.object,
  cart: propTypes.array,
  removeFromFav: propTypes.func,
  addToFav: propTypes.func,
  addPlate: propTypes.func,
  removePlate: propTypes.func,
};

export default connect(
  state => ({
    cart: state.cart,
    favourite: state.favourite,
    user: state.user
  }),
  dispatch => ({
    removePlate: plateIndex =>
      dispatch({ type: "REMOVE_PLATE", index: plateIndex }),
    addPlate: plate => dispatch({ type: "ADD_PLATE", payload: plate }),
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
    fontFamily: "stem-regular"
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
