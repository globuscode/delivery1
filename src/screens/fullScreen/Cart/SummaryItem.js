import React from "react";
import { View, Text } from "react-native";
import propTypes from "prop-types";

class SummaryItem extends React.Component {
  static propTypes = {
    label: propTypes.string,
    text: propTypes.string,
    children: propTypes.node
  };
  render = () => {
    return (
      <View
        style={{
          height: 40,
          borderTopWidth: 1.5,
          borderBottomWidth: 0,
          borderColor: "rgb(87, 88, 98)",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 16,
          alignSelf: "stretch"
        }}
      >
        <Text
          style={{
            fontFamily: "Stem-Medium",
            fontSize: 16,
            color: "rgb(225, 199, 155)"
          }}
        >
          {this.props.label}
        </Text>
        {this.props.text === undefined ? (
          this.props.children
        ) : (
          <Text
            style={{
              fontFamily: "Stem-Medium",
              fontSize: 16,
              textAlignVertical: "center",
              top: 3,
              lineHeight: 16,
              letterSpacing: 1.1,
              color: "rgb(255, 255, 255)"
            }}
          >
            {this.props.text}
          </Text>
        )}
      </View>
    );
  };
}

export default SummaryItem;
