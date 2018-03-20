import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  AsyncStorage
} from "react-native";
import propTypes from "prop-types";
import { connect } from "react-redux";

import IconD from "../../../components/ui/IconD";

const screen =
  viewportWidth >= 320 && viewportWidth < 375
    ? 0
    : viewportWidth >= 375 && viewportWidth < 414 ? 1 : 2;
const USER_RANGS = ["Новичок", "Бывалый", "Профи"];

const { width: viewportWidth } = Dimensions.get("window");
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "Москва",
      count: 666
    };
  }

  static propTypes = {
    navigation: propTypes.shape({
      navigate: propTypes.func
    }),
    userData: propTypes.shape({
      user: propTypes.shape({
        firstName: propTypes.string,
        lastName: propTypes.string,
        rang: propTypes.string
      })
    })
  };

  async componentWillMount() {
    var currentCity = await AsyncStorage.getItem("city");
    currentCity = JSON.parse(currentCity);
    this.setState({
      city: currentCity.title,
      count: currentCity.restaurantCount
    });
  }

  next = () => {
    if (this.state.canNav) {
      this.props.navigation.navigate("About");
      this.setState({ canNav: false });
      setTimeout(() => {
        this.setState({ canNav: true });
      }, 1500);
    }
  };

  renderStatus = level => {
    let result = [];
    for (var i = 0; i < level; i++)
      result.push(
        <View key={i} style={{ margin: 2 }}>
          <IconD name="dostavka" color="#dcc49c" size={15} />
        </View>
      );
    return result;
  };

  render() {
    return (
      <View style={styles.container}>
        {/*<TouchableOpacity onPress={() => this.props.logout()}>
          <Text>{"Разлогиниться"}</Text>
        </TouchableOpacity>*/}
        <View
          style={{
            flexDirection: "row",
            alignSelf: "stretch",
            paddingLeft: 20,
            marginTop: (screen == 0 ? 30 : screen == 1 ? 50 : 65) / 2
          }}
        >
          <IconD name="contact-bold" color="#dcc49c" size={50} />
          <Text
            style={{
              marginLeft: 15,
              fontFamily: "Stem-Medium",
              fontSize: 16,
              color: "#ffffff",
              letterSpacing: 0.8,
              top: Platform.OS === "ios" ? 4 : 0
            }}
          >
            {this.props.userData.user
              ? this.props.userData.user.firstName +
                "\n" +
                this.props.userData.user.lastName
              : null}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "stretch",
            paddingLeft: 20
          }}
        >
          <View
            style={{
              marginLeft: 63,
              flexDirection: "column"
            }}
          >
            <Text
              style={{
                fontFamily: "OpenSans",
                fontSize: 13,
                color: "rgb( 119, 122, 136)"
              }}
            >
              {"Статус"}
            </Text>
            <View style={{ flexDirection: "row" }}>
              {this.renderStatus(parseInt(this.props.userData.user.rang))}
              <Text
                style={{
                  fontFamily: "OpenSans",
                  fontWeight: "600",
                  fontSize: 12,
                  color: "#ffffff",
                  top: Platform.OS === "ios" ? 1 : 0
                }}
              >
                {USER_RANGS[parseInt(this.props.userData.user.rang) - 1]}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            alignSelf: "stretch",
            marginHorizontal: 15,
            height: 1,
            borderColor: "rgb( 87, 88, 98)",
            borderTopWidth: 1,
            marginTop: screen == 0 ? 22 : screen == 1 ? 27 : 31
          }}
        />
        {this.renderMenuItem("cart-small", "Мои заказы", "MyOrders")}
        {this.renderMenuItem(
          "contact-bold",
          "Мои данные",
          "PersonalInformation"
        )}
        {this.renderMenuItem("dostavka", "О программе лояльности", "Loyalty")}
        {this.renderMenuItem(
          "book-small",
          "Путеводитель по приложению",
          "Guide"
        )}

        <View
          style={{
            alignSelf: "stretch",
            marginHorizontal: 15,
            height: 1,
            borderColor: "rgb( 87, 88, 98)",
            borderTopWidth: 1,
            marginTop: screen == 0 ? 22 : screen == 1 ? 27 : 31
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignSelf: "stretch",
            marginHorizontal: 16,
            marginTop: screen == 0 ? 20 : screen == 1 ? 25 : 30,
            height: (screen == 0 ? 30 : screen == 1 ? 37 : 43) + 20
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              width: 200
            }}
          >
            <Text
              style={{
                fontFamily: "OpenSans",
                color: "#ffffff",
                fontSize: 12
              }}
            >
              {"Выбранный город"}
            </Text>

            <View
              style={{
                flexDirection: "column"
              }}
            >
              <Text
                style={{
                  fontFamily: "Stem-Medium",
                  fontSize: 20,
                  color: "rgb( 225, 199, 155)"
                }}
              >
                {this.state.city}
              </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("SelectCity")}
              >
                <Text
                  style={{
                    fontFamily: "OpenSans",
                    fontWeight: "600",
                    fontSize: 12,
                    opacity: 0.5,
                    color: "rgb( 225, 199, 155)"
                  }}
                >
                  {"Изменить город"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <Text
              style={{
                fontFamily: "OpenSans",
                color: "#ffffff",
                fontSize: 12
              }}
            >
              {"Ресторанов \nдоступно"}
            </Text>

            <Text
              style={{
                fontFamily: "Stem-Medium",
                fontSize: 20,
                color: "rgb( 225, 199, 155)"
              }}
            >
              {this.state.count}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderMenuItem = (icon, title, nav) => {
    const screen =
      viewportWidth >= 320 && viewportWidth < 375
        ? 0
        : viewportWidth >= 375 && viewportWidth < 414 ? 1 : 2;
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate(nav)}
        style={{
          flexDirection: "row",
          marginTop: screen == 0 ? 22 : screen == 1 ? 28 : 33,
          alignSelf: "flex-start",
          justifyContent: "flex-start",
          paddingLeft: screen == 0 ? 16 : screen == 1 ? 19 : 20
        }}
      >
        <View style={{ width: 25, height: 10 }}>
          <IconD name={icon} size={20} color="rgb( 225, 199, 155)" />
        </View>
        <Text
          style={{
            marginLeft: 10,
            fontFamily: "OpenSans",
            fontSize: 14,
            letterSpacing: 0.4,
            color: "#ffffff"
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  };
}

export default connect(
  ({ user }) => ({
    userData: user
  }),
  dispatch => ({
    logout: () => {
      dispatch({ type: "LOGOUT" });
    }
  })
)(Profile);

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
    marginTop: 17,
    marginBottom: 17,
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
    backgroundColor: "transparent",
    justifyContent: "flex-start",
    alignItems: "center"
  }
});
