import React from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  Dimensions,
  Alert
} from "react-native";
import { connect } from "react-redux";
import SegmentedControlTab from "react-native-segmented-control-tab";
import LinearGradient from "react-native-linear-gradient";
import { getStatusBarHeight } from "react-native-status-bar-height";
import propTypes from "prop-types";

import CollectionCard from "../../../components/cards/CollectionCard";
import RestaurantCard from "../../../components/cards/RestaurantCard";
import { getCartItemCount } from "../../../utils";
import { adaptWidth, host, fetchJson } from "../../../etc";
import Plate from "../../../components/Plate";
const { width: viewportWidth } = Dimensions.get("window");

class Favourite extends React.Component {
  static propTypes = {
    favourite: propTypes.shape({
      plates: propTypes.object,
      collections: propTypes.object,
      restaurants: propTypes.object
    }),
    cart: propTypes.object,
    onDeletePlate: propTypes.func,
    onAddPlate: propTypes.func,
    onRemovePlate: propTypes.func,
    open: propTypes.func,
    navigation: propTypes.object,
    onDeleteRestaurant: propTypes.func,
    deletePlate: propTypes.func,
    onDeleteColletion: propTypes.func,
    globalStore: propTypes.array
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedView: 0,
      restaurans: {},
      canNav: true,
      favourite: {
        plates: {},
        collections: {},
        restaurants: {}
      }
    };
  }

  /**
   * Возвращает jsx компонент,
   * содержащий все рестораны из избранного
   *
   * @memberof Favourite
   */
  renderRestaurants = () => {
    const { favourite } = this.state;
    const { restaurants } = favourite;
    const restaurantsIds = Object.keys(restaurants);
    return restaurantsIds.map((id, index) => {
      return (
        <RestaurantCard
          inFav
          data={restaurants[id]}
          key={index}
          onPress={() =>
            this.props.navigation.navigate("Loader", {
              id: restaurants[id].id,
              action: "navigateToRestaurant"
            })
          }
          onFavPress={() => {
            this.props.onDeleteRestaurant(restaurants[id]);
          }}
        />
      );
    });
  };

  _renderSingleCollection = (item, index) => {
    return (
      <CollectionCard
        key={index}
        data={item}
        favicon="trash"
        onPress={() => {
          this.props.navigation.navigate("Loader", {
            collection: item,
            action: "navigateToCollection"
          });
        }}
        onFavPress={() => this.props.onDeleteColletion(item)}
      />
    );
  };

  renderCollections = () => {
    const { favourite } = this.state;
    const { collections } = favourite;
    const restaurantsIds = Object.keys(collections);
    return restaurantsIds.map((id, index) => {
      return this._renderSingleCollection(collections[id], index);
    });
  };

  renderPlates = () => {
    const { favourite } = this.state;
    const { plates } = favourite;
    const platesIds = Object.keys(plates);
    const { cart } = this.props;
    return (
      <View style={{ flexDirection: "column", width: viewportWidth }}>
        {platesIds.map((id, i) => {
          const e = plates[id];
          const itemCount = getCartItemCount(cart, e);
          return (
            <Plate
              key={i}
              data={e}
              inFav
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
                this.props.onDeletePlate(e);
                this.setState({});
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
      </View>
    );
  };

  componentWillMount = () => {
    this.componentWillReceiveProps(this.props);
  };

  componentWillReceiveProps = async newProps => {
    await AsyncStorage.setItem("fav", JSON.stringify(newProps.favourite));

    const platesIds = Object.keys(newProps.favourite.plates);
    const restauransOfPlates = this.state.restaurans;
    for (let i = 0; i < platesIds.length; i++) {
      let { restaurant } = newProps.favourite.plates[platesIds[i]];
      let response = await fetchJson(
        `${host}/restaurant?restaurantId=${restaurant}`
      );
      if (response.data != undefined)
        if (response.data.result != undefined)
          if (restauransOfPlates[response.data.result.id] == undefined)
            restauransOfPlates[response.data.result.id] = response.data.result;
    }
    this.setState({
      favourite: newProps.favourite,
      restaurans: restauransOfPlates
    });
  };

  render = () => {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ paddingTop: getStatusBarHeight() }}>
          <Text
            style={{
              fontFamily: "Stem-Medium",
              fontSize: 15,
              marginTop: adaptWidth(16, 12, 14),
              marginBottom: 8,
              color: "#fff",
              alignSelf: "stretch",
              textAlign: "center"
            }}
          >
            {"Избранное"}
          </Text>
          <View
            style={{
              alignSelf: "stretch",
              marginHorizontal: 15
            }}
          >
            <SegmentedControlTab
              tabStyle={styles.tabStyle}
              tabTextStyle={styles.tabTextStyle}
              activeTabStyle={styles.activeTabStyle}
              activeTabTextStyle={styles.activeTabTextStyle}
              values={["Блюда", "Рестораны", "Подборки"]}
              selectedIndex={this.state.selectedView}
              onTabPress={index => this.setState({ selectedView: index })}
            />
          </View>

          <View
            style={{
              flexDirection: "column",
              alignSelf: "stretch",
              alignItems: "center"
            }}
          >
            {this.state.selectedView != 0 ? null : this.renderPlates()}
            {this.state.selectedView != 1 ? null : this.renderRestaurants()}
            {this.state.selectedView != 2 ? null : this.renderCollections()}
          </View>

          <View style={{ height: 70 }} />
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
  ({ favourite, cart, modalController }) => ({
    favourite: favourite,
    cart: cart,
    modal: modalController
  }),
  dispatch => ({
    onDeletePlate: fav =>
      dispatch({
        type: "DELETE_PLATE",
        payload: fav
      }),
    onDeleteRestaurant: data =>
      dispatch({
        type: "DELETE_RESTAURANT",
        payload: data
      }),
    onAddPlate: plate => {
      dispatch({ type: "ADD_PLATE", payload: plate });
    },
    deletePlate: plate => {
      dispatch({ type: "REMOVE_PLATE_BY_OBJECT", payload: plate });
    },
    open: data => dispatch({ type: "OPEN_MODAL", payload: data }),
    changeModal: data => {
      dispatch({ type: "CHANGE_CONTENT", payload: data });
    },
    onDeleteColletion: data =>
      dispatch({ type: "DELETE_COLLECTION", payload: data })
  })
)(Favourite);

const styles = StyleSheet.create({
  tabStyle: {
    //custom styles
    backgroundColor: "transparent",
    borderColor: "rgb(225, 199, 155)"
  },
  tabTextStyle: {
    fontFamily: "OpenSans",
    fontSize: 13,
    color: "rgb(225, 199, 155)"
  },
  activeTabStyle: {
    backgroundColor: "rgb(225, 199, 155)"
  },
  activeTabTextStyle: {
    color: "rgb(39, 40, 51)",
    backgroundColor: "rgb(225, 199, 155)"
  },
  text: {
    color: "white",
    fontSize: 16
  },
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#292b37",
    justifyContent: "space-between",
    alignItems: "center"
  },
  itemContainer: {
    flex: 1,
    padding: 20,
    width: viewportWidth - 40,
    marginVertical: 10,
    height: viewportWidth - 40,
    backgroundColor: "black",
    borderRadius: 10,
    justifyContent: "space-between",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5
  },
  itemBackgroundImage: {
    width: viewportWidth - 40,
    height: viewportWidth - 40,
    borderRadius: 10,
    position: "absolute",
    backgroundColor: "transparent"
  },
  itemGradientStyle: {
    height: viewportWidth - 40 + 1,
    top: -0.5,
    position: "absolute",
    width: viewportWidth - 40 + 1,
    left: -0.5,
    borderRadius: 10
  },
  p: {
    color: "rgb(135, 136, 140)",
    fontSize: 12,
    lineHeight: 14,
    marginBottom: 5
  }
});
