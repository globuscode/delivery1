import React from "react";
import { View, Text, Platform } from "react-native";
import { connect } from "react-redux";
import IconD from "../IconD";

class TabIcon extends React.Component {
  getItemsCount = () => {
    let result = 0;
    this.props.cart.forEach(element => {
      result += element.count;
    });
    return result;
  };

  renderBadge = () => {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          width: 10,
          height: 10,
          borderRadius: 5,
          top: -4,
          right: -4,
          position: "absolute"
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: parseInt(this.getItemsCount()) < 20 ? 8 : 7,
            textAlign: "center",
            position: "absolute",
            width: 10,
            top:
              Platform.OS === "ios"
                ? parseInt(this.getItemsCount()) < 20 ? 1 : 2
                : 0,
            fontFamily: "Stem-Medium",
            backgroundColor: "transparent"
          }}
        >
          {this.getItemsCount()}
        </Text>
      </View>
    );
  };

  render = () => {
    if (this.props.cart.length > 0) {
      return (
        <View
          style={{
            width: 25,
            height: 20
          }}
        >
          <IconD
            size={24}
            name={this.props.focused ? "cart-fill" : "cart"}
            color={"rgb(225, 199, 155)"}
          />
          {this.renderBadge()}
        </View>
      );
    }
    return (
      <View
        style={{
          width: 24,
          height: 20
        }}
      >
        <IconD
          size={24}
          name={this.props.focused ? "cart-fill" : "cart"}
          color={"rgb(225, 199, 155)"}
        />
      </View>
    );
  };
}

export default connect(
  ({ cart }) => ({
    cart: cart
  }),
  dispatch => ({})
)(TabIcon);
