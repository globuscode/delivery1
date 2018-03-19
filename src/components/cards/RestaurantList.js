import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import propTypes from "prop-types";

import { host } from "../../etc";
import { fetchJson } from "../../etc";
import RestaurantCard from "./RestaurantCard";

class RestaurantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canNav: true,
      activeSlide: 0,
      favourites: [],
      restourans: []
    };
    if (props.data) {
      this.state.restourans = props.data;
      for (let i = 0; i < this.state.restourans.length; i++) {
        let { id } = this.state.restourans[i];
        this.state.favourites.push(
          this.props.favourite.restaurants[id] != undefined
        );
      }
    }
    this.fav = this.fav.bind(this);
  }

  static propTypes = {
    navigation: propTypes.object,
    favourite: propTypes.shape({
      plates: propTypes.object,
      collections: propTypes.object,
      restaurants: propTypes.object
    }),
    user: propTypes.shape({
      token: propTypes.string
    }),
    data: propTypes.array,
    addToFav: propTypes.func,
    removeFromFav: propTypes.func
  };

  componentWillMount = async () => {
    if (!this.props.data) {
      let responseJson = await fetchJson(
        `${host}/restaurants?token=${this.props.user.token}`
      );
      if (responseJson["data"]["restaurants"])
        this.state.restourans = responseJson["data"]["restaurants"];
    }
  };

  fav = index => {
    let favourites = this.state.favourites;
    favourites[index] = !favourites[index];
    this.setState({ favourites: favourites });
  };

  navigate = index => {
    if (this.state.canNav) {
      this.props.navigation.navigate("Loader", {
        id: this.state.restourans[index].id,
        action: "navigateToRestaurant"
      });
      this.setState({ canNav: false });
      setTimeout(() => {
        this.setState({ canNav: true });
      }, 1500);
    }
  };

  componentWillReceiveProps = props => {
    if (props.data) {
      this.setState({
        restourans: props.data,
        favourites: []
      });
      this.state.restourans.forEach(element => {
        let fav = false;
        for (let i = 0; i < this.props.favourite.restaurants.length; i++) {
          let rest = this.props.favourite.restaurants[i];
          if (rest === element.id) {
            fav = true;
          }
        }
        if (fav) this.state.favourites.push(true);
        else this.state.favourites.push(false);
        this.setState({});
      });
    }
  };

  render() {
    /* Разметка */
    return (
      <View
        style={{ elevation: 0, flexDirection: "column", alignItems: "center" }}
      >
        {this.state.restourans.map((item, index) => {
          return (
            <RestaurantCard
              key={index}
              data={item}
              onPress={() => this.navigate(index)}
              onFavPress={() => {
                let fav =
                  this.props.favourite.restaurants[item.id] != undefined;
                if (!fav) {
                  this.props.addToFav(item);
                  this.setState({});
                  return 0;
                }

                this.props.removeFromFav(item);
                this.setState({});
                return 0;
              }}
              fav={this.props.favourite.restaurants[item.id] != undefined}
            />
          );
        })}
      </View>
    );
  }
}

export default connect(
  ({ favourite, user }) => ({
    favourite: favourite,
    user: user
  }),
  dispatch => ({
    addToFav: data => {
      dispatch({ type: "ADD_RESTAURANT_TO_FAV", payload: data });
    },
    removeFromFav: data => {
      dispatch({ type: "DELETE_RESTAURANT", payload: data });
    }
  })
)(RestaurantList);
