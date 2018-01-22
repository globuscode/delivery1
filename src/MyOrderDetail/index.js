import React from 'react';
import { View, Text, Image, Dimensions, ScrollView, StyleSheet, Alert } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { connect } from 'react-redux';
import HTMLView from 'react-native-htmlview';

import PriceButton from '../PriceButton';
import ButtonD from '../ButtonD';
import { host } from '../etc';

const { width: viewportWidth } = Dimensions.get('window');
const screen =
  viewportWidth >= 320 && viewportWidth < 375
    ? 0
    : viewportWidth >= 375 && viewportWidth < 414 ? 1 : 2;

/**
 * Возвращает колличество блюд plate в корзине
 * @param {Object} cart
 * @param {Object} plate
 */
function getCount(cart, plate) {
  let i = 0;
  while (i < cart.length) {
    const equalTitle = plate.title === cart[i].plate.title;
    const equalRestaurant = plate.restourant === cart[i].plate.restourant;
    if (equalTitle && equalRestaurant) {
      return cart[i].count;
    }
    i += 1;
  }
  return 0;
}

/**
 * Добавляет 2.5 часа с строке времени str
 * @param {String} str 
 */
function addTimeToTimestring(str) {
  let timeArr = str.match(/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/);
  if (timeArr === null) return null;
  let deliveryHours = (parseInt(timeArr[1]) + 2);
  if (parseInt(timeArr[2]) + 30 >= 60) {
    deliveryHours += 1;
  }
  deliveryHours %= 24;
  let deliveryMinutes = (parseInt(timeArr[2]) + 30) % 60;

  let deliveryHoursStr = deliveryHours.toString().length == 1 ? `0${deliveryHours.toString()}` : deliveryHours.toString();
  let deliveryMinutesStr = deliveryMinutes.toString().length == 1 ? `0${deliveryMinutes.toString()}` : deliveryMinutes.toString();
  return deliveryHours.toString()+':'+deliveryMinutes.toString();
}

class MyOrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: this.props.navigation.state.params.order
        ? this.props.navigation.state.params.order
        : {
          id: 1,
          restaurantId: -1, // id ресторана
          status: 'Активный', // статус заказа (доставлен, оплачен, отменен)
          address: 'Ул. Пушкина, д. 3, кв. 2', // адрес заказа
          orderTime: new Date(2017, 9, 3, 10, 15), // время в которое был выполнен заказ
          deliveryTime: new Date(2017, 11, 3, 10, 15), // время в которое заказ будет доставлен
          payment: 'Наличными курьеру', // способ оплаты
          total: 8888 // Сумма заказа (с учетом скидок и акций)
        },
      cart: [],
      restaurantLogo: this.props.navigation.state.params ? this.props.navigation.state.params.restaurantLogo : '//dostavka1.com/img/app-icon.png'
    };
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps = async (newProps) => {
    const restId = newProps.navigation.state.params.order.restaurantId;
    let response, responseJson;
    try{
      response = await fetch(
        `${host}/restaurant?restaurantId=${restId}`
      );
    }
    catch(e) {
      Alert.alert('Ошибка', 'Сервер не отвечает');
      newProps.navigation.goBack(); return -1;
    }

    try{
      responseJson = await response.json();
    }
    catch(e) {
      Alert.alert('Ошибка', 'Сервер отвечает неправильно');
      newProps.navigation.goBack(); return -1;
    }

    if (responseJson.data && responseJson.data.result) {
      this.state.restaurantLogo = responseJson.data.result.logoImage;
    }
    else {
      Alert.alert('Ошибка', JSON.stringify(responseJson));
      newProps.navigation.goBack(); return -1;
    }
    const cartId = this.state.order.cartId;
    try{
      response = await fetch(
        `${host}/cart/get/?orderId=${cartId}`
      );
    }
    catch(e) {
      Alert.alert('Ошибка', 'Сервер не отвечает');
      newProps.navigation.goBack(); return -1;
    }
    try{
      responseJson = await response.json();
    }
    catch(e) {
      Alert.alert('Ошибка', 'Сервер отвечает неправильно');
      newProps.navigation.goBack(); return -1;
    }

    let plates = [];
    for (let i=0; i < responseJson["data"]["items"].length; i++) {
      try {
        response = await fetch(`${host}/plate?plate=${responseJson["data"]["items"][i].plateId}`);
      }
      catch(e) {
        Alert.alert('Ошибка', 'Сервер не отвечает');
        newProps.navigation.goBack(); return -1;
      }
      let responseJsonPlate;
      try{
        responseJsonPlate = await response.json();
      }
      catch(e) {
        Alert.alert('Ошибка', 'Сервер отвечает неправильно');
        newProps.navigation.goBack(); return -1;
      }

      plates.push(responseJsonPlate.data[0]);
    }
    
    this.state.cart = plates;

    this.setState({});
  };

  addAll = () => {
    this.state.cart.forEach(plate => this.props.onAddPlate(plate));
  };

  renderContent = section => {
    const imageHeight =
      viewportWidth >= 320 && viewportWidth < 375
        ? 100
        : viewportWidth >= 375 && viewportWidth < 414 ? 117 : 130;
    return (
      <View style={{ flexDirection: 'column', width: viewportWidth }}>
        {section.map((e, i) => (
          <Touchable
            key={i}
            onPress={() => {
              if (this.state.canNav) {
                this.props.navigation.navigate('Plate');
                this.state.canNav = false;
                setTimeout(() => {
                  this.state.canNav = true;
                }, 1500);
              }
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 10,
                width: viewportWidth - 10,
                marginTop: 10,
                justifyContent: 'flex-start'
              }}
            >
              <Image
                source={{
                  uri: 'http:'+e.image
                }}
                style={{
                  width: imageHeight,
                  height: imageHeight,
                  borderRadius: 10
                }}
              />
              <View
                style={{
                  flexDirection: 'column',
                  marginLeft: 10,
                  width: viewportWidth - 20 - 20 - imageHeight
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 15,
                    fontFamily: 'stem-medium',
                    top: 3,
                    lineHeight: 18,
                    letterSpacing: 1
                  }}
                >
                  {e.title}
                </Text>
                {/*<Text
                  style={{
                    color: 'rgb( 135, 136, 140)',
                    fontSize: 12,
                    lineHeight: 14,
                    marginBottom: 5
                  }}
                >
                  {e.description}
                </Text>*/}
                <View style={{
                    marginBottom: 5
                }}>
                  <HTMLView
                    value={`<p>${e.description}</p>`}
                    stylesheet={styles}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <PriceButton
                    value={e.price}
                    pressed={getCount(this.props.globalStore, e) !== 0}
                    count={getCount(this.props.globalStore, e)}
                    onPress={() => this.props.onAddPlate(e)}
                  />
                  <Text
                    style={{
                      color: 'rgb( 135, 136, 140)',
                      marginLeft: 10,
                      fontSize: 12,
                      lineHeight: 14,
                      maxWidth: 80,
                      letterSpacing: 0.4,
                      fontFamily: "OpenSans", fontWeight: "600",
                    }}
                  >
                    {e.weight}
                  </Text>
                </View>
              </View>
            </View>
          </Touchable>
        ))}
      </View>
    );
  };

  renderInfo = () => {
    if (
      this.state.order.status === 'Доставлен' ||
      this.state.order.status === 'Отменен'
    ) {
      return (
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            justifyContent: 'space-between'
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              maxWidth: screen === 0 ? 156 : screen === 1 ? 185 : 205
            }}
          >
            <Text
              style={{
                fontFamily: "OpenSans", fontWeight: "600",
                fontSize: 12,
                color: 'rgb(225, 199, 155)'
              }}
            >
              {this.state.order.status}
            </Text>
            <Text
              style={{
                fontFamily: "OpenSans", fontWeight: "600",
                fontSize: 14,
                color: '#fff',
                marginTop: screen === 0 ? 9 : screen === 1 ? 16 : 22
              }}
            >
              {`Оплаченная сумма заказа с учетом акций и скидок ${this.state.order.total} ₽`}
            </Text>
          </View>
          <View>
            <Image
              style={{
                height: screen === 0 ? 85 : screen === 1 ? 100 : 117,
                width: screen === 0 ? 85 : screen === 1 ? 100 : 117
              }}
              resizeMode='contain'
              source={{ uri: 'http:' + this.state.restaurantLogo }}
            />
          </View>
        </View>
      );
    }
    return null;
  };

  render = () => {
    const cart = this.renderContent(this.state.cart);
    if (this.state.order.status === 'Активный' || this.state.order.status === 'Принят') {
      var re = new RegExp(/([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]/g);
      const orderTime = this.state.order.orderTime ? this.state.order.orderTime.match(re)[0] : '00:00';
      const deliveryTime = this.state.order.deliveryTime ? this.state.order.deliveryTime.match(re)[0] : addTimeToTimestring(orderTime);
      return (
        < ScrollView style={{ flex: 1, flexDirection: 'column' }}>
          <Image
            style={{
              height: screen === 0 ? 85 : screen === 1 ? 100 : 117,
              width: viewportWidth - 60,
              marginTop: screen === 0 ? 47 : screen === 1 ? 64 : 79,
              marginBottom: 30,
              alignSelf: 'center'
            }}
            resizeMode="contain"
            source={{ uri: "http:"+this.state.restaurantLogo }}
          />
          <View
            style={{
              height: 1,
              marginHorizontal: 15,
              alignSelf: 'stretch',
              backgroundColor: 'rgb(54, 55, 58)'
            }}
          />
          <Text
            style={{
              marginTop: screen === 0 ? 25 : screen === 1 ? 30 : 35,
              marginBottom: screen === 0 ? 28 : screen === 1 ? 38 : 44,
              fontFamily: 'stem-medium',
              fontSize: 17,
              letterSpacing: 0.9,
              textAlign: 'center',
              alignSelf: 'stretch',
              color: 'rgb(225, 199, 155)'
            }}
          >
            {'Спасибо за заказ!'}
          </Text>

          <View
            style={{
              alignSelf: 'stretch',
              paddingHorizontal: screen === 0 ? 29 : screen === 1 ? 51 : 68
            }}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text
                style={{
                  fontFamily: "OpenSans",
                  fontSize: 12,
                  color: '#fff'
                }}
              >
                {'Время начала \nвыполнения заказа'}
              </Text>
              <Text
                style={{
                  fontFamily: "OpenSans",
                  fontSize: 12,
                  color: '#fff'
                }}
              >
                {'Примерное время \nприбытия курьера'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingRight: 15,
                marginTop: 8
              }}
            >
              <Text
                style={{
                  fontFamily: 'stem-medium',
                  fontSize: 30,
                  letterSpacing: 1.5,
                  color: 'rgb(225, 199, 155)'
                }}
              >
                {orderTime}
              </Text>
              <Text
                style={{
                  fontFamily: 'stem-medium',
                  fontSize: 30,
                  letterSpacing: 1.5,
                  color: 'rgb(225, 199, 155)'
                }}
              >
                {'>'}
              </Text>
              <Text
                style={{
                  fontFamily: 'stem-medium',
                  fontSize: 30,
                  letterSpacing: 1.5,
                  color: 'rgb(225, 199, 155)'
                }}
              >
                {`${deliveryTime}`}
              </Text>
            </View>
          </View>

          <View
            style={{
              alignSelf: 'center',
              marginTop: screen === 0 ? 25 : screen === 1 ? 35 : 41,
              marginBottom: 35,
              marginHorizontal: 15
            }}
          >
            <ButtonD
              onPress={() => this.props.navigation.navigate('Feed')}
              title={["Вернуться в приложение"]}
              width={screen === 0 ? 260 : screen === 1 ? 315 : 354}
            />
          </View>

          <View
            style={{
              height: 1,
              marginHorizontal: 15,
              alignSelf: 'stretch',
              backgroundColor: 'rgb(87, 88, 98)'
            }}
          />
          <Text
            style={{
              marginLeft: 23,
              marginVertical: screen === 0 ? 15 : screen === 1 ? 17 : 21,
              fontFamily: "OpenSans",
              fontSize: 12,
              color: '#fff'
            }}
          >
            {'Служба поддержки 495-995-1-995 '}
          </Text>
          <View
            style={{
              height: 1,
              marginHorizontal: 15,
              alignSelf: 'stretch',
              backgroundColor: 'rgb(87, 88, 98)'
            }}
          />
          <View
            style={{
              marginHorizontal: 23,
              marginVertical: screen === 0 ? 15 : screen === 1 ? 17 : 21,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: '#fff'
              }}
            >
              {`Стоимость заказа ${this.state.order.total}`}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: 'rgb(225, 199, 155)'
              }}
            >
              {'Заказ оплачен'}
            </Text>
          </View>
        </ ScrollView>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          paddingTop: screen === 0 ? 12 : screen === 1 ? 25 : 32
        }}
      >
        {this.renderInfo()}
        <View style={{ height: 14 }} />
        <View
          style={{
            marginHorizontal: 15,
            alignSelf: 'stretch',
            height: 1,
            backgroundColor: 'rgb(87, 88, 98)'
          }}
        />
        {this.renderContent(this.state.cart)}
        <View
          style={{
            alignSelf: 'center',
            marginVertical: 20
          }}
        >
          <ButtonD
            onPress={this.addAll}
            title={[`Добавить заказ в корзину за ${this.state.order.total} ₽`]}
            width={screen === 0 ? 260 : screen === 1 ? 315 : 354}
          />
        </View>
      </View>
    );
  };
}


const styles = StyleSheet.create({
  p: {
    color: 'rgb( 135, 136, 140)',
    fontSize: 12,
    lineHeight: 14,
  },
});
export default connect(
  state => ({
    globalStore: state.cart
  }),
  dispatch => ({
    onAddPlate: (plate) => {
      dispatch({ type: 'ADD_PLATE', payload: plate });
    }
  })
)(MyOrderDetail);
