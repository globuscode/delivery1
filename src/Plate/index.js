import React from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  AsyncStorage,
  WebView,
  Platform,
  Text
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import HTMLView from "react-native-htmlview";
import LinearGradient from "react-native-linear-gradient";
import { getStatusBarHeight } from "react-native-status-bar-height";
import propTypes from "prop-types";
import PriceButton from "../PriceButton";
import { connect } from "react-redux";
import { adaptWidth } from "../etc";
import IconD from "../components/ui/IconD";
import Touchable from "react-native-platform-touchable";
import { host } from "../etc";
import { fetchJson } from "../etc";
import { getCartItemCount } from "../utils";
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const { width: viewportWidth } = Dimensions.get("window");

class Plate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canNav: true,
      userTastes: [],
      favourite: false,
      plate: {
        id: 101,
        shortTitle: "Шоколадный милкшейк",
        title: "Шоколадный милкшейк  карамелью и бананом",
        favorite: false,
        tagGroup: {
          title: "Итальянская кухня",
          icon: "ios-person",
          selected: false
        },
        image:
          "https://asideofsweet.com/wp-content/uploads/2016/08/Extreme-Freakshake-Smores-Milkshakes-Recipe2.jpg",
        price: 1,
        description:
          "Казалось бы, что делать в ресторане высокой кухни такому банальному блюду, как бургер? Однако он есть в здешнем меню – сделанный из говядины Черный Ангус, с выдержанным чеддером, обжаренными луковыми кольцами (их печально мало) и соусом барбекю, чей рецепт хранится в секрете.",
        tags: [
          {
            title: "Итальянская кухн]",
            icon: "ios-person",
            selected: false
          },
          {
            title: "Грузинская кухня",
            icon: "ios-person",
            selected: false
          },
          {
            title: "Паста",
            icon: "ios-person",
            selected: false
          },
          {
            title: "Домашняя кухня",
            icon: "ios-person",
            selected: false
          }
        ],
        weight: "200/ 100/ 230", // граммовки блюда
        restaurant: 999
      },
      restaurant: {
        id: 0,
        title: "Джон Джоли",
        image:
          "http://lamcdn.net/the-village.ru/post_image-image/stUDrX37wGq1g-9mFWRl4A-article.jpg",
        logoImage: "https://image.ibb.co/fPo4vm/meatless_logo.png",
        favorite: false,
        type: "Grill ресторан",
        /*
				tagGroups: [
						{
							"id": 12,
							"title": "<string>",
							"size": <float>,
							“icon”: “http://gg.svg”
						},
						<tag_grou_id>,
				],*/
        minOrder: 8888,
        description: {
          title:
            "Настоящее грузинское гостеприимство в ресторанах «Джон Джоли»",
          description:
            "Хлебосольная, щедрая, сказочная, гостеприимная Грузия! Удивительная страна, которая известна своими застольями, подарила Москве частичку своей души."
        },
        time: "с 11:00 до 22:30 \nпт, сб до 05:15",
        averageBill: 9000,
        minBill: 1000,
        web: "www.google.com"
        /*discount: <float>*/
      }
    };
  }

  componentWillMount = async () => {
    const tastes = await AsyncStorage.getItem("tastes");
    const tastesJson = JSON.parse(tastes);

    let restaurant = this.props.navigation.state.params.restaurant;
    if (!this.props.navigation.state.params.restaurant) {
      const restJson = await fetchJson(
        `${host}/restaurant?restaurantId=` +
          this.props.navigation.state.params.plate.restaurant
      );
      restaurant = restJson["data"]["result"];
    }
    this.setState({
      plate: this.props.navigation.state.params.plate,
      restaurant: restaurant,
      userTastes: tastesJson
    });

    this.state.favourite =
      this.props.favourite.plates[this.state.plate.id] != undefined;
    this.state.plate.tags = this.state.plate.tags.filter(onlyUnique);

    this.setState({});
  };

  checkTaste(taste) {
    for (let i = 0; i < this.state.userTastes.length; i++) {
      if (this.state.userTastes[i].title === taste.title) return true;
    }
    return false;
  }

  /**
   * Возвращает кнопку с ценой
   * @param {Number} price
   */
  _renderPrice = price => {
    return (
      <TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            //width: 100,
            borderWidth: 1,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            borderColor: "#dcc49c",
            paddingHorizontal: 5,
            backgroundColor: "transparent"
          }}
        >
          <View style={{}}>
            <IconD name="cart" size={12} color="#dcc49c" />
          </View>
          <Text
            style={{
              backgroundColor: "transparent",
              fontSize: 14,
              marginLeft: 10,
              fontFamily: "Stem-Medium",
              color: "#ffffff"
            }}
          >
            {price + " ₽"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderButton = (title, callback) => {
    const screen = adaptWidth(0, 1, 2);
    return (
      <View style={{ alignSelf: "stretch" }}>
        <View
          style={[
            styles.row,
            {
              justifyContent: "center",
              position: "absolute",
              paddingHorizontal: screen == 0 ? 6 : screen == 1 ? 7 : 8,
              paddingTop: adaptWidth(8, 9, 10),
              paddingBottom:
                Platform.OS === "ios"
                  ? adaptWidth(8, 9, 10)
                  : adaptWidth(8, 9, 10) - 1,
              borderWidth: 1.5,
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
              color: "rgb( 255, 255, 255)",
              fontSize: 14,
              alignSelf: "center",
              textAlign: "center",
              top: Platform.OS === "ios" ? 2 : 0,
              fontFamily: "Stem-Medium",
              width: screen == 0 ? 95 : screen == 1 ? 111 : 123
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
              borderWidth: 1.5,
              paddingHorizontal: screen == 0 ? 6 : screen == 1 ? 7 : 8,
              paddingTop: adaptWidth(8, 9, 10),
              paddingBottom:
                Platform.OS === "ios"
                  ? adaptWidth(8, 9, 10)
                  : adaptWidth(8, 9, 10) - 1,
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
              color: "rgb( 225, 199, 155)",
              fontSize: 14,
              alignSelf: "center",
              top: Platform.OS === "ios" ? 2 : 0,
              textAlign: "center",
              fontFamily: "Stem-Medium",
              width: screen == 0 ? 95 : screen == 1 ? 111 : 123
            }}
          >
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  /**
   * Возвращает пункт описания ресторана
   * @param {String} icon – иконка пункта
   * @param {String} title – заголовок пункта
   * @param {String} content – значение пункта
   */
  renderAboutItem = (icon, title, content) => {
    return (
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: 50, alignItems: "center" }}>
          <IconD name={icon} color={"#dcc49c"} size={30} />
        </View>
        <View style={{ marginBottom: 20 }}>
          <View
            style={[
              {
                justifyContent: "flex-start",
                alignContent: "flex-start",
                flexDirection: "column"
              }
            ]}
          >
            <Text style={{ color: "#dcc49c", fontSize: 11, lineHeight: 14 }}>
              {title}
            </Text>
            <Text style={{ color: "#ffffff", fontSize: 11, lineHeight: 14 }}>
              {content}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  nav = () => {
    if (this.state.canNav) {
      this.props.navigation.navigate("Loader", {
        id: this.state.restaurant.id,
        action: "navigateToRestaurant"
      });
      this.setState({ canNav: false });
      setTimeout(() => {
        this.setState({ canNav: true });
      }, 1500);
    }
  };

  componentWillReceiveProps = newProps => {
    this.props = newProps;
    this.setState({
      favourite: this.props.favourite.plates[this.state.plate.id] != undefined
    });
  };

  render() {
    const { cart } = this.props;
    let inCart = getCartItemCount(cart, this.state.plate) != 0;
    return (
      <View>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        >
          {/* Фото ресторана */}
          <Image
            source={{
              uri: "http:" + this.state.plate.image
            }}
            resizeMode={
              this.state.plate.image.indexOf(".png") > 0 ? "contain" : "cover"
            }
            style={{
              width: viewportWidth,
              height: adaptWidth(415, 485, 540)
            }}
          />
          <LinearGradient
            colors={["rgba(0,0,0, 1)", "rgba(34, 35, 39, 0)"]}
            style={{
              height: 200,
              position: "absolute",
              width: viewportWidth
            }}
          />

          <View
            style={{
              position: "absolute",
              justifyContent: "space-between",
              flexDirection: "row",
              alignSelf: "stretch",
              marginTop: getStatusBarHeight(),
              width: viewportWidth,
              paddingHorizontal: 21,
              paddingVertical: 10
            }}
          >
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon
                name="md-arrow-round-back"
                size={20}
                color="rgb(255, 255, 255)"
                style={{ backgroundColor: "transparent" }}
              />
            </TouchableOpacity>

            <View style={{ flexDirection: "column", justifyContent: "center" }}>
              <Text
                style={{
                  backgroundColor: "transparent",
                  textAlign: "center",
                  fontFamily: "Stem-Medium",
                  fontSize: 13,
                  maxWidth: viewportWidth - 80,
                  color: "#fff",
                  letterSpacing: 0.8
                }}
              >
                {this.state.plate.shortTitle}
              </Text>
              <TouchableOpacity onPress={this.nav}>
                <Text
                  style={{
                    backgroundColor: "transparent",
                    textAlign: "center",
                    fontFamily: "OpenSans",
                    fontSize: 10,
                    color: "#fff",
                    letterSpacing: 0.8
                  }}
                >
                  {this.state.restaurant.title}
                </Text>
              </TouchableOpacity>
            </View>

            <Touchable
              onPress={() => {
                if (this.state.favourite) {
                  this.props.removeFromFav(this.state.plate);
                  this.setState({ favourite: false });
                } else {
                  this.props.addToFav(this.state.plate);
                  this.setState({ favourite: true });
                }
              }}
            >
              <View style={{ backgroundColor: "transparent" }}>
                <IconD
                  name={this.state.favourite ? "heart_full" : "heart_empty"}
                  size={20}
                  color="rgb(255, 255, 255)"
                />
              </View>
            </Touchable>
          </View>
          <LinearGradient
            colors={["rgba(41,43,55, 0)", "rgba(34, 35, 39, 1)"]}
            style={{
              height: 100,
              position: "absolute",
              top: adaptWidth(415, 485, 540) - 100,
              width: viewportWidth
            }}
          />

          {/* Логотип ресторана */}
          <View
            style={{
              position: "absolute",
              top: adaptWidth(415, 485, 540) - 20
            }}
          >
            <Text
              style={{
                fontFamily: "Stem-Medium",
                fontSize: 18,
                lineHeight: 22,
                textAlign: "center",
                color: "#fff",
                paddingHorizontal: 20,
                backgroundColor: "transparent"
              }}
            >
              {this.state.plate.title}
            </Text>
          </View>
          <View style={{ height: 18 + 15 }} />

          {/* Ранг пользователя */}
          <View style={[styles.row, { justifyContent: "center" }]}>
            <Text
              style={{
                color: "#dcc49c",
                fontFamily: "OpenSans",
                fontWeight: "600",
                fontSize: 13,
                letterSpacing: 0.5,
                marginBottom: 14.4
              }}
            >
              {this.state.plate.tagGroup.title}
            </Text>
          </View>

          <PriceButton
            value={this.props.navigation.state.params.plate.price}
            count={inCart ? cart[this.state.plate.id].count : null}
            pressed={inCart}
            onPress={() => {
              let item = this.state.plate;
              const { cart } = this.props;
              const { fromMenu } = this.props.navigation.state.params;
              if (Object.keys(cart).length > 0) {
                const firstItemId = Object.keys(cart)[0];
                if (cart[firstItemId].plate.restaurant !== item.restaurant)
                  Alert.alert(
                    "Вы уверенны?",
                    "Вы добавили блюдо из другого ресторана. Ваша корзина из предыдущего ресторана будет очищена.",
                    [
                      {
                        text: "OK",
                        onPress: () => {
                          this.props.onAddPlate(item);
                          if (fromMenu === undefined)
                            this.props.openModal(item);
                        }
                      },
                      { text: "Отмена", onPress: null, style: "cancel" }
                    ],
                    { cancelable: false }
                  );
                else {
                  this.props.onAddPlate(item);
                  if (fromMenu === undefined)
                    if (cart[item.id] !== undefined)
                      this.props.openModal(item);
                }
              } else {
                this.props.onAddPlate(item);
                if (fromMenu === undefined) this.props.openModal(item);
              }
            }}
          />

          <View style={[styles.row, { justifyContent: "flex-start" }]}>
            {/*<Text style={{ 
					color: 'rgb( 225, 199, 155)', 
					fontSize: 13, 
					lineHeight: 17, 
					top: 4, 
					paddingHorizontal: 23.4,
					marginTop: adaptWidth(22, 39, 29)
				}}>{this.state.plate.description}</Text>*/}
            <View
              style={{
                paddingHorizontal: 23.4,
                marginTop: adaptWidth(22, 39, 29)
              }}
            >
              <HTMLView
                value={`<p>${this.state.plate.description}</p>`}
                stylesheet={styles}
              />
            </View>
          </View>

          {/* Название ресторана */}
          <View style={[styles.row, { justifyContent: "center" }]}>
            <Text
              style={{
                marginTop: adaptWidth(32, 40, 49),
                color: "#fff",
                fontSize: 16,
                fontFamily: "Stem-Medium",
                lineHeight: 28,
                letterSpacing: 0.9,
                top: 2
              }}
            >
              {"Тэги блюда"}
            </Text>
          </View>

          <View
            style={{
              width: viewportWidth,
              flexDirection: "row",
              justifyContent: "center",
              alignSelf: "center",
              flexWrap: "wrap",
              alignItems: "center"
            }}
          >
            {this.state.plate.tags.filter(onlyUnique).map((e, i) => {
              const checked = this.checkTaste(e);
              return (
                <TouchableOpacity
                  key={i}
                  style={{
                    height: 36,
                    padding: 10,
                    paddingHorizontal: 20,
                    justifyContent: "center",
                    borderRadius: 5,
                    flexDirection: "column-reverse",
                    margin: 5,
                    borderColor: "#dcc49c",
                    borderWidth: 1.5,
                    backgroundColor: checked ? "#dcc49c" : "transparent"
                  }}
                  pressed={0}
                >
                  <Text
                    style={{
                      fontFamily: "OpenSans",
                      fontWeight: "600",
                      fontSize: 11,
                      color: checked ? "#292b37" : "#dcc49c"
                    }}
                  >
                    {e.title.replace("\r", "").toUpperCase()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text
            style={{
              marginTop: adaptWidth(32, 40, 45),
              paddingHorizontal: adaptWidth(20, 24, 26),
              color: "rgb( 135, 136, 140)",
              fontSize: 13,
              fontFamily: "OpenSans",
              lineHeight: 17,
              letterSpacing: 0.6,
              top: 4
            }}
          >
            {"Блюдо входит в меню ресторана " +
              this.state.restaurant.title +
              ". Чтобы попробовать это чудесное блюдо: длбавьте его в заказ, и дополните заказ другими блюдами из меню ресторана. Как только сумма превысит " +
              this.state.restaurant.minOrder +
              " ₽, вы сможете оформить доставку из ресторана. "}
          </Text>

          <View
            style={[styles.row, { justifyContent: "center", marginTop: 30 }]}
          >
            <WebView
              bounces={false}
              scrollEnabled={false}
              source={{
                html:
                  "<div style='width:100%; height: 100%; background: url(http:" +
                  this.state.restaurant.logoImage +
                  ") center center no-repeat; background-size: contain' />"
              }}
              style={{
                width: viewportWidth - 40,
                height: 130,
                alignSelf: "center",
                backgroundColor: "transparent"
              }}
            />
          </View>

          <View>
            <View
              style={[styles.row, { justifyContent: "center", marginTop: 31 }]}
            >
              {this.renderButton("О ресторане", this.nav)}
            </View>

            {/* Минимальная сумма заказа и бесплатная доставка */}
            <View
              style={[
                { justifyContent: "center", flexDirection: "row", left: -15 }
              ]}
            >
              <View style={{ width: 40, top: -2 }}>
                <IconD color="rgb( 231, 208, 172)" size={30} name="truck" />
              </View>
              <Text
                style={{
                  color: "rgb(225, 199, 155)",
                  fontSize: 11,
                  fontFamily: "OpenSans",
                  lineHeight: 13,
                  top: 2,
                  marginLeft: 15,
                  minWidth: 190
                }}
              >
                {`Минимальная сумма \nзаказа ${
                  this.state.restaurant.minBill
                } ₽`}
              </Text>
            </View>
            <View
              style={[
                { justifyContent: "center", flexDirection: "row", left: -15 }
              ]}
            >
              <View style={{ width: 40, top: -2 }}>
                <IconD color="rgb( 231, 208, 172)" size={35} name="clock" />
              </View>
              <Text
                style={{
                  color: "rgb(225, 199, 155)",
                  fontSize: 11,
                  fontFamily: "OpenSans",
                  lineHeight: 13,
                  top: 2,
                  marginLeft: 18,
                  minWidth: 190
                }}
              >{`Ресторан принимает заказы \n${
                  this.state.restaurant.time
                }`}</Text>
            </View>
            <View
              style={[
                { justifyContent: "center", flexDirection: "row", left: -15 }
              ]}
            >
              <View style={{ width: 40 }}>
                <IconD color="rgb( 231, 208, 172)" size={26} name="card" />
              </View>
              <Text
                style={{
                  color: "rgb(225, 199, 155)",
                  fontSize: 11,
                  fontFamily: "OpenSans",
                  lineHeight: 13,
                  top: 2,
                  marginLeft: 15,
                  minWidth: 190
                }}
              >
                {"Мы принимаем все типы \nбанковских карт"}
              </Text>
            </View>
          </View>

          <View style={{ height: 60 }} />
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
          <View
            style={{
              height: 1,
              position: "absolute",
              alignSelf: "center",
              backgroundColor: "rgb(87, 88, 98)",
              bottom: 0,
              width: viewportWidth - 40
            }}
          />
        </View>
      </View>
    );
  }
}

Plate.propTypes = {
  navigation: propTypes.object,
  favourite: propTypes.object,
  cart: propTypes.object,
  removeFromFav: propTypes.func,
  addToFav: propTypes.func,
  onAddPlate: propTypes.func,
  openModal: propTypes.func
};

export default connect(
  ({ cart, modalController, favourite }) => ({
    cart: cart,
    modal: modalController,
    favourite: favourite
  }),
  dispatch => ({
    onAddPlate: plate => {
      dispatch({ type: "ADD_PLATE", payload: plate });
    },
    openModal: data => dispatch({ type: "OPEN_MODAL", payload: data }),
    changeModal: data => {
      dispatch({ type: "CHANGE_CONTENT", payload: data });
    },
    addToFav: data => {
      dispatch({ type: "ADD_PLATE_TO_FAV", payload: data });
    },
    removeFromFav: data => {
      dispatch({ type: "DELETE_PLATE", payload: data });
    }
  })
)(Plate);

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 20
  },
  row: {
    flexDirection: "row",
    alignSelf: "stretch"
  },
  column: {
    flexDirection: "column",
    alignSelf: "stretch"
  },
  container: {
    elevation: -10,
    backgroundColor: "rgb( 34, 35, 39)"
  },
  p: {
    color: "rgb( 225, 199, 155)",
    fontSize: 13,
    lineHeight: 17
  }
});
