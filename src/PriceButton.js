import React from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  WebView,
  Linking,
  Text
} from "react-native";
import { Badge } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient, Constants } from "expo";
import Accordion from "react-native-collapsible/Accordion";
import Touchable from 'react-native-platform-touchable';

import IconD from "./IconD";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const hr = (
  <View
    style={{
      alignSelf: "stretch",
      margin: 20,
      height: 1,
      backgroundColor: "rgb(87, 88, 98)"
    }}
  />
);
const hrShort = (
  <View
    style={{
      alignSelf: "stretch",
      margin: 10,
      marginHorizontal: 20,
      height: 1,
      backgroundColor: "rgb(87, 88, 98)"
    }}
  />
);

export default class Price extends React.Component {
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

  componentWillReceiveProps = (newProps) => {
    this.setState({
      pressed: this.props.count !== 0,
      count: this.props.count ? this.props.count : 0
    });
  }

  /**
	 * Возвращает кнопку с ценой
	 * @param {Number} price 
	 */
  render = () => {
    const screen =
      viewportWidth >= 320 && viewportWidth < 375
        ? 0
        : viewportWidth >= 375 && viewportWidth < 414 ? 1 : 2;
    return (
      <View styl={{ borderRadius: 5,}}>
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
            borderWidth: 1,
            height:
              viewportWidth >= 320 && viewportWidth < 375
                ? 28
                : viewportWidth >= 375 && viewportWidth < 414 ? 30 : 34,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "flex-start",
            alignContent: "center",
            borderColor: "#dcc49c",
            flexDirection: "row",
            minWidth:
              viewportWidth >= 320 && viewportWidth < 375
                ? 89
                : viewportWidth >= 375 && viewportWidth < 414 ? 97 : 104,
            backgroundColor: parseInt(this.props.count) > 0 ? "#dcc49c" : "transparent",
            borderColor: !parseInt(this.props.count) > 0 ? "#dcc49c" : "transparent"
          }}
        >
          <View style={{marginLeft: 5}}>
            <IconD
              name="cart"
              size={
                viewportWidth >= 320 && viewportWidth < 375
                  ? 12
                  : viewportWidth >= 375 && viewportWidth < 414 ? 12 : 12
              }
              color={!parseInt(this.props.count) > 0 ? "#dcc49c" : "#292b37"}
            />
            {this.props.count == 0 || this.props.count == null ? null : (
              <View style={{
                backgroundColor: '#fff',
                width: 10,
                height: 10,
                borderRadius: 5,
                top: -4,
                right: -4,
                position: "absolute",
              }}><Text style={{
                color: "black",
                fontSize: 8,
                textAlign: 'center',
                position: "absolute",
                width: 10,
                top: Platform.OS === "ios" ? 1 : 0,
                fontFamily: 'stem-medium',
                backgroundColor: 'transparent'
              }}>{this.props.count}</Text></View>
            )}
          </View>
          <Text
            style={{
              top: Platform.OS === "ios" ? 3 : 0,
              fontSize:
                viewportWidth >= 320 && viewportWidth < 375
                  ? 14
                  : viewportWidth >= 375 && viewportWidth < 414 ? 14 : 16,
              flex: 1, 
              textAlign: 'center',
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: 'transparent',
              alignSelf: "center",
              fontFamily: "stem-medium",
              color: !parseInt(this.props.count) > 0 ? "#fff" : "#292b37"
            }}
          >
            {this.state.value + " ₽"}
          </Text>
          
        </View>
      </Touchable></View>
    );
  };
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 20
  },
  row: {
    flexDirection: "row",
    alignSelf: "stretch"
  },
  column: {
    flexDirection: "column",
    alignSelf: "stretch"
  },
  container: {
    elevation: -10,
    backgroundColor: "#292b37"
  }
});
