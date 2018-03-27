import React from "react";
import { View, Text, ScrollView } from "react-native";
import { connect } from "react-redux";
// import LinearGradient from "react-native-linear-gradient";

import IconD from "../../../components/ui/IconD";
import { adaptWidth, line } from "../../../etc";

// const { width: viewportWidth } = Dimensions.get("window");

class Loyalty extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      levels: [
        {
          title: "Добро пожаловать",
          detail:
            "Статус который получает каждый пользователь после регистрации",
          rang: "Новичек"
        },
        {
          title: "Постоянная скидка 10%",
          detail: "Вы получите этот статус заказав трижды из разных ресторанов",
          rang: "Бывалый"
        },
        {
          title:
            "Постоянная скидка 10% и один бонусный сертификат на 3000 ₽ раз в месяц",
          detail:
            "Вы получите этот статус если делаете больше пяти заказов в месяц",
          rang: "Профи"
        }
      ]
    };
  }

  static navigationOptions = {
    title: adaptWidth(
      "Прогр.лояльности",
      "Прогр.лояльности",
      "Программа лояльности"
    )
  };

  static propTypes = {};

  renderHead = () => {
    return (
      <View
        style={{
          flexDirection: "column",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          marginTop: adaptWidth(36, 53, 66)
        }}
      >
        <IconD name="dostavka" size={35} color="rgb(231, 208, 172)" />
        <Text
          style={{
            fontFamily: "OpenSans",
            fontWeight: "bold",
            marginTop: 20,
            color: "rgb(225, 199, 155)",
            textAlign: "center",
            fontSize: 17
          }}
        >
          {"Программа лояльности \nДоставка 1"}
        </Text>
        <Text
          style={{
            fontFamily: "OpenSans",
            fontWeight: "bold",
            color: "rgb(119, 122, 136)",
            textAlign: "center",
            fontSize: 12,
            marginTop: 25
          }}
        >
          {"Чем чаще вы пробуете новые блюда,\n тем больше у вас привилегий"}
        </Text>
      </View>
    );
  };

  renderBadges = count => {
    const result = [];
    for (let i = 0; i < count; i++)
      result.push(
        <IconD
          key={i}
          name="dostavka"
          style={{ marginRight: 5 }}
          size={16}
          color="rgb(231, 208, 172)"
        />
      );
    return result;
  };

  renderLevels = () => {
    return this.state.levels.map((level, index) => {
      return (
        <View
          key={index}
          style={{
            paddingVertical: 20,
            marginHorizontal: adaptWidth(15, 20, 20),
            borderBottomWidth: index != 2 ? 1 : 0,
            borderColor: "rgb(87, 88, 98)",
            flexDirection: "row"
          }}
        >
          <View style={{ flexDirection: "column", width: 94 }}>
            <Text
              style={{
                fontFamily: "stem-medium",
                fontSize: 15,
                color: "#fff",
                textAlign: "left",
                marginBottom: 20
              }}
            >
              {level.rang}
            </Text>
            <View
              style={{
                flexDirection: "row"
              }}
            >
              {this.renderBadges(index + 1)}
            </View>
          </View>

          <View
            style={{
              flexDirection: "column"
            }}
          >
            <Text
              style={{
                marginBottom: 20,
                fontSize: 13,
                fontFamily: "stem-medium",
                maxWidth: 240,
                color: "rgb(225, 199, 155)"
              }}
            >
              {level.title}
            </Text>
            <Text
              style={{
                marginBottom: 20,
                fontSize: 13,
                fontFamily: "opensans",
                maxWidth: 240,
                color: "#fff"
              }}
            >
              {level.detail}
            </Text>
          </View>
        </View>
      );
    });
  };

  render = () => {
    return (
      <View style={{ flex: 1 }}>
        {line()}
        <ScrollView>
          {this.renderHead()}

          <View
            style={{
              height: 1,
              backgroundColor: "rgb(87, 88, 98)",
              marginTop: 42,
              marginBottom: 28,
              marginHorizontal: adaptWidth(15, 20, 20)
            }}
          />
          <Text
            style={{
              textAlign: "center",
              fontFamily: "stem-medium",
              fontSize: 16,
              marginBottom: 20,
              color: "#FFF"
            }}
          >
            {"Статусы программы\nлояльности"}
          </Text>
          {this.renderLevels()}
          <View
            style={{
              height: 50
            }}
          />
        </ScrollView>
        {/* <View
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
          <View
            style={{
              height: 1,
              position: "absolute",
              alignSelf: "center",
              backgroundColor: "rgb(87, 88, 98)",
              bottom: 0,
              width: viewportWidth - 40
            }}
          />
        </View> */}
      </View>
    );
  };
}

export default connect(null, null)(Loyalty);
