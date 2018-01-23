import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Touchable from "react-native-platform-touchable";
import { connect } from "react-redux";
import propTypes from "prop-types";

import IconD from "../IconD";
import { host, adaptWidth } from "../etc";
import { fetchJson } from "../etc";

const { width: viewportWidth } = Dimensions.get("window");

class Recomendations extends React.Component {
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
      });
    }
    this.fav = this.fav.bind(this);
  }

  static propTypes = {
    navigation: propTypes.object,
    favourite: propTypes.object,
    data: propTypes.array,
    addToFav: propTypes.func,
    removeFromFav: propTypes.func
  };

  componentWillMount = async () => {
    if (!this.props.data) {
      let responseJson = await fetchJson(`${host}/restaurants`);
      if (responseJson["data"]["restaurants"])
        this.state.restourans = responseJson["data"]["restaurants"];
    }
  };

  fav = index => {
    let favourites = this.state.favourites;
    favourites[index] = !favourites[index];
    this.setState({ favourites: favourites });
  };

  renderLevel = level => {
    var result = [];
    for (var i = 0; i < level; i++)
      result.push(
        <View
          key={i}
          style={{
            width: 16,
            height: 16,
            backgroundColor: "rgb( 38, 39, 50)",
            marginRight: 5
          }}
        >
          <IconD name="dostavka" size={16} color={"#dcc49c"} />
        </View>
      );
    return result;
  };

  renderHeart(index) {
    return (
      <TouchableOpacity
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        onPress={() => {
          if (this.state.favourites[index]) {
            this.props.removeFromFav(this.state.restourans[index]);
            this.setState({});
            //this.fav(index);
          } else {
            this.props.addToFav(this.state.restourans[index]);
            this.setState({});
            //this.fav(index);
          }
        }}
      >
        <View style={{ backgroundColor: "transparent" }}>
          <IconD
            name={this.state.favourites[index] ? "heart_full" : "heart_empty"}
            size={18}
            color="#dcc49c"
          />
        </View>
      </TouchableOpacity>
    );
  }

  renderLogo(logo) {
    const screen =
      viewportWidth >= 320 && viewportWidth < 375
        ? 0
        : viewportWidth >= 375 && viewportWidth < 414 ? 1 : 2;
    const SLIDER_WIDTH = screen == 0 ? 280 : screen == 1 ? 328.1 : 362.3;

    return (
      <Image
        style={{
          width: SLIDER_WIDTH / 3,
          height: SLIDER_WIDTH / 3,
          backgroundColor: "transparent"
        }}
        resizeMode={"contain"}
        source={{ uri: "http:" + logo }}
      />
    ); /*
    return <View style={{ height: SLIDER_WIDTH / 3 }}>
      <WebView
        bounces={false}
        scrollEnabled={false}
        source={{
          html: `<img 
            src="` + logo + `"
            style="
            width:100%;">`
        }}
        style={{
          width: SLIDER_WIDTH / 3,
          height: SLIDER_WIDTH / 3,
          backgroundColor: 'transparent',
        }} />
    </View>*/
  }

  navigate = index => {
    if (this.state.canNav) {
      this.props.navigation.navigate("Restaurant", {
        id: this.state.restourans[index].id
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
    const SLIDER_WIDTH = viewportWidth - 2 * adaptWidth(20, 24, 26);
    return (
      <View
        style={{ elevation: 0, flexDirection: "column", alignItems: "center" }}
      >
        {this.state.restourans.map((item, index) => {
          return (
            <View
              key={index}
              style={[
                styles.itemContainer,
                { width: SLIDER_WIDTH, height: SLIDER_WIDTH }
              ]}
            >
              <Touchable
                foreground={Touchable.SelectableBackgroundBorderless()}
                activeOpacity={0.8}
                style={{
                  position: "absolute",
                  width: SLIDER_WIDTH,
                  height: SLIDER_WIDTH
                }}
                onPress={() => this.navigate(index)}
              >
                <View>
                  <Image
                    onLoadEnd={() => this.setState({})}
                    style={[
                      styles.itemBackgroundImage,
                      { width: SLIDER_WIDTH, height: SLIDER_WIDTH }
                    ]}
                    source={{ uri: "http:" + item.photo }}
                  />
                  <LinearGradient
                    colors={[
                      "rgba(0,0,0, 0.8)",
                      "transparent",
                      "rgba(0,0,0, 0.8)"
                    ]}
                    style={[
                      styles.itemGradientStyle,
                      { width: SLIDER_WIDTH + 1, height: SLIDER_WIDTH + 1 }
                    ]}
                  />
                </View>
              </Touchable>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                {/*<View style={{ flexDirection: 'row', alignSelf: 'flex-start'  }}>
                  {this.renderLevel(item.level)}                
                  <Text style={{
                    paddingHorizontal: 5,
                    maxWidth: 150,
                    //fontFamily: 'stem-medium',
                    fontWeight: 'bold',
                    fontSize: 13,
                    backgroundColor: '#dcc49c',
                    color: '#292b37',
                    }}>{item.discount}</Text>
                  </View>*/}
                <View>{this.renderHeart(index)}</View>
              </View>
              <View
                pointerEvents="none"
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  backgroundColor: "transparent"
                }}
              >
                {this.renderLogo(item.restourantLogo)}
                <Text
                  style={{
                    color: "white",
                    fontSize: 14,
                    lineHeight: 22,
                    fontFamily: "stem-medium",
                    alignItems: "flex-end",
                    letterSpacing: 0.4
                  }}
                >
                  {item.restourantName}
                </Text>
                <Text
                  style={{
                    color: "#dcc49c",
                    fontSize: 11,
                    lineHeight: 11,
                    fontFamily: "OpenSans"
                  }}
                >
                  {item.restourantTags.length < 3
                    ? item.restourantTags.map(tag => tag + ", ")
                    : item.restourantTags[0] +
                      ", " +
                      item.restourantTags[1] +
                      " + " +
                      (item.restourantTags.length - 1).toString() +
                      " кухонь"}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}

export default connect(
  state => ({
    favourite: state.favourite
  }),
  dispatch => ({
    addToFav: data => {
      dispatch({ type: "ADD_RESTAURANT_TO_FAV", payload: data });
    },
    removeFromFav: data => {
      dispatch({ type: "DELETE_RESTAURANT", payload: data });
    }
  })
)(Recomendations);

const styles = StyleSheet.create({
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
  }
});
