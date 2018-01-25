import React from "react";
import { View, Dimensions, Platform, Text } from "react-native";
import Touchable from "react-native-platform-touchable";
import PropTypes from "prop-types";

import IconD from "./IconD";
import { adaptWidth } from "./etc";

const { width: viewportWidth } = Dimensions.get("window");

class Price extends React.Component {
  navigationOptions = {
    title: "Home"
  };

  constructor(props) {
    super(props);
    this.state = {
      pressed: this.props.count !== 0,
      value: this.props.value,
      count: this.props.count ? this.props.count : 0
    };
  }

  componentWillReceiveProps = newProps => {
    this.setState({
      pressed: newProps.count !== 0,
      count: newProps.count ? newProps : 0
    });
  };

  /**
   * Возвращает кнопку с ценой
   * @param {Number} price
   */
  render = () => {
    return (
      <View styl={{ borderRadius: 5 }}>
        <Touchable
          onPress={this.props.onPress}
          background={Touchable.SelectableBackground()}
          style={{
            borderRadius: 5
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-start",
              //width: 100,
              borderWidth: 1.5,
              height: adaptWidth(28, 30, 34),
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "flex-start",
              alignContent: "center",
              minWidth:
                viewportWidth >= 320 && viewportWidth < 375
                  ? 89
                  : viewportWidth >= 375 && viewportWidth < 414 ? 97 : 104,
              backgroundColor:
                parseInt(this.props.count) > 0 ? "#dcc49c" : "transparent",
              borderColor:
                !parseInt(this.props.count) > 0 ? "#dcc49c" : "transparent"
            }}
          >
            <View style={{ marginLeft: 8 }}>
              <IconD
                name="cart"
                size={adaptWidth(13, 13, 13)}
                color={!parseInt(this.props.count) > 0 ? "#dcc49c" : "#292b37"}
              />
              {this.props.count == 0 || this.props.count == null ? null : (
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
                      fontSize: parseInt(this.props.count) < 20 ? 8 : 7,
                      textAlign: "center",
                      position: "absolute",
                      width: 10,
                      top:
                        Platform.OS === "ios"
                          ? parseInt(this.props.count) < 20 ? 1 : 2
                          : 0,
                      fontFamily: "Stem-Medium",
                      backgroundColor: "transparent"
                    }}
                  >
                    {this.props.count}
                  </Text>
                </View>
              )}
            </View>
            <Text
              style={{
                top: Platform.OS === "ios" ? 3 : 0,
                fontSize: adaptWidth(14, 14, 16),
                flex: 1,
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "transparent",
                alignSelf: "center",
                fontFamily: "Stem-Medium",
                color: !parseInt(this.props.count) > 0 ? "#fff" : "#292b37"
              }}
            >
              {this.state.value + " ₽"}
            </Text>
          </View>
        </Touchable>
      </View>
    );
  };
}

Price.propTypes = {
  count: PropTypes.number,
  value: PropTypes.number,
  onPress: PropTypes.func
};

export default Price;
