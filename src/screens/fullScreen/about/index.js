import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import propTypes from "prop-types";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Touchable from "react-native-platform-touchable";

const { width: viewportWidth } = Dimensions.get("window");

export default class SelectCity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      canNav: true,
      entries: [
        {
          title: "Приложение с карточками",
          text:
            "Привет. Наше приложение основано на карточной механнике. Буквально! У каждого блюда есть карточка товара которые вы можете листать, отмечать и собирать!"
        },
        {
          title: "Рекомендации блюд из лучших ресторанов города",
          text:
            "Мы лично проверили и одобрили все рестораны, с которыми мы работаем"
        },
        {
          title: "Программа лояльности",
          text:
            "Чем чаще вы делаете заказы, тем выше ваш статус в программе лояльности. Высокий статус дает возможность получить дополнительные скидки и подарки"
        },
        {
          title: "Бонусные сертификаты",
          text:
            "Специальные бонусные сертификаты дают право на бесплатный заказ или на скидку. Вы можете самостоятельно использовать сертификат или подарить его другу."
        }
      ],
      svgs: [],
      canRender: false
    };
  }

  static propTypes = {
    navigation: propTypes.object
  };

  async componentWillMount() {
    this.state.svgs = [
      await require("./slide1.png"),
      await require("./slide2.png"),
      await require("./slide3.png"),
      await require("./slide4.png")
    ];
    this.setState({ canRender: true });
  }
  next = () => {
    //this.setTags();
    if (this.state.canNav) {
      this.props.navigation.navigate("SelectTags");
      this.setState({ canNav: false });
      setTimeout(() => {
        this.setState({ canNav: true });
      }, 1500);
    }
  };
  _renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          padding: 20
        }}
      >
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
              width: 260,
              height: 150,
              alignSelf: "center",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center"
            }}
            source={this.state.svgs[index]}
          />
          {/*<View style={{ alignSelf: 'center' }}><IconD name={'slide1'} size={140} style={{ alignSelf: 'center' }} /></View>*/}
        </View>
        <Text
          style={{
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: 25,
            fontFamily: "Stem-Medium"
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            color: "#dcc49c",
            fontSize: 12,
            fontFamily: "OpenSans",
            fontWeight: "600"
          }}
        >
          {item.text}
        </Text>
      </View>
    );
  };

  render() {
    if (this.state.canRender)
      return (
        <View style={styles.container}>
          <Text style={styles.header}>
            {"Первый рекомендательный \nсервис еды"}
          </Text>

          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={this.state.entries}
            renderItem={this._renderItem}
            sliderWidth={viewportWidth}
            itemWidth={
              viewportWidth >= 320 && viewportWidth < 375
                ? 280
                : viewportWidth >= 375 && viewportWidth < 414 ? 328 : 362
            }
            itemHeight={
              viewportWidth >= 320 && viewportWidth < 375
                ? 370
                : viewportWidth >= 375 && viewportWidth < 414 ? 435 : 479
            }
            onSnapToItem={index => this.setState({ activeSlide: index })}
            contentContainerCustomStyle={{
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center"
            }}
            slideStyle={{
              height:
                viewportWidth >= 320 && viewportWidth < 375
                  ? 370
                  : viewportWidth >= 375 && viewportWidth < 414 ? 435 : 479,
              width:
                viewportWidth >= 320 && viewportWidth < 375
                  ? 280
                  : viewportWidth >= 375 && viewportWidth < 414 ? 328 : 362,

              borderWidth: 1,
              borderColor: "#dcc49c",
              backgroundColor: "#292b37",
              borderRadius: 10,

              elevation: 10,
              shadowColor: "#000",
              shadowOffset: { width: 3, height: 3 },
              shadowOpacity: 0.32,
              shadowRadius: 6
            }}
          />

          <Pagination
            inactiveDotScale={1}
            inactiveDotOpacity={0.2}
            dotsLength={this.state.entries.length}
            activeDotIndex={this.state.activeSlide}
            dotStyle={{
              width: 6,
              height: 6,
              margin: -2,
              borderRadius: 3,
              backgroundColor: "#ffffff"
            }}
            containerStyle={{
              top:
                viewportWidth >= 320 && viewportWidth < 375
                  ? -35
                  : viewportWidth >= 375 && viewportWidth < 414 ? -50 : -50
            }}
          />
          <View
            style={{
              position: "absolute",
              alignSelf: "center",
              width: viewportWidth - 30,
              bottom: 0,
              height: 49,
              borderTopWidth: 2,
              borderColor: "#dcc49c",
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
              <Text style={styles.nextButtonText}>Далее</Text>
            </Touchable>
          </View>
        </View>
      );
    else return null;
  }
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 20
  },
  header: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1.1,
    lineHeight: 16,
    top: 4,
    fontFamily: "Stem-Medium"
  },
  header2: {
    color: "white",
    fontSize: 12,
    marginTop: 4,
    fontFamily: "OpenSans",
    fontWeight: "600"
  },
  nextButtonText: {
    fontSize: 16,
    color: "#dcc49c",
    alignSelf: "center",
    textAlign: "center",
    letterSpacing: 0.8,
    fontFamily: "Stem-Regular"
  },
  afterHeader2: {
    color: "#dcc49c",
    fontSize: 25,
    fontFamily: "OpenSans",
    fontWeight: "600"
  },
  checkingInfo: {
    fontFamily: "OpenSans",
    fontSize: 12,
    lineHeight: 14,
    textAlign: "center",
    color: "rgb( 87, 88, 98)"
  },
  container: {
    flex: 1,
    paddingTop: 52.8,
    backgroundColor: "rgb( 45, 46, 58)",
    justifyContent: "flex-start",
    alignItems: "center"
  }
});
