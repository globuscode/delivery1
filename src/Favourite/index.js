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
import SegmentedControlTab from "react-native-segmented-control-tab";
import Touchable from "react-native-platform-touchable";
import LinearGradient from "react-native-linear-gradient";
import { getStatusBarHeight } from "react-native-status-bar-height";
import propTypes from "prop-types";

import CollectionCard from "../components/cards/CollectionCard";
import PriceButton from "../components/ui/PriceButton";
import IconD from "../components/ui/IconD";
import { getCartItemCount } from "../utils";
import { adaptWidth, host, fetchJson } from "../etc";
const { width: viewportWidth } = Dimensions.get("window");

class Favourite extends React.Component {
  static propTypes = {
    favourite: propTypes.shape({
      plates: propTypes.object,
      collections: propTypes.object,
      restaurants: propTypes.object
    }),
    cart: propTypes.object,
    onDeletePlate: propTypes.func,
    onAddPlate: propTypes.func,
    onRemovePlate: propTypes.func,
    open: propTypes.func,
    navigation: propTypes.object,
    onDeleteRestaurant: propTypes.func,
    deletePlate: propTypes.func,
    onDeleteColletion: propTypes.func,
    globalStore: propTypes.array
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedView: 0,
      restaurans: {},
      canNav: true,
      favourite: {
        plates: {},
        collections: {},
        restaurants: {}
      }
    };
  }

  /**
   * Возвращает jsx компонент,
   * содержащий все блюда из избранного
   *
   * @memberof Favourite
   */
  // renderPlates = () => {
  //   const { favourite } = this.state;
  //   const { plates } = favourite;
  //   const platesIds = Object.keys(plates);
  //   return platesIds.map((id, index) =>
  //     this._renderSinglePlate(plates[id], index)
  //   );
  // };

  nav = () => {};

  /**
   * Возвращает jsx компонент,
   * содержащий все рестораны из избранного
   *
   * @memberof Favourite
   */
  renderRestaurants = () => {
    const { favourite } = this.state;
    const { restaurants } = favourite;
    const restaurantsIds = Object.keys(restaurants);
    return restaurantsIds.map((id, index) => {
      return this._renderSingleRestaurant(restaurants[id], index);
    });
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
            this.props.navigation.navigate("Loader", {
              id: item.id,
              action: "navigateToRestaurant"
            })
          }
        >
          <View>
            <Image
              onLoadEnd={() => this.setState({})}
              style={[
                styles.itemBackgroundImage,
                { width: SLIDER_WIDTH, height: SLIDER_WIDTH }
              ]}
              source={{
                uri:
                  "http:" + (item.image != undefined ? item.image : item.photo)
              }}
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
              //fontFamily: 'Stem-Medium',
              fontWeight: 'bold',
              fontSize: 13,
              backgroundColor: '#dcc49c',
              color: '#292b37',
              }}>{item.discount}</Text>
            </View>*/}
          <View>{this.renderHeart(item)}</View>
        </View>
        <View
          pointerEvents="none"
          style={{
            flexDirection: "column",
            justifyContent: "flex-end",
            backgroundColor: "transparent"
          }}
        >
          {this.renderLogo(
            item.logoImage != undefined ? item.logoImage : item.restourantLogo
          )}
          <Text
            style={{
              color: "white",
              fontSize: 14,
              lineHeight: 22,
              fontFamily: "Stem-Medium",
              alignItems: "flex-end",
              letterSpacing: 0.4
            }}
          >
            {item.title != undefined ? item.title : item.restourantName}
          </Text>
        </View>
      </View>
    );
  };

  fav = () => {
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

  renderHeart = restaurant => {
    return (
      <TouchableOpacity
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        onPress={() => {
          this.props.onDeleteRestaurant(restaurant);
        }}
      >
        <View style={{ backgroundColor: "transparent" }}>
          <IconD name={"trash"} size={18} color="#dcc49c" />
        </View>
      </TouchableOpacity>
    );
  };

  /**
   * Возвращает jsx компонент,
   * содержащий логотип ресторана
   *
   * @param {String} logo – url на изображение
   * @returns
   * @memberof Favourite
   */
  renderLogo(logo) {
    const SLIDER_WIDTH = adaptWidth(280, 328.1, 362.3);

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
    );
  }

  _renderSingleCollection = (item, index) => {
    return (
      <CollectionCard
        key={index}
        data={item}
        favicon="trash"
        onPress={() => this.nav(index)}
        onFavPress={() => this.props.onDeleteColletion(item)}
      />
    );
  };

  renderCollections = () => {
    const { favourite } = this.state;
    const { collections } = favourite;
    const restaurantsIds = Object.keys(collections);
    return restaurantsIds.map((id, index) => {
      return this._renderSingleCollection(collections[id], index);
    });
  };

  renderPlates = () => {
    const imageHeight = adaptWidth(100, 117, 130);
    const { favourite } = this.state;
    const { plates } = favourite;
    const platesIds = Object.keys(plates);
    const { cart } = this.props;
    return (
      <View style={{ flexDirection: "column", width: viewportWidth }}>
        {platesIds.map((id, i) => {
          const e = plates[id];
          const itemCount = getCartItemCount(cart, e);
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
                        if (Object.keys(cart).length > 0) {
                          if (cart[e.id].plate.restaurant !== e.restaurant)
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
                          this.props.onRemovePlate(e);
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
      </View>
    );
  };

  componentWillMount = () => {
    this.componentWillReceiveProps(this.props);
  };

  componentWillReceiveProps = async newProps => {
    await AsyncStorage.setItem("fav", JSON.stringify(newProps.favourite));

    const platesIds = Object.keys(newProps.favourite.plates);
    const restauransOfPlates = this.state.restaurans;
    for (let i = 0; i < platesIds.length; i++) {
      let { restaurant } = newProps.favourite.plates[platesIds[i]];
      let response = await fetchJson(
        `${host}/restaurant?restaurantId=${restaurant}`
      );
      if (response.data != undefined)
        if (response.data.result != undefined)
          if (restauransOfPlates[response.data.result.id] == undefined)
            restauransOfPlates[response.data.result.id] = response.data.result;
    }
    this.setState({
      favourite: newProps.favourite,
      restaurans: restauransOfPlates
    });
  };

  render = () => {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ paddingTop: getStatusBarHeight() }}>
          <Text
            style={{
              fontFamily: "Stem-Medium",
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
              values={["Блюда", "Рестораны", "Подборки"]}
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
            {this.state.selectedView != 2 ? null : this.renderCollections()}
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
  };
}
export default connect(
  ({ favourite, cart, modalController }) => ({
    favourite: favourite,
    cart: cart,
    modal: modalController
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
    onRemovePlate: plate => {
      dispatch({ type: "REMOVE_PLATE_BY_OBJECT", payload: plate });
    },
    open: data => dispatch({ type: "OPEN_MODAL", payload: data }),
    changeModal: data => {
      dispatch({ type: "CHANGE_CONTENT", payload: data });
    },
    onDeleteColletion: data =>
      dispatch({ type: "DELETE_COLLECTION", payload: data })
  })
)(Favourite);

const styles = StyleSheet.create({
  tabStyle: {
    //custom styles
    backgroundColor: "transparent",
    borderColor: "rgb(225, 199, 155)"
  },
  tabTextStyle: {
    fontFamily: "OpenSans",
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
