import React from "react";
import { View, TouchableOpacity, Dimensions } from "react-native";
import propTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import Carousel, { Pagination } from "react-native-snap-carousel";

import { CollectionCard } from "../components/cards";
import { adaptWidth } from "../etc";

const { width: viewportWidth } = Dimensions.get("window");

class Collections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      canNav: true,
      favourites: [],
      entries: props.data
    };
  }

  fav = index => {
    if (this.state.favourites[index])
      this.props.removeColletionFromFav(this.state.entries[index]);
    else this.props.addCollectionToFav(this.state.entries[index]);
  };

  static propTypes = {
    onNextButtonPress: propTypes.func,
    data: propTypes.array,
    favourite: propTypes.shape({
      collections: propTypes.object
    }),
    navigation: propTypes.shape({
      navigate: propTypes.func
    }),
    addCollectionToFav: propTypes.func,
    removeColletionFromFav: propTypes.func
  };

  componentWillReceiveProps = newProps => {
    this.props = newProps;
    const newFavourites = [];
    for (let i = 0; i < this.state.entries.length; i++) {
      let { id } = this.state.entries[i];
      let fav = newProps.favourite.collections[id] != undefined;
      if (fav) newFavourites.push(true);
      else newFavourites.push(false);
    }
    this.setState({ favourites: newFavourites });
  };

  componentDidMount = () => {
    this.componentWillReceiveProps(this.props);
  };

  nav = i => {
    if (this.state.canNav) {
      this.props.navigation.navigate("Loader", {
        collection: this.state.entries[i],
        action: "navigateToCollection"
      });
      this.setState({ canNav: false });
      setTimeout(() => {
        this.setState({ canNav: true });
      }, 1500);
    }
  };

  _renderNewItem = ({ item, index }) => {
    return (
      <CollectionCard
        key={index}
        data={item}
        favicon={this.state.favourites[index] ? "heart_full" : "heart_empty"}
        onPress={() => this.nav(index)}
        onFavPress={() => this.fav(index)}
      />
    );
  };

  render = () => {
    let slideW = adaptWidth(280, 328.1, 362.3);
    const SLIDER_MARGIN = adaptWidth(10, 11.7, 13.2) / 2;
    if (this.state.entries.length === 0) return null;
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
        {this.props.onNextButtonPress === undefined ? null : (
          <TouchableOpacity onPress={this.props.onNextButtonPress}>
            <Icon
              name="ios-arrow-down"
              size={30}
              style={{ alignSelf: "center", opacity: 0.4 }}
              color="white"
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };
}

export default connect(
  state => ({ favourite: state.favourite }),
  dispatch => ({
    addCollectionToFav: collection =>
      dispatch({ type: "ADD_COLLECTION_TO_FAV", payload: collection }),
    removeColletionFromFav: collection =>
      dispatch({ type: "DELETE_COLLECTION", payload: collection })
  })
)(Collections);
