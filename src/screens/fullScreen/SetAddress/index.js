import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  Alert
} from "react-native";
import { TextField } from "react-native-material-textfield";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Touchable from "react-native-platform-touchable";
import { connect } from "react-redux";
import propTypes from "prop-types";

import { fetchJson, host, adaptWidth, line } from "../../../etc";

const { width: viewportWidth } = Dimensions.get("window");

class SelectAddress extends React.Component {
  static propTypes = {
    navigation: propTypes.object,
    lastViewed: propTypes.object,
    saveAddress: propTypes.func,
    showSpinner: propTypes.func,
    hideSpinner: propTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      canNav: true,
      showAutocomplete: true,
      restaurantName: "",
      history: [],
      recomededAddresses: [],
      deliver: undefined,
      address: "",
      house: ""
    };
    if (
      this.props.navigation.state.params.id === this.props.lastViewed.restaurant
    )
      this.props.navigation.navigate("Loader", {
        id: this.props.navigation.state.params.id,
        action: "navigateToMenu"
      });
  }

  componentWillMount = async () => {
    const response = await fetch(
      `${host}/restaurant?restaurantId=${this.props.navigation.state.params.id}`
    );
    const responseJson = await response.json();

    let prevAddress = await AsyncStorage.getItem("Addresses");
    let nan = await AsyncStorage.getItem("nan");
    let prevAddressJson;
    if (prevAddress != nan) prevAddressJson = JSON.parse(prevAddress);
    else prevAddressJson = [];

    this.setState({
      restaurantName: responseJson["data"]["result"]["title"],
      history: prevAddressJson
    });
  };

  notDeliver() {
    return !this.state.deliver;
  }

  getAutocomplete = async address => {
    let responseJson = await fetchJson(
      `${host}/address/autocomplete/?cityId=36&street=${address.street}&house=${
        address.house
      }&restaurantId=${this.props.navigation.state.params.id}`,
      {
        method: "POST"
      }
    );
    if (responseJson.data === undefined) {
      if (responseJson.errors === undefined) {
        Alert.alert("Ошибка", "Ошибка запроса");
        throw Error("Упс...");
      }
    } else this.setState({ recomededAddresses: responseJson.data.slice(0, 4) });
  };

  renderAutocomplete = () => {
    var result = [];
    for (let i = 0; i < this.state.recomededAddresses.length; i++) {
      //if (this.state.recomededAddresses[i].street.indexOf(address.street) != -1)
      if (i < 5)
        result.push(
          <TouchableOpacity
            key={i}
            onPress={() => {
              this.setState({
                showAutocomplete: false,
                address: this.state.recomededAddresses[i].street,
                house: this.state.recomededAddresses[i].house
              });
            }}
            style={{
              alignSelf: "stretch",
              marginTop: adaptWidth(15, 20, 23)
            }}
          >
            <Text
              style={{
                fontFamily: "OpenSans",
                color: "rgb(119, 122, 136)",
                fontSize: 14,
                textAlign: "center"
              }}
            >
              {`${this.state.recomededAddresses[i].street}` +
                (this.state.recomededAddresses[i].house != ""
                  ? `, ${this.state.recomededAddresses[i].house}`
                  : "")}
            </Text>
          </TouchableOpacity>
        );
    }
    return result;
  };

  checkForAviability = () => {
    if (this.state.address == "" || this.state.house == "") return null;
    if (this.state.deliver === undefined) return null;
    if (!this.state.deliver)
      return (
        <View style={{ padding: 20 }}>
          <Text
            style={{
              fontFamily: "OpenSans",
              lineHeight: 13,
              fontSize: 12,
              top: 1,
              color: "#fff",
              textAlign: "center"
            }}
          >{`К сожалению ресторан ${
              this.state.restaurantName
            } не осуществляет доставку по данному адресу. Но вы можете выбрать другой ресторан который привезет вам все что вы ни пожелаете`}</Text>
          {/*<TouchableOpacity style={{
					borderRadius: 5,
					borderWidth: 1,
					borderColor: '#dcc49c',
					padding: 8,
					marginVertical: 15,
				}}>
					<Text style={{
						fontFamily: 'Stem-Medium',
						lineHeight: 13,
						fontSize: 12,
						top: 1,
						color: '#fff',
						textAlign: 'center'
					}}>{'Смотреть все рестораны \nдоступные по этому адресу' }</Text>
				</TouchableOpacity>*/}
        </View>
      );
    else
      return (
        <View style={{ padding: 20 }}>
          <Text
            style={{
              fontFamily: "OpenSans",
              lineHeight: 13,
              fontSize: 12,
              top: 1,
              color: "#fff",
              textAlign: "center"
            }}
          >
            {"Отлично"}
          </Text>
        </View>
      );
  };

  validateAddress = async () => {
    if (this.state.address == "" || this.state.house == "") {
      this.setState({ deliver: undefined });
      return -1;
    }
    this.props.showSpinner();
    const responseJson = await fetchJson(
      `${host}/address?cityId=36&street=${this.state.address}&house=${
        this.state.house
      }&restaurantId=${this.props.navigation.state.params.id}`,
      {
        method: "POST"
      }
    );
    if (responseJson["errors"] != undefined) {
      Alert.alert(
        responseJson["errors"]["title"] + " " + responseJson["errors"]["code"],
        responseJson["errors"]["detail"],
        [{ text: "OK", onPress: this.props.hideSpinner }]
      );
      this.setState({ deliver: false });
      return -1;
    } else if (responseJson["data"] != undefined) {
      this.props.hideSpinner();
      this.setState({ deliver: responseJson["data"]["result"] == 0 });
    }
  };

  next = () => {
    if (this.state.deliver)
      if (this.state.canNav) {
        const lastAddress = this.state.history[this.state.history.length - 1];
        const isInit = this.state.history.length == 0;
        if (isInit)
          this.state.history.push({
            street: this.state.address,
            house: this.state.house
          });
        else if (
          lastAddress.street != this.state.address ||
          lastAddress.house != this.state.house
        )
          if (this.state.deliver)
            this.state.history.push({
              street: this.state.address,
              house: this.state.house
            });
        if (this.state.history.length <= 2)
          AsyncStorage.setItem("Addresses", JSON.stringify(this.state.history));
        else {
          this.state.history.splice(0, 1);
          AsyncStorage.setItem("Addresses", JSON.stringify(this.state.history));
        }
        this.props.saveAddress({
          street: this.state.address,
          house: this.state.house
        });
        this.props.navigation.navigate("Loader", {
          id: this.props.navigation.state.params.id,
          action: "navigateToMenu"
        });
        this.setState({ canNav: false });
        setTimeout(() => {
          this.setState({ canNav: true });
        }, 1500);
      }
  };

  render = () => {
    return (
      <View style={styles.container}>
        {line()}
        <KeyboardAwareScrollView
          extraHeight={100}
          extraScrollHeight={150}
          enableAutoAutomaticScroll
          enableOnAndroid
          behavior="position"
        >
          {/*<Header
					leftComponent={{ icon: 'ios-arrow-back', type: 'ionicon', color: '#dcc49c',  }}
					centerComponent={{ text: 'Адрес доставки', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
					outerContainerStyles={{ 
						width: viewportWidth - 40, 
						marginLeft: 20,
						borderColor: 'rgb(87, 88, 98)',
						alignSelf: 'center',
						alignContent: 'center',
						}}
				/>*/}
          <Text
            style={{
              fontFamily: "Stem-Medium",
              fontSize: 16,
              lineHeight: 20,
              marginTop:
                viewportWidth >= 320 && viewportWidth < 375
                  ? 14
                  : viewportWidth >= 375 && viewportWidth < 414 ? 31 : 43,
              letterSpacing: 1.1,
              textAlign: "center",
              color: "#fff",
              top: 4
            }}
          >
            {"Ресторан " +
              this.state.restaurantName +
              "\nограничил зону доставки"}
          </Text>
          <Text
            style={{
              fontFamily: "OpenSans",
              fontSize: 12,
              lineHeight: 15,
              textAlign: "center",
              marginTop:
                viewportWidth >= 320 && viewportWidth < 375
                  ? 11
                  : viewportWidth >= 375 && viewportWidth < 414 ? 19 : 25,
              marginBottom:
                viewportWidth >= 320 && viewportWidth < 375
                  ? 16
                  : viewportWidth >= 375 && viewportWidth < 414 ? 21 : 23,
              top: 3,
              color: "rgb(119, 122, 136)"
            }}
          >
            {
              "Пожалуйста убедитесь что ваш адрес\nвходит в зону доставки ресторана"
            }
          </Text>
          {this.state.address != ""
            ? null
            : this.state.history.map((e, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    this.setState({
                      address: e.street,
                      house: e.house,
                      deliver: true
                    });
                  }}
                >
                  <Text
                    style={[
                      styles.text,
                      {
                        color: "#dcc49c",
                        fontFamily: "OpenSans",
                        fontSize: 14,
                        marginTop:
                            viewportWidth >= 320 && viewportWidth < 375
                              ? 12
                              : viewportWidth >= 375 && viewportWidth < 414
                                ? 17
                                : 21
                      }
                    ]}
                  >{`${e.street}, ${e.house}`}</Text>
                </TouchableOpacity>
              );
            })}
          <View style={{ alignSelf: "stretch", paddingHorizontal: 20 }}>
            <TextField
              tintColor="#dcc49c"
              baseColor="rgb( 87, 88, 98)"
              textColor="white"
              returnKeyType="send"
              autoCorrect={false}
              style={{
                alignItems: "center",
                textAlign: "center"
              }}
              inputContainerStyle={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
              label="Улица доставки"
              value={this.state.address}
              onChangeText={async address => {
                this.state.address = address;
                this.state.showAutocomplete = true;
                if (this.state.address.length > 3)
                  await this.getAutocomplete({
                    street: address,
                    house: this.state.house,
                    deliver: undefined
                  });
              }}
              onBlur={() => {
                this.validateAddress();
              }}
            />
          </View>
          <View style={{ alignSelf: "stretch", paddingHorizontal: 20 }}>
            <TextField
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
              label="Дом доставки"
              value={this.state.house}
              onChangeText={address =>
                this.setState({ house: address, deliver: undefined })
              }
              onBlur={() => {
                this.validateAddress();
              }}
            />
          </View>
          {this.state.showAutocomplete
            ? this.renderAutocomplete(this.state.address)
            : null}
          {this.state.address != "" && this.state.house != ""
            ? this.checkForAviability(this.state.address)
            : null}
        </KeyboardAwareScrollView>

        <View
          style={{
            position: "absolute",
            alignSelf: "center",
            width: viewportWidth - 30,
            bottom: 0,
            height: 49,
            borderTopWidth: 2,
            borderColor: this.state.deliver ? "#dcc49c" : "#575862",
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
                  color: this.state.deliver ? "#dcc49c" : "#575862"
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
}

export default connect(
  ({ lastViewed }) => ({
    lastViewed: lastViewed
  }),
  dispatch => ({
    saveAddress: address =>
      dispatch({ type: "SAVE_ADDRESS", payload: address }),
    showSpinner: () => dispatch({ type: "SHOW_SPINNER" }),
    hideSpinner: () => dispatch({ type: "HIDE_SPINNER" })
  })
)(SelectAddress);

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 16,
    textAlign: "center"
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
    elevation: 0,
    backgroundColor: "#292b37",
    justifyContent: "space-between",
    alignItems: "stretch"
  }
});
