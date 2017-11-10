import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  PlatformIOS,
  Platform,
  StatusBar,
  Image
} from 'react-native'; 
import { Font, LinearGradient } from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';
import Recomendations from './Recomendations';
import RestouransOfTheWeek from './RestouransOfTheWeek';
import Collections from './Collections';
import AllRestourans from '../AllRestourans';
import SetAddress from '../SetAddress';
import { StackNavigator, NavigationActions, TabNavigator, TabBarBottom } from 'react-navigation';
import Drawer from 'react-native-drawer';

import Feed from './Feed';

import SelectCity from '../SelectCity';
import Plate from '../Plate';
import SelectTags from '../SelectTags';
import SelectTastes from '../SelectTastes';

import Profile from '../Profile';

import SpecialScreen from '../SpecialScreen';
import LoadingScreen from '../LoadingScreen';

import Restaurant from '../Restaurant';
import RestaurantMenu from '../RestaurantMenu';
import Cart from '../Cart';

import IconD from '../IconD';

var kitchenPhoto = require('../../assets/img/kitchen.jpeg');

var err404 = require('../../assets/img/404.jpg');



const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const FirstScreen = StackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  },

  SpecialScreen: {
    screen: SpecialScreen,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  Restaurant: {
    screen: Restaurant,
    navigationOptions: {
      title: 'Джон Джоли',
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontFamily: 'stem-medium',
        fontSize: 14,
        letterSpacing: 0.8
      },
      headerBackTitleStyle: {
        color: '#dcc49c'
      },
      headerStyle: {
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        backgroundColor: '#292b37'
      }
    }
  },
  Plate: {
    screen: Plate,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  },
  RestaurantMenu: {
    screen: RestaurantMenu,
    navigationOptions: {
      title: 'Джон Джоли',
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontFamily: 'stem-medium',
        fontSize: 14,
        letterSpacing: 0.8
      },
      headerBackTitleStyle: {
        color: '#dcc49c'
      },
      headerStyle: {
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        backgroundColor: '#292b37'
      }
    }
  },
}, {
  cardStyle: {
    backgroundColor: '#292b37'
  }
});

const SecondScreen = StackNavigator({
  AllRestourans: {
    screen: AllRestourans,
    navigationOptions: {
      header: null,
    }
  },
  Restaurant: {
    screen: Restaurant,
    navigationOptions: {
      title: 'Джон Джоли',
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontFamily: 'stem-medium',
        fontSize: 14,
        letterSpacing: 0.8
      },
      headerBackTitleStyle: {
        color: '#dcc49c'
      },
      headerStyle: {
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        backgroundColor: '#292b37'
      }
    }
  },
  Plate: {
    screen: Plate,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  },
  RestaurantMenu: {
    screen: RestaurantMenu,
    navigationOptions: {
      title: 'Джон Джоли',
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontFamily: 'stem-medium',
        fontSize: 14,
        letterSpacing: 0.8
      },
      headerBackTitleStyle: {
        color: '#dcc49c'
      },
      headerStyle: {
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        backgroundColor: '#292b37'
      }
    }
  },
}, {
    cardStyle: {
      backgroundColor: '#292b37'
    }
  });

const FourthScreen = StackNavigator({
  Cart: {
    screen: Cart,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  },
}, {
    cardStyle: {
      backgroundColor: '#292b37'
    }
  });

const ThirdScreen = StackNavigator({
  Cart: {
    screen: Cart,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  },
}, {
    cardStyle: {
      backgroundColor: '#292b37'
    }
  });

export default TabNavigator({
  First: {
    screen: FirstScreen,
    navigationOptions : {
      tabBarLabel: 'Домой',
      tabBarIcon: ({ tintColor, focused }) => {
        if (!IconD)
          return <View />;
        return (
          <View style={{top: Platform.OS === 'ios' ? -15 : 0}}>
            <IconD
              size={25}
              name={focused ? 'homeFill' : 'home'}
              color={'rgb( 225, 199, 155)'}
            />
          </View>)
      },
    }
  },
  Second: {
    screen: SecondScreen,
    navigationOptions: {
      tabBarLabel: 'Все рестораны',
      tabBarIcon: ({ tintColor, focused }) => {
        if (!IconD)
          return <View />;
        return (
          <View style={{top: Platform.OS === 'ios' ? -15 : 0}}>
            <IconD
              size={25}
              name={focused ? 'book-fill' : 'book'}
              color={'rgb( 225, 199, 155)'}
            />
          </View>)
      },
    }
  },
  Third: {
    screen: ThirdScreen,
    navigationOptions: { 
      tabBarLabel: 'Избранное',
      tabBarIcon: ({ tintColor, focused }) => {
        if (!IconD)
          return <View />;
        return (
          <View style={{top: Platform.OS === 'ios' ? -15 : 0}}>
            <IconD
              size={25}
              name={focused ? 'heart-fill' : 'heart'}
              color={'rgb( 225, 199, 155)'}
            />
          </View>)
      },
    }
  },
  Fourth: {
    screen: FourthScreen,
    navigationOptions: {
      tabBarLabel: 'Корзина',
      tabBarIcon: ({ tintColor, focused }) => {
        if (!IconD)
          return <View />;
        return (
          <View style={{top: Platform.OS === 'ios' ? -15 : 0}}>
            <IconD
              size={25}
              name={focused ? 'cart-fill' : 'cart'}
              color={'rgb( 225, 199, 155)'}
            />
          </View>)
      },
    }
  },
}, {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    
    tabBarOptions: {
      style: {
        //paddingHorizontal: 20,
        padding: 0,
        paddingTop: 1,
        backgroundColor: 'rgb( 87, 88, 98)',
        marginHorizontal: 20,
      },
      pressColor: 'red',
      inactiveBackgroundColor: 'rgba(39, 40, 48, 1)',
      activeBackgroundColor: 'rgba(39, 40, 48, 1)',
      activeTintColor: 'rgb( 225, 199, 155)',
      inactiveTintColor: 'rgb( 225, 199, 155)',
    },
  });




const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  container: {
    flex: 1,
    elevation: -10,
    paddingTop: 0,
    backgroundColor: '#292b37',
    paddingBottom: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});