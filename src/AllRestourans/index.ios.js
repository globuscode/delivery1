import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Drawer from "react-native-drawer";
import Picker from "react-native-wheel-picker";
import { LinearGradient, Constants } from "expo";

import RestouransOfTheWeek from "../Main/RestouransOfTheWeek";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

export default class AllRestourans extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      types: [
        "Все кухни",
        "Армянская",
        "Американская",
        "Итальянская",
        "Русская",
        "Армянская",
        "Американская",
        "Итальянская",
        "Русская"
      ],
      selectedType: 0
    };
  }

  componentDidMount() {}

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
                  this.selectedType = 0;
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
                  this.selectedType = 0;
                  this.setState({ selectedType: this.state.preSelectedType });
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
              style={{ width: 320, alignSelf: "center" }}
              selectedValue={this.state.types[this.state.preSelectedType]}
              itemStyle={{ color: "#dcc49c", fontSize: 30 }}
              onValueChange={index => {
                this.state.preSelectedType = index;
              }}
            >
              {this.state.types.map((value, i) => (
                <Picker.Item label={value} value={i} key={i} />
              ))}
            </Picker>
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
                    fontFamily: "stem-medium"
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
                fontFamily: "open-sans"
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

            <RestouransOfTheWeek navigation={this.props.navigation} />
            <View style={{ height: 20 }} />
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
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#292b37",
    paddingBottom: 0,
    justifyContent: "space-between",
    alignItems: "center"
  }
});
