import React from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import propTypes from "prop-types";
import Reducer from "../../Reducers";
const { width: viewportWidth } = Dimensions.get("window");

import ButtonD from "../ui/ButtonD";
import Icon from "react-native-vector-icons/Ionicons";

class CollectionThemes extends React.Component {
  static propTypes = {
    style: propTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {
      selected: [false, false, false],
      items: [
        { id: 0, text: "Тема 1" },
        { id: 1, text: "Тема 2" },
        { id: 2, text: "Тема 3" }
      ]
    };
  }

  componentDidMount = async () => {
    let selected = [];
    for (let i = 0; i < this.state.items.length; i++) {
      selected.push(false);
    }
    this.setState({ selected });
    this.loadThemes();
  };

  loadThemes = async () => {
    const savedThemes = await AsyncStorage.getItem("collectionThemes");
    const none = await AsyncStorage.getItem("none");
    if (savedThemes != none) {
      const themes = JSON.parse(savedThemes);
      for (let i = 0; i < this.state.items.length; i++) {
        for (let j = 0; j < themes.length; j++) {
          if (themes[j].id === this.state.items[i].id) {
            this.state.selected[i] = true;
            break;
          } else if (j === themes.length - 1) this.state.selected[i] = false;
        }
      }
      this.setState({});
    }
  };

  saveThemes = () => {
    let result = [];
    for (let i = 0; i < this.state.selected.length; i++) {
      if (this.state.selected[i]) result.push(this.state.items[i]);
    }
    AsyncStorage.setItem("collectionThemes", JSON.stringify(result));
  };

  renderLine = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          let { selected } = this.state;
          selected[index] = !selected[index];
          this.setState({ selected });
        }}
        key={index}
        style={{ flexDirection: "row", margin: 5 }}
      >
        <View
          style={{
            borderColor: "rgb(225, 199, 155)",
            borderWidth: 2,
            padding: 2,
            marginRight: 10,
            width: 17,
            height: 17
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: this.state.selected[index]
                ? "rgb(225, 199, 155)"
                : null
            }}
          />
        </View>
        <Text
          style={{
            color: "#FFF",
            fontFamily: "OpenSans",
            fontSize: 14
          }}
        >
          {item.text}
        </Text>
      </TouchableOpacity>
    );
  };
  renderItems = () => {
    return (
      <ScrollView
        style={{
          marginHorizontal: 26,
          height: 336
        }}
      >
        {this.state.items.map(this.renderLine)}
      </ScrollView>
    );
  };
  render = () => {
    return (
      <View
        style={[
          {
            backgroundColor: "rgb(37, 38, 46)",
            borderColor: "rgb(225, 199, 155)",
            borderRadius: 10,
            borderWidth: 1,
            alignSelf: "stretch",
            marginHorizontal: 10
          },
          this.props.style
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            this.loadThemes();
            Reducer.dispatch({ type: "CLOSE_MODAL" });
          }}
        >
          <Icon
            style={{
              right: 18,
              position: "absolute"
            }}
            name="ios-close-outline"
            size={40}
            color="rgb(119, 122, 136)"
          />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "Stem-Medium",
            fontSize: 16,
            color: "#fff",
            alignSelf: "stretch",
            textAlign: "center",
            margin: 26
          }}
        >
          {"Какие темы подборок вам наиболее интересны?"}
        </Text>
        {this.renderItems()}
        <View
          style={{
            alignSelf: "center",
            margin: 26
          }}
        >
          <ButtonD
            onPress={() => {
              this.saveThemes();
              Reducer.dispatch({ type: "CLOSE_MODAL" });
            }}
            width={viewportWidth - 20 - 26 * 2}
            title={["Выбрать"]}
          />
        </View>
      </View>
    );
  };
}

export default connect(null, null)(CollectionThemes);
