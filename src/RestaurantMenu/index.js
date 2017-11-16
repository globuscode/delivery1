import React from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
  WebView,
  Linking,
  Text
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient, Constants } from "expo";
import Accordion from "react-native-collapsible/Accordion";
import { connect } from "react-redux";

import PriceButton from "../PriceButton";
import Storage from "../Reducers";

import Recomendations from "../Main/Recomendations";
import IconD from "../IconD";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
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
const hrShort = (
  <View
    style={{
      alignSelf: "stretch",
      margin: 10,
      marginHorizontal: 20,
      height: 1,
      backgroundColor: "rgb(87, 88, 98)"
    }}
  />
);

class RestaurantMenu extends React.Component {
  navigationOptions = {
    title: "Home"
  };

  constructor(props) {
    super(props);
    this.state = {
      rang: 2,
      hideInfo: false,
      canNav: true,
      data: {
        id: 0,
        title: "Джон Джоли",
        image:
          "http://lamcdn.net/the-village.ru/post_image-image/stUDrX37wGq1g-9mFWRl4A-article.jpg",
        logoImage: "https://image.ibb.co/fPo4vm/meatless_logo.png",
        favorite: false,
        tagGroups: [
          {
            title: "Россия",
            icon: "ios-person",
            size: 15,
            icon: "http://gg.svg"
          },
          {
            id: 12,
            title: "Италия",
            size: 15,
            icon: "http://gg.svg"
          }
        ],
        minOrder: 8888,
        description: {
          title:
            "Настоящее грузинское гостеприимство в ресторанах «Джон Джоли»",
          description:
            "Хлебосольная, щедрая, сказочная, гостеприимная Грузия! Удивительная страна, которая известна своими застольями, подарила Москве частичку своей души."
        },
        bestPlates: [
          {
            photo:
              "https://img02.rl0.ru/afisha/o/s1.afisha.net/MediaStorage/d5/12/535a1080132c4530a7a4446612d5.jpg",
            name: "Дабл роял бургер",
            restourant: "Джон Джоли",
            weight: "400 гр",
            price: "8888",
            restourantLogo: "https://image.ibb.co/fPo4vm/meatless_logo.png",
            favourite: false
          },
          {
            photo:
              "http://shop.web01.widgets.vigbo.com/storage/shops/7776/products/313707/images/2-8606f84da77c5a05532ee2d3f1d9e351.jpg",
            name: "Стейк",
            restourant: "Стейк Хаус",
            weight: "200 гр",
            price: "30",
            restourantLogo: "https://image.ibb.co/fPo4vm/meatless_logo.png",
            favourite: false
          },
          {
            photo:
              "http://img.povar.ru/uploads/a0/99/e9/31/molochnii_kokteil_s_shokoladom-318319.jpg",
            name: "Шоколадный милкшейк",
            restourant: "Джон Джоли",
            weight: "150 гр",
            price: "1000",
            restourantLogo: "https://image.ibb.co/fPo4vm/meatless_logo.png",
            favourite: false
          },
          {
            photo:
              "https://img02.rl0.ru/afisha/o/s1.afisha.net/MediaStorage/d5/12/535a1080132c4530a7a4446612d5.jpg",
            name: "Бургер",
            restourant: "КБ",
            weight: "200 гр",
            price: "30",
            restourantLogo: "https://image.ibb.co/fPo4vm/meatless_logo.png",
            favourite: false
          }
        ],
        /*promo: {
						id: <int>,
						title: <string>,
						description: <html>
				},*/
        menu: {
          "Мясные блюда": [
            {
              title: "Мясной хлеб",
              favorite: false,
              image:
                "http://img.povar.ru/uploads/a0/99/e9/31/molochnii_kokteil_s_shokoladom-318319.jpg",
              weight: "200/25/40/ 15/5/2 гр.",
              price: 8888,
              description:
                "С хрустящими шариками из сулугуни и кукурузной муки с домашними соусами"
            },
            {
              title: "Мясной хлеб",
              favorite: false,
              image:
                "http://img.povar.ru/uploads/a0/99/e9/31/molochnii_kokteil_s_shokoladom-318319.jpg",
              weight: "200/25/40/ 15/5/2 гр.",
              price: 8888,
              description:
                "С хрустящими шариками из сулугуни и кукурузной муки с домашними соусами"
            }
          ],
          Салаты: [
            {
              title: "Мясной хлеб",
              favorite: false,
              image:
                "http://img.povar.ru/uploads/a0/99/e9/31/molochnii_kokteil_s_shokoladom-318319.jpg",
              weight: "200/25/40/ 15/5/2 гр.",
              price: 8888,
              description:
                "С хрустящими шариками из сулугуни и кукурузной муки с домашними соусами"
            },
            {
              title: "Мясной хлеб",
              favorite: false,
              image:
                "http://img.povar.ru/uploads/a0/99/e9/31/molochnii_kokteil_s_shokoladom-318319.jpg",
              weight: "200/25/40/ 15/5/2 гр.",
              price: 8888,
              description:
                "С хрустящими шариками из сулугуни и кукурузной муки с домашними соусами"
            }
          ],
          Супы: [
            {
              title: "Борщ",
              favorite: false,
              image:
                "http://img.povar.ru/uploads/a0/99/e9/31/molochnii_kokteil_s_shokoladom-318319.jpg",
              weight: "200/25/40/ 15/5/2 гр.",
              price: 8888,
              description:
                "С хрустящими шариками из сулугуни и кукурузной муки с домашними соусами"
            },
            {
              title: "Уха",
              favorite: false,
              image:
                "http://img.povar.ru/uploads/a0/99/e9/31/molochnii_kokteil_s_shokoladom-318319.jpg",
              weight: "200/25/40/ 15/5/2 гр.",
              price: 8888,
              description:
                "С хрустящими шариками из сулугуни и кукурузной муки с домашними соусами"
            }
          ]
        },
        time:
          "с 11:00 до 22:30 пт, сб до 05:15 \nдоставим за 90 мин или ко времени",
        averageBill: 9000,
        minBill: 1000,
        web: "www.google.com",
        discount: 25
      }
    };
    this.navigationOptions.title = this.state.data.title;
  }

  componentWillMount = async () => {
    const restaurantId = this.props.navigation.state
      ? this.props.navigation.state.restaurantId
      : (0).toString();
    fetch("http://dostavka1.com/v1/restaurant?restaurantId=" + restaurantId)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson["data"] && responseJson["data"]["result"])
          this.state.data = responseJson["data"]["result"];
        this.setState({});
        return responseJson;
      });
  };

  /**
	 * Возвращает меню в формате массива объектов
	 */
  toArrayMenu() {
    var result = [];
    for (type in this.state.data.menu) {
      result.push({
        plates: this.state.data.menu[type],
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

  _renderHeader(section) {
    return (
      <View
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
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            fontFamily: "stem-medium",
            letterSpacing: 0.8
          }}
        >
          {section.type}
        </Text>
        <Icon
          name="ios-arrow-down-outline"
          size={16}
          color="rgb( 111, 111, 111)"
        />
      </View>
    );
  }

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
            flexDirection: "row",
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
              fontFamily: "stem-medium",
              color: "#ffffff"
            }}
          >
            {price + " ₽"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  _renderContent = section => {
    const imageHeight =
      viewportWidth >= 320 && viewportWidth < 375
        ? 100
        : viewportWidth >= 375 && viewportWidth < 414 ? 117 : 130;
    //const textMarginRight = (viewportWidth >= 320 && viewportWidth < 375) ? 40 : (viewportWidth >= 375 && viewportWidth < 414) ? 117 : 130;
    return (
      <View style={{ flexDirection: "column", width: viewportWidth }}>
        {section.plates.map((e, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => {
                if (this.state.canNav) {
                  this.props.navigation.navigate("Plate");
                  this.state.canNav = false;
                  setTimeout(() => {
                    this.state.canNav = true;
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
                <Image
                  source={{
                    uri: e.image
                  }}
                  style={{
                    width: imageHeight,
                    height: imageHeight,
                    borderRadius: 10
                  }}
                />
                <View
                  style={{
                    flexDirection: "column",
                    marginLeft: 10,
                    width: viewportWidth - 20 - 20 - imageHeight
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
                  <Text
                    style={{
                      color: "rgb( 135, 136, 140)",
                      fontSize: 12,
                      lineHeight: 14,
                      marginBottom: 5
                    }}
                  >
                    {e.description}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <PriceButton
                      value={e.price}
                      pressed={getCount(this.props.globalStore, e) != 0}
                      count={getCount(this.props.globalStore, e)}
                      onPress={() => this.props.onAddPlate(e)}
                    />
                    <Text
                      style={{
                        color: "rgb( 135, 136, 140)",
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
            </TouchableOpacity>
          );
        })}
      </View>
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
              fontFamily: "stem-medium",
              top: 2
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
              fontFamily: "stem-medium",
              top: 2
            }}
          >
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    Storage.subscribe(() => {
      this.setState({});
    });
    var restaurant = (
      <View>
        <ScrollView
          ref="scroll"
          style={styles.container}
          contentContainerStyle={{
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        >
          {/* Фото ресторана */}
          <Image
            source={{
              uri: this.state.data.image
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
                  '<div style="width:100%; height: 100%; background: url(' +
                  this.state.data.logoImage +
                  ') center center no-repeat; background-size: contain" />'
              }}
              style={{
                width: viewportWidth,
                height: 120,
                backgroundColor: "transparent"
              }}
            />
          </View>
          <View style={{ height: 70 }} />

          {/* Ранг пользователя
			<View style={[styles.row, { justifyContent: 'center' }]}>
				<Text style={{ color: '#dcc49c', fontFamily: 'open-sans-semibold', fontSize: 11 }}>{'Новичок'}</Text>
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
						fontFamily: 'open-sans-semibold',
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
              </View>
              <View style={{ height: 17 }} />
              <View style={[styles.row, { justifyContent: "flex-start" }]}>
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
                    fontFamily: "open-sans-semibold",
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
                fontFamily: "open-sans-semibold",
                fontSize: 13
              }}
            >
              {(this.state.hideInfo ? "Показать" : "Скрыть") +
                " информацию \nо ресторане"}
            </Text>
          </TouchableOpacity>

          {/* Кнопка Прейти к меню */}
          {this.renderButton("Перейти к меню", () => {
            this.refs["scroll"].scrollToEnd({ animated: true });
          })}

          {/* Лучшие блюда */}
          {hr}
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
          <View style={{ height: (viewportWidth - 40) * 1.32 + 130 }}>
            <Recomendations navigation={this.props.navigation} />
          </View>

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
                fontFamily: "stem-medium",
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
          <Accordion
            touchableProps={{
              activeOpacity: 0.2
            }}
            underlayColor="#292b37"
            style={{ alignSelf: "flex-start", width: viewportWidth }}
            sections={this.toArrayMenu()}
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

export default connect(
  state => ({
    globalStore: state.cart
  }),
  dispatch => ({
    onAddPlate: plate => {
      dispatch({ type: "ADD_PLATE", payload: plate });
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
  }
});
