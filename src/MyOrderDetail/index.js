import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import Touchable from 'react-native-platform-touchable';
import { connect } from 'react-redux';

import PriceButton from "../PriceButton";
//import Storage from "../Reducers";
import IconD from "../IconD";
import ButtonD from "../ButtonD";


const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const screen =
  viewportWidth >= 320 && viewportWidth < 375
    ? 0
    : viewportWidth >= 375 && viewportWidth < 414 ? 1 : 2;

class MyOrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {
        id: 1,
        restaurantId: 0, //id ресторана
        status: "Доставлен", //статус заказа (доставлен, оплачен, отменен)
        address: "Ул. Пушкина, д. 3, кв. 2", //адрес заказа
        orderTime: new Date(2017, 9, 3, 10, 15), //время в которое был выполнен заказ
        deliveryTime: new Date(2017, 11, 3, 10, 15), //время в которое заказ будет доставлен
        payment: "Наличными курьеру", //способ оплаты
        total: 8888 // Сумма заказа (с учетом скидок и акций)
      },
      cart: [
        {
          title: "Мясной хлеб",
          favorite: false,
          image:
            "http://img.povar.ru/uploads/a0/99/e9/31/molochnii_kokteil_s_shokoladom-318319.jpg",
          weight: "200/25/40/ 15/5/2 гр.",
          price: 8888,
          description:
            "С хрустящими шариками из сулугуни и кукурузной муки с домашними соусами"
        },
        {
          title: "Мясной хлеб",
          favorite: false,
          image:
            "http://img.povar.ru/uploads/a0/99/e9/31/molochnii_kokteil_s_shokoladom-318319.jpg",
          weight: "200/25/40/ 15/5/2 гр.",
          price: 8888,
          description:
            "С хрустящими шариками из сулугуни и кукурузной муки с домашними соусами"
        }
      ],
      restaurantLogo: "https://image.ibb.co/fPo4vm/meatless_logo.png"
    };
  }

  componentWillMount = async () => {
    const restId = this.state.order.restaurantId;
    var response = await fetch(
      "http://dostavka1.com/v1/restaurant?restaurantId=" + restId
    );
    var responseJson = await response.json();
    if (responseJson["data"] && responseJson["data"]["result"]) {
      this.state.restaurantLogo = responseJson["data"]["result"]["logoImage"];
      this.setState({});
    }
  };

  _renderContent = section => {
    const imageHeight =
      viewportWidth >= 320 && viewportWidth < 375
        ? 100
        : viewportWidth >= 375 && viewportWidth < 414 ? 117 : 130;
    //const textMarginRight = (viewportWidth >= 320 && viewportWidth < 375) ? 40 : (viewportWidth >= 375 && viewportWidth < 414) ? 117 : 130;
    return (
      <View style={{ flexDirection: "column", width: viewportWidth }}>
        {section.map((e, i) => {
          return (
            <Touchable
              key={i}
              onPress={() => {
                if (this.state.canNav) {
                  this.props.navigation.navigate("Plate");
                  this.state.canNav = false;
                  setTimeout(() => {
                    this.state.canNav = true;
                  }, 1500);
                }
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 10,
                  width: viewportWidth - 10,
                  marginTop: 10,
                  justifyContent: "flex-start"
                }}
              >
                <Image
                  source={{
                    uri: e.image
                  }}
                  style={{
                    width: imageHeight,
                    height: imageHeight,
                    borderRadius: 10
                  }}
                />
                <View
                  style={{
                    flexDirection: "column",
                    marginLeft: 10,
                    width: viewportWidth - 20 - 20 - imageHeight
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 15,
                      fontFamily: "stem-medium",
                      top: 3,
                      lineHeight: 18,
                      letterSpacing: 1
                    }}
                  >
                    {e.title}
                  </Text>
                  <Text
                    style={{
                      color: "rgb( 135, 136, 140)",
                      fontSize: 12,
                      lineHeight: 14,
                      marginBottom: 5
                    }}
                  >
                    {e.description}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <PriceButton
                      value={e.price}
                      pressed={getCount(this.props.globalStore, e) != 0}
                      count={getCount(this.props.globalStore, e)}
                      onPress={() => this.props.onAddPlate(e)}
                    />
                    <Text
                      style={{
                        color: "rgb( 135, 136, 140)",
                        marginLeft: 10,
                        fontSize: 12,
                        lineHeight: 14,
                        maxWidth: 80,
                        letterSpacing: 0.4,
                        fontFamily: "open-sans-semibold"
                      }}
                    >
                      {e.weight}
                    </Text>
                  </View>
                </View>
              </View>
            </Touchable>
          );
        })}
      </View>
    );
  };

  renderInfo = () => {
    if (
      this.state.order.status == "Доставлен" ||
      this.state.order.status == "Отменен"
    )
      return (
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              maxWidth: screen == 0 ? 156 : screen == 1 ? 185 : 205,
            }}
          >
            <Text style={{
                fontFamily: 'open-sans-semibold',
                fontSize: 12,
                color: "rgb(225, 199, 155)",
            }}>{this.state.order.status}</Text>
            <Text style={{
                fontFamily: 'open-sans-semibold',
                fontSize: 14,
                color: "#fff",
                marginTop: screen == 0 ? 9 : screen == 1 ? 16 : 22,
            }}>
              {`Оплаченная сумма заказа с учетом акций и скидок ${this.state
                .order.total} ₽`}
            </Text>
          </View>
          <View>
            <Image
              style={{
                height: screen == 0 ? 85 : screen == 1 ? 100 : 117,
                width: screen == 0 ? 85 : screen == 1 ? 100 : 117
              }}
              source={{ uri: this.state.restaurantLogo }}
            />
          </View>
        </View>
      );

  };

  addAll = () => {
      this.state.cart.forEach(plate => this.props.onAddPlate(plate));
  }

  render = () => {
      var info = this.renderInfo();
      var cart = this._renderContent(this.state.cart);
      return <View style={{flex: 1, paddingTop: screen == 0 ? 12 : screen == 1 ? 25 : 32}}>
        {info}

        <View style={{height: 14}}/>
        <View style={{marginHorizontal: 15, alignSelf: 'stretch', height: 1, backgroundColor: 'rgb(87, 88, 98)'}} />
        {cart}
        <View style={{
              alignSelf: 'center',
              marginVertical: 20
            }}>
        <ButtonD onPress={this.addAll} title={`Добавить заказ в корзину за ${this.state.order.total} ₽`} width={screen == 0 ? 260 : screen == 1 ? 315 : 354}/>
        </View>
      </View>
  }
}


export default connect(
    state => ({
      globalStore: state.cart
    }),
    dispatch => ({
      onAddPlate: plate => {
        dispatch({ type: "ADD_PLATE", payload: plate });
      }
    })
  )(MyOrderDetail);

/**
 * Возвращает колличество блюд plate в корзине
 * @param {Object} cart 
 * @param {Object} plate 
 */
function getCount(cart, plate) {
    var i = 0;
    while (i < cart.length) {
      let equalTitle = plate.title == cart[i].plate.title;
      let equalRestaurant = plate.restourant == cart[i].plate.restourant;
      if (equalTitle && equalRestaurant) {
        return cart[i].count;
      }
      i++;
    }
    return 0;
  }
