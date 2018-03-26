import React from "react";
import { View, Dimensions, Text, ScrollView, Image } from "react-native";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";

import IconD from "../../../components/ui/IconD";
import { adaptWidth, line } from "../../../etc";

const { width: viewportWidth } = Dimensions.get("window");

class Guide extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blocks: [
        {
          title: "Соберите свою коллекцию блюд",
          image: require("./slide0.png"),
          detail:
            "Добавляйте блюда в избранное, и вы всегда сможете заказать их в два счета."
        },
        {
          title: "Получайте персональные рекомендации",
          image: require("./slide2.png"),
          detail:
            "Персональные рекомендации помогут найти самоеинтересное и вкусное во всем многообразии наших блюд. Вы всегда сможите изменить свои предпочтения, когда захотите разнообразить свои вкусы."
        },
        {
          title: "Собирайте не только интересные блюда но и подборки",
          image: require("./slide1.png"),
          detail:
            "Специальная подборка от наших рестораторов — это ваш ориентир в бескрайнем море изысканных блюд. Читайте, пробуйте, добавляйте в избранное, то что вас цепляет."
        },
        {
          title: "Учавствуйте в акциях от наших ресторанов",
          image: require("./slide3.png"),
          detail:
            "Только при заказе в нашем приложении вы получаете возможность бесплатно пробовать специальные блюда от шефа ресторана. Следите за акциями и учавствуйте в них!"
        },
        {
          title: "Начните с любимого блюда!",
          image: require("./slide4.png"),
          detail:
            "Как только вы выбираете что-нибудь интересное, мы предлагаем вам дополнить свой заказ до минимальной суммы доставки из выбранного ресторана. Вкусный обед, завтрак или ужин ждет вас!"
        }
      ]
    };
  }

  static navigationOptions = {
    title: "Доставка 1"
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
            fontFamily: "stem-medium",
            fontWeight: "bold",
            marginTop: 20,
            color: "rgb(225, 199, 155)",
            textAlign: "center",
            fontSize: 17
          }}
        >
          {"Доставка 1"}
        </Text>
        <Text
          style={{
            fontFamily: "stem-medium",
            color: "#fff",
            textAlign: "center",
            fontSize: 16,
            marginTop: 25
          }}
        >
          {"Путеводитель\n по приложению"}
        </Text>
        <Text
          style={{
            fontFamily: "OpenSans",
            fontSize: 13,
            color: "#fff",
            marginHorizontal: 20,
            marginVertical: 25,
            alignSelf: "stretch"
          }}
        >
          {
            "В век информационных технологий и инноваций совсем не обязательно выходить замуж за повара, чтобы на обед  и ужин получать ресторанные блюда. Достаточно иметь телефон и интернет — и ресторан сам приедет к тебе домой!"
          }
        </Text>
        <View
          style={{
            height: 1,
            backgroundColor: "rgb(87, 88, 98)",
            marginTop: 42,
            marginBottom: 28,
            marginHorizontal: adaptWidth(15, 20, 20)
          }}
        />
      </View>
    );
  };

  renderBlocks = () => {
    return this.state.blocks.map((block, index) => {
      return (
        <View
          key={index}
          style={{
            paddingVertical: 36,
            marginHorizontal: adaptWidth(15, 20, 20),
            borderBottomWidth: index != 4 ? 1 : 0,
            borderColor: "rgb(87, 88, 98)",
            flexDirection: "column"
          }}
        >
          <View
            style={{
              alignSelf: "stretch"
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                maxWidth: viewportWidth - 80,
                fontFamily: "stem-medium",
                fontSize: 16,
                color: "#fff",
                textAlign: "center",
                marginBottom: 31
              }}
            >
              {block.title}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignSelf: "center",
              alignContent: "center",
              flex: 1
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                width: viewportWidth,
                height: 200,
                alignSelf: "center",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center"
              }}
              source={block.image}
            />
          </View>
          <Text
            style={{
              fontFamily: "OpenSans",
              fontSize: 13,
              marginTop: 35,
              color: "rgb(216, 216, 216)"
            }}
          >
            {block.detail}
          </Text>
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
          {this.renderBlocks()}
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
        </View>
      </View>
    );
  };
}

export default connect(null, null)(Guide);
