import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  AsyncStorage,
  ImageBackground
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import IconD from "../components/ui/IconD";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { host } from "../etc";
import { fetchJson } from "../etc";
var kitchenPhoto = require("../../assets/img/kitchen.jpg");

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Tabs" })]
});

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Опрашиваем кулинарных экспертов со всей страны"
    };
  }

  componentWillMount() {
    kitchenPhoto = require("../../assets/img/kitchen.jpg");
  }

  async componentDidMount() {
    const nan = await AsyncStorage.getItem("nan");

    const cityId = await AsyncStorage.getItem("city");
    let cityIdJson;
    if (cityId != nan) {
      cityIdJson = JSON.parse(cityId);
    } else {
      this.props.navigation.navigate("SelectCity");
      return 0;
    }

    const tags = await AsyncStorage.getItem("tags");
    let tagsJson;
    if (tags != nan) {
      tagsJson = JSON.parse(tags);
    } else {
      this.props.navigation.navigate("SelectTags");
      return 0;
    }

    let tagsIds = "";
    tagsJson.forEach(element => {
      tagsIds += element.id.toString() + ",";
    });

    const tastes = await AsyncStorage.getItem("tastes");
    let tastesJson;
    let tastesIds = "";

    if (tastes != nan) {
      tastesJson = JSON.parse(tastes);
      tastesJson.forEach(element => {
        tastesIds += element.id.toString() + ",";
      });
    } else {
      this.props.navigation.navigate("SelectTastes");
      return 0;
    }

    this.setState({ text: "Собираем идеи для семейного ужина" });

    let responseJson = await fetchJson(
      `${host}/recommendations/?cityid=${
        cityIdJson.id
      }&tagId=${tastesIds}&tagGroup=${tagsIds}`
    );
    if (responseJson.data != undefined) {
      this.setState({ text: "Изучаем манускрипты в поисках крутых рецептов" });
      this.props.auth();
      for (let i = 0; i < responseJson.data.plates.length; i++) {
        let { image } = responseJson.data.plates[i];
        await Image.prefetch("http:" + image);
      }
      for (let i = 0; i < responseJson.data.restaurants.length; i++) {
        let { restourantLogo, photo } = responseJson.data.restaurants[i];
        await Image.prefetch("http:" + photo);
        await Image.prefetch("http:" + restourantLogo);
      }
      this.props.loadRecomendations(responseJson.data);
      this.props.navigation.dispatch(resetAction);
    } else {
      this.setState({ text: "Ошибка" });
    }
  }

  render() {
    kitchenPhoto = require("../../assets/img/kitchen.jpg");
    return (
      <ImageBackground
        resizeMode="cover"
        style={styles.backgroundImage}
        source={kitchenPhoto}
      >
        <View style={styles.container}>
          <LinearGradient
            colors={["rgba(44,45,55, 1)", "rgba(44,45,55, 0.5)"]}
            style={{
              height: viewportHeight,
              position: "absolute",
              width: viewportWidth
            }}
          />
          <Text
            style={{
              color: "#ffffff",
              width: viewportWidth * 0.4,
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
              backgroundColor: "transparent"
            }}
          >
            {this.state.text}
          </Text>
          <View
            style={{
              position: "absolute",
              backgroundColor: "#292b37",
              top: viewportHeight / 2
            }}
          >
            <IconD name="dostavka" color="#dcc49c" size={90} />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default connect(
  ({ user, recomendations }) => ({
    userData: user,
    recomendations: recomendations
  }),
  dispatch => ({
    loadRecomendations: data =>
      dispatch({ type: "SET_RECOMENDATIONS", payload: data }),
    auth: () => {
      AsyncStorage.getItem("lastToken", async (error, token) => {
        // token = JSON.parse(token);
        var formData = new FormData();
        formData.append("token", token);
        if (token != "") {
          let data = await fetchJson(`${host}/auth/auth/`, {
            method: "POST",
            body: formData
          });

          if (data.errors) {
            if (data.errors.code != 200) {
              //Alert.alert(data.errors.title, "Авторизируйтесь повторно");
            }
          } else {
            dispatch({ type: "AUTH", payload: data });
          }
        }
      });
    }
  })
)(Loading);

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  },
  text: {
    color: "white",
    fontSize: 20
  },
  container: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: "transparent",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
