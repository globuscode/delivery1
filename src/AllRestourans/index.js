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
import Icon from "react-native-vector-icons/Ionicons";
import Drawer from "react-native-drawer";
import Picker from "../Picker";
import { LinearGradient, Constants } from "expo";
import { host } from '../etc';
import RestouransOfTheWeek from "../Main/RestouransOfTheWeek";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 10;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

export default class AllRestourans extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      types: [
        "Все кухни",
      ],
      maxIndex: 0,
      restaurans: [],
      restauransShort: [],
      selectedType: 0,
      updating: false,
    };
  }

  componentWillMount = async () => {
    const response = await fetch(`${host}/classificator/tag-groups?cityId=36`);
    const responseJson = await response.json();

    responseJson.data.forEach((element) => {
      this.state.types.push(element.titleTag);
    });
    this.setState({});
  }

  componentDidMount = async () => {
    this.updateResults();
  }

  renderRestaurant = (restaurant, index) => {
    if (this.state.selectedType === 0)
      return <RestouransOfTheWeek key={index} data={[restaurant]} navigation={this.props.navigation} />;
    for (let i = 0; i< restaurant.restourantTags.length; i++) {
      if (restaurant.restourantTags[i] == this.state.types[this.state.selectedType]) {
        return <RestouransOfTheWeek key={index} data={[restaurant]} navigation={this.props.navigation} />;
      }
    }
    return null;
  }

  updateResults = async () => {
    this.setState({updating: true});
    const response = await fetch(`${host}/restaurants?cityId=36&tag=${this.state.types[this.state.selectedType]}`);
    const responseJson = await response.json();

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
  }

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
                  this.state.selectedType = this.state.preSelectedType;
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
                this.setState({preSelectedType: index});
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
                    fontFamily: "stem-medium"
                  }}
                >
                  {"Рестораны города Москва"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView
          contentContainerStyle={{ width: viewportWidth }}>
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
            {/*<RestouransOfTheWeek data={this.state.restauransShort} navigation={this.props.navigation} />*/}
            <FlatList
              data={this.state.restaurans}
              renderItem={({item, index}) => this.renderRestaurant(item, index)} />
            <View style={{ height: 20 }} />
            {this.state.updating ? 
            <ActivityIndicator size='large' style={{alignSelf: 'center'}} /> : null }
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