import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  WebView
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Touchable from "react-native-platform-touchable";
import Carousel, { Pagination } from "react-native-snap-carousel";
import propTypes from "prop-types";
import LinearGradient from "react-native-linear-gradient";

import IconD from "../IconD";

const { width: viewportWidth } = Dimensions.get("window");

export default class Recomendations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canNav: true,
      activeSlide: 0,
      entries: [
        {
          image:
            "http://shop.web01.widgets.vigbo.com/storage/shops/7776/products/313707/images/2-8606f84da77c5a05532ee2d3f1d9e351.jpg",
          title: "Что такое настоящий стейк?",
          author: "Павел Антонов\nБренд-шеф Meatless",
          restourantLogo: "https://image.ibb.co/fPo4vm/meatless_logo.png",
          favourite: false
        },
        {
          image: "https://i.ytimg.com/vi/KJ0R-703COE/maxresdefault.jpg",
          title: "Что такое настоящий дошик?",
          author: "Антон Павлов \nСтудент",
          restourantLogo: "https://image.ibb.co/fPo4vm/meatless_logo.png",
          favourite: false
        },
        {
          image:
            "http://shop.web01.widgets.vigbo.com/storage/shops/7776/products/313707/images/2-8606f84da77c5a05532ee2d3f1d9e351.jpg",
          title: "Что такое настоящий стейк?",
          author: "Павел Антонов\nБренд-шеф Meatless",
          restourantLogo: "https://image.ibb.co/fPo4vm/meatless_logo.png",
          favourite: false
        },
        {
          image: "https://i.ytimg.com/vi/KJ0R-703COE/maxresdefault.jpg",
          title: "Что такое настоящий дошик?",
          author: "Антон Павлов \nСтудент",
          restourantLogo: "https://image.ibb.co/fPo4vm/meatless_logo.png",
          favourite: false
        }
      ]
    };
    this.fav = this.fav.bind(this);
  }

  static propTypes = {
    navigation: propTypes.object,
    onNextButtonPress: propTypes.func
  };

  fav(index) {
    let newEntries = this.state.entries;
    newEntries[index].favourite = !this.state.entries[index].favourite;
    this.setState({ entries: newEntries });
  }

  _renderItem = ({ item, index }) => {
    const screen =
      viewportWidth >= 320 && viewportWidth < 375
        ? 0
        : viewportWidth >= 375 && viewportWidth < 414 ? 1 : 2;
    const SLIDER_WIDTH = screen == 0 ? 280 : screen == 1 ? 328.1 : 362.3;
    return (
      <View
        style={{
          flex: 1,
          padding: 16,
          paddingTop: 13,
          paddingHorizontal: 18,
          justifyContent: "space-between"
        }}
      >
        <Image
          style={{
            width: viewportWidth - 40,
            height: (viewportWidth - 40) * 1.32,
            borderRadius: 10,
            position: "absolute",
            borderColor: "rgba(0,0,0, 0.8)",
            backgroundColor: "transparent"
          }}
          source={{ uri: item.image }}
        />
        <LinearGradient
          colors={["rgba(0,0,0, 0.8)", "transparent", "rgba(0,0,0, 0.8)"]}
          style={{
            height: (viewportWidth - 40) * 1.32 + 0.5,
            top: -0.5,
            position: "absolute",
            width: viewportWidth - 39,
            left: -0.5,
            borderRadius: 10
          }}
        />

        <View
          style={{
            flexDirection: "row",
            height: SLIDER_WIDTH / 2,
            justifyContent: "space-between"
          }}
        >
          <View>
            <WebView
              bounces={false}
              scrollEnabled={false}
              source={{
                html:
                  `<img 
                  src="` +
                  item.restourantLogo +
                  `"
                  style="width:100%; background-color: red;">`
              }}
              style={{
                width: SLIDER_WIDTH / 2,
                height: SLIDER_WIDTH / 2,
                backgroundColor: "transparent"
              }}
            />
          </View>

          <View>
            <TouchableOpacity onPress={() => this.fav(index)}>
              <View style={{ backgroundColor: "transparent" }}>
                <IconD
                  name={item.favourite ? "heart_full" : "heart_empty"}
                  size={18}
                  color="#dcc49c"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

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
              lineHeight: 30,
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
      </View>
    );
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
    /* Разметка */
    const screen =
      viewportWidth >= 320 && viewportWidth < 375
        ? 0
        : viewportWidth >= 375 && viewportWidth < 414 ? 1 : 2;
    const SLIDER_WIDTH = screen == 0 ? 280 : screen == 1 ? 328.1 : 362.3;
    const SLIDER_MARGIN =
      screen == 0 ? 10 / 2 : screen == 1 ? 11.7 / 2 : 13.2 / 2;
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
        flexDirection: "row",
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
          <Image
            bounces={false}
            scrollEnabled={false}
            source={{
              url: item.restourantLogo
            }}
            style={{
              width: SLIDER_WIDTH / 2,
              height: SLIDER_WIDTH / 2,
              backgroundColor: "transparent"
            }}
          />
        </View>

        <View>
          <TouchableOpacity onPress={() => this.fav(index)}>
            <View style={{ backgroundColor: "transparent" }}>
              <IconD
                name={item.favourite ? "heart_full" : "heart_empty"}
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
      <View style={itemStyles.containerSlider}>
        <View style={itemStyles.viewSlider}>
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
            <View
              style={{
                padding: 20,
                flex: 1,
                justifyContent: "space-between"
              }}
            >
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
          </Touchable>
        </View>
      </View>
    );
  };

  render() {
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
  }
}
