import React from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  Alert
} from "react-native";
import { TextField } from "react-native-material-textfield";
import { connect } from "react-redux";
import Touchable from "react-native-platform-touchable";
import propTypes from "prop-types";
import VKLogin from "react-native-vkontakte-login";
import IconD from "../IconD";

import { host, adaptWidth } from "../etc";
import { fetchJson } from "../etc";

const { width: viewportWidth } = Dimensions.get("window");

const screen = adaptWidth(0, 1, 2);

class Login extends React.Component {
  navigationOptions = {
    title: "Авторизация",
    headerBackTitle: null
  };
  constructor(props) {
    super(props);
    this.state = {
      rang: 2,
      canNav: true
    };
  }

  static propTypes = {
    navigation: propTypes.object,
    login: propTypes.func
  };

  componentWillMount = async () => {
    await VKLogin.initialize(6365999);
  };

  authOnServer = async body => {
    if (body.length === undefined) body = [body];

    let form = new FormData();
    for (let i = 0; i < body.length; i++)
      form.append(body[i].key, body[i].value);
    let data = await fetchJson(`${host}/auth/auth/`, {
      method: "POST",
      body: form
    });
    if (data.errors) {
      let { code, title, detail } = data.errors;
      Alert.alert(`${title} ${code}`, detail);
    } else {
      this.props.login(data);
      this.props.navigation.navigate("Feed");
    }
  };

  vkAuth = async () => {
    const authResult = await VKLogin.login(["email", "photos"]);
    if (authResult.access_token != undefined) {
      this.authOnServer({ key: "vkToken", value: authResult.access_token });
    }
  };

  fbAuth = async () => {};

  twitterAuth = async () => {};

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

  renderStatus = () => {
    return "Рады видеть вас снова";
  };
  /**
   * Возвращает формы для регистрации
   *
   * @memberof Login
   */
  renderForms = () => {
    return (
      <View
        style={{
          flexDirection: "column",
          paddingHorizontal: screen == 0 ? 20 : screen == 1 ? 27 : 30
        }}
      >
        <TextField
          onBlur={() => {
            Keyboard.dismiss();
          }}
          error={this.state.emailInputError}
          tintColor="#dcc49c"
          baseColor="rgb( 87, 88, 98)"
          textColor="white"
          returnKeyType="send"
          style={{
            alignItems: "center",
            textAlign: "center"
          }}
          keyboardType="email-address"
          inputContainerStyle={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
          label="E-mail адрес"
          value={this.state.email}
          onChangeText={address => {
            this.setState({
              emailInputError: null,
              email: address
            });
          }}
        />
        <View
          style={{ height: (screen == 0 ? 34 : screen == 1 ? 42 : 48) - 10 }}
        />
        <TextField
          onBlur={() => {
            Keyboard.dismiss();
          }}
          error={this.state.passwordInputError}
          secureTextEntry
          tintColor="#dcc49c"
          baseColor="rgb( 87, 88, 98)"
          textColor="white"
          returnKeyType="send"
          style={{
            alignItems: "center",
            textAlign: "center"
          }}
          inputContainerStyle={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
          label="Пароль"
          value={this.state.password}
          onChangeText={password => {
            this.setState({
              passwordInputError: null,
              password: password
            });
          }}
        />
      </View>
    );
  };
  renderSocialButtons = () => {
    return [
      { name: "vk", callback: this.vkAuth },
      { name: "fb", callback: this.vkAuth },
      { name: "twitter", callback: this.vkAuth }
    ].map(({ name, callback }, index) =>
      this.renderAuthButton(name, callback, index)
    );
  };
  /**
   * Возвращает компонент
   *
   * @memberof Login
   */
  render = () => {
    return (
      <KeyboardAvoidingView
        behavior="position"
        style={styles.container}
        contentContainerStyle={{ flex: 1 }}
      >
        <View style={{ height: screen == 0 ? 18 : screen == 1 ? 34 : 45 }} />

        <Text
          style={{
            fontFamily: "OpenSans",
            fontSize: 14,
            alignSelf: "center",
            letterSpacing: 1,
            color: "rgb( 119, 122, 136)"
          }}
        >
          {"Вы заказываете впервые?"}
        </Text>

        <TouchableOpacity
          onPress={() => {
            if (this.state.canNav) {
              this.props.navigation.navigate("Registration");
              this.setState({ canNav: false });
              setTimeout(() => {
                this.setState({ canNav: true });
              }, 1500);
            }
          }}
        >
          <Text
            style={{
              fontFamily: "Stem-Medium",
              fontSize: 14,
              alignSelf: "center",
              color: "rgb( 225, 199, 155)",
              marginTop: adaptWidth(7, 11, 14),
              marginBottom: adaptWidth(20, 25, 28)
            }}
          >
            {"РЕГИСТРАЦИЯ"}
          </Text>
        </TouchableOpacity>

        <View
          style={{
            alignSelf: "stretch",
            marginHorizontal: screen == 0 ? 20 : 15,
            height: 1,
            backgroundColor: "rgb(87, 88, 98)"
          }}
        />

        <Text
          style={{
            fontFamily: "Stem-Medium",
            fontSize: 16,
            lineHeight: 20,
            top: 4,
            letterSpacing: 1.1,
            alignSelf: "center",
            textAlign: "center",
            color: "rgb( 255, 255, 255)",
            marginTop: screen == 0 ? 46 : screen == 1 ? 55 : 63,
            marginBottom: screen == 0 ? 36 : screen == 1 ? 46 : 52
          }}
        >
          {this.renderStatus()}
        </Text>

        {this.renderForms()}
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
        <View
          style={{
            position: "absolute",
            alignSelf: "center",
            width: viewportWidth - 30,
            bottom: 0,
            height: 49,
            borderTopWidth: 2,
            borderColor:
              this.state.email && this.state.password
                ? "rgb(225, 199, 155)"
                : "#575862",
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
                  color:
                    this.state.email && this.state.password
                      ? "rgb(225, 199, 155)"
                      : "#575862"
                }
              ]}
            >
              Далее
            </Text>
          </Touchable>
        </View>
      </KeyboardAvoidingView>
    );
  };
  /**
   * Обрабатывает значения, введенные в формы для авторизации
   *
   * @memberof Login
   */
  next = async () => {
    let { email, password } = this.state;
    if (validateEmail(email)) {
      if (password.length > 6) {
        this.authOnServer([
          { key: "userName", value: email },
          { key: "password", value: password }
        ]);
      } else {
        this.setState({ passwordInputError: "Пароль слишком короткий" });
      }
    } else {
      this.setState({ emailInputError: "Email введен неверно " });
    }
  };
}
/**
 * Возвращает true, если строка является email'ом
 *
 * @param {String} email
 * @returns {bool}
 */
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default connect(
  ({ user }) => ({
    userData: user
  }),
  dispatch => ({
    login: data => {
      dispatch({ type: "AUTH", payload: data });
    }
  })
)(Login);

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 20
  },
  row: {
    flexDirection: "row",
    alignSelf: "stretch"
  },
  column: {
    flexDirection: "column",
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
  formContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    //height: viewportHeight,
    flex: 1,
    flexDirection: "column",
    elevation: -10,
    backgroundColor: "rgb( 45, 46, 58)"
  }
});
