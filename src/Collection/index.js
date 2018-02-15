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
import HTMLView from "react-native-htmlview";
import LinearGradient from "react-native-linear-gradient";
import { connect } from "react-redux";
import Touchable from "react-native-platform-touchable";

import { adaptWidth } from "../etc";
import PriceButton from "../PriceButton";
import Plates from "../Main/Recomendations";
import IconD from "../IconD";
import ButtonD from "../ButtonD";
import { getCartItemCount } from "../utils";

const { width: viewportWidth } = Dimensions.get("window");

class Collection extends React.Component {
  static propTypes = {
    navigation: propTypes.object,
    cart: propTypes.object,
    onDeletePlate: propTypes.func,
    onAddPlate: propTypes.func,
    onRemovePlate: propTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      collection: {
        id: 0,
        title: "string",
        subtitle: "string",
        image:
          "//dostavka1.com/upload/iblock/541/5410721de1214a826acad06180f5dd7d.jpg",
        text: "string",
        blocks: [
          {
            title: "string",
            type: "IMAGE_TEXT",
            meta: {
              text: "string",
              image:
                "//dostavka1.com/upload/iblock/541/5410721de1214a826acad06180f5dd7d.jpg"
            }
          },
          {
            title: "string",
            type: "PROMO_TEXT",
            meta: {
              text: "string"
            }
          },
          {
            title: "string",
            type: "SLIDER_TEXT",
            meta: {
              text: "string",
              plates: [
                {
                  id: 69195,
                  title: "Овощной салат по-грузински с зеленью **",
                  favorite: false,
                  tagGroup: 0,
                  image:
                    "//dostavka1.com/upload/iblock/c33/c334caac3d2aad248154cf495d0f55cf.jpg",
                  price: 155,
                  description:
                    "Легкий салат: свежие огурцы, томаты, острый зеленый стручковый перец, красный лук с мелко рубленной петрушкой, кинзой и базиликом. <br/>(230 гр.)",
                  tags: [],
                  shortTitle: "Овощной салат по-грузински с зеленью **",
                  weight: "",
                  restaurant: 7985
                },
                {
                  id: 69197,
                  title: "Овощной салат по-грузински с орехами **",
                  favorite: false,
                  tagGroup: 0,
                  image:
                    "//dostavka1.com/upload/iblock/ee5/ee5b0a17a1e117c7ae06b7a8758fa201.jpg",
                  price: 155,
                  description:
                    "Огурцы и томаты с красным луком, приправленные грецкими орехами, острым зеленым перцем и свежей зеленью. <br/>(260 гр.)",
                  tags: [],
                  shortTitle: "Овощной салат по-грузински с орехами **",
                  weight: "",
                  restaurant: 7985
                },
                {
                  id: 69203,
                  title: "Салат по-гальски **",
                  favorite: false,
                  tagGroup: 0,
                  image:
                    "//dostavka1.com/upload/iblock/486/48692030deef1fc20893f4571fc65fcb.jpg",
                  price: 155,
                  description:
                    "Отварной картофель, томаты и огурчики с мясом цыпленка, заправленные майонезом. <br/>(200/10/0.5 гр.)",
                  tags: [],
                  shortTitle: "Салат по-гальски **",
                  weight: "",
                  restaurant: 7985
                }
              ]
            }
          },
          {
            title: "string",
            type: "COLLECTION_TEXT",
            meta: {
              text: "string",
              plates: [
                {
                  id: 69195,
                  title: "Овощной салат по-грузински с зеленью **",
                  favorite: false,
                  tagGroup: 0,
                  image:
                    "//dostavka1.com/upload/iblock/c33/c334caac3d2aad248154cf495d0f55cf.jpg",
                  price: 155,
                  description:
                    "Легкий салат: свежие огурцы, томаты, острый зеленый стручковый перец, красный лук с мелко рубленной петрушкой, кинзой и базиликом. <br/>(230 гр.)",
                  tags: [],
                  shortTitle: "Овощной салат по-грузински с зеленью **",
                  weight: "",
                  restaurant: 7985
                },
                {
                  id: 69197,
                  title: "Овощной салат по-грузински с орехами **",
                  favorite: false,
                  tagGroup: 0,
                  image:
                    "//dostavka1.com/upload/iblock/ee5/ee5b0a17a1e117c7ae06b7a8758fa201.jpg",
                  price: 155,
                  description:
                    "Огурцы и томаты с красным луком, приправленные грецкими орехами, острым зеленым перцем и свежей зеленью. <br/>(260 гр.)",
                  tags: [],
                  shortTitle: "Овощной салат по-грузински с орехами **",
                  weight: "",
                  restaurant: 7985
                },
                {
                  id: 69203,
                  title: "Салат по-гальски **",
                  favorite: false,
                  tagGroup: 0,
                  image:
                    "//dostavka1.com/upload/iblock/486/48692030deef1fc20893f4571fc65fcb.jpg",
                  price: 155,
                  description:
                    "Отварной картофель, томаты и огурчики с мясом цыпленка, заправленные майонезом. <br/>(200/10/0.5 гр.)",
                  tags: [],
                  shortTitle: "Салат по-гальски **",
                  weight: "",
                  restaurant: 7985
                }
              ]
            }
          },
          {
            title: "string",
            type: "SET",
            meta: {
              plates: [
                {
                  id: 69195,
                  title: "Овощной салат по-грузински с зеленью **",
                  favorite: false,
                  tagGroup: 0,
                  image:
                    "//dostavka1.com/upload/iblock/c33/c334caac3d2aad248154cf495d0f55cf.jpg",
                  price: 155,
                  description:
                    "Легкий салат: свежие огурцы, томаты, острый зеленый стручковый перец, красный лук с мелко рубленной петрушкой, кинзой и базиликом. <br/>(230 гр.)",
                  tags: [],
                  shortTitle: "Овощной салат по-грузински с зеленью **",
                  weight: "",
                  restaurant: 7985
                },
                {
                  id: 69197,
                  title: "Овощной салат по-грузински с орехами **",
                  favorite: false,
                  tagGroup: 0,
                  image:
                    "//dostavka1.com/upload/iblock/ee5/ee5b0a17a1e117c7ae06b7a8758fa201.jpg",
                  price: 155,
                  description:
                    "Огурцы и томаты с красным луком, приправленные грецкими орехами, острым зеленым перцем и свежей зеленью. <br/>(260 гр.)",
                  tags: [],
                  shortTitle: "Овощной салат по-грузински с орехами **",
                  weight: "",
                  restaurant: 7985
                },
                {
                  id: 69203,
                  title: "Салат по-гальски **",
                  favorite: false,
                  tagGroup: 0,
                  image:
                    "//dostavka1.com/upload/iblock/486/48692030deef1fc20893f4571fc65fcb.jpg",
                  price: 155,
                  description:
                    "Отварной картофель, томаты и огурчики с мясом цыпленка, заправленные майонезом. <br/>(200/10/0.5 гр.)",
                  tags: [],
                  shortTitle: "Салат по-гальски **",
                  weight: "",
                  restaurant: 7985
                }
              ]
            }
          }
        ]
      }
    };
  }

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
            this.props.navigation.navigate("Plate", {
              plate: e,
              restaurant: this.state.data,
              fromMenu: true
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
      </ScrollView>
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
)(Collection);
