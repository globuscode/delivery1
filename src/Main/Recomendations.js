import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  PixelRatio,
  WebView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { LinearGradient } from 'expo';
import SvgUri from 'react-native-svg-uri';

import Cart from '../Cart';

import PriceButton from '../PriceButton';
import IconD from '../IconD';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class Recomendations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      entries: [
        {
          id: 1,
          image: 'https://img02.rl0.ru/afisha/o/s1.afisha.net/MediaStorage/d5/12/535a1080132c4530a7a4446612d5.jpg',
          title: 'Дабл роял бургер',
          restourant: 'Джон Джоли',
          weight: '400 гр',
          price: '8888',
          restourantLogo: 'https://image.ibb.co/fPo4vm/meatless_logo.png',
          favourite: false,
        },
        {
          id: 2,
          image: 'http://shop.web01.widgets.vigbo.com/storage/shops/7776/products/313707/images/2-8606f84da77c5a05532ee2d3f1d9e351.jpg',
          title: 'Стейк',
          restourant: 'Стейк Хаус',
          weight: '200 гр',
          price: '30',
          restourantLogo: 'https://image.ibb.co/fPo4vm/meatless_logo.png',
          favourite: false,
        },
        {
          id: 3,
          image: 'http://img.povar.ru/uploads/a0/99/e9/31/molochnii_kokteil_s_shokoladom-318319.jpg',
          title: 'Шоколадный милкшейк',
          restourant: 'Джон Джоли',
          weight: '150 гр',
          price: '1000',
          restourantLogo: 'https://image.ibb.co/fPo4vm/meatless_logo.png',
          favourite: false,
        },
        {
          id: 4,
          image: 'https://img02.rl0.ru/afisha/o/s1.afisha.net/MediaStorage/d5/12/535a1080132c4530a7a4446612d5.jpg',
          title: 'Бургер',
          restourant: 'КБ',
          weight: '200 гр',
          price: '30',
          restourantLogo: 'https://image.ibb.co/fPo4vm/meatless_logo.png',
          favourite: false,
        },
      ]
    };
    if (this.props.data)
      this.state.entries = this.props.data;
    this.fav = this.fav.bind(this);

  };

  fav(index) {
    this.state.entries[index].favourite = !this.state.entries[index].favourite;
    this.setState({});
  };



  addPlateToCart = async (plate) => {
    //await AsyncStorage.removeItem('cart');
    let cart = await AsyncStorage.getItem('cart');
    cart = JSON.parse(cart);
    if (cart) {
      cart.push(plate);

      await AsyncStorage.setItem('cart', JSON.stringify(cart));
    } else {
      cart = [];
      cart.push(plate);

      await AsyncStorage.setItem('cart', JSON.stringify(cart));
    }

  }

  _renderItem = ({ item, index }) => {

    const screen = (viewportWidth >= 320 && viewportWidth < 375) ? 0 : (viewportWidth >= 375 && viewportWidth < 414) ? 1 : 2;
    const WIDTH = screen == 0 ? 280 : screen == 1 ? 328.1 : 362.3;
    f = this.fav;
    return (
      <View style={{
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
      }}>
      <Image style={{
          width: WIDTH,
          height: (WIDTH)*1.32,
        borderRadius: 10,
        position: 'absolute',
        backgroundColor: 'transparent'
      }}
        source={{ uri: item.image }}
      />

        <LinearGradient colors={['rgba(0,0,0, 0.8)', 'transparent', 'rgba(0,0,0, 0.8)']} style={{
          height: (WIDTH) *1.32+1,
          top: -0.5,
          position: 'absolute',
          width: WIDTH - 1 + 1,
          left: -0.5,
          borderRadius: 10,
        }} />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>

            <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('Plate')}>
            <Text style={{
              flexDirection: 'row',
              backgroundColor: 'transparent',
              fontSize: 20,
              color: '#ffffff',
              fontFamily: 'stem-medium',
              maxWidth: viewportWidth - 100
            }}>{ item.title }</Text>
            <Text style={{
              flexDirection: 'row',
              backgroundColor: 'transparent',
              fontSize: 12,
              color: '#dcc49c',
              letterSpacing: 0.5,
              fontFamily: 'stem-medium',
            }}>{item.restourant}</Text>
            <Text style={{
              flexDirection: 'row',
              backgroundColor: 'transparent',
              fontSize: 12,
              color: 'rgb(119, 122, 136)',
              letterSpacing: 0.5,
              fontFamily: 'stem-medium',
            }}>{item.weight}</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity onPress={() => f(index)}>
              <View style={{ backgroundColor: 'transparent' }}>
                <IconD
                  name={item.favourite ? 'heart_full' : 'heart_empty'}
                  size={18}
                  color='#dcc49c'
                /></View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          height: 100,
        }}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('Plate')}>
          <WebView
            bounces={false}
            scrollEnabled={false}
            source={{
              html: '<div style="width:100%; height: 100%; background: url(' + item.restourantLogo + ') left bottom no-repeat; background-size: contain" />'
              }}
            style={{
              width: (WIDTH)/2,
              height: (WIDTH) / 2,
              backgroundColor: 'transparent',
            }} /></TouchableOpacity>
            <PriceButton value={item.price} onPress={() => {
                this.addPlateToCart(item);
              }}/>
        </View>

        
      </View>
    );
  };

  _renderNewItem = ({ item, index }) => {

    /* Разметка */
    const screen = (viewportWidth >= 320 && viewportWidth < 375) ? 0 : (viewportWidth >= 375 && viewportWidth < 414) ? 1 : 2;
    const SLIDER_WIDTH  = screen == 0 ? 280 : screen == 1 ? 328.1 : 362.3;
    const SLIDER_MARGIN = screen == 0 ? 10/2 : screen == 1 ? 11.7/2 : 13.2/2;
    const SLIDER_HEIGHT = SLIDER_WIDTH * 1.32;


    /* Стили карточки */
    const itemStyles = StyleSheet.create({
      containerSlider : {
        margin: SLIDER_MARGIN,
        height: SLIDER_HEIGHT,
        width: SLIDER_WIDTH,

        
      }, 
      viewSlider : {
        flex: 1,
        padding: 20,

        width: SLIDER_WIDTH,
        height: SLIDER_HEIGHT,
        justifyContent: 'space-between',
        backgroundColor: '#000',
        borderRadius: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      BG_IMAGE : {
        width: SLIDER_WIDTH,
        height: SLIDER_HEIGHT,
        borderRadius: 10,
        position: 'absolute',
        backgroundColor: 'transparent'
      },
      GRADIENT_STYLE: {
        height: SLIDER_HEIGHT + 0.5,
        top: -0.5,
        position: 'absolute',
        width: SLIDER_WIDTH + 0.5,
        left: -0.5,
        borderRadius: 10,
      },
      titleTextStyle: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        fontSize: 20,
        color: '#ffffff',
        fontFamily: 'stem-medium',
        maxWidth: viewportWidth - 100
      },
      restourantTextStyle: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        fontSize: 12,
        color: '#dcc49c',
        letterSpacing: 0.5,
        fontFamily: 'stem-medium',
      },
      weightTextStyle: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        fontSize: 12,
        color: 'rgb(119, 122, 136)',
        letterSpacing: 0.5,
        fontFamily: 'stem-medium',
      },
      topViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      }
    });


    const GRADIENT_COLORS = [
      'rgba(0,0,0, 0.8)',
      'transparent',
      'rgba(0,0,0, 0.8)'
    ];

    // Компонент с названием блюда
    var titleText = <Text style={itemStyles.titleTextStyle}>{item.title}</Text>;

    // Компонент с названием ресторана
    var restourantText = <Text style={itemStyles.restourantTextStyle}>{item.restourant}</Text>;

    // Компонент с весом блюда
    var weightText = <Text style={itemStyles.weightTextStyle}>{item.weight}</Text>

    // Компонент с кнопкой добавить в избранное
    var heartButton = <View>
      <TouchableOpacity onPress={() => this.fav(index)}>
        <View style={{ backgroundColor: 'transparent' }}>
          <IconD
            name={item.favourite ? 'heart_full' : 'heart_empty'}
            size={18}
            color='#dcc49c'
          /></View>
      </TouchableOpacity>
    </View>;

    // Верхняя половина карточки
    var topView = <View style={itemStyles.topViewStyle}>
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.props.navigation.navigate('Plate')}>
          {/* Название блюда */}
          {titleText}
          
          {/* Название ресторана */}
          {restourantText}

          {/* Вес блюда */}
          {weightText}
          
        </TouchableOpacity>
      </View>

      {heartButton}
    </View>;

    var logo = <WebView
      bounces={false}
      scrollEnabled={false}
      source={{
        html: `<div 
          style="width:100%;
          height: 100%;
          background: url('` + item.restourantLogo + `') left bottom no-repeat;
          background-size: contain" />`
      }}
      style={{
        width: (SLIDER_WIDTH) / 2,
        height: (SLIDER_WIDTH) / 2,
        backgroundColor: 'transparent',
      }} />;
    var bottomView = <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      height: 100,
    }}>
      <TouchableOpacity 
        activeOpacity={0.8} 
        onPress={() => this.props.navigation.navigate('Plate')}>
        {logo}</TouchableOpacity>
      <PriceButton
      value={item.price} onPress={() => {
        this.addPlateToCart(item);
      }} />
    </View>






    return <View style={itemStyles.containerSlider}>
        <View style={itemStyles.viewSlider}>
        {/* Задний фон карточки */}
        <TouchableOpacity activeOpacity={0.8} style={{ position: 'absolute' }} onPress={() => this.props.navigation.navigate('Plate')}>
          <Image style={itemStyles.BG_IMAGE} source={{ uri: item.image }} />

          {/* Градиент */}
          <LinearGradient colors={GRADIENT_COLORS} style={itemStyles.GRADIENT_STYLE} />
        </TouchableOpacity>

          {topView}

          {bottomView}

        </View>
      </View>;
  };

  render() {
    const screen = (viewportWidth >= 320 && viewportWidth < 375) ? 0 : (viewportWidth >= 375 && viewportWidth < 414) ? 1 : 2;
    let slideW = screen == 0 ? 280 : screen == 1 ? 328.1 : 362.3;
    const SLIDER_MARGIN = screen == 0 ? 10 / 2 : screen == 1 ? 11.7 / 2 : 13.2 / 2;
    return (
      <View>

        <Carousel
          ref={(c) => { this._carousel = c; }}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          data={this.state.entries}
          renderItem={this._renderNewItem}
          sliderWidth={viewportWidth}
          sliderHeight={(slideW) * 1.32}
          itemWidth={slideW + SLIDER_MARGIN*2}
          onSnapToItem={(index) => this.setState({ activeSlide: index })}

          contentContainerCustomStyle={{
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          slideStyle={{
            marginVertical: 10,

            backgroundColor: 'transparent',

            
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
            backgroundColor: '#ffffff',
          }}
          containerStyle={{
            paddingVertical: 5,
            paddingBottom: 10,
          }}
        />
        <TouchableOpacity onPress={this.props.onNextButtonPress}><Icon name="ios-arrow-down" size={30} style={{alignSelf: 'center', opacity: 0.4, marginBottom: 20}} color='white'/></TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 16,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#292b37',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});