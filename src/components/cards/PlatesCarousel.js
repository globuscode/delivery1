import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Carousel, { Pagination } from "react-native-snap-carousel";
import LinearGradient from "react-native-linear-gradient";
import { connect } from "react-redux";
import Touchable from "react-native-platform-touchable";
import propTypes from "prop-types";

import { host, adaptWidth } from "../../etc";
import { LeftAlignedImage } from "../../components/LeftAlignedImage";
import Storage from "../../Reducers";
import PriceButton from "../../components/ui/PriceButton";
import IconD from "../../components/ui/IconD";
import { fetchJson } from "../../etc";
import { getCartItemCount } from "../../utils";

const { width: viewportWidth } = Dimensions.get("window");

class PlatesCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canNav: true,
      activeSlide: 0,
      restaurans: [],
      favourites: [],
      entries: []
    };
    if (this.props.data) {
      this.state.entries = this.props.data;
      for (let i = 0; i < this.state.entries.length; i++) {
        let { id } = this.state.entries[i];
        this.state.favourites.push(
          this.props.favourite.plates[id] != undefined
        );
      }
    }
    this.fav = this.fav.bind(this);
  }

  static propTypes = {
    navigation: propTypes.object,
    favourite: propTypes.shape({
      plates: propTypes.object,
      collections: propTypes.object,
      restaurants: propTypes.object
    }),
    hideArrow: propTypes.bool,
    cart: propTypes.object,
    data: propTypes.array,
    onAddPlate: propTypes.func,
    removeFromFav: propTypes.func,
    addToFav: propTypes.func,
    onNextButtonPress: propTypes.func,
    open: propTypes.func
  };

  fav = index => {
    let favourites = this.state.favourites;
    favourites[index] = !favourites[index];
    this.setState({ favourites: favourites });
  };

  componentWillMount = async () => {
    for (let i = 0; i < this.state.entries.length; i++) {
      let element = this.state.entries[i];
      if (element.restaurant == undefined) {
        this.state.restaurans.push("");
      } else {
        let restaurantJson = await fetchJson(
          `${host}/restaurant?restaurantId=${element.restaurant}`
        );
        this.state.restaurans.push(restaurantJson.data.result);
      }
    }
    this.setState({});
  };

  addPlateToCart = plate => {
    this.props.onAddPlate(plate);
  };

  nav = i => {
    if (this.state.canNav) {
      this.props.navigation.navigate("Plate", {
        plate: this.state.entries[i],
        restaurant: this.state.restaurans[i]
      });
      this.setState({ canNav: false });
      setTimeout(() => {
        this.setState({ canNav: true });
      }, 1500);
    }
  };

  _renderNewItem = ({ item, index }) => {
    /* Разметка */
    const SLIDER_WIDTH = viewportWidth - 2 * adaptWidth(20, 24, 13);
    const SLIDER_MARGIN = adaptWidth(10, 11.7, 13.2) / 2;
    const SLIDER_HEIGHT = SLIDER_WIDTH * 1.32;

    /* Стили карточки */
    const itemStyles = StyleSheet.create({
      containerSlider: {
        marginHorizontal: SLIDER_MARGIN,
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
        fontFamily: "Stem-Medium",
        maxWidth: viewportWidth - 120
      },
      restourantTextStyle: {
        flexDirection: "row",
        backgroundColor: "transparent",
        fontSize: 12,
        color: "#dcc49c",
        letterSpacing: 0.5,
        fontFamily: "Stem-Medium"
      },
      weightTextStyle: {
        flexDirection: "row",
        backgroundColor: "transparent",
        fontSize: 12,
        color: "rgb(119, 122, 136)",
        letterSpacing: 0.5,
        fontFamily: "Stem-Medium"
      },
      topViewStyle: {}
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
      <Touchable
        style={{ position: "absolute", right: 0, top: 0 }}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        foreground={Touchable.SelectableBackgroundBorderless()}
        onPress={() => {
          if (this.state.favourites[index]) {
            this.fav(item);
            this.props.removeFromFav(item);
          } else {
            this.fav(item);
            this.props.addToFav(item);
          }
          this.setState({});
        }}
      >
        <View style={{ backgroundColor: "transparent" }}>
          <IconD
            name={this.state.favourites[index] ? "heart_full" : "heart_empty"}
            size={18}
            color="#dcc49c"
          />
        </View>
      </Touchable>
    );
    // Верхняя половина карточки
    var topView = (
      <View style={itemStyles.topViewStyle}>
        <View style={{ position: "absolute", left: 0, top: 0 }}>
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
        style={{
          width: SLIDER_WIDTH / 3,
          height: SLIDER_WIDTH / 3
        }}
        resizeMode={"contain"}
        source={{
          uri: this.state.restaurans[index]
            ? "http:" + this.state.restaurans[index].logoImage
            : "http://dostavka1.com/img/app-icon.png"
        }}
      />
    );
    logo = (
      <View
        style={{
          width: SLIDER_WIDTH / 2,
          height: SLIDER_WIDTH / 3
        }}
      >
        <LeftAlignedImage
          height={SLIDER_WIDTH / 3}
          width={SLIDER_WIDTH / 2}
          resizeMode={"center"}
          source={{
            uri: this.state.restaurans[index]
              ? "http:" + this.state.restaurans[index].logoImage
              : "http://dostavka1.com/img/app-icon.png"
          }}
        />
      </View>
    );
    const { cart } = this.props;
    const itemCount = getCartItemCount(cart, item);
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
            if (Object.keys(cart).length > 0) {
              let firstItemId = Object.keys(cart)[0];
              if (cart[firstItemId].plate.restaurant !== item.restaurant)
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
                // this.props.open(item);
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
      <View style={itemStyles.containerSlider}>
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

  componentWillReceiveProps = newProps => {
    this.props = newProps;
    const newFavourites = [];
    for (let i = 0; i < this.state.entries.length; i++) {
      let { id } = this.state.entries[i];
      let fav = newProps.favourite.plates[id] != undefined;
      if (fav) newFavourites.push(true);
      else newFavourites.push(false);
    }
    this.setState({ favourites: newFavourites });
  };

  render() {
    Storage.subscribe(() => {
      if (Storage.getState().modalController.type === "cart")
        if (Storage.getState().lastAction.type === "CLOSE_MODAL") {
          Storage.dispatch({ type: null });
          this.props.navigation.navigate("SetAddress", {
            id: Storage.getState().modalController.plate.restaurant
          });
        }
    });

    let slideW = adaptWidth(
      viewportWidth - 2 * 20,
      viewportWidth - 2 * 24,
      viewportWidth - 26
    );
    const SLIDER_MARGIN = adaptWidth(10, 11.7, 13.2) / 2;
    return (
      <View>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          data={this.state.entries}
          renderItem={this._renderNewItem}
          sliderWidth={viewportWidth}
          sliderHeight={slideW * 1.32}
          itemWidth={slideW + SLIDER_MARGIN * 2}
          onSnapToItem={index => this.setState({ activeSlide: index })}
          contentContainerCustomStyle={{
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center"
          }}
          slideStyle={{
            marginVertical: 10,

            backgroundColor: "#292b37"
          }}
        />

        <Pagination
          inactiveDotScale={1}
          inactiveDotOpacity={0.2}
          dotsLength={this.state.entries.length}
          activeDotIndex={this.state.activeSlide}
          dotStyle={{
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: "#ffffff"
          }}
          containerStyle={{
            paddingVertical: 5,
            paddingBottom: 10
          }}
        />
        {this.props.hideArrow ? null : (
          <TouchableOpacity onPress={this.props.onNextButtonPress}>
            <Icon
              name="ios-arrow-down"
              size={30}
              style={{ alignSelf: "center", opacity: 0.4, marginBottom: 20 }}
              color="white"
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default connect(
  ({ cart, favourite, modalController }) => ({
    cart: cart,
    favourite: favourite,
    modal: modalController
  }),
  dispatch => ({
    onAddPlate: plate => {
      dispatch({ type: "ADD_PLATE", payload: plate });
    },
    open: data => dispatch({ type: "OPEN_MODAL", payload: data }),
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
)(PlatesCarousel);
