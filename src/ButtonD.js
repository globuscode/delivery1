import React from "react";
import { View, Text, Dimensions, TouchableOpacity, Platform } from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class ButtonD extends React.Component {
  render = () => {
    return (
      <View style={{ alignSelf: "stretch" }}>
        <View
          style={[
            {
              justifyContent: "center",
              position: "absolute",
              width: this.props.width ? this.props.width : viewportWidth,
              borderWidth: 1,
              padding: 5,
              alignItems: "center",
              alignContent: "center",
              borderRadius: 4,
              borderColor: "white"
            }
          ]}
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: 14,
              fontFamily: "stem-medium",
              textAlign: 'center',
              top: Platform.OS === 'ios' ? 2 : 0
            }}
          >
          {this.props.title}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0}
          onPress={this.props.onPress}
          style={[
            {
              justifyContent: "center",
              width: this.props.width ? this.props.width : viewportWidth,
              padding: 5,
              borderWidth: 1,
              alignItems: "center",
              alignContent: "center",
              borderRadius: 4,
              borderColor: "#dcc49c"
            }
          ]}
        >
          <Text
            style={{
              color: "#ffffff",
              textAlign: 'center',
              fontSize: 14,
              fontFamily: "stem-medium",
              top: Platform.OS === 'ios' ? 2 : 0
            }}
          >
            {this.props.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}
