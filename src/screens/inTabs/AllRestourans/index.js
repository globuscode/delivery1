import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  FlatList
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Drawer from "react-native-drawer";
import propTypes from "prop-types";
import { connect } from "react-redux";

import Picker from "../../../components/ui/Picker";
import { host, fetchJson } from "../../../etc";
import RestaurantList from "../../../components/cards/RestaurantList";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

class AllRestourans extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      types: ["Все кухни"],
      maxIndex: 0,
      restaurans: [],
      selectedType: 0,
      page: 1,
      updating: false
    };
  }

  static propTypes = {
    navigation: propTypes.object,
    user: propTypes.shape({
      token: propTypes.string
    })
  };

  componentWillMount = async () => {
    const responseJsonTag = await fetchJson(
      `${host}/classificator/tag-groups?cityId=36`
    );

    responseJsonTag.data.forEach(element => {
      this.state.types.push(element.titleTag);
    });
  };

  componentDidMount = async () => {
    this.updateResults();
  };

  renderRestaurant = (restaurant, index) => {
    if (this.state.selectedType === 0)
      return (
        <RestaurantList
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
          <RestaurantList
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
    const { page } = this.state;
    const tag = this.state.types[this.state.selectedType];
    let newRests = this.state.restaurans;
    this.setState({ updating: true });
    let responseJson = await fetchJson(
      `${host}/restaurants?cityId=36&tag=${tag}&page=${page}&results=3&token=${
        this.props.user.token
      }`
    );
    for (let j = 0; j < responseJson.data.restaurants.length; j++) {
      let isErr = false;
      for (let i = 0; i < this.state.restaurans.length; i++) {
        isErr =
          isErr &&
          responseJson.data.restaurants[j].id !== this.state.restaurans[i].id;
      }

      if (!isErr) newRests.push(responseJson.data.restaurants[j]);
    }
    this.setState({
      restaurans: newRests,
      // page: this.state.page + 1,
      updating: false
    });
  };

  render = () => {
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
                  this.setState(
                    {
                      selectedType: this.state.preSelectedType,
                      restaurans: [],
                      page: 1
                    },
                    async () => {
                      await this.updateResults();
                      this._drawer.close();
                    }
                  );
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
          <View style={{ width: viewportWidth, flex: 1 }}>
            <FlatList
              ListFooterComponent={this.state.updating ? (
                <ActivityIndicator size="large" style={{ alignSelf: "center" }} />
              ) : null}
              ListHeaderComponent={
                <View>
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
                </View>
              }
              keyExtractor={item => item.id}
              data={this.state.restaurans}
              renderItem={({ item, index }) =>
                this.renderRestaurant(item, index)
              }
              onEndReachedThreshold={0.5}
              onEndReached={() => {
                if (!this.state.updating)
                  this.setState(
                    {
                      page: this.state.page + 1
                    },
                    () => this.updateResults()
                  );
              }}
            />
            <View style={{ height: 0 }} />
          </View>

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
  };
}

export default connect(({ user }) => ({ user: user }), null)(AllRestourans);

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
