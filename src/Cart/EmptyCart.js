import React from "react";
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  Platform,
  StyleSheet
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import propTypes from "prop-types";

import Counter from "../Counter";
import { adaptWidth } from "../etc";
import IconD from "../IconD";
import ButtonD from "../ButtonD";

const { width: viewportWidth } = Dimensions.get("window");

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
    marginTop: 17,
    marginBottom: 17,
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
    elevation: -10
  }
});

class EmptyCart extends React.Component {
  static propTypes = {
    callback: propTypes.func
  };

  render = () => {
    const screen = adaptWidth(0, 1, 2);
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontFamily: "Stem-Medium",
              fontSize: 14,
              color: "rgb( 225, 199, 155)",
              letterSpacing: 0.9,
              alignSelf: "stretch",
              marginHorizontal: adaptWidth(32, 37.5, 41.4),
              marginTop: adaptWidth(18, 21.1, 23.3),
              marginBottom: adaptWidth(19, 24.8, 28.7)
            }}
          >
            {"Начните заказ с любимого блюда"}
          </Text>
          <View
            style={{ height: screen == 0 ? 18 : screen == 1 ? 28.5 : 35.2 }}
          />
          <View
            style={{
              flexDirection: "row",
              alignSelf: "stretch",
              justifyContent: "space-between",
              marginLeft: 20,
              marginRight: screen == 0 ? 36.3 : screen == 1 ? 36.5 : 36.7
            }}
          >
            <Text
              style={{
                fontFamily: "OpenSans",
                color: "#fff",
                fontSize: 12,
                lineHeight: 14,
                maxWidth: screen == 0 ? 195 : screen == 1 ? 230.8 : 273,
                letterSpacing: 0.8,
                top: Platform.OS == "ios" ? 2 : 0,
                textAlignVertical: "bottom"
              }}
            >
              {
                "Нажмите на значек корзины на карточке или рядом с описанием блюда"
              }
            </Text>
            <View>
              <IconD name="cart" size={40} color="rgb( 225, 199, 155)" />
            </View>
          </View>
          <View
            style={{ height: screen == 0 ? 18 : screen == 1 ? 28.5 : 35.2 }}
          />
          <View
            style={{
              width: viewportWidth - 30,
              height: 1,
              borderTopWidth: 1,
              borderColor: "rgb(87, 88, 98)"
            }}
          />
          <View
            style={{
              width: viewportWidth - 30,
              borderBottomWidth: 1,
              borderColor: "rgb(87, 88, 98)",
              paddingHorizontal: 5,
              paddingVertical: screen == 0 ? 22 : screen == 1 ? 26 : 39,
              justifyContent: "space-between",
              flexDirection: "row",
              alignSelf: "center"
            }}
          >
            <Text
              style={{
                maxWidth: 140,
                fontFamily: "OpenSans",
                color: "#fff",
                fontSize: 12,
                letterSpacing: 0.8
              }}
            >
              {"Выберите кол-во блюд для заказа"}
            </Text>
            <Counter value={1} />
          </View>
          <View style={{ height: screen == 0 ? 22 : screen == 1 ? 26 : 39 }} />

          <View
            style={{
              alignSelf: "center"
            }}
          >
            <ButtonD
              onPress={this.props.callback}
              title={["Добавить к заказу", "и перейти в ресторан"]}
              width={viewportWidth - 60}
            />
          </View>

          <View style={{ height: screen == 0 ? 22 : screen == 1 ? 26 : 39 }} />
          <Text
            style={{
              fontFamily: "OpenSans",
              fontSize: 12,
              marginHorizontal: 20,
              letterSpacing: 0.8,
              color: "#fff"
            }}
          >
            {
              "При добавлении первого блюда в корзину, вы перейдете в меню ресторана, где сможете дополнить заказ другими блюдами"
            }
          </Text>
        </ScrollView>
        <View
          pointerEvents="none"
          style={{
            height: 60,
            position: "absolute",
            bottom: 0,
            width: viewportWidth
          }}
        >
          <LinearGradient
            colors={["rgba(39, 40, 48, 0)", "rgba(39, 40, 48, 1)"]}
            style={{
              flex: 1
            }}
          />
        </View>
      </View>
    );
  };
}

export default EmptyCart;
