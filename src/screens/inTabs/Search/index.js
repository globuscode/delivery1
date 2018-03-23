import React from "react";
import { View, ScrollView, Dimensions, Text, Alert } from "react-native";
import { connect } from "react-redux";
import { getStatusBarHeight } from "react-native-status-bar-height";
import LinearGradient from "react-native-linear-gradient";
import { TextField } from "react-native-material-textfield";
import propTypes from "prop-types";

import IconD from "../../../components/ui/IconD";
import RestaurantList from "../../../components/cards/RestaurantList";
import Plate from "../../../components/Plate";
import { getCartItemCount } from "../../../utils";
import { fetchJson, host } from "../../../etc";

const { width: viewportWidth } = Dimensions.get("window");

class Search extends React.Component {
  static navigationOptions = {
    title: "Поиск"
  };
  static propTypes = {
    navigation: propTypes.object,
    favourite: propTypes.object,
    imageCacher: propTypes.object,
    addToFav: propTypes.func,
    removeFromFav: propTypes.func,
    addRestToFav: propTypes.func,
    removeRestFromFav: propTypes.func,
    onAddPlate: propTypes.func,
    deletePlate: propTypes.func,
    showSpinner: propTypes.func,
    hideSpinner: propTypes.func,
    cart: propTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {
      canNav: true,
      searchValue: "",
      searchResults: {
        restaurants: [],
        plates: []
      }
    };
  }

  renderHeader = title => {
    return (
      <View
        stlye={{
          alignSelf: "stretch"
        }}
      >
        <Text
          style={{
            color: "#FFF",
            fontSize: 16,
            fontFamily: "Stem-Medium",
            marginLeft: 30
          }}
        >
          {title}
        </Text>
      </View>
    );
  };

  isInFav = ({ id }) => {
    return this.props.favourite.plates[id] != undefined;
  };

  search = async () => {
    const { searchValue } = this.state;
    this.props.showSpinner();
    const searchResponse = await fetchJson(
      `${host}/search/?search=${searchValue}`
    );
    if (searchResponse.data != undefined) {
      let searchResults = {
        restaurants: searchResponse.data.restaurants,
        plates: searchResponse.data.plates
      };
      this.setState({ searchResults: searchResults });
    }
    this.props.hideSpinner();
  };

  render = () => {
    const { cart } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ paddingTop: getStatusBarHeight() }}>
          <View
            style={{
              marginHorizontal: 20
            }}
          >
            <IconD
              name="find"
              color="#dcc49c"
              style={{ position: "absolute", top: 35 }}
              size={18}
            />
            <TextField
              onBlur={this.search}
              value={this.state.searchValue}
              tintColor="#dcc49c"
              baseColor="rgb(87, 88, 98)"
              textColor="#fff"
              returnKeyType="send"
              prefix="   "
              onChangeText={code => this.setState({ searchValue: code })}
              label="      Я ищу..."
            />
          </View>
          {this.state.searchResults.restaurants.length === 0
            ? null
            : this.renderHeader("Рестораны")}
          {this.state.searchResults.restaurants.length === 0 ? null : (
            <RestaurantList
              data={this.state.searchResults.restaurants}
              navigation={this.props.navigation}
            />
          )}
          {this.state.searchResults.plates.length === 0
            ? null
            : this.renderHeader("Блюда")}

          {this.state.searchResults.plates.length === 0
            ? null
            : this.state.searchResults.plates.map((e, i) => {
              const itemCount = getCartItemCount(cart, e);
              return (
                <Plate
                  key={i}
                  fav={this.isInFav(e)}
                  data={e}
                  itemCount={itemCount}
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
                  onFavPress={() => {
                    if (this.isInFav(e)) {
                      this.props.removeFromFav(e);
                    } else {
                      this.props.addToFav(e);
                    }
                  }}
                  onPriceButtonPress={async () => {
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
                  onDeletePlatePress={() => {
                    this.props.deletePlate(e);
                  }}
                />
              );
            })}
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
    },
    showSpinner: () => dispatch({ type: "SHOW_SPINNER" }),
    hideSpinner: () => dispatch({ type: "HIDE_SPINNER" })
  })
)(Search);
