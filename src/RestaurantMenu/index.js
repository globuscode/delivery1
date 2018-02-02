import React from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
  WebView,
  Text,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import Accordion from "react-native-collapsible/Accordion";
import { connect } from "react-redux";
import Touchable from "react-native-platform-touchable";
import HTMLView from "react-native-htmlview";
import PropTypes from "prop-types";
import * as Animatable from "react-native-animatable";

import Recomendations from "../Main/Recomendations";
import IconD from "../IconD";
import { adaptWidth } from "../etc";
import { fetchJson } from "../etc";
import { host } from "../etc";
import PriceButton from "../PriceButton";

const { width: viewportWidth } = Dimensions.get("window");
const hr = (
  <View
    style={{
      alignSelf: "stretch",
      margin: 20,
      height: 1,
      backgroundColor: "rgb(87, 88, 98)"
    }}
  />
);

class RestaurantMenu extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title,
      headerRight: (
        <Touchable
          onPress={navigation.state.params.onHeartPress}
          style={{
            aspectRatio: 1,
            height: 25,
            backgroundColor: "transparent"
          }}
        >
          <IconD
            name={
              navigation.state.params.favourite ? "heart_full" : "heart_empty"
            }
            size={18}
            color="#dcc49c"
          />
        </Touchable>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      rang: 0,
      hideInfo: false,
      canNav: true,
      favourite: false,
      data: this.props.navigation.state.params.restaurant,
      menu: this.props.navigation.state.params.menu
    };
  }

  componentWillReceiveProps = props => {
    let fav = false;
    for (let i = 0; i < props.favourite.restaurants.length; i++) {
      let rest = props.favourite.restaurants[i];
      if (rest === this.state.data.id) {
        fav = true;
      }
    }

    if (this.state.favourite != fav) {
      props.navigation.setParams({
        favourite: fav,
        title: this.state.data.title,
        onHeartPress: () => {
          if (!this.state.favourite) {
            this.props.addRestToFav({
              id: props.navigation.state.params.id
            });
          } else {
            this.props.removeRestFromFav({
              id: props.navigation.state.params.id
            });
          }
        }
      });

      this.setState({ favourite: fav });
    }
  };

  componentWillMount = async () => {
    let fav = false;

    for (let i = 0; i < this.props.favourite.restaurants.length; i++) {
      let rest = this.props.favourite.restaurants[i];
      if (rest === this.state.data.id) {
        fav = true;
      }
    }

    // const restaurantId = this.props.navigation.state
    //   ? this.props.navigation.state.params.id
    //   : (-1).toString();

    // let restaurantResponseJson = await fetchJson(
    //   `${host}/restaurant?restaurantId=${restaurantId}`
    // );

    // if (restaurantResponseJson.data === undefined) {
    //   Alert.alert("Ошибка", "Ошибка запроса");
    //   throw Error("Упс...");
    // }
    // if (restaurantResponseJson.data.result === undefined) {
    //   Alert.alert("Ошибка", "Ошибка запроса");
    //   throw Error("Упс...");
    // }

    this.props.navigation.setParams({
      favourite: fav,
      title: this.props.navigation.state.params.restaurant.title,
      onHeartPress: () => {
        if (!this.state.favourite) {
          this.props.addRestToFav({
            id: this.props.navigation.state.params.id
          });
        } else {
          this.props.removeRestFromFav({
            id: this.props.navigation.state.params.id
          });
        }
      }
    });

    this.state.favourite = fav;
    // this.state.data = this.props.navigation.state.params.restaurant;
    // this.setState({
    //   favourite: fav,
    //   data: restaurantResponseJson.data.result
    // });
  };

  componentDidMount = async () => {
    const restaurantId = this.props.navigation.state
      ? this.props.navigation.state.params.id
      : (-1).toString();
    // const response = await fetch(`${host}/restaurant?restaurantId=${restaurantId}`);
    // const responseJson = await response.json();

    // if (responseJson["data"] && responseJson["data"]["result"]) {
    //   responseJson["data"]["result"]["menu"] = [];
    //   this.state.data = responseJson['data']["result"];
    //   this.props.setLastViewed(responseJson['data']["result"]["id"]);
    // }
    this.props.navigation.setParams({
      title: this.state.data.title
    });

    if (this.props.navigation.state.params.menu != undefined) {
      return 0;
    }
    const menuResponseJson = await fetchJson(
      `${host}/restaurantMenu?restaurantId=${restaurantId}`
    );
    if (menuResponseJson["data"]) {
      if (menuResponseJson["data"]["result"]) {
        this.setState({ menu: menuResponseJson["data"]["result"] });
      }
    }
  };

  /**
   * Возвращает меню в формате массива объектов
   */
  toArrayMenu(menu) {
    var result = [];
    for (let type in menu) {
      result.push({
        plates: menu[type],
        type: type
      });
    }
    return result;
  }

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

  _renderHeader({ type }) {
    return (
      <View
        hitSlop={{ top: 12, bottom: 12 }}
        style={[
          styles.row,
          {
            justifyContent: "space-between",
            marginHorizontal:
              viewportWidth >= 320 && viewportWidth < 375
                ? 20
                : viewportWidth >= 375 && viewportWidth < 414 ? 23.7 : 26,
            paddingVertical: 12
          }
        ]}
      >
        {/*<Text
          style={{
            color: "#fff",
            fontSize: 16,
            fontFamily: "Stem-Medium",
            letterSpacing: 0.8
          }}
        >
          {type}
        </Text>*/}
        <HTMLView value={`<span>${type}</span>`} stylesheet={styles} />
        <Icon
          name="ios-arrow-down-outline"
          size={16}
          color="rgb( 111, 111, 111)"
        />
      </View>
    );
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

  _renderContent = ({ plates }, id, isActive) => {
    const imageHeight =
      viewportWidth >= 320 && viewportWidth < 375
        ? 100
        : viewportWidth >= 375 && viewportWidth < 414 ? 117 : 130;
    const { imageCacher } = this.props;
    // if (!isActive) return null;
    //const textMarginRight = (viewportWidth >= 320 && viewportWidth < 375) ? 40 : (viewportWidth >= 375 && viewportWidth < 414) ? 117 : 130;
    return (
      <Animatable.View
        animation={isActive ? "zoomIn" : "zoomOut"}
        style={{ flexDirection: "column", width: viewportWidth }}
      >
        {plates.map((e, i) => {
          const itemCount = this.getCount(e);
          return (
            <Touchable
              key={i}
              background={Touchable.Ripple("gray")}
              onPress={() => {
                if (this.state.canNav) {
                  this.props.navigation.navigate("Plate", {
                    plate: e,
                    restaurant: this.state.data
                  });
                  this.setState({ canNav: false });
                  setTimeout(() => {
                    this.setState({ canNav: true });
                  }, 1500);
                }
              }}
            >
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
                    borderWidth: e.image.indexOf(".png") > 0 ? 1.5 : 0,
                    borderColor: "rgb(225, 199, 155)",
                    borderRadius: 10
                  }}
                >
                  <Image
                    source={{
                      uri: "http:" + e.image,
                      cache: "force-cache"
                    }}
                    resizeMode={
                      e.image.indexOf(".png") > 0 ? "contain" : "cover"
                    }
                    style={{
                      width: imageHeight,
                      height: imageHeight,
                      borderWidth: e.image.indexOf(".png") > 0 ? 1.5 : 0,
                      borderColor: "rgb(225, 199, 155)",
                      borderRadius: 10
                    }}
                  />
                  {e.image.indexOf(".png") > 0 ? null : (
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
                      if (this.isInFav(e)) {
                        this.props.removeFromFav(e);
                      } else {
                        this.props.addToFav(e);
                      }
                      // this.setState({})
                    }}
                  >
                    <View style={{ backgroundColor: "transparent" }}>
                      <IconD
                        name={this.isInFav(e) ? "heart_full" : "heart_empty"}
                        size={18}
                        color="#dcc49c"
                      />
                    </View>
                  </Touchable>
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    marginLeft: 10,
                    marginBottom: 5,
                    flex: 1,
                    justifyContent: "space-between",
                    width: viewportWidth - 20 - 20 - imageHeight
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column"
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        color: "#fff",
                        fontSize: 15,
                        fontFamily: "Stem-Medium",
                        top: 3,
                        lineHeight: 18,
                        letterSpacing: 1
                      }}
                    >
                      {e.title}
                    </Text>
                    <View
                      style={{
                        marginBottom: 5
                      }}
                    >
                      <Text
                        numberOfLines={3}
                        style={{
                          color: "rgb(135, 136, 140)",
                          fontSize: 12,
                          lineHeight: 14,
                          marginBottom: 5
                        }}
                      >
                        {e.description
                          .replace(/(<([^>]+)>)/gi, "")
                          .replace(/  +/g, " ")}
                      </Text>
                      {/*<HTMLView
                        textComponentProps={{
                          numberOfLines: 1
                        }}
                        value={`<p>${e.description}</p>`}
                        stylesheet={styles}
                      />*/}
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <PriceButton
                      value={e.price}
                      pressed={itemCount !== 0}
                      count={itemCount}
                      onPress={async () => {
                        if (this.props.globalStore.length > 0) {
                          if (
                            this.props.globalStore[
                              this.props.globalStore.length - 1
                            ].plate.restaurant !== e.restaurant
                          )
                            Alert.alert(
                              "Вы уверенны?",
                              "Вы добавили блюдо из другого ресторана. Ваша корзина из предыдущего ресторана будет очищена.",
                              [
                                {
                                  text: "OK",
                                  onPress: () => this.props.onAddPlate(e)
                                },
                                {
                                  text: "Отмена",
                                  onPress: null,
                                  style: "cancel"
                                }
                              ],
                              { cancelable: false }
                            );
                          else this.props.onAddPlate(e);
                        } else this.props.onAddPlate(e);
                      }}
                    />
                    {itemCount === 0 ? null : (
                      <Touchable
                        background={Touchable.SelectableBackground()}
                        onPress={() => {
                          this.props.deletePlate(e);
                        }}
                        style={{
                          width: adaptWidth(28, 30, 34),
                          marginLeft: 10,
                          height: adaptWidth(28, 30, 34),
                          borderRadius: 4,
                          justifyContent: "center",
                          backgroundColor: "#dcc49c",
                          alignItems: "center"
                        }}
                      >
                        <Text style={{ color: "rgba(41,43,55, 1)" }}>
                          {"–"}
                        </Text>
                      </Touchable>
                    )}
                    <Text
                      style={{
                        color: "rgb(135, 136, 140)",
                        marginLeft: 10,
                        fontSize: 12,
                        lineHeight: 14,
                        maxWidth: 80,
                        letterSpacing: 0.4,
                        fontFamily: "OpenSans",
                        fontWeight: "600"
                      }}
                    >
                      {e.weight}
                    </Text>
                  </View>
                </View>
              </View>
            </Touchable>
          );
        })}
      </Animatable.View>
    );
  };

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
              height:
                viewportWidth >= 320 && viewportWidth < 375
                  ? 54
                  : viewportWidth >= 375 && viewportWidth < 414 ? 63 : 70,
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
              fontFamily: "Stem-Medium",
              top: Platform.OS === "ios" ? 2 : 0
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
              height:
                viewportWidth >= 320 && viewportWidth < 375
                  ? 54
                  : viewportWidth >= 375 && viewportWidth < 414 ? 63 : 70,
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
              fontFamily: "Stem-Medium",
              top: Platform.OS === "ios" ? 2 : 0
            }}
          >
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  getCount = plate => {
    var i = 0;
    while (i < this.props.globalStore.length) {
      let equalTitle = plate.title === this.props.globalStore[i].plate.title;
      let equalId = plate.id === this.props.globalStore[i].plate.id;
      let equalRestaurant =
        plate.restourant == this.props.globalStore[i].plate.restourant;
      if (equalTitle && equalRestaurant && equalId) {
        return this.props.globalStore[i].count;
      }
      i++;
    }
    return 0;
  };

  render() {
    const { params } = this.props.navigation.state;
    //this.navigationOptions.title = this.state.data.title;
    var restaurant = (
      <View>
        <ScrollView
          ref={c => (this.scroll = c)}
          style={styles.container}
          contentContainerStyle={{
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        >
          {/* Фото ресторана */}
          <Image
            source={{
              uri: "http:" + this.state.data.image,
              cache: "force-cache"
            }}
            style={{
              width: viewportWidth,
              height:
                viewportWidth >= 320 && viewportWidth < 375
                  ? 230
                  : viewportWidth >= 375 && viewportWidth < 414 ? 236 : 262
            }}
          />
          <LinearGradient
            colors={["rgba(41,43,55, 0)", "rgba(41,43,55, 1)"]}
            style={{
              height: 100,
              position: "absolute",
              top:
                (viewportWidth >= 320 && viewportWidth < 375
                  ? 230
                  : viewportWidth >= 375 && viewportWidth < 414 ? 236 : 262) -
                100 +
                2,
              width: viewportWidth
            }}
          />

          {/* Логотип ресторана */}
          <View
            style={{
              position: "absolute",
              top:
                (viewportWidth >= 320 && viewportWidth < 375
                  ? 230
                  : viewportWidth >= 375 && viewportWidth < 414 ? 236 : 262) -
                60
            }}
          >
            <WebView
              bounces={false}
              scrollEnabled={false}
              source={{
                html:
                  "<div style='width:100%; height: 100%; background: url(http:" +
                  this.state.data.logoImage +
                  ") center center no-repeat; background-size: contain' />"
              }}
              style={{
                width: viewportWidth - 60,
                height: 120,
                backgroundColor: "transparent"
              }}
            />
          </View>
          <View style={{ height: 70 }} />

          {/* Ранг пользователя
			<View style={[styles.row, { justifyContent: 'center' }]}>
				<Text style={{ color: '#dcc49c', fontFamily: "OpenSans", fontWeight: "600", fontSize: 11 }}>{'Новичок'}</Text>
			</View>
			<View style={[styles.row, { justifyContent: 'center' }]}>
				{[1, 2, 3].map(e =>
					<View
						key={e}
						style={{ margin: 3.3 }}>
						<IconD
							name='dostavka'
							color={e <= this.state.rang ? '#dcc49c' : 'rgb(87, 88, 98)'}
							size={16} />
					</View>)}
			</View> */}

          {/* Кнопка Хочу скидку
			<View style={[styles.row, { justifyContent: 'center' }]}>
				<TouchableOpacity>
					<View style={{
						margin: 5,
					}}>
					<Text style={{
						color: 'white',
						fontFamily: "OpenSans", fontWeight: "600",
						fontSize: 11
					}}>{'Акция пицца в подарок'}</Text></View>
				</TouchableOpacity>
			</View> */}

          {/* Описание ресторана */}
          <View style={{ height: 15 }} />
          {this.state.hideInfo ? null : (
            <View
              style={{
                alignItems: "flex-start",
                alignSelf: "stretch",
                marginTop: 0,
                marginBottom: 49,
                marginHorizontal: 20
              }}
            >
              <View style={[styles.row, { justifyContent: "flex-start" }]}>
                {this.state.data.description.title == "" ? null : (
                  <Text
                    style={{
                      color: "#dcc49c",
                      fontSize: 13,
                      lineHeight: 16,
                      letterSpacing: 0.6,
                      top: 3
                    }}
                  >
                    {this.state.data.description.title}
                  </Text>
                )}
              </View>
              {this.state.data.description.description == "" ? null : (
                <View style={{ height: 17 }} />
              )}
              <View style={[styles.row, { justifyContent: "flex-start" }]}>
                {this.state.data.description.description == "" ? null : (
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 13,
                      lineHeight: 17,
                      top: 4
                    }}
                  >
                    {this.state.data.description.description}
                  </Text>
                )}
              </View>
            </View>
          )}

          {/* О ресторане */}
          {this.state.hideInfo ? null : (
            <View>
              <View style={[styles.row, { justifyContent: "center" }]}>
                <Text
                  style={{
                    color: "#dcc49c",
                    marginBottom: 20,
                    letterSpacing: 0.4,
                    fontFamily: "OpenSans",
                    fontWeight: "600",
                    fontSize: 13
                  }}
                >
                  {"О ресторане"}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  left: -30
                }}
              >
                {/* Минимальный счет */}
                {this.renderAboutItem(
                  "clock",
                  "Время работы",
                  this.state.data.time
                )}
                {/* Минимальный счет */}
                {this.renderAboutItem(
                  "coins",
                  "Средний счет",
                  this.state.data.averageBill.toString() + "₽"
                )}
                {/* Минимальный счет */}
                {this.renderAboutItem(
                  "truck",
                  "Минимальный счет",
                  this.state.data.minBill.toString() + "₽"
                )}
              </View>
            </View>
          )}

          <TouchableOpacity
            onPress={() => this.setState({ hideInfo: !this.state.hideInfo })}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#dcc49c",
                opacity: 0.5,
                marginBottom: 20,
                letterSpacing: 0.9,
                lineHeight: 15,
                top: 2,
                fontFamily: "OpenSans",
                fontWeight: "600",
                fontSize: 13
              }}
            >
              {(this.state.hideInfo ? "Показать" : "Скрыть") +
                " информацию \nо ресторане"}
            </Text>
          </TouchableOpacity>

          {/* Кнопка Прейти к меню */}

          {this.state.data.bestPlates == undefined
            ? null
            : this.renderButton("Перейти к меню", () => {
              this.scroll.scrollToEnd({ animated: true });
            })}

          {/* Лучшие блюда */}
          {hr}
          {this.state.data.bestPlates == undefined ? null : (
            <View
              style={[
                styles.row,
                { justifyContent: "flex-start", marginTop: 12 }
              ]}
            >
              <Text style={{ color: "#FFF", fontSize: 20, marginLeft: 20 }}>
                {"Лучшие блюда"}
              </Text>
            </View>
          )}
          {this.state.data.bestPlates == undefined ? null : (
            <View style={{ height: (viewportWidth - 40) * 1.32 + 130 }}>
              <Recomendations
                data={this.state.data.bestPlates}
                navigation={this.props.navigation}
              />
            </View>
          )}

          {/* Меню ресторана */}
          <View
            style={[
              styles.row,
              {
                justifyContent: "flex-start",
                marginHorizontal: 0,
                marginVertical: 13
              }
            ]}
          >
            <Text
              style={{
                color: "#FFF",
                fontSize: 16,
                fontFamily: "Stem-Medium",
                letterSpacing: 0.8,
                marginLeft:
                  viewportWidth >= 320 && viewportWidth < 375
                    ? 20
                    : viewportWidth >= 375 && viewportWidth < 414 ? 23.7 : 26
              }}
            >
              {"Меню ресторана"}
            </Text>
          </View>
          <View
            style={{
              alignSelf: "stretch",
              marginHorizontal: 10,
              height: 1,
              backgroundColor: "rgb(87, 88, 98)"
            }}
          />
          {/* this.state.menu.length < 1 ? (
            <ActivityIndicator
              size="large"
              style={{ alignSelf: "center", marginTop: 60 }}
            />
          ) : null */}
          <Accordion
            touchableProps={{
              activeOpacity: 0.2,
              background: Touchable.Ripple("gray")
            }}
            duration={500}
            touchableComponent={Touchable}
            underlayColor="#292b37"
            style={{ alignSelf: "flex-start", width: viewportWidth }}
            sections={params.menu != undefined ? params.menu : []}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />

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

    return restaurant;
  }

  renderIcon = (name, tab) => {
    if (!IconD) return <View />;
    return (
      <TouchableOpacity onPress={() => this.setState({ selectedTab: tab })}>
        <View>
          <IconD size={25} name={name} color={"#e1c79b"} />
        </View>
      </TouchableOpacity>
    );
  };
}

RestaurantMenu.propTypes = {
  navigation: PropTypes.object,
  favourite: PropTypes.object,
  imageCacher: PropTypes.object,
  addToFav: PropTypes.func,
  removeFromFav: PropTypes.func,
  addRestToFav: PropTypes.func,
  removeRestFromFav: PropTypes.func,
  onAddPlate: PropTypes.func,
  deletePlate: PropTypes.func,
  globalStore: PropTypes.array
};

export default connect(
  state => ({
    globalStore: state.cart,
    favourite: state.favourite
  }),
  dispatch => ({
    onAddPlate: plate => {
      dispatch({ type: "ADD_PLATE", payload: plate });
    },
    deletePlate: plate => {
      dispatch({ type: "REMOVE_PLATE_BY_OBJECT", payload: plate });
    },
    setLastViewed: id =>
      dispatch({ type: "SET_VIEWED_RESTAURANT", payload: id }),
    addToFav: data => {
      dispatch({ type: "ADD_PLATE_TO_FAV", payload: data });
    },
    removeFromFav: data => {
      dispatch({ type: "DELETE_PLATE", payload: data });
    },
    addRestToFav: data => {
      dispatch({ type: "ADD_RESTAURANT_TO_FAV", payload: data });
    },
    removeRestFromFav: data => {
      dispatch({ type: "DELETE_RESTAURANT", payload: data });
    }
  })
)(RestaurantMenu);

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
    backgroundColor: "rgba(41,43,55, 1)"
  },
  p: {
    color: "rgb(135, 136, 140)",
    fontSize: 12,
    lineHeight: 14,
    marginBottom: 5
  },
  span: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Stem-Medium",
    letterSpacing: 0.8
  }
});
