import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  Dimensions,
  WebView,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { adaptWidth } from '../etc';
import { Constants } from 'expo';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Touchable from "react-native-platform-touchable";
import { LinearGradient } from "expo";
import PriceButton from "../PriceButton";
import IconD from "../IconD";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

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

class Favourite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedView: 0,
            restaurans: [],
            favourite: {
                plates: [],
                collections: [],
                restaurans: []
            },
            favouriteIds: {
                plates: [],
                collections: [],
                restaurants: []
            }
        };
    }

    _renderSinglePlate = ( item, index ) => {
        /* Разметка */
        const screen = adaptWidth(0, 1, 2);
        const SLIDER_WIDTH = screen == 0 ? 280 : screen == 1 ? 328.1 : 362.3;
        const SLIDER_MARGIN =
          screen == 0 ? 10 / 2 : screen == 1 ? 11.7 / 2 : 13.2 / 2;
        const SLIDER_HEIGHT = SLIDER_WIDTH * 1.32;
    
        /* Стили карточки */
        const itemStyles = StyleSheet.create({
          containerSlider: {
            margin: SLIDER_MARGIN,
            height: SLIDER_HEIGHT,
            width: SLIDER_WIDTH
          },
          viewSlider: {
            flex: 1,
            padding: 20,
    
            width: SLIDER_WIDTH,
            height: SLIDER_HEIGHT,
            justifyContent: "space-between",
            backgroundColor: "#272833",
            borderRadius: 10,
            elevation: 4,
            shadowColor: "#000",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 5
          },
          BG_IMAGE: {
            width: SLIDER_WIDTH,
            top: item.image.indexOf('.png') > 0 ? SLIDER_HEIGHT * 0.5 / 3 : 0,
            height: item.image.indexOf('.png') > 0 ? SLIDER_HEIGHT * 2 / 3 : SLIDER_HEIGHT,
            borderRadius: 10,
            position: "absolute",
            backgroundColor: "transparent"
          },
          GRADIENT_STYLE: {
            height: SLIDER_HEIGHT + 0.5,
            top: -0.5,
            position: "absolute",
            width: SLIDER_WIDTH + 0.5,
            left: -0.5,
            borderRadius: 10
          },
          titleTextStyle: {
            flexDirection: "row",
            backgroundColor: "transparent",
            fontSize: 20,
            color: "#ffffff",
            fontFamily: "stem-medium",
            maxWidth: viewportWidth - 100
          },
          restourantTextStyle: {
            flexDirection: "row",
            backgroundColor: "transparent",
            fontSize: 12,
            color: "#dcc49c",
            letterSpacing: 0.5,
            fontFamily: "stem-medium"
          },
          weightTextStyle: {
            flexDirection: "row",
            backgroundColor: "transparent",
            fontSize: 12,
            color: "rgb(119, 122, 136)",
            letterSpacing: 0.5,
            fontFamily: "stem-medium"
          },
          topViewStyle: {
            flexDirection: "row",
            justifyContent: "space-between"
          }
        });
    
        const GRADIENT_COLORS = [
          "rgba(0,0,0, 0.8)",
          "transparent",
          "rgba(0,0,0, 0.8)"
        ];
    
        // Компонент с названием блюда
        var titleText = <Text style={itemStyles.titleTextStyle}>{item.title}</Text>;
    
        // Компонент с названием ресторана
        var restourantText = (
          <Text style={itemStyles.restourantTextStyle}>{item.restourant}</Text>
        );
    
        // Компонент с весом блюда
        var weightText = (
          <Text style={itemStyles.weightTextStyle}>{item.weight}</Text>
        );
    
        // Компонент с кнопкой добавить в избранное
        var heartButton = (
          <View>
            <Touchable
              hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
              background={Touchable.SelectableBackgroundBorderless()}
              onPress={() => {
                this.props.onDeletePlate(item);
              }}>
              <View style={{ backgroundColor: "transparent" }}>
                <IconD
                  name={'trash'}
                  size={18}
                  color="#dcc49c"
                />
              </View>
            </Touchable>
          </View>
        );
        // Верхняя половина карточки
        var topView = (
          <View style={itemStyles.topViewStyle}>
            <View>
              <Touchable activeOpacity={0.8} onPress={() => { this.nav(index); }}>
                <View>
                  {/* Название блюда */}
                  {titleText}
    
                  {/* Название ресторана */}
                  {restourantText}
    
                  {/* Вес блюда */}
                  {weightText}
                </View>
              </Touchable>
            </View>
    
            {heartButton}
          </View>
        );
    
        var logo1 = (
          <WebView
            bounces={false}
            scrollEnabled={false}
            source={{
              html:
                `<img 
            src="` +
                item.restourantLogo +
                `"
              style="
              width:100%;">`
            }}
            style={{
              width: SLIDER_WIDTH / 3,
              height: SLIDER_WIDTH / 3,
              backgroundColor: "transparent"
            }}
          />
        );
        var logo = (
          <Image
            onLoadEnd={() => {
              this.setState({});
            }}
            style={{
              width: SLIDER_WIDTH / 3,
              height: SLIDER_WIDTH / 3
            }}
            source={{ uri: this.state.restaurans[index] ? ('http:'+this.state.restaurans[index].logoImage) : "http://dostavka1.com/img/app-icon.png" }}
          />
        );
        var itemCount = getCount(this.props.cart, item);
        var bottomView = (
          <View
            pointerEvents="box-none"
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
              height: SLIDER_WIDTH / 3
            }}
          >
            <Touchable activeOpacity={0.8} onPress={() => { this.nav(index); }}>
              {logo}
            </Touchable>
            <PriceButton
              count={itemCount}
              pressed={itemCount != 0}
              value={item.price}
              onPress={() => {
                this.props.onAddPlate(item);
                //this.props.changeModal(item);
                this.props.open(item);
                
              }}
            />
          </View>
        );
    
        return (
          <View key={index} style={itemStyles.containerSlider}>
            <View style={itemStyles.viewSlider}>
              {/* Задний фон карточки */}
              <Touchable
                activeOpacity={0.8}
                foreground={Touchable.SelectableBackgroundBorderless()}
                style={{
                  position: "absolute",
                  height: SLIDER_HEIGHT,
                  width: SLIDER_WIDTH,
                  borderRadius: 10,
                }}
                onPress={() => { this.nav(index); }}
              >
                <View>
                  <Image resizeMode={item.image.indexOf('.png') < 0 ? 'cover' : 'contain'} style={itemStyles.BG_IMAGE} source={{ uri: 'http:'+item.image }} />
    
                  {/* Градиент */}
                  <LinearGradient
                    colors={GRADIENT_COLORS}
                    style={itemStyles.GRADIENT_STYLE}
                  />
                </View>
              </Touchable>
    
              {topView}
    
              {bottomView}
            </View>
          </View>
        );
      };

    renderPlates = () => {
        return this.state.favourite.plates.map(this._renderSinglePlate);
    }

    renderRestaurants = () => {
        return null;
    }

    renderCollections = () => {
        return null;
    }

    componentWillReceiveProps = (newProps) => {
      let needToUpdate = false;
      if (this.state.favouriteIds.plates.length != newProps.favourite.plates.length) {
        needToUpdate = true;
        this.state.favouriteIds.plates = newProps.favourite.plates;
      }

      if (needToUpdate || newProps.favourite.plates.length == 0) {
        this.state.favouriteIds.plates = [];
        this.state.favourite.plates = [];
        this.state.restaurans = [];
        newProps.favourite.plates.forEach(async (plate, i) => {
          const response = await fetch(`http://dostavka1.com/v1/plate?plate=${plate}`);
          const responseJson = await response.json();

          this.state.favourite.plates.push(responseJson.data[0]);

          const responseRest = await fetch(`http://dostavka1.com/v1/restaurant?restaurantId=${responseJson.data[0].restaurant}`);
          const responseRestJson = await responseRest.json();
          this.state.restaurans.push(responseRestJson.data.result);

          if (i === newProps.favourite.plates.length - 1)
            this.setState({});
        }); 
      }
            
    }


    render = () => {
        return <View style={{flex: 1}}><ScrollView  style={{paddingTop: Constants.statusBarHeight}}>
            <Text style={{
                fontFamily: 'stem-medium',
                fontSize: 15,
                marginTop: adaptWidth(16, 12, 14),
                marginBottom: 8,
                color: '#fff',
                alignSelf: 'stretch',
                textAlign: 'center'
            }}>
                {'Избранное'}
            </Text>
            <View style={{
                alignSelf: 'stretch',
                marginHorizontal: 15
            }}>
                <SegmentedControlTab
                    tabStyle={styles.tabStyle}
                    tabTextStyle={styles.tabTextStyle}
                    activeTabStyle={styles.activeTabStyle}
                    activeTabTextStyle={styles.activeTabTextStyle}
                    values={['Блюда', 'Рестораны', /*'Подборки'*/]}
                    selectedIndex={this.state.selectedView}
                    onTabPress= {index => this.setState({selectedView:index})}
                />
            </View>

            <View style={{flexDirection: 'column', alignSelf: 'stretch', alignItems: 'center'}}>
                {this.state.selectedView != 0 ? null : this.renderPlates() }
                {this.state.selectedView != 1 ? null : this.renderRestaurants() }
                {this.state.selectedView != 3 ? null : this.renderCollections() }
            </View>
            
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
    }
}
export default connect(
    state => ({
        favourite: state.favourite,
        cart: state.cart,
        modal: state.modalController
    }),
    dispatch => ({
        onDeletePlate: fav => dispatch({
            type: 'DELETE_PLATE',
            payload: fav
        }),
        onDeleteRestaurant: fav => dispatch({
            type: 'DELETE_RESTAURANT',
            payload: fav
        }),
        onAddPlate: plate => {
          dispatch({ type: "ADD_PLATE", payload: plate });
        },
        open: (data) => dispatch({ type: "OPEN_MODAL", payload: data}),
        changeModal: (data) => {
          dispatch({ type: "CHANGE_CONTENT", payload: data })
        },
    })
)(Favourite)

const styles = StyleSheet.create({
    tabStyle: {
      //custom styles 
      backgroundColor: 'transparent',
      borderColor: 'rgb(225, 199, 155)'
    },
    tabTextStyle: {
      fontFamily: 'open-sans',
      fontSize: 13,
      color: 'rgb(225, 199, 155)',
    },
    activeTabStyle: {
        backgroundColor: 'rgb(225, 199, 155)'
      
    },
    activeTabTextStyle: {
        color: 'rgb(39, 40, 51)',
        backgroundColor: 'rgb(225, 199, 155)',
    },
});