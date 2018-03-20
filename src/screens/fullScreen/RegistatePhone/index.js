import React from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Alert,
  Text,
  Platform
} from "react-native";
import { TextField } from "react-native-material-textfield";
import SmsListener from "react-native-android-sms-listener";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInputMask } from "react-native-masked-text";
import Touchable from "react-native-platform-touchable";
import { connect } from "react-redux";
import propTypes from "prop-types";

import { adaptWidth } from "../../../etc";
import { host } from "../../../etc";
import IconD from "../../../components/ui/IconD";

const { width: viewportWidth } = Dimensions.get("window");

async function sendPhone(phone) {
  const result = await fetch(
    `${host}/sms/?action=send_code&type=reg&phone=${phone}`
  );
  const resultJson = await result.json();
  if (resultJson.errors != undefined) {
    if (resultJson.errors.code != 0) {
      const { title, detail } = resultJson.errors;
      Alert.alert(title, detail);
    }
  }
  return resultJson.status;
}

class Registration extends React.Component {
  navigationOptions = {
    title: "Авторизация"
  };
  constructor(props) {
    super(props);
    this.state = {
      rang: 2,
      canNav: true,
      canSend: true,
      phone: ""
    };
  }

  componentWillMount = () => {
    SmsListener.addListener(async ({ code }) => {
      this.setState({ code: code, codeError: null });
    });
  };

  renderButton = (title, callback) => {
    return (
      <View style={{ alignSelf: "stretch" }}>
        <View
          style={[
            styles.row,
            {
              justifyContent: "center",
              position: "absolute",
              width: viewportWidth - 80,
              borderWidth: 1,
              height: adaptWidth(44, 52, 57),
              marginTop: 31,
              marginBottom: 10,
              marginHorizontal: 40,
              alignItems: "center",
              alignContent: "center",
              borderRadius: 8,
              borderColor: "#ffffff"
            }
          ]}
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: 14,
              fontFamily: "Stem-Medium",
              top: 3
            }}
          >
            {title}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0}
          onPress={() => {
            if (this.state.canSend) {
              callback();
              this.setState({ canSend: false });
              setTimeout(() => {
                this.setState({ canSend: true });
              }, 60000);
            } else Alert.alert("Извините", "Подождите минуту");
          }}
          style={[
            styles.row,
            {
              justifyContent: "center",
              borderWidth: 1.5,
              height: adaptWidth(44, 52, 57),
              marginTop: 31,
              marginBottom: 10,
              marginHorizontal: 40,
              alignItems: "center",
              alignContent: "center",
              borderRadius: 8,
              borderColor: "rgb(87, 88, 98)"
            }
          ]}
        >
          <Text
            style={{
              color:
                this.isNext() && this.state.canSend
                  ? "rgb(225, 199, 155)"
                  : "rgb(87, 88, 98)",
              fontSize: 14,
              fontFamily: "Stem-Medium",
              top: 3
            }}
          >
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render = () => {
    return (
      <KeyboardAwareScrollView
        behavior="position"
        style={styles.container}
        contentContainerStyle={{ flex: 1 }}
      >
        <View style={{ height: adaptWidth(24, 41, 53) + 4 }} />

        <Text
          style={{
            fontFamily: "Stem-Medium",
            fontSize: 14,
            alignSelf: "center",
            letterSpacing: 1.1,
            color: "rgb( 255, 255, 255)"
          }}
        >
          {"Введите новый номер телефона"}
        </Text>

        <View
          style={{
            flexDirection: "column",
            paddingHorizontal: adaptWidth(20, 27, 30)
          }}
        >
          <TextInputMask
            ref={c => (this.phone = c)}
            error={this.state.phoneError}
            type={"custom"}
            customTextInputProps={{
              tintColor: "#dcc49c",
              baseColor: "rgb( 87, 88, 98)",
              textColor: "white",
              returnKeyType: "send",
              keyboardType: "phone-pad",
              style: {
                alignItems: "center",
                textAlign: "center"
              },
              inputContainerStyle: {
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              },
              label: "Введите новый номер телефона"
            }}
            value={this.state.phone}
            options={{
              mask: "+7 999 999 99-99"
            }}
            customTextInput={TextField}
            onChangeText={phone =>
              this.setState({ phone: phone, phoneError: null })
            }
            onBlur={() => this.setState({ hidePrevious: true })}
          />
          <View style={{ height: adaptWidth(30, 39, 45) - 25 }} />
        </View>
        {this.renderButton("Выслать код подтверждения", () => {
          sendPhone(this.state.phone.replace(/\D+/g, ""));
        })}
        <TextField
          ref={c => (this.codeInput = c)}
          error={this.state.codeError}
          tintColor={this.isNext() ? "#dcc49c" : "rgb(87, 88, 98)"}
          baseColor={this.isNext() ? "#dcc49c" : "rgb(87, 88, 98)"}
          textColor={"white"}
          returnKeyType={"send"}
          keyboardType={"phone-pad"}
          value={this.state.code}
          onChangeText={code => this.setState({ code: code, codeError: null })}
          style={{
            alignItems: "center",
            textAlign: "center"
          }}
          containerStyle={{
            width: (Platform.OS === "ios" ? 0 : 20) + adaptWidth(136, 160, 177),
            alignSelf: "center",
            alignContent: "center",
            justifyContent: "center"
          }}
          inputContainerStyle={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center"
          }}
          label={"Код подтверждения"}
        />
        <View
          style={{
            position: "absolute",
            width: viewportWidth - 30,
            alignSelf: "center",
            bottom: 70,
            flexDirection: "row"
          }}
        >
          <View style={{ top: 5 }}>
            <IconD name="alert" size={20} color="#dcc49c" />
          </View>
          <Text
            style={{
              fontFamily: "OpenSans",
              marginLeft: 5,
              maxWidth: viewportWidth - 60,
              fontSize: 10,
              color: "rgb(119, 122, 136)"
            }}
          >
            {
              "Если код подтверждения не приходит обратитесь в службу поддержки по телефону: 495-995-1-995"
            }
          </Text>
        </View>
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
      </KeyboardAwareScrollView>
    );
  };

  next = async () => {
    if (this.state.code == null || this.state.code == "")
      this.setState({ codeError: "Это поле обязательно " });
    if (this.state.phone == null || this.state.phone == "")
      this.setState({ phoneError: "Это поле обязательно " });
    if (this.isNext()) {
      const validationResponse = await fetch(
        `${host}/sms/?action=check_code&type=reg&phone=${this.state.phone.replace(
          /\D+/g,
          ""
        )}&code=${this.state.code}`,
        { method: "get" }
      );
      let validationResponseJson;
      try {
        validationResponseJson = await validationResponse.json();
      } catch (e) {
        Alert.alert("Упс", "Похоже серверу плохо");
      }

      if (validationResponseJson.status === true) {
        const {
          userName,
          firstName,
          middleName,
          lastName,
          email,
          type
        } = this.props.navigation.state.params;
        var payload = {
          userName: userName ? userName : "null",
          firstName: firstName ? firstName : "null",
          middleName: middleName ? middleName : "null",
          lastName: lastName ? lastName : "null",
          email: email ? email : "null",
          phone: this.state.phone ? this.state.phone : "null",
          type: type
        };
        const response = await fetch(
          "https://dostavka1.com/v1/auth/register/",
          {
            method: "POST",
            body: JSON.stringify(payload)
          }
        );
        const data = await response.json();
        if (data) {
          if (data.errors) {
            if (data.errors.code != 200) {
              Alert.alert(data.errors.title, data.errors.detail);
            }
            this.props.navigation.goBack();
          } else {
            // Alert.alert("Регистрация прошла успешно");
            // const session = await fetchJson(
            //   `${host}/payture/add?token=${data.data.token}`
            // );
            this.props.auth(data);
            this.props.navigation.navigate("SetCreditCard", {
              token: data.data.token
            });
          }
        } else {
          this.codeInput.props.error = validationResponseJson.errors.title;
          this.setState({});
        }
      } else {
        Alert.alert(
          validationResponseJson.errors.title,
          validationResponseJson.errors.detail
        );
        this.codeInput.props.error = validationResponseJson.errors.title;
        this.setState({});
      }
    } else {
      this.phone.props.error = "Это поле обязательно";
      this.setState({});
    }
  };

  isNext = () => {
    return this.state.phone.replace(/\D+/g, "").length > 10;
  };
}

Registration.propTypes = {
  navigation: propTypes.object,
  auth: propTypes.func
};

export default connect(
  ({ user }) => ({
    globalStore: user
  }),
  dispatch => ({
    auth: data => dispatch({ type: "AUTH", payload: data })
  })
)(Registration);

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
  container: {
    flex: 1,
    flexDirection: "column",
    elevation: -10,
    backgroundColor: "rgb( 45, 46, 58)"
  }
});
