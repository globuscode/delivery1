import React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Alert,
  Image,
  Dimensions,
  ScrollView,
  Text
} from "react-native";
import propTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import LinearGradient from "react-native-linear-gradient";
import { connect } from "react-redux";
import Touchable from "react-native-platform-touchable";
import Carousel from "react-native-snap-carousel";

import { adaptWidth } from "../../../etc";
import { LeftAlignedImage } from "../../../components/LeftAlignedImage";
import PriceButton from "../../../components/ui/PriceButton";
import Plates from "../../../components/cards/PlatesCarousel";
import IconD from "../../../components/ui/IconD";
import ButtonD from "../../../components/ui/ButtonD";
import { getCartItemCount } from "../../../utils";

const { width: viewportWidth } = Dimensions.get("window");

class Collection extends React.Component {
  static propTypes = {
    navigation: propTypes.object,
    favourite: propTypes.shape({
      plates: propTypes.object,
      collections: propTypes.object,
      restaurants: propTypes.object
    }),
    cart: propTypes.object,
    addToFav: propTypes.func,
    removeFromFav: propTypes.func,
    deletePlateFromFav: propTypes.func,
    onAddPlateToFav: propTypes.func,
    deletePlate: propTypes.func,
    onDeletePlate: propTypes.func,
    onAddPlate: propTypes.func,
    onRemovePlate: propTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      canNav: true,
      collection: this.props.navigation.state.params.collection.data.collection
    };
  }

  componentWillReceiveProps = async newProps => {
    const { params } = newProps.navigation.state;
    if (params.collection != undefined) {
      if (params.collection.errors === undefined) {
        this.setState({ collection: params.collection.data.collection });
      }
    }
    const { collections } = newProps.favourite;
    const { id } = this.state.collection;
    this.setState({ favourite: collections[id] != undefined });
  };

  // componentDidMount = async () => {
  //   const { props } = this;
  //   const { params } = props.navigation.state;
  //   if (params.collection != undefined) {
  //     const collectionResponse = await fetchJson(
  //       `${host}/collection?id=${params.collection.id}`
  //     );
  //     if (collectionResponse.errors === undefined) {
  //       this.setState({ collection: collectionResponse.data.collection });
  //     }
  //   }
  // };

  componentWillMount = () => {
    const { collections } = this.props.favourite;
    const { id } = this.state.collection;
    this.setState({ favourite: collections[id] != undefined });
  };

  isInFav = ({ id }) => {
    return this.props.favourite.plates[id] != undefined;
  };

  _renderHead = () => {
    const styles = StyleSheet.create({
      title: {
        color: "white",
        flexDirection: "row",
        fontSize: 25,
        lineHeight: 30,
        letterSpacing: 0.8,
        backgroundColor: "transparent",
        fontFamily: "Stem-Medium"
      },
      subtitle: {
        fontFamily: "OpenSans-Semibold",
        backgroundColor: "transparent",
        color: "rgb(255, 199, 155)",
        fontSize: 13,
        minWidth: adaptWidth(145, 195, 230),
        maxWidth: adaptWidth(145, 195, 230),
        minHeight: 70
      }
    });
    const { image, title, subtitle } = this.state.collection;
    return (
      <ImageBackground
        resizeMode="cover"
        resizeMethod="scale"
        style={{
          paddingHorizontal: 15,
          width: viewportWidth,
          height: viewportWidth * 1.16,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignSelf: "stretch",
          alignItems: "flex-end"
        }}
        source={{
          uri: "http:" + image
        }}
      >
        <LinearGradient
          colors={["rgba(0,0,0, 1)", "rgba(34, 35, 39, 0)"]}
          style={{
            top: 0,
            height: 200,
            position: "absolute",
            width: viewportWidth
          }}
        />
        <LinearGradient
          colors={["rgba(39, 40, 48, 0)", "rgba(39, 40, 48, 1)"]}
          style={{
            position: "absolute",
            width: viewportWidth,
            bottom: 0,
            height: 254
          }}
        />
        <View
          style={{
            flexDirection: "column",
            width: viewportWidth,
            backgroundColor: "transparent"
          }}
        >
          <Text style={styles.title}>{title}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              backgroundColor: "transparent"
            }}
          >
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </View>
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
          <Touchable onPress={() => this.props.navigation.goBack()}>
            <Icon
              name="md-arrow-round-back"
              size={20}
              color="rgb(255, 255, 255)"
              style={{ backgroundColor: "transparent" }}
            />
          </Touchable>

          <View style={{ flexDirection: "column", justifyContent: "center" }} />

          <Touchable
            onPress={() => {
              const { collection } = this.props.navigation.state.params;
              if (this.state.favourite) {
                this.props.removeFromFav(collection);
              } else {
                this.props.addToFav(collection);
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
      </ImageBackground>
    );
  };

  isInFav = ({ id }) => {
    return this.props.favourite.plates[id] != undefined;
  };

  _renderPlate = (e, i) => {
    const imageHeight = adaptWidth(100, 117, 130);
    const { cart } = this.props;
    const itemCount = getCartItemCount(cart, e);
    return (
      <Touchable
        key={i}
        background={Touchable.Ripple("gray")}
        onPress={() => {
          if (this.state.canNav) {
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
              resizeMode={e.image.indexOf(".png") > 0 ? "contain" : "cover"}
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
                  this.props.deletePlateFromFav(e);
                } else {
                  this.props.onAddPlateToFav(e);
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
                  if (Object.keys(cart).length > 0) {
                    const firstItemId = Object.keys(cart)[0];
                    if (cart[firstItemId].plate.restaurant !== e.restaurant)
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
                  <Text style={{ color: "rgba(41,43,55, 1)" }}>{"–"}</Text>
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
  };

  _renderSet = plates => {
    return plates.map(this._renderPlate);
  };

  _renderPromo = ({ item, index }) => {
    /* Разметка */
    const SLIDER_WIDTH = viewportWidth - 2 * adaptWidth(20, 24, 13);
    const SLIDER_MARGIN = adaptWidth(10, 11.7, 13.2) / 2;
    const SLIDER_HEIGHT = SLIDER_WIDTH;

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
            </View>
          </Touchable>
        </View>
      </View>
    );

    const logo = (
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
            uri: "http:" + item.logo
          }}
        />
      </View>
    );
    var bottomView = (
      <View
        pointerEvents="box-none"
        style={{
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          height: SLIDER_WIDTH / 2
        }}
      >
        {logo}
        <Text style={itemStyles.titleTextStyle}>{item.restaurant}</Text>
      </View>
    );

    return (
      <View key={index} style={itemStyles.containerSlider}>
        <View style={itemStyles.viewSlider}>
          {/* Задний фон карточки */}
          <Touchable
            activeOpacity={0.8}
            onPress={() => {
              if (this.state.canNav) {
                this.props.navigation.navigate("Loader", {
                  action: "navigateToPromo",
                  promo: item.id
                });
                this.setState({ canNav: false });
                setTimeout(() => {
                  this.setState({ canNav: true });
                }, 1500);
              }
            }}
            foreground={Touchable.SelectableBackgroundBorderless()}
            style={{
              position: "absolute",
              height: SLIDER_HEIGHT,
              width: SLIDER_WIDTH,
              borderRadius: 10
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

  _renderBlock = (block, index) => {
    const styles = StyleSheet.create({
      header: {
        color: "#fff",
        fontFamily: "Stem-Medium",
        fontSize: 16,
        lineHeight: 25,
        width: viewportWidth,
        paddingHorizontal: 20,
        marginBottom: 13
      }
    });
    const renderHeader = title => <Text style={styles.header}>{title}</Text>;
    if (block.type === "IMAGE_TEXT") {
      const { text, image } = block.meta;
      return (
        <View key={index}>
          <Image
            source={{
              uri: "http:" + image
            }}
            style={{
              width: viewportWidth,
              height: viewportWidth * 0.6,
              marginBottom: 18
            }}
          />
          {renderHeader(block.title)}
          <Text
            style={{
              fontFamily: "OpenSans",
              fontSize: 13,
              lineHeight: 17,
              color: "rgb(225, 199, 155)",
              paddingHorizontal: 20,
              paddingBottom: 50
            }}
          >
            {text}
          </Text>
        </View>
      );
    }
    if (block.type === "PROMO_TEXT") {
      const { promos } = block.meta;
      let slideW = adaptWidth(
        viewportWidth - 2 * 20,
        viewportWidth - 2 * 24,
        viewportWidth - 26
      );
      const SLIDER_MARGIN = adaptWidth(10, 11.7, 13.2) / 2;
      return (
        <View>
          <Carousel
            data={promos}
            renderItem={this._renderPromo}
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
        </View>
      );
    }
    if (block.type === "SLIDER_TEXT") {
      const { text, plates } = block.meta;
      return (
        <View key={index}>
          {renderHeader(block.title)}
          <Plates data={plates} hideArrow />
          <Text
            style={{
              fontFamily: "OpenSans",
              fontSize: 13,
              lineHeight: 17,
              color: "rgb(225, 199, 155)",
              paddingHorizontal: 20,
              paddingBottom: 50
            }}
          >
            {text}
          </Text>
        </View>
      );
    }
    if (block.type === "COLLECTION_TEXT") {
      const { text, plates } = block.meta;
      return (
        <View key={index}>
          {renderHeader(block.title)}
          <Plates data={plates} hideArrow />
          {this._renderSet(plates)}
          <Text
            style={{
              fontFamily: "OpenSans",
              fontSize: 13,
              lineHeight: 17,
              marginTop: 5,
              color: "rgb(225, 199, 155)",
              paddingHorizontal: 20,
              paddingBottom: 50
            }}
          >
            {text}
          </Text>
        </View>
      );
    }
    if (block.type === "SET") {
      const { plates } = block.meta;
      return (
        <View key={index}>
          <View
            style={{
              alignSelf: "stretch",
              marginTop: 30,
              marginHorizontal: 10,
              marginBottom: 15,
              height: 1,
              backgroundColor: "rgb(111, 111, 111)"
            }}
          />
          {this._renderSet(plates)}
          <View
            style={{
              alignSelf: "center",
              marginTop: 30,
              marginBottom: 40
            }}
          >
            <ButtonD
              onPress={() => {
                plates.forEach(plate => this.props.onAddPlate(plate));
              }}
              title={["Добавить сэт целиком в корзину"]}
              width={viewportWidth - 2 * adaptWidth(44, 50, 57)}
            />
          </View>
        </View>
      );
    }
  };

  _renderBlocks = () => {
    return this.state.collection.blocks.map(this._renderBlock);
  };

  render = () => {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          {this._renderHead()}
          <Text
            style={{
              fontFamily: "OpenSans",
              fontSize: 13,
              lineHeight: 17,
              color: "rgb(225, 199, 155)",
              paddingHorizontal: 20,
              paddingBottom: 50
            }}
          >
            {this.state.collection.text}
          </Text>
          {this._renderBlocks()}
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
  ({ cart, favourite }) => ({
    cart: cart,
    favourite: favourite
  }),
  dispatch => ({
    onAddPlate: plate => {
      dispatch({ type: "ADD_PLATE", payload: plate });
    },
    deletePlate: plate => {
      dispatch({ type: "REMOVE_PLATE_BY_OBJECT", payload: plate });
    },
    onAddPlateToFav: plate => {
      dispatch({ type: "ADD_PLATE_TO_FAV", payload: plate });
    },
    deletePlateFromFav: plate => {
      dispatch({ type: "DELETE_PLATE", payload: plate });
    },
    setLastViewed: id =>
      dispatch({ type: "SET_VIEWED_RESTAURANT", payload: id }),
    addToFav: data => {
      dispatch({ type: "ADD_COLLECTION_TO_FAV", payload: data });
    },
    removeFromFav: data => {
      dispatch({ type: "DELETE_COLLECTION", payload: data });
    },
    addRestToFav: data => {
      dispatch({ type: "ADD_RESTAURANT_TO_FAV", payload: data });
    },
    removeRestFromFav: data => {
      dispatch({ type: "DELETE_RESTAURANT", payload: data });
    }
  })
)(Collection);
