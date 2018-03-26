import React from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";
import propTypes from "prop-types";
import { TextField } from "react-native-material-textfield";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Touchable from "react-native-platform-touchable";
import { connect } from "react-redux";
import { fetchJson, host, line } from "../../../etc";

const { width: viewportWidth } = Dimensions.get("window");

const screen =
  viewportWidth >= 320 && viewportWidth < 375
    ? 0
    : viewportWidth >= 375 && viewportWidth < 414 ? 1 : 2;

class UpdateProfile extends React.Component {
  navigationOptions = {
    title: "Авторизация"
  };
  static propTypes = {
    navigation: propTypes.shape({
      state: propTypes.object,
      navigate: propTypes.func,
      goBack: propTypes.func
    }),
    login: propTypes.func,
    user: propTypes.shape({
      token: propTypes.string,
      user: propTypes.shape({
        firstName: propTypes.string,
        lastName: propTypes.string,
        email: propTypes.string,
        phone: propTypes.string
      })
    })
  };
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.user.user.firstName,
      secondName: this.props.user.user.lastName,
      email: this.props.user.user.email,
      rang: 2,
      canNav: true,
      passwordInputError: null,
      emailInputError: null
    };
  }

  componentDidMount = () => {
    const { params } = this.props.navigation.state;
    if (params != undefined) {
      const { firstName, lastName, email } = params;
      this.setState({
        firstName: firstName,
        firstNameError: null,
        secondName: lastName,
        secondNameError: null,
        email: email,
        emailInputError: null
      });
    }
  };

  render = () => {
    return (
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        {line()}
        <KeyboardAwareScrollView
          extraHeight={100}
          extraScrollHeight={100}
          enableAutoAutomaticScroll
          enableOnAndroid
          behavior="position"
        >
          <View
            style={{ height: (screen == 0 ? 20 : screen == 1 ? 37 : 49) + 4 }}
          />

          <Text
            style={{
              fontFamily: "Stem-Medium",
              fontSize: 16,
              alignSelf: "center",
              letterSpacing: 1.1,
              color: "rgb( 255, 255, 255)"
            }}
          >
            {"Пожалуйста представьтесь"}
          </Text>

          <View
            style={{
              flexDirection: "column",
              paddingHorizontal: screen == 0 ? 20 : screen == 1 ? 27 : 30
            }}
          >
            <TextField
              ref={c => {
                this.firstName = c;
              }}
              error={this.state.firstNameError}
              tintColor="#dcc49c"
              baseColor="rgb( 87, 88, 98)"
              textColor="white"
              returnKeyType="send"
              autoCapitalize="words"
              style={{
                alignItems: "center",
                textAlign: "center"
              }}
              inputContainerStyle={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
              label="Имя"
              value={this.state.firstName}
              onChangeText={firstName => {
                this.setState({
                  firstName: firstName,
                  firstNameError: null
                });
              }}
            />
            <View
              style={{
                height: (screen == 0 ? 34 : screen == 1 ? 42 : 48) - 25
              }}
            />

            <TextField
              ref={c => {
                this.lastName = c;
              }}
              error={this.state.secondNameError}
              tintColor="#dcc49c"
              baseColor="rgb( 87, 88, 98)"
              textColor="white"
              returnKeyType="send"
              autoCapitalize="words"
              style={{
                alignItems: "center",
                textAlign: "center"
              }}
              inputContainerStyle={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
              label="Фамилия"
              value={this.state.secondName}
              onChangeText={name =>
                this.setState({
                  secondName: name,
                  secondNameError: null
                })
              }
            />
            <View
              style={{
                height: (screen == 0 ? 34 : screen == 1 ? 42 : 48) - 25
              }}
            />

            <TextField
              ref={c => {
                this.email = c;
              }}
              tintColor="#dcc49c"
              baseColor="rgb( 87, 88, 98)"
              textColor="white"
              returnKeyType="send"
              style={{
                alignItems: "center",
                textAlign: "center"
              }}
              autoCapitalize="none"
              keyboardType="email-address"
              inputContainerStyle={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
              label="E-mail адрес"
              error={this.state.emailInputError}
              value={this.state.email}
              onEndEditing={() => {
                if (this.state.email !== "")
                  if (!validateEmail(this.state.email))
                    this.setState({ emailInputError: "Неверный формат" });
                  else this.setState({ emailInputError: null });
              }}
              onChangeText={address =>
                this.setState({
                  email: address,
                  emailInputError: null
                })
              }
            />
            <View
              style={{
                height: (screen == 0 ? 34 : screen == 1 ? 42 : 48) - 25
              }}
            />
          </View>
        </KeyboardAwareScrollView>
        <View
          style={{
            position: "absolute",
            alignSelf: "center",
            width: viewportWidth - 30,
            bottom: 0,
            height: 49,
            borderTopWidth: 2,
            borderColor: this.isNext() ? "rgb(225, 199, 155)" : "#575862",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <Touchable
            background={Touchable.Ripple("gray")}
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
                  color: this.isNext() ? "rgb(225, 199, 155)" : "#575862"
                }
              ]}
            >
              {"Сохранить"}
            </Text>
          </Touchable>
        </View>
      </View>
    );
  };

  next = async () => {
    // if (this.state.firstName == null || this.state.firstName == "")
    //   this.setState({ firstNameError: "Это поле обязательно" });
    // if (this.state.secondName == null || this.state.secondName == "")
    //   this.setState({ secondNameError: "Это поле обязательно" });
    // // if (this.state.password == null || this.state.password == "")
    // //   this.setState({ passwordInputError: "Это поле обязательно" });
    // if (this.state.email == null || this.state.email == "")
    //   this.setState({ emailInputError: "Это поле обязательно" });
    if (this.isNext()) {
      let form = new FormData();
      form.append("token", this.props.user.token);
      if (
        this.state.firstName !== null &&
        this.state.firstName !== "" &&
        this.state.firstName !== undefined
      )
        form.append("firstName", this.state.firstName);
      if (
        this.state.secondName !== null ||
        (this.state.secondName !== "" && this.state.secondName !== undefined)
      )
        form.append("lastName", this.state.secondName);
      if (
        this.state.email !== null ||
        (this.state.email !== "" && this.state.email !== undefined)
      )
        form.append("email", this.state.email);

      let authResponse = await fetchJson(`${host}/user/update/index.php`, {
        method: "POST",
        body: form
      });
      if (authResponse.errors === undefined) {
        this.props.login({
          data: {
            token: this.props.user.token,
            user: authResponse.data.user
          }
        });
      }

      this.props.navigation.goBack();
      this.setState({ canNav: false });
      setTimeout(() => {
        this.setState({ canNav: true });
      }, 1500);
    }
  };

  isNext = () => {
    if (
      this.state.firstName === "" ||
      this.state.secondName === "" ||
      this.state.email === ""
    )
      return false;
    return (
      // this.state.password &&
      this.state.firstName ||
      this.state.secondName ||
      // this.state.passwordInputError == null &&
      this.state.emailInputError == null
    );
  };
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default connect(
  ({ user }) => ({
    user: user
  }),
  dispatch => ({
    login: data => {
      dispatch({ type: "AUTH", payload: data });
    }
  })
)(UpdateProfile);

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 20
  },
  row: {
    flexDirection: "row",
    alignSelf: "stretch"
  },
  nextButtonText: {
    fontSize: 16,
    color: "#dcc49c",
    alignSelf: "center",
    textAlign: "center",
    letterSpacing: 0.8,
    fontFamily: "Stem-Regular"
  },
  column: {
    flexDirection: "column",
    alignSelf: "stretch"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    elevation: -10,
    backgroundColor: "rgb( 45, 46, 58)"
  }
});
