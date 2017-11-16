import React from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  WebView,
  Linking,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Text
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { TextField } from "react-native-material-textfield";
import Button from "react-native-button";
import { LinearGradient, Constants } from "expo";
import { connect } from "react-redux";
import Touchable from 'react-native-platform-touchable';

import IconD from "../IconD";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const hr = (
  <View
    style={{
      alignSelf: "stretch",
      marginHorizontal: 20,
      height: 1,
      backgroundColor: "rgb(87, 88, 98)"
    }}
  />
);
const hrShort = (
  <View
    style={{
      width: 290,
      alignSelf: "center",
      margin: 0,
      height: 1,
      backgroundColor: "rgb(87, 88, 98)"
    }}
  />
);

const screen =
  viewportWidth >= 320 && viewportWidth < 375
    ? 0
    : viewportWidth >= 375 && viewportWidth < 414 ? 1 : 2;

class Login extends React.Component {
  navigationOptions = {
    title: "Авторизация"
  };
  constructor(props) {
    super(props);
    this.state = {
      rang: 2,
      canNav: true
    };
  }

  renderStatus = () => {
    return "Рады видеть вас снова";
  };
  /**
 * Возвращает формы для регистрации
 * 
 * @memberof Login
 */
  renderForms = () => {
    return;
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
        tintColor="#dcc49c"
        baseColor="rgb( 87, 88, 98)"
        textColor="white"
        returnKeyType="send"
        style={{
          alignItems: "center",
          textAlign: "center"
        }}
        keyboardType="email-address"
        inputContainerStyle={styles.formContainer}
        label="E-mail адрес"
        value={this.state.email}
        onChangeText={address => {
          this.state.email = address;
        }}
        onBlur={() => this.setState({ hidePrevious: true })}
      />
      <View
        style={{ height: (screen == 0 ? 34 : screen == 1 ? 42 : 48) - 10 }}
      />
      <TextField
        onBlur={() => {
          Keyboard.dismiss();
        }}
        secureTextEntry
        tintColor="#dcc49c"
        baseColor="rgb( 87, 88, 98)"
        textColor="white"
        returnKeyType="send"
        style={{
          alignItems: "center",
          textAlign: "center"
        }}
        inputContainerStyle={styles.formContainer}
        label="Пароль"
        value={this.state.password}
        onChangeText={password => {
          this.state.password = password;
        }}
        onBlur={() => this.setState({ hidePrevious: true })}
      />
    </View>;
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
            fontFamily: "open-sans",
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
              this.state.canNav = false;
              setTimeout(() => {
                this.state.canNav = true;
              }, 1500);
            }
          }}
        >
          <Text
            style={{
              fontFamily: "stem-medium",
              fontSize: 14,
              alignSelf: "center",
              color: "rgb( 225, 199, 155)",
              marginTop: screen == 0 ? 7 : screen == 1 ? 11 : 14,
              marginBottom: screen == 0 ? 20 : screen == 1 ? 25 : 28
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
            fontFamily: "stem-medium",
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
              this.state.email = address;
            }}
            onBlur={() => this.setState({ hidePrevious: true })}
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
              this.state.password = password;
            }}
            onBlur={() => this.setState({ hidePrevious: true })}
          />
        </View>
        {this.renderForms()}

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
            background={Touchable.Ripple('gray')} 
            onPress={this.next}
            style={{
              alignSelf: "stretch",
              flexDirection: 'column',
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
  next = () => {
    if (validateEmail(this.state.email)) {
      if (this.state.password.length > 6) {
        var data = new FormData();
        data.append("userName", this.state.email);
        data.append("password", this.state.password);
        fetch("http://dostavka1.com/v1/auth/auth/", {
          method: "POST",
          body: data
        })
          .then(res => {
            return res.json();
          })
          .then(data => {
            if (data.errors) {
              if (data.errors.code != 200) {
                this.setState({ emailInputError: "Email введен неверно " });
                this.setState({ passwordInputError: "Пароль введен неверно " });
              }
            } else {
              this.props.login(data);
              this.props.navigation.navigate("Feed");
            }
          });
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
  state => ({
    userData: state.user
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
    alignSelf: 'center',
    textAlign: "center",
    letterSpacing: 0.8,
    fontFamily: "stem-regular"
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
