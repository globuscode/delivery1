import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import propTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Touchable from "react-native-platform-touchable";
import LinearGradient from "react-native-linear-gradient";

import IconD from "../IconD";
import { adaptWidth } from "../etc";
import { LeftAlignedImage } from "../components/LeftAlignedImage";

const { width: viewportWidth } = Dimensions.get("window");

class Collections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      canNav: true,
      favourites: [],
      entries: [
        {
          id: 1,
          image:
            "http://shop.web01.widgets.vigbo.com/storage/shops/7776/products/313707/images/2-8606f84da77c5a05532ee2d3f1d9e351.jpg",
          title: "Что такое настоящий стейк?",
          author: "Павел Антонов\nБренд-шеф Meatless",
          restaurantLogo: "https://image.ibb.co/fPo4vm/meatless_logo.png",
          favourite: false
        },
        {
          id: 2,
          image: "https://i.ytimg.com/vi/KJ0R-703COE/maxresdefault.jpg",
          title: "Что такое настоящий дошик?",
          author: "Антон Павлов \nСтудент",
          restaurantLogo: "https://image.ibb.co/fPo4vm/meatless_logo.png",
          favourite: false
        },
        {
          id: 3,
          image:
            "http://shop.web01.widgets.vigbo.com/storage/shops/7776/products/313707/images/2-8606f84da77c5a05532ee2d3f1d9e351.jpg",
          title: "Что такое настоящий стейк?",
          author: "Павел Антонов\nБренд-шеф Meatless",
          restaurantLogo: "https://image.ibb.co/fPo4vm/meatless_logo.png",
          favourite: false
        },
        {
          id: 4,
          image: "https://i.ytimg.com/vi/KJ0R-703COE/maxresdefault.jpg",
          title: "Что такое настоящий дошик?",
          author: "Антон Павлов \nСтудент",
          restaurantLogo: "https://image.ibb.co/fPo4vm/meatless_logo.png",
          favourite: false
        }
      ]
    };
  }

  fav = index => {
    if (this.state.favourites[index])
      this.props.removeColletionFromFav(this.state.entries[index]);
    else this.props.addCollectionToFav(this.state.entries[index]);
  };

  static propTypes = {
    onNextButtonPress: propTypes.func,
    favourite: propTypes.shape({
      collections: propTypes.object
    }),
    navigation: propTypes.shape({
      navigate: propTypes.func
    }),
    addCollectionToFav: propTypes.func,
    removeColletionFromFav: propTypes.func
  };

  componentWillReceiveProps = newProps => {
    this.props = newProps;
    const newFavourites = [];
    for (let i = 0; i < this.state.entries.length; i++) {
      let { id } = this.state.entries[i];
      let fav = newProps.favourite.collections[id] != undefined;
      if (fav) newFavourites.push(true);
      else newFavourites.push(false);
    }
    this.setState({ favourites: newFavourites });
  };

  componentDidMount = () => {
    this.componentWillReceiveProps(this.props);
  };

  nav = i => {
    if (this.state.canNav) {
      this.props.navigation.navigate("Collection", {
        collection: this.state.entries[i]
      });
      this.setState({ canNav: false });
      setTimeout(() => {
        this.setState({ canNav: true });
      }, 1500);
    }
  };

  _renderNewItem = ({ item, index }) => {
    // const { collections } = {};
    /* Разметка */
    const SLIDER_WIDTH = adaptWidth(280, 328.1, 362.3);
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
        borderRadius: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5
      },
      BG_IMAGE: {
        width: SLIDER_WIDTH,
        height: SLIDER_HEIGHT,
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
        maxWidth: viewportWidth - 100
      },
      restourantTextStyle: {
        flexDirection: "row",
        backgroundColor: "transparent",
        fontSize: 12,
        color: "#dcc49c",
        letterSpacing: 0.5,
        fontFamily: "Stem-Medium"
      },
      topViewStyle: {
        flexDirection: "row",
        height: 100,
        justifyContent: "space-between"
      }
    });

    const GRADIENT_COLORS = [
      "rgba(0,0,0, 0.8)",
      "transparent",
      "rgba(0,0,0, 0.8)"
    ];

    // Верхняя половина карточки
    var topView = (
      <View style={[itemStyles.topViewStyle, { height: SLIDER_WIDTH / 2 }]}>
        <View>
          <LeftAlignedImage
            top
            height={SLIDER_WIDTH / 3}
            width={SLIDER_WIDTH / 2}
            resizeMode={"center"}
            source={{
              uri: item.restaurantLogo
                ? item.restaurantLogo
                : "http://dostavka1.com/img/app-icon.png"
            }}
          />
        </View>

        <View>
          <TouchableOpacity onPress={() => this.fav(index)}>
            <View style={{ backgroundColor: "transparent" }}>
              <IconD
                name={
                  this.state.favourites[index] ? "heart_full" : "heart_empty"
                }
                size={18}
                color="#dcc49c"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );

    var bottomView = (
      <View
        style={{
          flexDirection: "column"
        }}
      >
        <Text
          style={{
            backgroundColor: "transparent",
            fontSize: 25,
            fontFamily: "Stem-Medium",
            top: 5,
            color: "white",
            flexDirection: "row"
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            backgroundColor: "transparent",
            fontSize: 13,
            fontFamily: "OpenSans",
            fontWeight: "600",
            color: "#dcc49c",
            flexDirection: "row"
          }}
        >
          {item.author}
        </Text>
      </View>
    );

    return (
      <Touchable
        activeOpacity={0.8}
        onPress={() => {
          this.nav(index);
        }}
      >
        <View style={itemStyles.containerSlider}>
          <View style={itemStyles.viewSlider}>
            {/* Задний фон карточки */}
            <Image style={itemStyles.BG_IMAGE} source={{ uri: item.image }} />

            {/* Градиент */}
            <LinearGradient
              colors={GRADIENT_COLORS}
              style={itemStyles.GRADIENT_STYLE}
            />

            {topView}

            {bottomView}
          </View>
        </View>
      </Touchable>
    );
  };

  render = () => {
    const screen =
      viewportWidth >= 320 && viewportWidth < 375
        ? 0
        : viewportWidth >= 375 && viewportWidth < 414 ? 1 : 2;
    let slideW = screen == 0 ? 280 : screen == 1 ? 328.1 : 362.3;
    const SLIDER_MARGIN =
      screen == 0 ? 10 / 2 : screen == 1 ? 11.7 / 2 : 13.2 / 2;
    return (
      <View style={{ elevation: 0 }}>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={this.state.entries}
          renderItem={this._renderNewItem}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          sliderWidth={viewportWidth}
          sliderHeight={slideW * 1.32}
          itemWidth={slideW + SLIDER_MARGIN * 2}
          onSnapToItem={index => this.setState({ activeSlide: index })}
          slideStyle={{
            marginVertical: 15,

            backgroundColor: "transparent"
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
            margin: -2,
            borderRadius: 3,
            backgroundColor: "#ffffff"
          }}
          containerStyle={{
            paddingVertical: 2,
            paddingBottom: 10
          }}
        />
        <TouchableOpacity onPress={this.props.onNextButtonPress}>
          <Icon
            name="ios-arrow-down"
            size={30}
            style={{ alignSelf: "center", opacity: 0.4 }}
            color="white"
          />
        </TouchableOpacity>
      </View>
    );
  };
}

export default connect(
  state => ({ favourite: state.favourite }),
  dispatch => ({
    addCollectionToFav: collection =>
      dispatch({ type: "ADD_COLLECTION_TO_FAV", payload: collection }),
    removeColletionFromFav: collection =>
      dispatch({ type: "DELETE_COLLECTION", payload: collection })
  })
)(Collections);
