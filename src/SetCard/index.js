import React from "react";
import { View, Text, TextInput, Image, Dimensions } from "react-native";
import { adaptWidth } from "../etc";
import Touchable from "react-native-platform-touchable";
import LinearGradient from "react-native-linear-gradient";
import { TextField } from "react-native-material-textfield";
import { TextInputMask } from "react-native-masked-text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import propTypes from "prop-types";

const MASTERCARD =
  "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png";
const VISA =
  "https://resources.mynewsdesk.com/image/upload/ojf8ed4taaxccncp6pcp.png";

const { width: viewportWidth } = Dimensions.get("window");

class SetCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      agreement: false,
      cardNumber: "",
      cvc: "",
      validDate: "",
      owner: ""
    };
  }

  next = () => {
    this.props.navigation.goBack();
  };

  isNext = () => {
    if (!this.state.agreement) return false;
    if (this.state.cardNumber === "") return false;
    if (this.state.cvc.length != 3) return false;
    if (this.state.cvc.validDate === "") return false;
    if (this.state.cvc.owner === "") return false;
    return true;
  };

  render = () => {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1 }}
        behavior="position"
      >
        <Touchable
          onPress={() => this.setState({ agreement: !this.state.agreement })}
          background={Touchable.SelectableBackgroundBorderless()}
        >
          <View
            style={{
              marginTop: adaptWidth(21, 36, 47),
              marginLeft: 20,
              marginRight: adaptWidth(37, 47, 47),
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <View
              style={{
                width: 17,
                height: 17,
                marginTop: 10,
                marginRight: 17,
                borderColor: "rgb(225, 199, 155)",
                borderWidth: 2,
                padding: 2
              }}
            >
              <View
                style={{
                  width: 9,
                  height: 9,
                  backgroundColor: this.state.agreement
                    ? "rgb(225, 199, 155)"
                    : "transparent"
                }}
              />
            </View>
            <Text
              style={{
                fontFamily: "OpenSans",
                color: "rgb(119, 122, 136)"
              }}
            >
              {
                "Я согласен с тем, что с карты безвозвратно будет списан один рубль (для проверки  работоспособности карты)"
              }
            </Text>
          </View>
        </Touchable>

        <Text
          style={{
            fontFamily: "Stem-Medium",
            fontSize: 16,
            letterSpacing: 1.1,
            marginTop: adaptWidth(21, 34, 56),
            marginBottom: adaptWidth(20, 24, 28),
            alignSelf: "stretch",
            textAlign: "center",
            justifyContent: "center",
            color: "#fff"
          }}
        >
          {"Привяжите банковскую карту"}
        </Text>
        <LinearGradient
          colors={["rgba(87, 88, 98, 1)", "rgba(65, 66, 77, 1)"]}
          style={{
            alignSelf: "stretch",
            marginHorizontal: adaptWidth(20, 24, 27),
            aspectRatio: 1.5769230769,
            borderRadius: 11
          }}
        >
          <View style={{ flex: 2 }} />
          <View
            style={{
              flex: 2,
              flexDirection: "column",
              marginBottom: 12,
              marginHorizontal: 20
            }}
          >
            <TextInputMask
              value={this.state.cardNumber}
              placeholder="0000 0000 0000 0000"
              placeholderTextColor="rgb(225, 199, 155)"
              onChangeText={value => this.setState({ cardNumber: value })}
              type={"credit-card"}
              style={{
                color: "rgb(225, 199, 155)",
                alignSelf: "stretch",
                textAlign: "center",
                fontSize: 24,
                fontFamily: "OpenSans"
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 2
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  flex: 2
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end"
                  }}
                >
                  <TextInputMask
                    value={this.state.validDate}
                    placeholder="ММ / ГГ"
                    placeholderTextColor="rgb(225, 199, 155)"
                    onChangeText={value => this.setState({ validDate: value })}
                    type={"custom"}
                    options={{
                      mask: "99 / 99"
                    }}
                    keyboardType="numeric"
                    style={{
                      color: "rgb(225, 199, 155)",
                      alignSelf: "stretch",
                      textAlign: "center",
                      fontSize: 14,
                      fontFamily: "OpenSans"
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start"
                  }}
                >
                  <TextInput
                    value={this.state.owner}
                    onChangeText={value => this.setState({ owner: value })}
                    placeholder="Имя владельца"
                    placeholderTextColor="rgb(225, 199, 155)"
                    autoCapitalize="characters"
                    style={{
                      color: "rgb(225, 199, 155)",
                      alignSelf: "baseline",
                      width: 200,
                      fontSize: 14,
                      fontFamily: "OpenSans"
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  marginLeft: 25
                }}
              >
                <Image
                  resizeMode="contain"
                  source={{
                    uri: this.state.cardNumber[0] === "5" ? MASTERCARD : VISA
                  }}
                  style={{
                    width: 60,
                    height: 42
                  }}
                />
              </View>
            </View>
          </View>
        </LinearGradient>

        <TextField
          tintColor={"#dcc49c"}
          baseColor={this.state.cvc ? "#dcc49c" : "rgb(87, 88, 98)"}
          textColor={"white"}
          returnKeyType={"send"}
          keyboardType={"phone-pad"}
          value={this.state.cvc}
          onChangeText={code => {
            this.setState({ cvc: code });
          }}
          style={{
            alignItems: "center",
            textAlign: "center",
            width: 160
          }}
          inputContainerStyle={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            width: 160
          }}
          label={"CVC код"}
        />

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
                {
                  fontSize: 16,
                  color: "#dcc49c",
                  alignSelf: "center",
                  textAlign: "center",
                  letterSpacing: 0.8,
                  fontFamily: "Stem-Regular"
                },
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
}

SetCard.propTypes = {
  navigation: propTypes.object
};

export default connect(
  state => ({
    user: state.user
  }),
  dispatch => ({
    addCard: card => dispatch({ type: "ADD_CREDIT_CARD", payload: card })
  })
)(SetCard);
