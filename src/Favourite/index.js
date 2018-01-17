import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  Dimensions,
  Alert,
  Image
} from "react-native";
import { connect } from "react-redux";
import HTMLView from "react-native-htmlview";
import { adaptWidth } from "../etc";
import { Constants } from "expo";
import SegmentedControlTab from "react-native-segmented-control-tab";
import Touchable from "react-native-platform-touchable";
import { LinearGradient } from "expo";

import propTypes from "prop-types";
import PriceButton from "../PriceButton";
import IconD from "../IconD";
import { host } from "../etc";
import { fetchJson } from "../utils";
const { width: viewportWidth } = Dimensions.get(
  "window"
);

/**
 * Возвращает колличество блюд plate в корзине
 * @param {Object} cart
 * @param {Object} plate
 */
function getCount(cart, plate) {
  var i = 0;
  while (i < cart.length) {
    let equalTitle = plate.title == cart[i].plate.title;
    let equalRestaurant = plate.restourant == cart[i].plate.restourant;
    if (equalTitle && equalRestaurant) {
      return cart[i].count;
    }
    i++;
  }
  return 0;
}

class Favourite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedView: 0,
      restaurans: [],
      canNav: true,
      favourite: {
        plates: [],
        collections: [],
        restaurants: []
      },
      favouriteIds: {
        plates: [],
        collections: [],
        restaurants: []
      }
    };
  }

  getCount = plate => {
    var i = 0;
    while (i < this.props.cart.length) {
      let equalTitle = plate.title == this.props.cart[i].plate.title;
      let equalRestaurant =
        plate.restourant == this.props.cart[i].plate.restourant;
      if (equalTitle && equalRestaurant) {
        return this.props.cart[i].count;
      }
      i++;
    }
    return 0;
  };

  _renderSinglePlate = (item, index) => {
    /* Разметка */
    const SLIDER_WIDTH = viewportWidth - adaptWidth(2 * 20, 2 * 24, 26);
    const SLIDER_MARGIN = adaptWidth(10, 11.7, 13.2) / 2;
    const SLIDER_HEIGHT = SLIDER_WIDTH * 1.32;

    /* Стили карточки */
    const itemStyles = StyleSheet.create({
      containerSlider: {
        margin: SLIDER_MARGIN,
        height: SLIDER_HEIGHT,
        width: SLIDER_WIDTH
      },
      viewSlider: {
        flex: 1,
        padding: 20,

        width: SLIDER_WIDTH,
        height: SLIDER_HEIGHT,
        justifyContent: "space-between",
        backgroundColor: "#272833",
        borderRadius: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5
      },
      BG_IMAGE: {
        width: SLIDER_WIDTH,
        top: item.image.indexOf(".png") > 0 ? SLIDER_HEIGHT * 0.5 / 3 : 0,
        height:
          item.image.indexOf(".png") > 0
            ? SLIDER_HEIGHT * 2 / 3
            : SLIDER_HEIGHT,
        borderRadius: 10,
        position: "absolute",
        backgroundColor: "transparent"
      },
      GRADIENT_STYLE: {
        height: SLIDER_HEIGHT + 0.5,
        top: -0.5,
        position: "absolute",
        width: SLIDER_WIDTH + 0.5,
        left: -0.5,
        borderRadius: 10
      },
      titleTextStyle: {
        flexDirection: "row",
        backgroundColor: "transparent",
        fontSize: 20,
        color: "#ffffff",
        fontFamily: "stem-medium",
        maxWidth: viewportWidth - 100
      },
      restourantTextStyle: {
        flexDirection: "row",
        backgroundColor: "transparent",
        fontSize: 12,
        color: "#dcc49c",
        letterSpacing: 0.5,
        fontFamily: "stem-medium"
      },
      weightTextStyle: {
        flexDirection: "row",
        backgroundColor: "transparent",
        fontSize: 12,
        color: "rgb(119, 122, 136)",
        letterSpacing: 0.5,
        fontFamily: "stem-medium"
      },
      topViewStyle: {
        flexDirection: "row",
        justifyContent: "space-between"
      }
    });

    const GRADIENT_COLORS = [
      "rgba(0,0,0, 0.8)",
      "transparent",
      "rgba(0,0,0, 0.8)"
    ];

    // Компонент с названием блюда
    var titleText = <Text style={itemStyles.titleTextStyle}>{item.title}</Text>;

    // Компонент с названием ресторана
    var restourantText = (
      <Text style={itemStyles.restourantTextStyle}>{item.restourant}</Text>
    );

    // Компонент с весом блюда
    var weightText = (
      <Text style={itemStyles.weightTextStyle}>{item.weight}</Text>
    );

    // Компонент с кнопкой добавить в избранное
    var heartButton = (
      <View>
        <Touchable
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          background={Touchable.SelectableBackgroundBorderless()}
          onPress={() => {
            this.props.onDeletePlate(item);
          }}
        >
          <View style={{ backgroundColor: "transparent" }}>
            <IconD name={"trash"} size={18} color="#dcc49c" />
          </View>
        </Touchable>
      </View>
    );
    // Верхняя половина карточки
    var topView = (
      <View style={itemStyles.topViewStyle}>
        <View>
          <Touchable
            activeOpacity={0.8}
            onPress={() => {
              this.nav(index);
            }}
          >
            <View>
              {/* Название блюда */}
              {titleText}

              {/* Название ресторана */}
              {restourantText}

              {/* Вес блюда */}
              {weightText}
            </View>
          </Touchable>
        </View>

        {heartButton}
      </View>
    );
    var logo = (
      <Image
        onLoadEnd={() => {
          this.setState({});
        }}
        resizeMode="contain"
        style={{
          width: SLIDER_WIDTH / 3,
          height: SLIDER_WIDTH / 3
        }}
        source={{
          uri: this.state.restaurans[index]
            ? "http:" + this.state.restaurans[index].logoImage
            : "http://dostavka1.com/img/app-icon.png"
        }}
      />
    );
    var itemCount = getCount(this.props.cart, item);
    var bottomView = (
      <View
        pointerEvents="box-none"
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          height: SLIDER_WIDTH / 3
        }}
      >
        <Touchable
          activeOpacity={0.8}
          onPress={() => {
            this.nav(index);
          }}
        >
          {logo}
        </Touchable>
        <PriceButton
          count={itemCount}
          pressed={itemCount != 0}
          value={item.price}
          onPress={() => {
            if (this.props.cart.length > 0) {
              if (
                this.props.cart[this.props.cart.length - 1].plate.restaurant !==
                item.restaurant
              )
                Alert.alert(
                  "Вы уверенны?",
                  "Вы добавили блюдо из другого ресторана. Ваша корзина из предыдущего ресторана будет очищена.",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        this.props.onAddPlate(item);
                        this.props.open(item);
                      }
                    },
                    { text: "Отмена", onPress: null, style: "cancel" }
                  ],
                  { cancelable: false }
                );
              else {
                this.props.onAddPlate(item);
                this.props.open(item);
              }
            } else {
              this.props.onAddPlate(item);
              this.props.open(item);
            }
          }}
        />
      </View>
    );

    return (
      <View key={index} style={itemStyles.containerSlider}>
        <View style={itemStyles.viewSlider}>
          {/* Задний фон карточки */}
          <Touchable
            activeOpacity={0.8}
            foreground={Touchable.SelectableBackgroundBorderless()}
            style={{
              position: "absolute",
              height: SLIDER_HEIGHT,
              width: SLIDER_WIDTH,
              borderRadius: 10
            }}
            onPress={() => {
              this.nav(index);
            }}
          >
            <View>
              <Image
                resizeMode={
                  item.image.indexOf(".png") < 0 ? "cover" : "contain"
                }
                style={itemStyles.BG_IMAGE}
                source={{ uri: "http:" + item.image }}
              />

              {/* Градиент */}
              <LinearGradient
                colors={GRADIENT_COLORS}
                style={itemStyles.GRADIENT_STYLE}
              />
            </View>
          </Touchable>

          {topView}

          {bottomView}
        </View>
      </View>
    );
  };

  renderPlates = () => {
    return this._renderContent(this.state.favourite.plates);
  };

  nav = () => {};

  renderRestaurants = () => {
    return this.state.favourite.restaurants.map(this._renderSingleRestaurant);
  };

  _renderSingleRestaurant = (item, index) => {
    const screen =
      viewportWidth >= 320 && viewportWidth < 375
        ? 0
        : viewportWidth >= 375 && viewportWidth < 414 ? 1 : 2;
    const SLIDER_WIDTH =
      screen == 0
        ? viewportWidth - 2 * 20
        : screen == 1 ? viewportWidth - 2 * 24 : viewportWidth - 26;
    return (
      <View
        key={index}
        style={[
          styles.itemContainer,
          { width: SLIDER_WIDTH, height: SLIDER_WIDTH }
        ]}
      >
        <Touchable
          foreground={Touchable.SelectableBackgroundBorderless()}
          activeOpacity={0.8}
          style={{
            position: "absolute",
            width: SLIDER_WIDTH,
            height: SLIDER_WIDTH
          }}
          onPress={() =>
            this.props.navigation.navigate("Restaurant", { id: item.id })
          }
        >
          <View>
            <Image
              onLoadEnd={() => this.setState({})}
              style={[
                styles.itemBackgroundImage,
                { width: SLIDER_WIDTH, height: SLIDER_WIDTH }
              ]}
              source={{ uri: "http:" + item.image }}
            />
            <LinearGradient
              colors={["rgba(0,0,0, 0.8)", "transparent", "rgba(0,0,0, 0.8)"]}
              style={[
                styles.itemGradientStyle,
                { width: SLIDER_WIDTH + 1, height: SLIDER_WIDTH + 1 }
              ]}
            />
          </View>
        </Touchable>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {/*<View style={{ flexDirection: 'row', alignSelf: 'flex-start'  }}>
            {this.renderLevel(item.level)}                
            <Text style={{
              paddingHorizontal: 5,
              maxWidth: 150,
              //fontFamily: 'stem-medium',
              fontWeight: 'bold',
              fontSize: 13,
              backgroundColor: '#dcc49c',
              color: '#292b37',
              }}>{item.discount}</Text>
            </View>*/}
          <View>{this.renderHeart(index)}</View>
        </View>
        <View
          pointerEvents="none"
          style={{
            flexDirection: "column",
            justifyContent: "flex-end",
            backgroundColor: "transparent"
          }}
        >
          {this.renderLogo(item.logoImage)}
          <Text
            style={{
              color: "white",
              fontSize: 14,
              lineHeight: 22,
              fontFamily: "stem-medium",
              alignItems: "flex-end",
              letterSpacing: 0.4
            }}
          >
            {item.title}
          </Text>
        </View>
      </View>
    );
  };

  fav = () => {
    //this.state.favourite.restaurants[index].favourite = !this.state.favourite.restaurants[index].favourite;
    this.setState({});
  };

  renderLevel = level => {
    var result = [];
    for (var i = 0; i < level; i++)
      result.push(
        <View
          key={i}
          style={{
            width: 16,
            height: 16,
            backgroundColor: "rgb( 38, 39, 50)",
            marginRight: 5
          }}
        >
          <IconD name="dostavka" size={16} color={"#dcc49c"} />
        </View>
      );
    return result;
  };

  renderHeart(index) {
    return (
      <TouchableOpacity
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        onPress={() => {
          this.props.onDeleteRestaurant(
            this.state.favourite.restaurants[index]
          );
          this.fav(index);
        }}
      >
        <View style={{ backgroundColor: "transparent" }}>
          <IconD name={"trash"} size={18} color="#dcc49c" />
        </View>
      </TouchableOpacity>
    );
  }

  renderLogo(logo) {
    const screen =
      viewportWidth >= 320 && viewportWidth < 375
        ? 0
        : viewportWidth >= 375 && viewportWidth < 414 ? 1 : 2;
    const SLIDER_WIDTH = screen == 0 ? 280 : screen == 1 ? 328.1 : 362.3;

    return (
      <Image
        resizeMode="contain"
        style={{
          width: SLIDER_WIDTH / 3,
          height: SLIDER_WIDTH / 3,
          backgroundColor: "transparent"
        }}
        source={{ uri: "http:" + logo }}
      />
    ); /*
      return <View style={{ height: SLIDER_WIDTH / 3 }}>
        <WebView
          bounces={false}
          scrollEnabled={false}
          source={{
            html: `<img 
              src="` + logo + `"
              style="
              width:100%;">`
          }}
          style={{
            width: SLIDER_WIDTH / 3,
            height: SLIDER_WIDTH / 3,
            backgroundColor: 'transparent',
          }} />
      </View>*/
  }

  renderCollections = () => {
    return null;
  };

  _renderContent = plates => {
    const imageHeight =
      viewportWidth >= 320 && viewportWidth < 375
        ? 100
        : viewportWidth >= 375 && viewportWidth < 414 ? 117 : 130;
    //const textMarginRight = (viewportWidth >= 320 && viewportWidth < 375) ? 40 : (viewportWidth >= 375 && viewportWidth < 414) ? 117 : 130;
    return (
      <View style={{ flexDirection: "column", width: viewportWidth }}>
        {plates.map((e, i) => {
          const itemCount = this.getCount(e);
          return (
            <Touchable
              key={i}
              background={Touchable.Ripple("gray")}
              onPress={() => {
                if (this.state.canNav) {
                  this.props.navigation.navigate("Plate", { plate: e });
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
                      uri: "http:" + e.image
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
                  {e.image.indexOf(".png") > 0 ? null : <LinearGradient
                    colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]}
                    start={[0, 1]}
                    end={[1, 0]}
                    style={{
                      width: imageHeight,
                      height: imageHeight,
                      borderRadius: 10,
                      position: "absolute"
                    }}
                  />}
                  <Touchable
                    style={{ position: "absolute", right: 5, top: 5 }}
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                    foreground={Touchable.SelectableBackgroundBorderless()}
                    onPress={() => {
                      this.props.onDeletePlate(e);
                      this.setState({});
                    }}
                  >
                    <View style={{ backgroundColor: "transparent" }}>
                      <IconD name={"trash"} size={18} color="#dcc49c" />
                    </View>
                  </Touchable>
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    marginLeft: 10,
                    marginVertical: 5,
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
                      style={{
                        color: "#fff",
                        fontSize: 15,
                        fontFamily: "stem-medium",
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
                      <HTMLView
                        value={`<p>${e.description}</p>`}
                        stylesheet={styles}
                      />
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
                        fontFamily: "open-sans-semibold"
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
      </View>
    );
  };

  componentWillMount = () => {
    this.componentWillReceiveProps(this.props);
  };

  componentWillReceiveProps = async newProps => {
    await AsyncStorage.setItem("fav", JSON.stringify(newProps.favourite));

    this.state.favouriteIds.plates = newProps.favourite.plates;
    this.state.favouriteIds.restaurants = newProps.favourite.restaurants;

    this.state.favouriteIds.plates = [];
    this.state.favourite.plates = [];
    this.state.restaurans = [];
    for (let i=0; i<newProps.favourite.plates.length; i++) {
      let plate = newProps.favourite.plates[i];

      let responseJson = await fetchJson(`${host}/plate?plate=${plate}`);
      this.state.favourite.plates.push(responseJson.data[0]);
      let responsePlateRestJson = await fetchJson(
        `${host}/restaurant?restaurantId=${responseJson.data[0].restaurant}`
      );
      if (responsePlateRestJson.data.result != undefined)
        this.state.restaurans.push(responsePlateRestJson.data.result);
    }

    this.state.favouriteIds.restaurants = [];
    this.state.favourite.restaurants = [];
    for (let i=0; i<newProps.favourite.restaurants.length; i++) {
      let restaurant = newProps.favourite.restaurants[i];
      let responseRestJson = await fetchJson(
        `${host}/restaurant?restaurantId=${restaurant}`
      );
      if (responseRestJson.data.result != undefined)
        this.state.favourite.restaurants.push(responseRestJson.data.result);
    }
    this.setState({});
  };

  render = () => {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ paddingTop: Constants.statusBarHeight }}>
          <Text
            style={{
              fontFamily: "stem-medium",
              fontSize: 15,
              marginTop: adaptWidth(16, 12, 14),
              marginBottom: 8,
              color: "#fff",
              alignSelf: "stretch",
              textAlign: "center"
            }}
          >
            {"Избранное"}
          </Text>
          <View
            style={{
              alignSelf: "stretch",
              marginHorizontal: 15
            }}
          >
            <SegmentedControlTab
              tabStyle={styles.tabStyle}
              tabTextStyle={styles.tabTextStyle}
              activeTabStyle={styles.activeTabStyle}
              activeTabTextStyle={styles.activeTabTextStyle}
              values={["Блюда", "Рестораны" /*'Подборки'*/]}
              selectedIndex={this.state.selectedView}
              onTabPress={index => this.setState({ selectedView: index })}
            />
          </View>

          <View
            style={{
              flexDirection: "column",
              alignSelf: "stretch",
              alignItems: "center"
            }}
          >
            {this.state.selectedView != 0 ? null : this.renderPlates()}
            {this.state.selectedView != 1 ? null : this.renderRestaurants()}
            {this.state.selectedView != 3 ? null : this.renderCollections()}
          </View>

          <View style={{ height: 70 }} />
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
export default connect(
  state => ({
    favourite: state.favourite,
    cart: state.cart,
    modal: state.modalController
  }),
  dispatch => ({
    onDeletePlate: fav =>
      dispatch({
        type: "DELETE_PLATE",
        payload: fav
      }),
    onDeleteRestaurant: data =>
      dispatch({
        type: "DELETE_RESTAURANT",
        payload: data
      }),
    onAddPlate: plate => {
      dispatch({ type: "ADD_PLATE", payload: plate });
    },
    open: data => dispatch({ type: "OPEN_MODAL", payload: data }),
    changeModal: data => {
      dispatch({ type: "CHANGE_CONTENT", payload: data });
    }
  })
)(Favourite);

Favourite.propTypes = {
  favourite: propTypes.object,
  cart: propTypes.array,
  onDeletePlate: propTypes.func,
  onAddPlate: propTypes.func,
  open: propTypes.func,
  navigation: propTypes.object,
  onDeleteRestaurant: propTypes.func,
  deletePlate: propTypes.func,
  globalStore: propTypes.array
};

const styles = StyleSheet.create({
  tabStyle: {
    //custom styles
    backgroundColor: "transparent",
    borderColor: "rgb(225, 199, 155)"
  },
  tabTextStyle: {
    fontFamily: "open-sans",
    fontSize: 13,
    color: "rgb(225, 199, 155)"
  },
  activeTabStyle: {
    backgroundColor: "rgb(225, 199, 155)"
  },
  activeTabTextStyle: {
    color: "rgb(39, 40, 51)",
    backgroundColor: "rgb(225, 199, 155)"
  },
  text: {
    color: "white",
    fontSize: 16
  },
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#292b37",
    justifyContent: "space-between",
    alignItems: "center"
  },
  itemContainer: {
    flex: 1,
    padding: 20,
    width: viewportWidth - 40,
    marginVertical: 10,
    height: viewportWidth - 40,
    backgroundColor: "black",
    borderRadius: 10,
    justifyContent: "space-between",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5
  },
  itemBackgroundImage: {
    width: viewportWidth - 40,
    height: viewportWidth - 40,
    borderRadius: 10,
    position: "absolute",
    backgroundColor: "transparent"
  },
  itemGradientStyle: {
    height: viewportWidth - 40 + 1,
    top: -0.5,
    position: "absolute",
    width: viewportWidth - 40 + 1,
    left: -0.5,
    borderRadius: 10
  },
  p: {
    color: "rgb(135, 136, 140)",
    fontSize: 12,
    lineHeight: 14,
    marginBottom: 5
  }
});
