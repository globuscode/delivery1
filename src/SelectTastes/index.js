import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Platform,
  AsyncStorage
} from "react-native";
import Touchable from "react-native-platform-touchable";
import propTypes from "prop-types";

const { width: viewportWidth } = Dimensions.get("window");

import { host } from "../etc";
import { getStatusBarHeight } from "react-native-status-bar-height";

class SelectTags extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canNav: true,
      tastes: [],
      selected: []
    };
  }

  async componentWillMount() {
    let tastStr = await AsyncStorage.getItem("tastes");
    let f = await AsyncStorage.getItem("f");

    let tastes = f != tastStr ? JSON.parse(tastStr) : [];

    fetch(`${host}/classificator/tags`)
      .then(response => response.json())
      .then(responseJson => {
        this.state.tastes = [];
        for (let name in responseJson.data) {
          for (let j = 0; j < tastes.length; j++) {
            if (responseJson.data[name].title === tastes[j].title) {
              this.state.selected.push(this.state.tastes.length);
              break;
            }
          }
          this.state.tastes.push(responseJson.data[name]);
        }
        this.setState({});
        return responseJson;
      });
  }

  selectRandom(count) {
    let selected = [];
    for (var i = 0; i < count; i++) {
      if (Math.random() > 0.5) {
        selected.push(i);
      }
    }
    this.setState({ selected: selected });
  }

  renderTastes() {
    var result = [];
    for (let i = 0; i < this.state.tastes.length; i += 1) {
      result.push(
        <Touchable
          background={Touchable.SelectableBackground()}
          key={i}
          onPress={() => {
            if (this.state.selected.indexOf(i) == -1) {
              this.state.selected.push(i);
              this.setState({});
            } else {
              this.state.selected.splice(this.state.selected.indexOf(i), 1);
              this.setState({});
            }
          }}
          style={{
            height: 36,
            padding: 10,
            paddingHorizontal: 20,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            flexDirection: "column-reverse",
            margin: 5,
            borderColor: "rgb(225, 199, 155)",
            borderWidth: 1.5,
            backgroundColor:
              this.state.selected.indexOf(i) != -1
                ? "rgb(225, 199, 155)"
                : "#292b37"
          }}
          pressed={this.state.selected.indexOf(i) != -1}
        >
          <Text
            style={{
              fontFamily: "OpenSans",
              fontWeight: "600",
              fontSize: 11,
              color:
                this.state.selected.indexOf(i) != -1
                  ? "#292b37"
                  : "rgb(225, 199, 155)"
            }}
          >
            {this.state.tastes[i].title.toUpperCase().replace("\r", "")}
          </Text>
        </Touchable>
      );
    }
    return result;
  }

  getSelectedTastes() {
    return this.state.selected.map(element => {
      //if (element.selected === true)
      return this.state.tastes[element];
    });
  }

  setTastes = async () => {
    await AsyncStorage.setItem(
      "tastes",
      JSON.stringify(this.getSelectedTastes())
    );
    return 0;
  };

  next = () => {
    this.setTastes();
    if (this.state.selected.length != 0)
      if (this.state.canNav) {
        if (this.props.navigation.state.params) {
          if (this.props.navigation.state.params.next === "LoadingScreen")
            this.props.navigation.navigate("LoadingScreen");
        } else this.props.navigation.navigate("LoadingScreen");
        this.setState({ canNav: false });
        setTimeout(() => {
          this.setState({ canNav: true });
        }, 1500);
      }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ alignSelf: "stretch", paddingHorizontal: 15 }}>
          <View
            style={{
              alignSelf: "stretch",
              justifyContent: "center",
              borderBottomWidth: 2,
              borderColor: "rgb(87, 88, 98)"
            }}
          >
            <TouchableOpacity
              onPress={() => this.selectRandom(this.state.tastes.length)}
            >
              <Text
                style={[
                  styles.text,
                  {
                    color: "rgb( 135, 136, 140)",
                    fontFamily: "OpenSans",
                    alignSelf: "flex-end",
                    fontSize: 14,
                    letterSpacing: 0.4,
                    paddingTop: 13,
                    paddingBottom: 13
                  }
                ]}
              >
                {"Выбрать наугад"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={[
            {
              marginTop: 9,
              fontSize: 16,
              lineHeight: 20,
              letterSpacing: 1,
              fontFamily: "Stem-Medium",
              color: "rgb(255,255,255)"
            }
          ]}
        >
          Расскажите о своих вкусах
        </Text>
        <Text
          style={{
            fontSize: 12,
            lineHeight: 13,
            letterSpacing: 0.8,
            marginBottom: 21,
            paddingHorizontal: 40,
            color: "rgb( 119, 122, 136)",
            textAlign: "center"
          }}
        >
          Выберите тэги наиболее релевантные для вас и мы поможем вам с выбором
          блюд
        </Text>

        <ScrollView
          contentContainerStyle={{
            width: viewportWidth,
            flexDirection: "row",
            justifyContent: "center",
            alignSelf: "center",
            flexWrap: "wrap",
            alignItems: "center"
          }}
        >
          {this.renderTastes()}
        </ScrollView>
        <View style={{ height: 55 }} />

        <View
          style={{
            position: "absolute",
            alignSelf: "center",
            width: viewportWidth - 30,
            bottom: 0,
            height: 49,
            borderTopWidth: 2,
            borderColor:
              this.state.selected.length != 0
                ? "rgb(225, 199, 155)"
                : "#575862",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <Touchable
            background={Touchable.SelectableBackgroundBorderless()}
            onPress={this.next}
            style={{
              alignSelf: "stretch",
              flexDirection: "column",
              justifyContent: "center",
              width: viewportWidth
            }}
          >
            <Text
              style={[
                styles.nextButtonText,
                {
                  color:
                    this.state.selected.length != 0
                      ? "rgb(225, 199, 155)"
                      : "#575862"
                }
              ]}
            >
              Далее
            </Text>
          </Touchable>
        </View>
      </View>
    );
  }
}

SelectTags.propTypes = {
  navigation: propTypes.object
};

export default SelectTags;

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 20
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 0 : getStatusBarHeight(),
    backgroundColor: "#292b37",
    justifyContent: "space-between",
    alignItems: "center"
  },
  nextButtonText: {
    fontSize: 16,
    color: "rgb(225, 199, 155)",
    alignSelf: "center",
    textAlign: "center",
    letterSpacing: 0.8,
    fontFamily: "Stem-Regular"
  }
});
