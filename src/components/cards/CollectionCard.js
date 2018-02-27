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
import Touchable from "react-native-platform-touchable";
import LinearGradient from "react-native-linear-gradient";

import IconD from "../../components/ui/IconD";
import { adaptWidth } from "../../etc";
import { LeftAlignedImage } from "../../components/LeftAlignedImage";

const { width: viewportWidth } = Dimensions.get("window");

export default class Collection extends React.Component {
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

  static propTypes = {
    data: propTypes.object,
    favicon: propTypes.string,
    onPress: propTypes.func,
    onFavPress: propTypes.func
  };

  nav = () => {
    this.props.onPress();
  };

  fav = () => {
    this.props.onFavPress();
  };

  render = () => {
    const item = this.props.data;
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
          <TouchableOpacity onPress={() => this.fav()}>
            <View style={{ backgroundColor: "transparent" }}>
              <IconD name={this.props.favicon} size={18} color="#dcc49c" />
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
          this.nav();
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
}
