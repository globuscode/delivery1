import React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import propTypes from "prop-types";
import Touchable from "react-native-platform-touchable";
import LinearGradient from "react-native-linear-gradient";

import IconD from "../ui/IconD";
import { adaptWidth } from "../../etc";

const { width: viewportWidth } = Dimensions.get("window");

class RestaurantCard extends React.Component {
  static propTypes = {
    onPress: propTypes.func,
    onFavPress: propTypes.func,
    key: propTypes.number,
    data: propTypes.object,
    inFav: propTypes.bool
  };

  renderLogo(logo) {
    const SLIDER_WIDTH = adaptWidth(280, 328.1, 362.3);

    return (
      <Image
        resizeMode="contain"
        style={{
          width: SLIDER_WIDTH / 3,
          height: SLIDER_WIDTH / 3,
          backgroundColor: "transparent"
        }}
        source={{ uri: "http:" + logo }}
      />
    );
  }

  renderHeart = () => {
    if (this.props.inFav)
      return (
        <TouchableOpacity
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          onPress={this.props.onFavPress}
        >
          <View style={{ backgroundColor: "transparent" }}>
            <IconD name={"trash"} size={18} color="#dcc49c" />
          </View>
        </TouchableOpacity>
      );
  };

  render = () => {
    const item = this.props.data;
    const index = this.props.key;
    const SLIDER_WIDTH = adaptWidth(
      viewportWidth - 2 * 20,
      viewportWidth - 2 * 24,
      viewportWidth - 26
    );
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
          onPress={this.props.onPress}
        >
          <View>
            <Image
              style={[
                styles.itemBackgroundImage,
                { width: SLIDER_WIDTH, height: SLIDER_WIDTH }
              ]}
              source={{
                uri:
                  "http:" + (item.image != undefined ? item.image : item.photo)
              }}
            />
            <LinearGradient
              colors={["rgba(0,0,0, 0.8)", "transparent", "rgba(0,0,0, 0.8)"]}
              style={[
                styles.itemGradientStyle,
                { width: SLIDER_WIDTH + 1, height: SLIDER_WIDTH + 1 }
              ]}
            />
          </View>
        </Touchable>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {/*<View style={{ flexDirection: 'row', alignSelf: 'flex-start'  }}>
                {this.renderLevel(item.level)}                
                <Text style={{
                  paddingHorizontal: 5,
                  maxWidth: 150,
                  //fontFamily: 'Stem-Medium',
                  fontWeight: 'bold',
                  fontSize: 13,
                  backgroundColor: '#dcc49c',
                  color: '#292b37',
                  }}>{item.discount}</Text>
                </View>*/}
          <View>{this.renderHeart()}</View>
        </View>
        <View
          pointerEvents="none"
          style={{
            flexDirection: "column",
            justifyContent: "flex-end",
            backgroundColor: "transparent"
          }}
        >
          {this.renderLogo(
            item.logoImage != undefined ? item.logoImage : item.restourantLogo
          )}
          <Text
            style={{
              color: "white",
              fontSize: 14,
              lineHeight: 22,
              fontFamily: "Stem-Medium",
              alignItems: "flex-end",
              letterSpacing: 0.4
            }}
          >
            {item.title != undefined ? item.title : item.restourantName}
          </Text>
        </View>
      </View>
    );
  };
}

export default connect(null, null)(RestaurantCard);

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
