import React from "react";
import { View, Text, Platform } from "react-native";
import { connect } from "react-redux";
import propTypes from "prop-types";

import IconD from "../../../components/ui/IconD";
import { getCartTotalCount } from "../../../utils";

class TabIcon extends React.Component {
  static propTypes = {
    cart: propTypes.object,
    focused: propTypes.bool
  };

  renderBadge = () => {
    const { cart } = this.props;
    const count = getCartTotalCount(cart);

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
            fontSize: parseInt(count) < 20 ? 8 : 7,
            textAlign: "center",
            position: "absolute",
            width: 10,
            top: Platform.OS === "ios" ? (parseInt(count) < 20 ? 1 : 2) : 0,
            fontFamily: "Stem-Medium",
            backgroundColor: "transparent"
          }}
        >
          {count}
        </Text>
      </View>
    );
  };

  render = () => {
    const { cart, focused } = this.props;
    if (Object.keys(cart).length > 0) {
      return (
        <View
          style={{
            width: 25,
            height: 20
          }}
        >
          <IconD
            size={24}
            name={focused ? "cart-fill" : "cart"}
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
          name={focused ? "cart-fill" : "cart"}
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
  () => ({})
)(TabIcon);
