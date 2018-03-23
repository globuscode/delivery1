import React from "react";
import { View, Dimensions, StyleSheet, Text, Alert } from "react-native";
import propTypes from "prop-types";
import { TextField } from "react-native-material-textfield";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Touchable from "react-native-platform-touchable";
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
  AccessToken
} from "react-native-fbsdk";
import VKLogin from "react-native-vkontakte-login";
import IconD from "../../../components/ui/IconD";

const { width: viewportWidth } = Dimensions.get("window");

const screen =
  viewportWidth >= 320 && viewportWidth < 375
    ? 0
    : viewportWidth >= 375 && viewportWidth < 414 ? 1 : 2;

export default class Login extends React.Component {
  navigationOptions = {
    title: "Авторизация"
  };
  static propTypes = {
    navigation: propTypes.shape({
      state: propTypes.object,
      navigate: propTypes.func
    })
  };
  constructor(props) {
    super(props);
    this.state = {
      rang: 2,
      canNav: true,
      passwordInputError: null,
      emailInputError: null
    };
  }

  componentDidMount = () => {
    const { params } = this.props.navigation.state;
    if (params != undefined) {
      // const { firstName, lastName, email } = params;
      this.setState({
        firstName: null,
        firstNameError: null,
        secondName: null,
        secondNameError: null,
        email: null,
        emailInputError: null
      });
    }
  };

  renderSocialButtons = () => {
    const buttons = [{ name: "vk", callback: this.vkAuth }];
    if (Object.keys(LoginManager).length > 0)
      buttons.push({
        name: "fb",
        callback: this.fbAuth
      });
    return buttons.map(({ name, callback }, index) =>
      this.renderAuthButton(name, callback, index)
    );
  };

  renderAuthButton = (name, callback, index) => {
    return (
      <Touchable
        key={index}
        onPress={callback}
        style={{
          borderRadius: (25 + 16) / 2,
          width: 25 + 16,
          height: 25 + 16,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <IconD name={name} size={20} color="rgb(225, 199, 155)" />
      </Touchable>
    );
  };

  vkAuth = async () => {
    // const { navigate } = this.props.navigation;
    const authResult = await VKLogin.login(["email", "photos"]);
    if (authResult.access_token != undefined) {
      let { access_token, user_id } = authResult;
      let vkProfileResponse = await fetch(
        `${"https://api.vk.com/method"}/users.get?user_ids=${user_id}&?fields=photo_100&access_token=${access_token}&v=V`
      );
      let vkProfile = await vkProfileResponse.json();
      let { email } = authResult;
      let { first_name, last_name } = vkProfile.response[0];

      // const registarionBody = {
      //   type: "vk",
      //   firstName: first_name,
      //   lastName: last_name,
      //   email: email,
      //   access_token: access_token,
      //   user_id: user_id
      // };

      this.setState({
        email: email,
        firstName: first_name,
        secondName: last_name
      });

      // navigate("Registration", registarionBody);
    }
  };

  fbAuth = async () => {
    // const { navigate } = this.props.navigation;
    if (LoginManager.logInWithReadPermissions != undefined) {
      LoginManager.logInWithReadPermissions(["public_profile", "email"]).then(
        result => {
          if (result.isCancelled) {
            Alert.alert("Login cancelled");
          } else {
            Alert.alert(
              "Login success with permissions: " +
                result.grantedPermissions.toString()
            );

            AccessToken.getCurrentAccessToken().then(data => {
              let accessToken = data.accessToken;
              // Alert.alert(accessToken.toString());

              const responseInfoCallback = (error, result) => {
                if (error) {
                  // Alert.alert("Error fetching data: " + error.toString());
                } else {
                  const { first_name, last_name, email } = result;
                  // const registarionBody = {
                  //   type: "fb",
                  //   firstName: first_name,
                  //   lastName: last_name,
                  //   email: email,
                  //   access_token: accessToken.toString(),
                  //   user_id: id
                  // };

                  this.setState({
                    email: email,
                    firstName: first_name,
                    secondName: last_name
                  });

                  // navigate("Registration", registarionBody);
                  // Alert.alert("Success fetching data: " + result.toString());
                }
              };

              const infoRequest = new GraphRequest(
                "/me",
                {
                  accessToken: accessToken,
                  parameters: {
                    fields: {
                      string: "email,name,first_name,middle_name,last_name"
                    }
                  }
                },
                responseInfoCallback
              );

              // Start the graph request.
              new GraphRequestManager().addRequest(infoRequest).start();
            });
          }
        },
        function(error) {
          // Alert.alert("Login fail with error: " + error);
        }
      );
    }
  };

  render = () => {
    return (
      <View style={{ flex: 1, justifyContent: "space-between" }}>
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: viewportWidth,
              alignSelf: "stretch"
            }}
          >
            {this.renderSocialButtons()}
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
              Далее
            </Text>
          </Touchable>
        </View>
      </View>
    );
  };

  next = () => {
    const { params } = this.props.navigation.state;
    if (this.state.firstName == null || this.state.firstName == "")
      this.setState({ firstNameError: "Это поле обязательно" });
    if (this.state.secondName == null || this.state.secondName == "")
      this.setState({ secondNameError: "Это поле обязательно" });
    // if (this.state.password == null || this.state.password == "")
    //   this.setState({ passwordInputError: "Это поле обязательно" });
    if (this.state.email == null || this.state.email == "")
      this.setState({ emailInputError: "Это поле обязательно" });
    if (this.state.canNav && this.isNext()) {
      this.props.navigation.navigate("RegistratePhone", {
        userName: this.state.email,
        firstName: this.state.firstName,
        middleName: this.state.firstName,
        lastName: this.state.secondName,
        email: this.state.email,
        type: params != undefined ? params.type : null,
        // password: this.state.password,
        loginKey: this.props.navigation.state.key
      });
      this.setState({ canNav: false });
      setTimeout(() => {
        this.setState({ canNav: true });
      }, 1500);
    }
  };

  isNext = () => {
    return (
      // this.state.password &&
      this.state.firstName &&
      this.state.secondName &&
      // this.state.passwordInputError == null &&
      this.state.emailInputError == null
    );
  };
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

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
