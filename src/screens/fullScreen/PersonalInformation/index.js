/* PS: нигде не используется */
import React from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import propTypes from "prop-types";

import IconD from "../../../components/ui/IconD";
import { fetchJson, host } from "../../../etc";

const { width: viewportWidth } = Dimensions.get("window");

const screen =
  viewportWidth >= 320 && viewportWidth < 375
    ? 0
    : viewportWidth >= 375 && viewportWidth < 414 ? 1 : 2;

/**
 *
 *
 * @class PersonalInfo
 * @extends {React.Component}
 */
class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canNav: true,
      cards: []
    };
  }

  static propTypes = {
    navigation: propTypes.shape({
      navigate: propTypes.func
    }),
    userData: propTypes.shape({
      token: propTypes.string,
      user: propTypes.shape({
        firstName: propTypes.string,
        lastName: propTypes.string,
        email: propTypes.string,
        phone: propTypes.string
      })
    })
  };

  componentDidMount = async () => {
    const cardsResponse = await fetchJson(
      `${host}/user/getCards/?token=${this.props.userData.token}`
    );
    const cards = cardsResponse.errors === undefined ? cardsResponse.data : [];
    if (cards.length !== this.state.cards.length)
      this.setState({ cards: cards });
  };

  renderMenuItem = (icon, title, nav) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (this.state.canNav) {
            this.props.navigation.navigate(nav);
            this.setState({ canNav: false });
            setTimeout(() => {
              this.setState({ canNav: true });
            }, 1500);
          }
        }}
        style={{
          flexDirection: "row",
          marginTop: screen == 0 ? 22 : screen == 1 ? 28 : 33,
          alignSelf: "flex-start",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingLeft: screen == 0 ? 16 : screen == 1 ? 19 : 20
        }}
      >
        <View
          style={{
            width: 20,
            height: 10,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <IconD
            name={icon}
            size={icon != "credit-card" ? 20 : 15}
            color="rgb( 225, 199, 155)"
          />
        </View>
        <View style={{ alignItems: "center" }}>
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
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.userFullNameContainer}>
          <Text style={styles.userFullName}>
            {this.props.userData.user
              ? this.props.userData.user.firstName +
                "\n" +
                this.props.userData.user.lastName
              : null}
          </Text>
        </View>
        <Text style={styles.email}>{this.props.userData.user.email}</Text>

        <View style={{ height: screen == 0 ? 37 : screen == 1 ? 50 : 60 }} />

        <TouchableOpacity
          onPress={() => {
            if (this.state.canNav) {
              this.props.navigation.navigate("UpdateProfile");
              this.setState({ canNav: false });
              setTimeout(() => {
                this.setState({ canNav: true });
              }, 1500);
            }
          }}
        >
          <Text style={[styles.email, { opacity: 0.5 }]}>
            {"Изменить данные аккаунта"}
          </Text>
        </TouchableOpacity>

        <View style={{ height: screen == 0 ? 17 : screen == 1 ? 21 : 24 }} />

        <View style={styles.phoneAndCard}>
          <View
            style={{
              flexDirection: "column",
              width: screen == 0 ? 150 : 170
            }}
          >
            <Text style={styles.smallHeader}>{"Телефон"}</Text>
            <Text style={[styles.smallHeader, { color: "rgb(225, 199, 155)" }]}>
              {this.props.userData.user.phone
                ? this.props.userData.user.phone
                : null}
            </Text>
          </View>

          {this.state.cards.length === 0 ? null : (
            <View
              style={{
                flexDirection: "column"
              }}
            >
              <Text style={styles.smallHeader}>{"Карта оплаты"}</Text>
              <Text
                style={[styles.smallHeader, { color: "rgb(225, 199, 155)" }]}
              >
                {this.state.cards[this.state.cards.length - 1].cardName}
              </Text>
            </View>
          )}
        </View>
        {this.renderMenuItem("phone", "Изменить номер телефона", "UpdatePhone")}
        {/*this.renderMenuItem("credit-card", "Привязать другую карту оплаты", "SetCard")*/}
        {/*this.renderMenuItem("geotag", "Редактировать адреса доставки", null)}
            {this.renderMenuItem("lock", "Изменить пароль", null)*/}

        {/*<View
          style={{
            height: 1,
            borderTopWidth: 1,
            borderColor: "rgb(87, 88, 98)",
            marginTop: screen == 0 ? 22 : screen == 1 ? 28 : 33
          }}
        />*/}
      </ScrollView>
    );
  }
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
)(PersonalInfo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: screen == 0 ? 15 : screen == 1 ? 35 : 48,
    paddingHorizontal: 15,
    backgroundColor: "transparent"
  },
  email: {
    fontFamily: "OpenSans",
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.7,
    color: "rgb(225, 199, 155)"
  },
  userFullNameContainer: {
    flexDirection: "column",
    height: 68,
    alignSelf: "stretch",
    justifyContent: "center"
  },
  phoneAndCard: {
    height: screen == 0 ? 86 : screen == 1 ? 100 : 111,
    flexDirection: "row",
    borderColor: "rgb(87, 88, 98)",
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  smallHeader: {
    color: "#fff",
    fontFamily: "OpenSans",
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.7
  },
  userFullName: {
    flexDirection: "column",
    fontFamily: "Stem-Medium",
    fontSize: 20,
    color: "#ffffff",
    letterSpacing: 0.8,
    top: Platform.OS === "ios" ? 4 : 0
  }
});
