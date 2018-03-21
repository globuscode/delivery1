import React from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform
} from "react-native";
import propTypes from "prop-types";

const { width: viewportWidth } = Dimensions.get("window");

class ButtonD extends React.Component {
  render = () => {
    const title =
      typeof this.props.title === "string"
        ? [this.props.title]
        : this.props.title;
    return (
      <View style={{ alignSelf: "stretch" }}>
        <View
          style={[
            {
              justifyContent: "center",
              position: "absolute",
              width: this.props.width ? this.props.width : viewportWidth,
              borderWidth: 1,
              padding: 10,
              alignItems: "center",
              alignContent: "center",
              borderRadius: 4,
              borderColor: "white"
            },
            this.props.style
          ]}
        >
          {this.props.title.map((element, index) => (
            <Text
              style={{
                color: "#ffffff",
                fontSize: 14,
                fontFamily: "Stem-Medium",
                textAlign: "center",
                top: Platform.OS === "ios" ? 2 : 0
              }}
              key={index}
            >
              {element}
            </Text>
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0}
          onPress={this.props.onPress}
          style={[
            {
              justifyContent: "center",
              width: this.props.width ? this.props.width : viewportWidth,
              padding: 10,
              borderWidth: 1,
              alignItems: "center",
              alignContent: "center",
              borderRadius: 4,
              borderColor: "#dcc49c"
            },
            this.props.style
          ]}
        >
          {title.map((element, index) => (
            <Text
              style={{
                color: this.props.textColor ? this.props.textColor : "#ffffff",
                textAlign: "center",
                fontSize: 14,
                fontFamily: "Stem-Medium",
                top: Platform.OS === "ios" ? 2 : 0
              }}
              key={index}
            >
              {element}
            </Text>
          ))}
        </TouchableOpacity>
      </View>
    );
  };
}

ButtonD.propTypes = {
  style: propTypes.object,
  width: propTypes.number,
  title: propTypes.array,
  textColor: propTypes.string,
  onPress: propTypes.func
};

export default ButtonD;
