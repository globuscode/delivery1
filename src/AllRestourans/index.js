import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  FlatList
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Drawer from "react-native-drawer";
import propTypes from "prop-types";

import Picker from "../Picker";
import { host, fetchJson } from "../etc";
import RestouransOfTheWeek from "../Main/RestouransOfTheWeek";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

export default class AllRestourans extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      types: ["Все кухни"],
      maxIndex: 0,
      restaurans: [],
      restauransShort: [],
      selectedType: 0,
      updating: false
    };
  }

  static propTypes = {
    navigation: propTypes.object
  };

  componentWillMount = async () => {
    const responseJson = await fetchJson(
      `${host}/classificator/tag-groups?cityId=36`
    );

    responseJson.data.forEach(element => {
      this.state.types.push(element.titleTag);
    });
  };

  componentDidMount = async () => {
    this.updateResults();
  };

  renderRestaurant = (restaurant, index) => {
    if (this.state.selectedType === 0)
      return (
        <RestouransOfTheWeek
          key={index}
          data={[restaurant]}
          navigation={this.props.navigation}
        />
      );
    for (let i = 0; i < restaurant.restourantTags.length; i++) {
      if (
        restaurant.restourantTags[i] ==
        this.state.types[this.state.selectedType]
      ) {
        return (
          <RestouransOfTheWeek
            key={restaurant.id}
            data={[restaurant]}
            navigation={this.props.navigation}
          />
        );
      }
    }
    return <View key={restaurant.id} style={{ display: "none" }} />;
  };

  updateResults = async () => {
    this.setState({ updating: true });
    const responseJson = await fetchJson(
      `${host}/restaurants?cityId=36&tag=${
        this.state.types[this.state.selectedType]
      }`
    );

    this.state.restaurans = responseJson.data.restaurants;

    // let rests = [];
    // let i = 0;
    // while (i < this.state.maxIndex) {
    //   if (this.state.restaurants[i] != undefined) {
    //     if (this.state.selectedType === 0) {
    //       rests.push(this.state.restaurants[i]);
    //     }
    //     else {
    //       this.state.restaurants[i].restourantTags.forEach((e) => {
    //         if (e == this.state.types[this.state.selectedType]) {
    //           rests.push(this.state.restaurants[i]);
    //         }
    //       });
    //     }
    //   }
    //   else
    //     break;
    //   i += 1;
    // }

    this.setState({
      updating: false
    });
  };

  render() {
    //ios - contact - outline
    return (
      <Drawer
        ref={ref => (this._drawer = ref)}
        content={
          <View
            style={{
              height: 300,
              backgroundColor: "rgb(39, 40, 48)",
              width: viewportWidth,
              borderTopWidth: 1,
              borderColor: "#dcc49c"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 12
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  //this.selectedType = 0;
                  this._drawer.close();
                }}
                style={{ paddingVertical: 10 }}
              >
                <Text style={{ color: "#dcc49c", fontSize: 18 }}>
                  {"Отмена"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  //this.selectedType = 0;
                  this.setState({ selectedType: this.state.preSelectedType });
                  this.updateResults();
                  this._drawer.close();
                }}
                style={{ paddingVertical: 10 }}
              >
                <Text style={{ color: "#dcc49c", fontSize: 18 }}>
                  {"Далее"}
                </Text>
              </TouchableOpacity>
            </View>
            <Picker
              height={200}
              backgroundColor="rgb(39, 40, 48)"
              itemStyle={{ color: "#dcc49c", fontSize: 30 }}
              selectedValue={this.state.preSelectedType}
              data={this.state.types}
              onValueChange={index => {
                this.setState({ preSelectedType: index });
              }}
            />
            <View style={{ height: 20 }} />
          </View>
        }
        side="bottom"
        openDrawerOffset={viewportHeight - 280}
        type="overlay"
        captureGestures={false}
      >
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              alignContent: "center",
              justifyContent: "center",
              paddingBottom: 13,
              paddingTop: 18,
              marginHorizontal: 15,
              width: viewportWidth - 40,
              borderBottomWidth: 1,
              borderColor: "rgb(54, 55, 58)"
            }}
          >
            <TouchableOpacity>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text
                  style={{
                    color: "white",
                    flexDirection: "row",
                    fontSize: 14,
                    letterSpacing: 0.8,
                    fontFamily: "Stem-Medium"
                  }}
                >
                  {"Рестораны города Москва"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={{ width: viewportWidth }}>
            <Text
              style={{
                fontSize: 10,
                color: "#dcc49c",
                textAlign: "center",
                marginTop: 5,
                marginBottom: 2,
                fontFamily: "OpenSans"
              }}
            >
              {"Тип кухни"}
            </Text>
            <View
              style={{
                width: viewportWidth - 40,
                marginBottom: 20,
                padding: 6,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "center",
                borderBottomWidth: 1,
                borderColor: "#dcc49c"
              }}
            >
              <TouchableOpacity
                onPress={() => this._drawer.open()}
                style={{ flexDirection: "row" }}
              >
                <Text style={{ fontSize: 18, color: "#ffffff" }}>
                  {this.state.types[this.state.selectedType] + " "}
                </Text>
                <Icon
                  name="ios-arrow-down"
                  color="#ffffff"
                  style={{ top: 3 }}
                  size={18}
                />
              </TouchableOpacity>
            </View>
            {/*<RestouransOfTheWeek data={this.state.restauransShort} navigation={this.props.navigation} />*/}
            <FlatList
              data={this.state.restaurans}
              renderItem={({ item, index }) =>
                this.renderRestaurant(item, index)
              }
            />
            <View style={{ height: 20 }} />
            {this.state.updating ? (
              <ActivityIndicator size="large" style={{ alignSelf: "center" }} />
            ) : null}
          </ScrollView>

          <View
            pointerEvents="none"
            style={{
              height: 60,
              position: "absolute",
              bottom: 0,
              width: viewportWidth
            }}
          >
            <LinearGradient
              colors={["rgba(39, 40, 48, 0)", "rgba(39, 40, 48, 1)"]}
              style={{
                flex: 1
              }}
            />
            <View
              style={{
                height: 1,
                position: "absolute",
                alignSelf: "center",
                backgroundColor: "rgb(87, 88, 98)",
                bottom: 0,
                width: viewportWidth - 40
              }}
            />
          </View>
        </View>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover"
  },
  text: {
    color: "white",
    fontSize: 20
  },
  container: {
    flex: 1,
    elevation: -10,
    paddingTop: getStatusBarHeight(),
    backgroundColor: "#292b37",
    paddingBottom: 0,
    justifyContent: "space-between",
    alignItems: "center"
  }
});
