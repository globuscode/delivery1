import React from "react";
import {
  Text,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  View
} from "react-native";
import propTypes from "prop-types";
import { adaptWidth } from "../../etc";
import IconD from "./IconD";

const { width: viewportWidth } = Dimensions.get("window");

export default class GuideButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  static propTypes = {
    onPress: propTypes.func
  };

  componentWillMount = async () => {
    const guideState = await AsyncStorage.getItem("guide");
    if (guideState === null) this.setState({ visible: true });
  };

  changeState = () => {
    this.setState({ visible: !this.state.visible });
    AsyncStorage.setItem("guide", false.toString());
  };
  render = () => {
    return !this.state.visible ? null : (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={{
          flexDirection: "column",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          marginTop: adaptWidth(0, 23, 66),
          marginBottom: adaptWidth(35, 58, 60)
        }}
      >
        <View style={{ height: 102 }}>
          <IconD name="food-feed" size={130} color="rgb(231, 208, 172)" />
        </View>
        <Text
          style={{
            fontFamily: "OpenSans",
            fontWeight: "bold",
            color: "rgb(225, 199, 155)",
            textAlign: "center",
            fontSize: 17,
            marginTop: adaptWidth(5, 10, 10)
          }}
        >
          {"Путеводитель по приложению"}
        </Text>
        <Text
          style={{
            fontFamily: "OpenSans",
            fontWeight: "bold",
            color: "rgb(255, 255, 255)",
            textAlign: "center",
            maxWidth: adaptWidth(200, viewportWidth / 2, viewportWidth / 2),
            fontSize: 12,
            marginTop: 5
          }}
        >
          {"Как находить и собирать все самое вкусное и актуальное"}
        </Text>

        <TouchableOpacity
          hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}
          onPress={this.changeState}
          style={{
            alignSelf: "center",
            marginTop: adaptWidth(15, 20, 25)
          }}
        >
          <Text
            style={{
              fontFamily: "OpenSans",
              fontSize: 12,
              textAlign: "center",
              color: "rgba(225, 199, 155, 0.5)"
            }}
          >
            {(!this.state.visible ? "Показать" : "Скрыть") + " путеводитель"}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
}
