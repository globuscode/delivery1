import React from "react";
import { PickerIOS } from "react-native";

export default class Picker extends React.Component {
  render = () => {
    return (
      <PickerIOS
        style={{
          width: 320,
          alignSelf: "center"
        }}
        selectedValue={this.props.selectedValue}
        itemStyle={{
          color: "#dcc49c",
          fontSize: 30
        }}
        onValueChange={this.props.onValueChange}
      >
        {this.props.data.map((value, i) => (
          <PickerIOS.Item label={value} value={i} key={i} />
        ))}
      </PickerIOS>
    );
  };
}
