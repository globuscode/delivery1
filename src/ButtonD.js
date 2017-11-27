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
              padding: 10,
              alignItems: "center",
              alignContent: "center",
              borderRadius: 4,
              borderColor: "white"
            }
          ]}
        >
          {this.props.title.map((element, index) => 
          <Text
            style={{
              color: "#ffffff",
              fontSize: 14,
              fontFamily: "stem-medium",
              textAlign: 'center',
              top: Platform.OS === 'ios' ? 2 : 0
            }}
            key={index}
          >
          {element}
          </Text>)}
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
            }
          ]}
        >
          {this.props.title.map((element, index) => 
          <Text
            style={{
              color: "#ffffff",
              textAlign: 'center',
              fontSize: 14,
              fontFamily: "stem-medium",
              top: Platform.OS === 'ios' ? 2 : 0
            }}
            key={index}
          >
            {element}
          </Text>)}
        </TouchableOpacity>
      </View>
    );
  };
}
