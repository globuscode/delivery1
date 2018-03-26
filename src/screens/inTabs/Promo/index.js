import React from "react";
import {
  View,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
  WebView,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import HTMLView from "react-native-htmlview";
import propTypes from "prop-types";
import LinearGradient from "react-native-linear-gradient";

import IconD from "../../../components/ui/IconD";
import { adaptWidth, line } from "../../../etc";

const { width: viewportWidth } = Dimensions.get("window");

const hrShort = (
  <View
    style={{
      width: viewportWidth - 2 * adaptWidth(15, 16, 20),
      alignSelf: "center",
      margin: 0,
      height: 1,
      backgroundColor: "rgb(87, 88, 98)"
    }}
  />
);

class Promo extends React.Component {
  static propTypes = {
    navigation: propTypes.object,
    favourite: propTypes.object,
    addToFav: propTypes.func,
    removeFromFav: propTypes.func
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.restaurant.title
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      canNav: true,
      data: this.props.navigation.state.params.promo,
      restaurant: this.props.navigation.state.params.restaurant
    };
  }

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
              height: adaptWidth(44, 52, 57),
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
                  ? 44
                  : viewportWidth >= 375 && viewportWidth < 414 ? 52 : 57,
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
            {"Открыть меню ресторана"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  render = () => {
    return (
      <View>
        {line()}
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
              uri: "http:" + this.state.data.image
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
            colors={["rgba(39, 40, 51, 0)", "rgba(39, 40, 51, 1)"]}
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
                  this.state.restaurant.logoImage +
                  ") center center no-repeat; background-size: contain' />"
              }}
              style={{
                width: viewportWidth - 60,
                alignSelf: "center",
                height: 120,
                backgroundColor: "transparent"
              }}
            />
          </View>
          <View style={{ height: 70 - 20 }} />

          <View
            style={{
              alignSelf: "stretch",
              marginTop: 5,
              marginHorizontal: adaptWidth(17, 21, 25)
            }}
          >
            <HTMLView
              value={`<div>${this.state.data.title}</div>`}
              stylesheet={styles}
            />
            <View style={{ height: adaptWidth(24, 39, 51) }} />
            <HTMLView
              value={`<p>${this.state.data.detail}</p>`}
              stylesheet={styles}
            />
          </View>

          {/* Кнопка Открыть меню ресторана */}
          {this.renderButton("Открыть меню ресторана", () => {
            if (this.state.canNav) {
              this.props.navigation.navigate("SetAddress", {
                id: this.state.restaurant.id
              });
              this.setState({ canNav: false });
              setTimeout(() => {
                this.setState({ canNav: true });
              }, 1500);
            }
          })}

          {/* Минимальная сумма заказа и бесплатная доставка */}

          <View
            style={[
              {
                justifyContent: "flex-start",
                flexDirection: "row",
                alignSelf: "stretch",
                marginHorizontal: adaptWidth(17, 21, 25),
                marginBottom: 5
              }
            ]}
          >
            <View style={{ width: 35, top: -2 }}>
              <IconD color="#dcc49c" size={35} name="truck" />
            </View>
            <Text
              style={{
                color: "#ffffff",
                fontSize: 11,
                fontFamily: "OpenSans",
                lineHeight: 13,
                top: 2,
                marginLeft: 15
              }}
            >
              {`Минимальная сумма заказа ${this.state.restaurant.minBill} ₽ ` +
                (this.state.restaurant.freeDelivery == null
                  ? ""
                  : `\nБесплатная доставка от ${
                    this.state.restaurant.freeDelivery
                  } ₽`)}
            </Text>
          </View>

          {/* Дополнительная информация */}
          {hrShort}
          <View
            style={{
              marginHorizontal: adaptWidth(17, 21, 25),
              marginVertical: adaptWidth(17, 21, 25),
              alignSelf: "stretch",
              flexDirection: "row",
              paddingHorizontal: 10,
              justifyContent: "space-between"
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignSelf: "flex-start",
                width: adaptWidth(170, 200, 223)
              }}
            >
              <Text
                style={{
                  fontFamily: "OpenSans",
                  fontSize: 12,
                  color: "#fff"
                }}
              >
                {"Ресторан"}
              </Text>
              <Text
                style={{
                  fontFamily: "OpenSans",
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "rgb(225, 199, 155)"
                }}
              >
                {this.state.restaurant.title}
              </Text>
              <TouchableOpacity
                onPress={() => {
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
                }}
                style={{
                  marginBottom: adaptWidth(17, 21, 25)
                }}
              >
                <Text
                  style={{
                    fontFamily: "OpenSans",
                    fontWeight: "bold",
                    fontSize: 12,
                    opacity: 0.5,
                    color: "rgb(225, 199, 155)"
                  }}
                >
                  {"О ресторане"}
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: "OpenSans",
                  fontSize: 11,
                  color: "#fff"
                }}
              >
                {"Ресторан принимает заказы " + this.state.restaurant.time}
              </Text>
            </View>

            <Image
              source={{ uri: "http:" + this.state.restaurant.logoImage }}
              resizeMode="contain"
              style={{
                width: adaptWidth(80, 94, 104),
                height: adaptWidth(80, 94, 104)
              }}
            />
          </View>
          <View style={{ height: 50 }} />
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

export default connect(null, null)(Promo);

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 20
  },
  div: {
    fontFamily: "OpenSans",
    fontWeight: "bold",
    fontSize: 23,
    color: "#fff"
  },
  p: {
    fontFamily: "OpenSans",
    fontWeight: "bold",
    fontSize: 13,
    color: "#fff"
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
    backgroundColor: "rgb( 39, 40, 51)"
  }
});
