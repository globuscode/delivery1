import React from "react";
import { View, Dimensions } from "react-native";
import propTypes from "prop-types";
import Touchable from "react-native-platform-touchable";

const { width: viewportWidth } = Dimensions.get("window");

export default class BottomButton extends React.Component {
  static propTypes = {
    onPress: propTypes.func.isRequired,
    children: propTypes.oneOfType([
      propTypes.arrayOf(propTypes.node),
      propTypes.node
    ]).isRequired,
    borderColor: propTypes.string
  };
  render = () => {
    return (
      <View
        style={{
          position: "absolute",
          alignSelf: "center",
          width: viewportWidth - 30,
          bottom: 0,
          height: 49,
          borderTopWidth: 2,
          borderColor: this.props.borderColor === undefined ? "#dcc49c" : this.props.borderColor,
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <Touchable
          background={Touchable.Ripple("gray")}
          onPress={this.props.onPress}
          style={{
            alignSelf: "stretch",
            flexDirection: "column",
            justifyContent: "center",
            width: viewportWidth
          }}
        >
          {this.props.children}
        </Touchable>
      </View>
    );
  };
}
