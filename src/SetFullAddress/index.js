import React from "react";
import {
  View,
  Text,
  Dimensions,
  DatePickerIOS,
  Platform,
  DatePickerAndroid,
  TimePickerAndroid
} from "react-native";
import { TextField } from "react-native-material-textfield";
import { TextInputMask } from "react-native-masked-text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Touchable from "react-native-platform-touchable";
import { connect } from "react-redux";
import PopupDialog, { SlideAnimation } from "react-native-popup-dialog";
import propTypes from "prop-types";

import { adaptWidth } from "../etc";

const { width: viewportWidth } = Dimensions.get("window");

function dateToString(date) {
  const WEEK = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота"
  ];
  let now = new Date();
  let day = date.getDay() === now.getDay() ? "Сегодня" : WEEK[date.getDay()];
  let hours =
    date.getHours().toString().length == 1
      ? "0" + date.getHours().toString()
      : date.getHours().toString();
  let minutes =
    date.getMinutes().toString().length == 1
      ? "0" + date.getMinutes().toString()
      : date.getMinutes().toString();

  let time = `${hours}:${minutes}`;

  return `${day} в ${time}`;
}

const slide = new SlideAnimation({
  slideFrom: "bottom"
});

class Forms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      firstName: props.user.token ? props.user.user.firstName : "",
      secondName: props.user.token ? props.user.user.secondName : "",
      phone: props.user.token ? props.user.user.phone : "",
      address: {
        street: props.address.street,
        house: props.address.house,
        flat: "",
        entrance: "",
        floor: "",
        commentary: ""
      },
      time: "11111",
      showModal: false,
      date: new Date(),
      timeZoneOffsetInHours: -1 * new Date().getTimezoneOffset() / 60
    };
  }

  isNext = () => {
    if (this.state.firstName === "") return 0;
    if (this.state.secondName === "") return 0;
    if (this.state.phone === "") return 0;
    if (this.state.address.street === "") return 0;
    if (this.state.address.house === "") return 0;
    if (this.state.address.flat === "") return 0;
    if (this.state.address.entrance === "") return 0;
    if (this.state.address.floor === "") return 0;
    return 1;
  };

  next = () => {
    if (this.state.firstName == null || this.state.firstName == "")
      this.setState({ firstNameError: "Это поле обязательно" });
    if (this.state.secondName == null || this.state.secondName == "")
      this.setState({ secondNameError: "Это поле обязательно" });
    if (this.state.phone == null || this.state.phone == "")
      this.setState({ phoneError: "Это поле обязательно" });
    if (this.state.address.street == null || this.state.address.street == "")
      this.setState({ streetError: "Это поле обязательно" });
    if (this.state.address.house == null || this.state.address.house == "")
      this.setState({ houseError: "Это поле обязательно" });
    if (this.state.address.flat == null || this.state.address.flat == "")
      this.setState({ flatError: "Это поле обязательно" });
    if (
      this.state.address.entrance == null ||
      this.state.address.entrance == ""
    )
      this.setState({ entranceError: "Это поле обязательно" });

    if (this.isNext()) {
      const date = this.state.date.getDate();
      const month = this.state.date.getMonth() + 1;
      const year = this.state.date.getFullYear();

      const hours =
        this.state.date.getHours().toString().length == 1
          ? "0" + this.state.date.getHours()
          : this.state.date.getHours();
      const minutes =
        this.state.date.getMinutes().toString().length == 1
          ? "0" + this.state.date.getMinutes()
          : this.state.date.getMinutes();
      const seconds =
        this.state.date.getSeconds().toString().length == 1
          ? "0" + this.state.date.getSeconds()
          : this.state.date.getSeconds();

      const dateString = `${date}.${month}.${year} ${hours}:${minutes}:${seconds}`;
      this.props.navigation.navigate("MakeOrder", {
        address: {
          commentary: this.state.address.commentary,
          street: this.state.address.street,
          house: this.state.address.house,
          flat: this.state.address.flat,
          entrance: this.state.address.entrance,
          floor: this.state.address.floor
        },
        persons: this.props.navigation.state.params.persons,
        client: {
          firstName: this.state.firstName,
          secondName: this.state.secondName,
          phone: this.state.phone,
          deliveryDate: this.state.selected == 1 ? dateString : null
        }
      });
    }
  };

  render = () => (
    <View>
      <KeyboardAwareScrollView
        extraHeight={100}
        extraScrollHeight={100}
        enableAutoAutomaticScroll
        enableOnAndroid
        behavior="position"
      >
        <Text
          style={{
            fontFamily: "Stem-Medium",
            fontSize: 16,
            letterSpacing: 0.9,
            textAlign: "center",
            alignSelf: "stretch",
            color: "#fff",
            marginTop: adaptWidth(20, 36, 48)
          }}
        >
          {"Получатель заказа"}
        </Text>
        <View
          style={{
            alignSelf: "stretch",
            marginHorizontal: adaptWidth(23, 25, 30)
          }}
        >
          <TextField
            tintColor="#dcc49c"
            baseColor="rgb(87, 88, 98)"
            textColor="#fff"
            returnKeyType="send"
            error={this.state.firstNameError}
            style={{
              alignItems: "center",
              alignSelf: "stretch",
              textAlign: "center"
            }}
            inputContainerStyle={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
            onChangeText={text => {
              this.setState({ firstName: text, firstNameError: null });
            }}
            value={this.state.firstName}
            label="Имя"
          />
          <TextField
            error={this.state.secondNameError}
            tintColor="#dcc49c"
            baseColor="rgb(87, 88, 98)"
            textColor="#fff"
            returnKeyType="send"
            style={{
              alignItems: "center",
              alignSelf: "stretch",
              textAlign: "center"
            }}
            inputContainerStyle={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
            onChangeText={text =>
              this.setState({ secondName: text, secondNameError: null })
            }
            value={this.state.secondName}
            label="Фамилия"
          />
          <TextInputMask
            type={"custom"}
            error={this.state.phoneError}
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
              label: "Телефон"
            }}
            options={{
              mask: "+7 999 999 99-99"
            }}
            onChangeText={text =>
              this.setState({ phone: text, phoneError: null })
            }
            value={this.state.phone}
            customTextInput={TextField}
          />
        </View>

        <Text
          style={{
            fontFamily: "Stem-Medium",
            fontSize: 16,
            letterSpacing: 0.9,
            textAlign: "center",
            alignSelf: "stretch",
            color: "#fff",
            marginTop: adaptWidth(61, 75, 82)
          }}
        >
          {"Адрес доставки"}
        </Text>
        <View
          style={{
            alignSelf: "stretch",
            marginHorizontal: adaptWidth(23, 25, 30)
          }}
        >
          <TextField
            error={this.state.streetError}
            tintColor="#dcc49c"
            baseColor="rgb(87, 88, 98)"
            textColor="#fff"
            returnKeyType="send"
            style={{
              alignItems: "center",
              alignSelf: "stretch",
              textAlign: "center"
            }}
            inputContainerStyle={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
            onChangeText={text => {
              const address = {
                ...this.state.address,
                street: text
              };
              this.setState({ address: address, streetError: null });
            }}
            value={this.state.address.street}
            label="Улица"
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ width: adaptWidth(128, 150, 165) }}>
              <TextField
                error={this.state.houseError}
                tintColor="#dcc49c"
                baseColor="rgb(87, 88, 98)"
                textColor="#fff"
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
                onChangeText={text => {
                  const address = {
                    ...this.state.address,
                    house: text
                  };
                  this.setState({ address: address, houseError: null });
                }}
                value={this.state.address.house}
                label="Дом"
              />
            </View>
            <View style={{ width: adaptWidth(128, 150, 165) }}>
              <TextField
                error={this.state.flatError}
                tintColor="#dcc49c"
                baseColor="rgb(87, 88, 98)"
                textColor="#fff"
                returnKeyType="send"
                style={{
                  alignItems: "center",
                  alignSelf: "stretch",
                  textAlign: "center"
                }}
                inputContainerStyle={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                keyboardType="numeric"
                onChangeText={text => {
                  const address = {
                    ...this.state.address,
                    flat: text
                  };
                  this.setState({ address: address, flatError: null });
                }}
                value={this.state.address.flat}
                label="Квартира"
              />
            </View>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ width: adaptWidth(128, 150, 165) }}>
              <TextField
                error={this.state.entranceError}
                tintColor="#dcc49c"
                baseColor="rgb(87, 88, 98)"
                textColor="#fff"
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
                keyboardType="numeric"
                onChangeText={text => {
                  const address = {
                    ...this.state.address,
                    entrance: text
                  };
                  this.setState({ address: address, entranceError: null });
                }}
                value={this.state.address.entrance}
                label="Подъезд"
              />
            </View>
            <View style={{ width: adaptWidth(128, 150, 165) }}>
              <TextField
                error={this.state.floor}
                tintColor="#dcc49c"
                baseColor="rgb(87, 88, 98)"
                textColor="#fff"
                returnKeyType="send"
                style={{
                  alignItems: "center",
                  alignSelf: "stretch",
                  textAlign: "center"
                }}
                keyboardType="numeric"
                inputContainerStyle={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onChangeText={text => {
                  const address = {
                    ...this.state.address,
                    floor: text
                  };
                  this.setState({ address: address });
                }}
                value={this.state.address.floor}
                label="Этаж"
              />
            </View>
          </View>
          <TextField
            tintColor="#dcc49c"
            baseColor="rgb(87, 88, 98)"
            textColor="#fff"
            returnKeyType="send"
            style={{
              alignItems: "center",
              alignSelf: "stretch",
              textAlign: "center"
            }}
            inputContainerStyle={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
            onChangeText={text => {
              const address = {
                ...this.state.address,
                commentary: text
              };
              this.setState({ address: address });
            }}
            value={this.state.address.commentary}
            label="Код домофона или комментарий"
          />
        </View>

        <Text
          style={{
            fontFamily: "Stem-Medium",
            fontSize: 16,
            letterSpacing: 0.9,
            textAlign: "center",
            alignSelf: "stretch",
            color: "#fff",
            marginBottom: adaptWidth(20, 36, 48),
            marginTop: adaptWidth(42, 50, 55)
          }}
        >
          {"Когда доставить?"}
        </Text>
        <View
          style={{
            alignSelf: "stretch",
            marginHorizontal: adaptWidth(23, 25, 30)
          }}
        >
          <Touchable onPress={() => this.setState({ selected: 0 })}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                marginBottom: adaptWidth(25, 35, 40)
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderColor: "rgb(225, 199, 155)",
                  padding: 2,
                  width: 17,
                  height: 17
                }}
              >
                <View
                  style={{
                    backgroundColor:
                      this.state.selected == 0
                        ? "rgb(225, 199, 155)"
                        : "transparent",
                    width: 9,
                    height: 9
                  }}
                />
              </View>
              <Text
                style={{
                  fontFamily: "OpenSans",
                  color: "rgb(225, 199, 155)",
                  marginLeft: 10,
                  fontSize: 14
                }}
              >
                {"Как можно скорее"}
              </Text>
            </View>
          </Touchable>

          <Touchable onPress={() => this.setState({ selected: 1 })}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                marginBottom: adaptWidth(18, 24, 29)
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderColor: "rgb(225, 199, 155)",
                  padding: 2,
                  width: 17,
                  height: 17
                }}
              >
                <View
                  style={{
                    backgroundColor:
                      this.state.selected == 1
                        ? "rgb(225, 199, 155)"
                        : "transparent",
                    width: 9,
                    height: 9
                  }}
                />
              </View>
              <Text
                style={{
                  fontFamily: "OpenSans",
                  color: "rgb(225, 199, 155)",
                  marginLeft: 10,
                  fontSize: 14
                }}
              >
                {"Доставка к  времени:"}
              </Text>
            </View>
          </Touchable>

          <Touchable
            onPress={async () => {
              if (Platform.OS !== "ios") {
                const {
                  action,
                  year,
                  month,
                  day
                } = await DatePickerAndroid.open({
                  date: new Date(),
                  mode: "spinner"
                });
                if (action !== DatePickerAndroid.dismissedAction) {
                  const { action, hour, minute } = await TimePickerAndroid.open(
                    {
                      is24Hour: true
                    }
                  );
                  if (action !== TimePickerAndroid.dismissedAction) {
                    let d = new Date(year, month, day, hour, minute);
                    let now = new Date();
                    this.setState({
                      date: d < now ? now : d
                    });

                    // Selected hour (0-23), minute (0-59)
                  }
                }
              } else
                this.state.selected == 1
                  ? this.setState({ showModal: true })
                  : null;
            }}
          >
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "stretch",
                borderColor: "rgb(87, 88, 98)",
                borderBottomWidth: 1.5,
                marginBottom: adaptWidth(18, 24, 29)
              }}
            >
              <Text
                style={{
                  fontFamily: "OpenSans",
                  color:
                    this.state.selected == 1
                      ? "rgb(225, 199, 155)"
                      : "rgb(87, 88, 98)",
                  marginLeft: 10,
                  fontSize: 11
                }}
              >
                {"Введите время"}
              </Text>
              <Text
                style={{
                  fontFamily: "OpenSans",
                  color:
                    this.state.selected == 1
                      ? "rgb(255, 255, 255)"
                      : "rgb(87, 88, 98)",
                  marginLeft: 10,
                  fontSize: 14
                }}
              >
                {dateToString(this.state.date)}
              </Text>
            </View>
          </Touchable>
        </View>
        <View style={{ height: 50 }} />
        <View
          style={{
            position: "absolute",
            alignSelf: "center",
            width: viewportWidth - 30,
            bottom: 0,
            height: 49,
            borderTopWidth: 2,
            borderColor: this.isNext() ? "#dcc49c" : "#575862",
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
                {
                  fontSize: 16,
                  alignSelf: "center",
                  textAlign: "center",
                  letterSpacing: 0.8,
                  fontFamily: "Stem-Regular",
                  color: this.isNext() ? "#dcc49c" : "#575862"
                }
              ]}
            >
              Далее
            </Text>
          </Touchable>
        </View>
      </KeyboardAwareScrollView>
      <PopupDialog
        ref={popupDialog => {
          this.popupDialog = popupDialog;
        }}
        dialogStyle={{
          backgroundColor: "transparent",
          flexDirection: "column",
          justifyContent: "flex-end"
        }}
        containerStyle={{
          justifyContent: "flex-end"
        }}
        onDismissed={() => {
          let now = new Date();
          if (this.state.date < now)
            this.setState({
              showModal: false,
              date: now
            });
          else
            this.setState({
              showModal: false
            });
        }}
        show={this.state.showModal}
        dialogAnimation={slide}
      >
        <View
          style={{
            backgroundColor: "rgb(45, 46, 58)",
            flexDirection: "column",
            borderTopWidth: 1,
            borderColor: "#dcc49c"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Touchable
              onPress={() => {
                this.setState({ showModal: false });
              }}
            >
              <Text
                style={{
                  color: "#dcc49c",
                  paddingHorizontal: 11,
                  paddingVertical: 15
                }}
              >
                {"Отмена"}
              </Text>
            </Touchable>
            <Touchable
              onPress={() => {
                this.setState({ showModal: false });
              }}
            >
              <Text
                style={{
                  color: "#dcc49c",
                  paddingHorizontal: 11,
                  paddingVertical: 15
                }}
              >
                {"Далее"}
              </Text>
            </Touchable>
          </View>
          {Platform.OS === "ios" ? (
            <View>
              <DatePickerIOS
                date={this.state.date}
                mode="datetime"
                itemStyle={{ color: "#dcc49c", fontSize: 30 }}
                timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                onDateChange={date => this.setState({ date: date })}
              />
              <View
                style={{
                  height: 1,
                  width: viewportWidth,
                  backgroundColor: "#dcc49c",
                  position: "absolute",
                  top: 90
                }}
              />
              <View
                style={{
                  height: 1,
                  width: viewportWidth,
                  backgroundColor: "#dcc49c",
                  position: "absolute",
                  top: 125
                }}
              />
              <View style={{ height: 50 }} />
            </View>
          ) : null}
        </View>
      </PopupDialog>
    </View>
  );
}

Forms.propTypes = {
  user: propTypes.object,
  address: propTypes.object,
  navigation: propTypes.object
};

export default connect(
  ({ user, address }) => ({
    user: user,
    address: address
  }),
  dispatch => ({
    onAddPlate: plate => {
      dispatch({ type: "ADD_PLATE", payload: plate });
    }
  })
)(Forms);
