import React from "react";
import { View, Text } from "react-native";
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
          position: "absolute",
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: "#fff"
        }}
      >
        <Text
          style={{
            position: "absolute",
            fontSize: 8,
            left: 2,
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
          <View
            style={{
              position: "absolute",
              top: -5,
              right: 0,
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: "#fff"
            }}
          >
            <Text
              style={{
                position: "absolute",
                fontSize: 8,
                left: 2,
                backgroundColor: "transparent"
              }}
            >
              {this.getItemsCount()}
            </Text>
          </View>
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
  state => ({
    cart: state.cart
  }),
  dispatch => ({})
)(TabIcon);
