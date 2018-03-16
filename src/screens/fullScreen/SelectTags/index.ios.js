import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  AsyncStorage,
  WebView
} from "react-native";
import propTypes from "prop-types";

var webapp = require("./BallPool.html");

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
import { host } from "../../../etc";
import BottomButton from "../../../components/ui/BottomButton";

export default class SelectTags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canNav: true,
      spinner: true,
      kitchens: [
        {
          title: "Ошибка",
          icon: "ios-person",
          selected: false
        }
      ],
      canRender: true,
      positions: [[0, 20], [10, 20], [0, 20], [10, 20], [0, 20]]
    };
  }

  static propTypes = {
    navigation: propTypes.shape({
      state: propTypes.shape({
        params: propTypes.shape({
          next: propTypes.string
        })
      }),
      navigate: propTypes.func
    })
  };

  async componentWillMount() {
    let tagsStr = await AsyncStorage.getItem("tags");
    let f = await AsyncStorage.getItem("f");

    let tags = f !== tagsStr ? JSON.parse(tagsStr) : [];

    let response, responseJson;
    try {
      response = await fetch(`${host}/classificator/tag-groups?cityId=36`);
    } catch (e) {
      Alert.alert("Ошибка", "Соединение с сервером прервано");
    }

    try {
      responseJson = await response.json();
    } catch (e) {
      Alert.alert("Ошибка", "Не правильный ответ");
    }

    if (responseJson.data.length === undefined)
      Alert.alert("Ошибка", "Не верный ответ с сервера");

    this.state.kitchens = [];
    for (let name in responseJson.data) {
      responseJson.data[name].selected = false;
      for (let j = 0; j < tags.length; j++) {
        if (tags[j].title === responseJson.data[name].title) {
          responseJson.data[name].selected = true;
        }
      }
      this.state.kitchens.push(responseJson.data[name]);
    }
    this.setState({});

    webapp = await require("./BallPool.html");
  }

  selectRandom(count) {
    this.state.selected = [];
    for (var i = 0; i < count; i++) {
      this.state.kitchens[i].selected = Math.random() > 0.5;
    }
    this.webview.postMessage(
      JSON.stringify({ update: true, tags: this.state.kitchens })
    );
    this.setState({});
  }

  getSelectedTags() {
    let result = [];
    for (let i = 0; i < this.state.kitchens.length; i++) {
      let element = this.state.kitchens[i];
      if (element.selected === true) result.push(element);
    }
    // let selectedKitchens = this.state.kitchens.map((element, index) => {
    // });
    return result;
  }

  setTags = async () => {
    await AsyncStorage.setItem("tags", JSON.stringify(this.getSelectedTags()));
    return 0;
  };

  next = () => {
    this.setTags();
    if (this.isNext())
      if (this.state.canNav) {
        if (this.props.navigation.state.params) {
          if (this.props.navigation.state.params.next === "LoadingScreen")
            this.props.navigation.navigate("LoadingScreen");
        } else this.props.navigation.navigate("SelectTastes");
        this.setState({ canNav: false });
        setTimeout(() => {
          this.setState({ canNav: true });
        }, 1500);
      }
  };

  isNext = () => {
    var isNext = false;
    let i = 0;
    while (!isNext && i < this.state.kitchens.length) {
      isNext = this.state.kitchens[i].selected;
      i++;
    }
    /*
    for (var i = 0; i < this.state.kitchens.length; i++) {
      isNext = isNext || this.state.kitchens[i].selected;
    }*/
    return isNext;
  };

  /**
   * Обработчик сообщений из WebView
   */
  onMessage = event => {
    let data = JSON.parse(event.nativeEvent.data);
    if (data.index >= 0) {
      var index = parseInt(data.index);
      this.state.kitchens[index].selected = !this.state.kitchens[index]
        .selected;
      this.setState({});
    }
  };

  render() {
    var result = (
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
              onPress={() => this.selectRandom(this.state.kitchens.length)}
            >
              <Text
                style={[
                  styles.text,
                  {
                    color: "rgb( 225, 199, 155)",
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
              color: "rgb( 255, 255, 255)"
            }
          ]}
        >
          Поведайте свои предпочтения
        </Text>
        <Text
          style={[
            {
              fontSize: 12,
              lineHeight: 13,
              paddingHorizontal: 35,
              letterSpacing: 0.8,
              color: "rgb(119, 122, 136)",
              textAlign: "center"
            }
          ]}
        >
          Расскажите кухни каких стран наиболее привлекательны для вас и мы
          составим список рекомендаций
        </Text>
        <ActivityIndicator
          style={{ display: this.state.spinner ? "flex" : "none" }}
        />
        <View
          style={{
            height: viewportHeight - 193,
            backgroundColor: "#292b37"
          }}
        >
          <WebView
            ref={c => {
              this.webview = c;
            }}
            mixedContentMode="always"
            domStorageEnabled={true}
            onError={() => Alert.alert("Ошибка")}
            source={webapp}
            scalesPageToFit={true}
            onMessage={this.onMessage}
            onLoadEnd={() => {
              this.webview.postMessage(
                JSON.stringify({ update: false, tags: this.state.kitchens })
              );
              setTimeout(() => {
                this.setState({ spinner: false });
              }, 1000);
            }}
            style={{
              backgroundColor: "transparent",
              height: viewportHeight - 193,
              width: viewportWidth
            }}
          />
        </View>
        <BottomButton
          onPress={this.next}
          borderColor={this.isNext() ? "#dcc49c" : "#575862"}
        >
          <Text
            style={[
              styles.nextButtonText,
              {
                color: this.isNext() ? "#dcc49c" : "#575862"
              }
            ]}
          >
            {"Далее"}
          </Text>
        </BottomButton>
      </View>
    );
    return result;
  }
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 20
  },
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#292b37",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  nextButtonText: {
    fontSize: 16,
    color: "#dcc49c",
    alignSelf: "center",
    textAlign: "center",
    letterSpacing: 0.8,
    fontFamily: "Stem-Regular"
  }
});
