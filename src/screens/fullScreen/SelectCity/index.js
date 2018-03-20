import React from "react";
import { StyleSheet, Text, View, Dimensions, AsyncStorage } from "react-native";
import Picker from "react-native-wheel-picker";
import propTypes from "prop-types";

import { host } from "../../../etc";
import BottomButton from "../../../components/ui/BottomButton";
const { width: viewportWidth } = Dimensions.get("window");

export default class SelectCity extends React.Component {
  static propTypes = {
    navigation: propTypes.shape({
      navigate: propTypes.func
    }).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      canNav: true,
      selectedCity: {
        restaurantCount: 0,
        deliveryTime: 0
      },
      cities: [
        {
          title: "Санкт-Петербург",
          restaurantCount: 2,
          deliveryTime: 20
        },
        {
          title: "Краснодар",
          restaurantCount: 3,
          deliveryTime: 30
        },
        {
          title: "Екатеренбург",
          restaurantCount: 1,
          deliveryTime: 10
        },
        {
          title: "Новосибирск",
          restaurantCount: 2,
          deliveryTime: 20
        },
        {
          title: "Казань",
          restaurantCount: 3,
          deliveryTime: 30
        },
        {
          title: "Нижний Новгород",
          restaurantCount: 1,
          deliveryTime: 10
        },
        {
          title: "Москва",
          restaurantCount: 1,
          deliveryTime: 10
        },
        {
          title: "Псков",
          restaurantCount: 2,
          deliveryTime: 20
        },
        {
          title: "Омск",
          restaurantCount: 3,
          deliveryTime: 30
        },
        {
          title: "Челябинск",
          restaurantCount: 3,
          deliveryTime: 30
        },
        {
          title: "Владивосток",
          restaurantCount: 3,
          deliveryTime: 30
        },
        {
          title: "Самара",
          restaurantCount: 3,
          deliveryTime: 30
        }
      ]
    };

    for (var i = 0; i < this.state.cities.length; i++) {
      if (this.state.cities[i].title == "Москва") this.state.selectedItem = i;
    }
    this.state.selectedCity = this.state.cities[
      parseInt(this.state.cities.length / 2)
    ];
  }

  async componentWillMount() {
    //var city = await AsyncStorage.getItem('city');
    // this.props.navigation.navigate("Main");
    fetch(`${host}/classificator/cities`)
      .then(response => response.json())
      .then(responseJson => {
        this.state.cities = responseJson.data;

        for (var i = 0; i < this.state.cities.length; i++) {
          if (this.state.cities[i].title == "Москва") {
            this.state.selectedItem = i;
            this.state.selectedCity = this.state.cities[i];
          }
        }
        this.setState({});
        return responseJson;
      });
  }

  async setCity(city) {
    await AsyncStorage.setItem("city", city);
    return 0;
  }

  onPikcerSelect(index) {
    this.setState({
      selectedItem: index,
      selectedCity: this.state.cities[index]
    });
  }

  next = () => {
    this.setCity(JSON.stringify(this.state.selectedCity));
    if (this.state.canNav) {
      this.props.navigation.navigate("About");
      this.setState({ canNav: false });
      setTimeout(() => {
        this.setState({ canNav: true });
      }, 1500);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Выберите ваш город</Text>

        <View style={{}}>
          <View
            style={{
              backgroundColor: "#dcc49c",
              alignSelf: "center",
              width: viewportWidth,
              height: 1,
              position: "relative",
              top: 94
            }}
          />
          <View
            style={{
              backgroundColor: "#dcc49c",
              alignSelf: "center",
              width: viewportWidth,
              height: 1,
              position: "relative",
              top: 129
            }}
          />
          <Picker
            style={{
              width: 320,
              alignSelf: "center",
              height: 200,
              marginBottom: 30.4
            }}
            selectedValue={this.state.selectedItem}
            itemStyle={{ color: "#dcc49c", fontSize: 30 }}
            onValueChange={index => this.onPikcerSelect(index)}
          >
            {this.state.cities.map((value, i) => (
              <Picker.Item
                label={value.title}
                value={i}
                key={"money" + value.title}
              />
            ))}
          </Picker>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: "#3A3B46",
            paddingVertical: 23,
            alignSelf: "stretch",
            marginHorizontal: 20
          }}
        >
          <View
            style={{
              marginLeft: 15,
              flexDirection: "column",
              width: (viewportWidth - 30) / 2,
              justifyContent: "space-between"
            }}
          >
            <Text style={styles.header2}>{"Доступно\nресторанов"}</Text>
            <Text style={styles.afterHeader2}>
              {this.state.selectedCity.restaurantCount}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              width: (viewportWidth - 40) / 2,
              justifyContent: "space-between"
            }}
          >
            <Text style={styles.header2}>{"Время доставки\nпо городу"}</Text>
            <Text style={styles.afterHeader2}>
              до {this.state.selectedCity.deliveryTime} мин
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.checkingInfo}>
            {"Все партнеры компании проходят \nстрогую проверку качества"}
          </Text>
        </View>
        <BottomButton onPress={this.next}>
          <Text style={styles.nextButtonText}>Далее</Text>
        </BottomButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 20
  },
  header: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1.1,
    lineHeight: 20,
    fontFamily: "Stem-Medium"
  },
  header2: {
    color: "white",
    fontSize: 12,
    marginTop: 4,
    fontFamily: "OpenSans",
    fontWeight: "600"
  },
  afterHeader2: {
    color: "#dcc49c",
    fontSize: 25,
    fontFamily: "OpenSans",
    fontWeight: "600"
  },
  nextButtonText: {
    fontSize: 16,
    color: "#dcc49c",
    alignSelf: "center",
    textAlign: "center",
    letterSpacing: 0.8,
    fontFamily: "Stem-Regular"
  },
  checkingInfo: {
    fontFamily: "OpenSans",
    fontSize: 12,
    lineHeight: 14,
    textAlign: "center",
    color: "rgb( 87, 88, 98)"
  },
  container: {
    flex: 1,
    paddingTop: 55,
    backgroundColor: "rgb( 45, 46, 58)",
    justifyContent: "flex-start",
    alignItems: "center"
  }
});
