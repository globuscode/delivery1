import React from "react";
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
} from "react-native";
import { Font, LinearGradient } from "expo";
import Icon from "react-native-vector-icons/Ionicons";
import Recomendations from "./Recomendations";
import RestouransOfTheWeek from "./RestouransOfTheWeek";
import Collections from "./Collections";
import AllRestourans from "../AllRestourans";
import SetAddress from "../SetAddress";
import {
  StackNavigator,
  NavigationActions,
  TabNavigator,
  TabBarBottom
} from "react-navigation";
import Drawer from "react-native-drawer";
import Touchable from 'react-native-platform-touchable';

import Feed from "./Feed";

import SelectCity from "../SelectCity";
import Plate from "../Plate";
import SelectTags from "../SelectTags";
import SelectTastes from "../SelectTastes";

import Profile from "../Profile";

import SpecialScreen from "../SpecialScreen";
import LoadingScreen from "../LoadingScreen";

import Restaurant from "../Restaurant";
import RestaurantMenu from "../RestaurantMenu";
import Favoutite from "../Favourite";
import Cart from "../Cart";

import CartTabIcon from './CartTabIcon';
import IconD from "../IconD";

import { adaptWidth } from '../etc';
var kitchenPhoto = require("../../assets/img/kitchen.jpeg");

var err404 = require("../../assets/img/404.jpg");

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

const headerStyleIOS = () => ({
  headerTruncatedBackTitle: 'Назад',
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontFamily: "stem-medium",
    fontSize: 14,
    letterSpacing: 0.8,
    color: '#fff'
  },
  headerTintColor: "#dcc49c",
  headerBackTitleStyle: {
    color: "#dcc49c"
  },
  headerStyle: {
    marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
    backgroundColor: "#292b37",
    paddingHorizontal: Platform.OS === "ios" ? adaptWidth(16, 18, 24) : -3,
  }
});

const FirstScreen = StackNavigator(
  {
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
      navigationOptions: headerStyleIOS()
    },
    Plate: {
      screen: Plate,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    RestaurantMenu: {
      screen: RestaurantMenu,
      navigationOptions: {
        headerTintColor: "#fff",
        gesturesEnabled: false,
        headerTitleStyle: {
          fontFamily: "stem-medium",
          fontSize: 14,
          letterSpacing: 0.8
        },
        headerBackTitleStyle: {
          color: "#dcc49c"
        },
        headerStyle: {
          marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
          backgroundColor: "#292b37"
        }
      }
    }
  },
  {
    navigationOptions: {
      headerBackTitle: 'Назад',
      headerTruncatedBackTitle: 'Назад',
    },
    cardStyle: {
      backgroundColor: "#292b37"
    }
  }
);

const SecondScreen = StackNavigator(
  {
    AllRestourans: {
      screen: AllRestourans,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      }
    },
    Restaurant: {
      screen: Restaurant,
      navigationOptions: headerStyleIOS()
    },
    Plate: {
      screen: Plate,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    RestaurantMenu: {
      screen: RestaurantMenu,
      navigationOptions: {
        headerTintColor: "#fff",
        gesturesEnabled: false,
        headerTitleStyle: {
          fontFamily: "stem-medium",
          fontSize: 14,
          letterSpacing: 0.8
        },
        headerBackTitleStyle: {
          color: "#dcc49c"
        },
        headerStyle: {
          marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
          backgroundColor: "#292b37"
        }
      }
    }
  },
  {
    navigationOptions: {
      headerTruncatedBackTitle: 'Назад',
    },
    cardStyle: {
      backgroundColor: "#292b37"
    }
  }
);

const FourthScreen = StackNavigator(
  {
    Cart: {
      screen: Cart,
      navigationOptions: ({ navigation }) => ({
        title: "Корзина",
        headerLeft: (
          <Touchable
            background={Touchable.SelectableBackgroundBorderless()} 
            style={{
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center"
            }}
            onPress={() => {
              navigation.navigate("Main");
            }}
          >
            <Icon name={Platform.OS === "ios" ? "ios-close-outline" : 'md-close'} size={30} color="#dcc49c" />
          </Touchable>
        ),
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "stem-medium",
          fontSize: 14,
          letterSpacing: 0.8
        },
        headerBackTitleStyle: {
          color: "#dcc49c"
        },
        headerStyle: {
          marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
          backgroundColor: "transparent",
          borderBottomWidth: Platform.OS === "ios" ? 1 : 0,
          marginHorizontal: Platform.OS === "ios" ? 20 : -3,
          borderBottomColor: 'rgb(87, 88, 98)'
        },
        gesturesEnabled: false
      })
    },
    Plate: {
      screen: Plate,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    RestaurantMenu: {
      screen: RestaurantMenu,
      navigationOptions: {
        headerTintColor: "#fff",
        gesturesEnabled: false,
        headerTitleStyle: {
          fontFamily: "stem-medium",
          fontSize: 14,
          letterSpacing: 0.8
        },
        headerBackTitleStyle: {
          color: "#dcc49c"
        },
        headerStyle: {
          marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
          backgroundColor: "#292b37"
        }
      }
    }
  },
  {
    navigationOptions: {
      headerTruncatedBackTitle: 'Назад',
    },
    headerMode: 'screen',
    cardStyle: {
      backgroundColor: "#292b37"
    }
  }
);

const ThirdScreen = StackNavigator(
  {
    Favoutite: {
      screen: Favoutite,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },

    Restaurant: {
      screen: Restaurant,
      navigationOptions: headerStyleIOS()
    },
    Plate: {
      screen: Plate,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    RestaurantMenu: {
      screen: RestaurantMenu,
      navigationOptions: {
        headerTintColor: "#fff",
        gesturesEnabled: false,
        headerTitleStyle: {
          fontFamily: "stem-medium",
          fontSize: 14,
          letterSpacing: 0.8
        },
        headerBackTitleStyle: {
          color: "#dcc49c"
        },
        headerStyle: {
          marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
          backgroundColor: "#292b37"
        }
      }
    }
  },
  {
    navigationOptions: {
      headerTruncatedBackTitle: 'Назад',
    },
    cardStyle: {
      backgroundColor: "#292b37"
    }
  }
);

export default TabNavigator(
  {
    First: {
      screen: FirstScreen,
      navigationOptions: {
        tabBarLabel: "Домой",
        tabBarIcon: ({ tintColor, focused }) => {
          if (!IconD) return <View />;
          return (
            <View style={{ }}>
              <IconD
                size={24}
                name={focused ? "homeFill" : "home"}
                color={"rgb( 225, 199, 155)"}
              />
            </View>
          );
        }
      }
    },
    Second: {
      screen: SecondScreen,
      navigationOptions: {
        tabBarLabel:
          viewportWidth >= 320 && viewportWidth < 375
            ? "Рестораны"
            : "Все рестораны",
        tabBarIcon: ({ tintColor, focused }) => {
          if (!IconD) return <View />;
          return (
            <View style={{ }}>
              <IconD
                size={24}
                name={focused ? "book-fill" : "book"}
                color={"rgb( 225, 199, 155)"}
              />
            </View>
          );
        }
      }
    },
    Third: {
      screen: ThirdScreen,
      navigationOptions: {
        tabBarLabel: "Избранное",
        tabBarIcon: ({ tintColor, focused }) => {
          if (!IconD) return <View />;
          return (
            <View style={{ }}>
              <IconD
                size={24}
                name={focused ? "heart-fill" : "heart"}
                color={"rgb( 225, 199, 155)"}
              />
            </View>
          );
        }
      }
    },
    Fourth: {
      screen: FourthScreen,
      navigationOptions: {
        tabBarLabel: "Корзина",
        tabBarVisible: false,
        tabBarIcon: ({ tintColor, focused }) => {
          if (!IconD) return <View />;
          return (
            <View style={{ }}>
              <CartTabIcon focused={focused}/>
            </View>
          );
        }
      }
    }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    animationEnabled: false,

    tabBarOptions: {
      style: {
        alignSelf: 'stretch',
        padding: 0,
        paddingTop: 1,
        backgroundColor: "rgb(87, 88, 98)",
        marginHorizontal: 20
      },
      tabStyle: {
        flex: 1,
        paddingTop: 3,
        justifyContent: 'space-around', 
      },
      pressColor: "red",
      inactiveBackgroundColor: "rgba(39, 40, 48, 1)",
      activeBackgroundColor: "rgba(39, 40, 48, 1)",
      activeTintColor: "rgb( 225, 199, 155)",
      inactiveTintColor: "rgb( 225, 199, 155)"
    }
  }
);

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover"
  },
  text: {
    color: "white",
    fontSize: 20
  },
  container: {
    flex: 1,
    elevation: -10,
    paddingTop: 0,
    backgroundColor: "#292b37",
    paddingBottom: 0,
    justifyContent: "space-between",
    alignItems: "center"
  }
});
