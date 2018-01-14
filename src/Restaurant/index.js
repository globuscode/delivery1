import React from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Platform,
  ScrollView,
  Image,
  WebView,
  Linking,
  Text,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "react-native-button";
import { LinearGradient, Constants } from "expo";
import Touchable from "react-native-platform-touchable";
import { host } from "../etc";
import { connect } from 'react-redux';

import Recomendations from "../Main/Recomendations";
import IconD from "../IconD";
import { fetchJson } from "../utils";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const hr = (
  <View
    style={{
      alignSelf: "stretch",
      marginHorizontal: 20,
      height: 1,
      backgroundColor: "rgb(87, 88, 98)"
    }}
  />
);
const hrShort = (
  <View
    style={{
      width: 290,
      alignSelf: "center",
      margin: 0,
      height: 1,
      backgroundColor: "rgb(87, 88, 98)"
    }}
  />
);

class Restaurant extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
    title: navigation.state.params.title,
    headerRight: <Touchable
    onPress={navigation.state.params.onHeartPress}
    style={{
      aspectRatio: 1, 
      height: 25, 
      backgroundColor: 'transparent'
    }}>
      <IconD
        name={navigation.state.params.favourite ? 'heart_full' : 'heart_empty'}
        size={18}
        color='#dcc49c'
      />
    </Touchable>
}}

  constructor(props) {
    super(props);
    this.state = {
      rang: 0,
      canNav: true,
      data: {
        id: 0,
        title: "",
        image: "//dostavka1.com/img/app-icon.png",
        logoImage: "//dostavka1.com/img/app-icon.png",
        favorite: false,
        type: "",
        /*
				tagGroups: [
						{
							"id": 12,
							"title": "<string>",
							"size": <float>,
							“icon”: “http://gg.svg”
						},
						<tag_grou_id>,
				],*/
        minOrder: 0,
        description: {
          title: "",
          description: ""
        },
        bestPlates: [] /*
				promo: {
						id: <int>,
						title: <string>,
						description: <html>
				},*/,
        menu: {},
        time: "",
        averageBill: 0,
        minBill: 0,
        web: ""
        /*discount: <float>*/
      },
      favourite: false
    };
  }

  componentWillMount = async () => {
    let fav = false;

    for (let i=0; i<this.props.favourite.restaurants.length; i++) {
      let rest = this.props.favourite.restaurants[i];
      if (rest === this.state.data.id) {
        fav = true;
      }
    }

    const restaurantId = this.props.navigation.state
      ? this.props.navigation.state.params.id
      : (-1).toString();

    let restaurantResponseJson = await fetchJson(`${host}/restaurant?restaurantId=${restaurantId}`);

    if (restaurantResponseJson.data === undefined) {
      Alert.alert('Ошибка', 'Ошибка запроса');
      throw Error('Упс...');
    }

    this.props.navigation.setParams({
      favourite: fav,
      title: restaurantResponseJson.data.result.title,
      onHeartPress: () => {
        if (!this.state.favourite) {
          this.props.addToFav({
            id: this.props.navigation.state.params.id
          });
        }
        else {
          this.props.removeFromFav({
            id: this.props.navigation.state.params.id
          });
        }
      }
    });

    this.setState({
      favourite: fav,
      data: restaurantResponseJson.data.result
    });
  }

  componentWillReceiveProps = async () => {
    let fav = false;

    for (let i=0; i<this.props.favourite.restaurants.length; i++) {
      let rest = this.props.favourite.restaurants[i];
      if (rest === this.state.data.id) {
        fav = true;
      }
    }

    if (fav != this.state.favourite) {
      const restaurantId = this.props.navigation.state
      ? this.props.navigation.state.params.id
      : (-1).toString();

      this.props.navigation.setParams({
        favourite: fav,
        title: this.state.data.title,
        onHeartPress: () => {
          if (!this.state.favourite) {
            this.props.addToFav({
              id: this.props.navigation.state.params.id
            });
          }
          else {
            this.props.removeFromFav({
              id: this.props.navigation.state.params.id
            });
          }
        }
      });

      this.state.favourite = fav;
    } 
  }

  componentDidMount = async () => {
    const restaurantId = this.props.navigation.state
      ? this.props.navigation.state.params.id
      : (-1).toString();
    fetch(`${host}/restaurant?restaurantId=${restaurantId}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson["data"] && responseJson["data"]["result"])
          this.state.data = responseJson["data"]["result"];
          this.props.navigation.setParams({
            favourite: this.state.favourite,
            title: this.state.data.title,
            onHeartPress: () => {
              if (!this.state.favourite) {
                this.props.addToFav({
                  id: this.props.navigation.state.params.id
                });
              }
              else {
                this.props.removeFromFav({
                  id: this.props.navigation.state.params.id
                });
              }
            }
          });
        this.setState({});
        return responseJson;
      });
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
                  ? 44
                  : viewportWidth >= 375 && viewportWidth < 414 ? 52 : 57,
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
              fontFamily: "stem-medium",
              top: Platform.OS === "ios" ? 2 : 0
            }}
          >
            {"Открыть меню ресторана"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    var restaurant = (
      <View>
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
                  '<div style="width:100%; height: 100%; background: url(http:' +
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
          <View style={{ height: 70 - 20 }} />

          {/* Ранг пользователя
			<View style={[styles.row, {justifyContent: 'center'}]}>
				<Text style={{ color: '#dcc49c', fontFamily: 'open-sans-semibold', fontSize: 11 }}>{'Новичок'}</Text>
			</View>
			<View style={[styles.row, { justifyContent: 'center' }]}>
				{[1, 2, 3].map(e => 
					<View
						key={ e }
						style={{margin: 3.3}}>
							<IconD
								name='dostavka'
								color={e <= this.state.rang ? '#dcc49c' : 'rgb(87, 88, 98)'}
								size={16}/>
					</View>)}
			</View> */}

          {/* Кнопка Хочу скидку 
			<View style={[styles.row, { justifyContent: 'center' }]}>
				<TouchableOpacity>
					<View style={{
						margin: 5,
					}}>
					<Text style={{
							color: 'white', fontFamily: 'open-sans-semibold', fontSize: 11 
					}}>{'Хочу скидку в этом ресторане'}</Text></View>
				</TouchableOpacity>
			</View>*/}

          {/* Название ресторана */}
          <View style={[styles.row, { justifyContent: "center" }]}>
            <Text
              style={{
                marginTop: 13,
                color: "#dcc49c",
                fontSize: 20,
                fontFamily: "stem-medium",
                lineHeight: 22,
                letterSpacing: 0.9,
                top: 2
              }}
            >
              {this.state.data.title}
            </Text>
          </View>
          <View style={[styles.row, { justifyContent: "center" }]}>
            <Text
              style={{
                marginTop: 6,
                color: "#fff",
                fontSize: 13,
                fontFamily: "stem-medium",
                lineHeight: 16,
                letterSpacing: 0.6,
                top: 4
              }}
            >
              {this.state.data.type}
            </Text>
          </View>

          {/* Кнопка Открыть меню ресторана */}
          {this.renderButton("Открыть меню ресторана", () => {
            if (this.state.canNav && this.state.data.id != 0) {
              this.props.navigation.navigate("SetAddress", {
                id: this.state.data.id
              });
              this.state.canNav = false;
              setTimeout(() => {
                this.state.canNav = true;
              }, 1500);
            }
          })}

          {/* Минимальная сумма заказа и бесплатная доставка */}
          {this.state.data.freeDelivery == null ? null : (
            <View
              style={[
                {
                  justifyContent: "center",
                  flexDirection: "row",
                  left: -15,
                  marginBottom: 38
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
                  fontFamily: "open-sans",
                  lineHeight: 13,
                  top: 2,
                  marginLeft: 15
                }}
              >{`Минимальная сумма заказа ${
                this.state.data.minBill
              } ₽ \nБесплатная доставка от ${
                this.state.data.freeDelivery
              } ₽`}</Text>
            </View>
          )}

          {/* Описание ресторана */}
          {this.state.data.description.description == "" &&
          this.state.data.description.title == "" ? null : (
            <View>
              {hr}
              {/* Описание ресторана */}
              {
                <View
                  style={{
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    marginTop: 15,
                    marginBottom: 27,
                    marginHorizontal: 20
                  }}
                >
                  <View style={[styles.row, { justifyContent: "flex-start" }]}>
                    {this.state.data.description.title == "" ? null : <Text
                      style={{
                        color: "#dcc49c",
                        fontSize: 13,
                        lineHeight: 16,
                        letterSpacing: 0.6,
                        top: 3
                      }}
                    >
                      {this.state.data.description.title}
                    </Text>}
                  </View>
                  <View style={{ height: 17 }} />
                  <View style={[styles.row, { justifyContent: "flex-start" }]}>
                    {this.state.data.description.description == "" ? null :<Text
                      style={{
                        color: "#ffffff",
                        fontSize: 13,
                        lineHeight: 17,
                        top: 4
                      }}
                    >
                      {this.state.data.description.description}
                    </Text>}
                  </View>
                </View>
              }
              {hr}
            </View>
          )}

          {/* Лучшие блюда */}
          {this.state.data.bestPlates == undefined ? null : (
            <View>
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
                <Recomendations
                  data={this.state.data.bestPlates}
                  navigation={this.props.navigation}
                />
              </View>
            </View>
          )}
          {/* Дополнительная информация */}
          {hrShort}
          {this.renderHeader("Дополнительная информация")}
          <View
            style={[
              styles.row,
              {
                justifyContent: "space-around",
                marginHorizontal: 20,
                marginBottom: 18
              }
            ]}
          >
            <View
              style={{
                flexDirection: "row"
              }}
            >
              <View style={{ margin: 0 }}>
                <IconD name="clock" color={"#dcc49c"} size={30} />
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  marginLeft: 15
                }}
              >
                <Text style={{ color: "#dcc49c", fontSize: 11, height: 15 }}>
                  {"Время работы\n"}
                </Text>
                <Text style={{ color: "#ffffff", fontSize: 11, maxWidth: 90 }}>
                  {this.state.data.time}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row"
              }}
            >
              <View style={{ marginHorizontal: 15 }}>
                <IconD name="coins" color={"#dcc49c"} size={30} />
              </View>
              {this.state.data.averageBill == undefined ? null : (
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "flex-start"
                  }}
                >
                  <Text style={{ color: "#dcc49c", fontSize: 11, height: 15 }}>
                    {"Средний счет\n"}
                  </Text>
                  <Text style={{ color: "#ffffff", fontSize: 11 }}>
                    {this.state.data.averageBill.toString() + " ₽"}
                  </Text>
                </View>
              )}
            </View>
          </View>
          {hrShort}

          {/* Сайт ресторана */}
          {this.state.data.web == undefined
            ? null
            : this.renderHeader("Сайт ресторана")}

          {this.state.data.web == undefined ? null : (
            <View
              style={[
                styles.row,
                {
                  justifyContent: "flex-start",
                  marginHorizontal: 20,
                  marginBottom: 25
                }
              ]}
            >
              <View
                style={{
                  flexDirection: "row"
                }}
              >
                <TouchableOpacity
                  onPress={() => Linking.openURL(this.state.data.web)}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "center",
                      marginLeft: 20
                    }}
                  >
                    <Icon
                      name="ios-globe-outline"
                      color={"#dcc49c"}
                      style={{}}
                      size={30}
                    />
                    <View
                      style={{
                        borderBottomWidth: 1,
                        marginLeft: 20,
                        //backgroundColor: 'red',
                        //height: 15,
                        top: -3,
                        alignSelf: "center",
                        borderColor: "#dcc49c"
                      }}
                    >
                      <Text
                        style={{
                          color: "#dcc49c",
                          alignSelf: "center",
                          fontSize: 14
                        }}
                      >
                        {this.state.data.web}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
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

  /**
   * @param {String} title – текст заголовка
   */
  renderHeader = title => {
    return (
      <View
        style={[
          styles.row,
          { justifyContent: "flex-start", marginVertical: 14, marginLeft: 15 }
        ]}
      >
        <Text
          style={{
            color: "#FFF",
            fontSize: 16,
            letterSpacing: 0.8,
            marginLeft: 15,
            fontFamily: "stem-medium"
          }}
        >
          {title}
        </Text>
      </View>
    );
  };

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

export default connect(
  state => ({
    favourite: state.favourite
  }),
  dispatch => ({
    addToFav: (data) => {
      dispatch({ type: "ADD_RESTAURANT_TO_FAV", payload: data })
    },
		removeFromFav: (data) => {
			dispatch({ type: "DELETE_RESTAURANT", payload: data })
		},
  })
)(Restaurant)

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
    backgroundColor: "rgb( 39, 40, 51)"
  }
});
