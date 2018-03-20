import React from "react";
import { Text, TouchableOpacity, Dimensions, AsyncStorage } from "react-native";
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
          marginVertical: adaptWidth(36, 53, 66),
          width: adaptWidth(280, 328, 362),
          height: adaptWidth(150, 175, 195)
        }}
      >
        <IconD
          name="food-feed"
          style={{
            top: 20
          }}
          size={130}
          color="rgb(231, 208, 172)"
        />
        <Text
          style={{
            fontFamily: "OpenSans",
            fontWeight: "bold",
            color: "rgb(225, 199, 155)",
            textAlign: "center",
            fontSize: 17
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
            maxWidth: viewportWidth / 2,
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
            marginBottom: adaptWidth(48, 58, 65)
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
