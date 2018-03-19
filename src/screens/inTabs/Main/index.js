import React from "react";
import { View, Dimensions, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AllRestourans from "../AllRestourans";
import { StackNavigator, TabNavigator, TabBarBottom } from "react-navigation";
import Touchable from "react-native-platform-touchable";

import Feed from "./Feed";
import Plate from "../Plate";
import Restaurant from "../Restaurant";
import RestaurantMenu from "../RestaurantMenu";
import Favoutite from "../Favourite";
import Collection from "../Collection";
import Guide from "../Guide";
import Cart from "../../fullScreen/Cart";

import CartTabIcon from "./CartTabIcon";
import IconD from "../../../components/ui/IconD";
import { adaptWidth } from "../../../etc";
import { getStatusBarHeight } from "react-native-status-bar-height";

const { width: viewportWidth } = Dimensions.get("window");

const headerStyleIOS = (design = false) => ({
  headerTruncatedBackTitle: "Назад",
  headerTitleStyle: {
    fontFamily: "Stem-Medium",
    fontSize: 14,
    letterSpacing: 0.8,
    color: "#fff"
  },
  headerTintColor: "#dcc49c",
  headerBackTitleStyle: {
    color: "#dcc49c"
  },
  headerStyle: {
    marginTop: Platform.OS === "ios" ? 0 : getStatusBarHeight(),
    backgroundColor: "#292b37",
    paddingHorizontal: Platform.OS === "ios" ? adaptWidth(16, 18, 24) : -3,
    marginHorizontal: design ? (Platform.OS === "ios" ? 20 : -3) : undefined,
    borderBottomColor: design ? "rgb(87, 88, 98)" : undefined
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
    Collection: {
      screen: Collection,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    Restaurant: {
      screen: Restaurant,
      navigationOptions: headerStyleIOS()
    },
    Guide: {
      screen: Guide,
      navigationOptions: headerStyleIOS(true)
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
          fontFamily: "Stem-Medium",
          fontSize: 14,
          letterSpacing: 0.8
        },
        headerBackTitleStyle: {
          color: "#dcc49c"
        },
        headerStyle: {
          marginTop: Platform.OS === "ios" ? 0 : getStatusBarHeight(),
          backgroundColor: "#292b37"
        }
      }
    }
  },
  {
    headerMode: "screen",
    headerStyle: {
      backcroundColor: "#292b37"
    },
    navigationOptions: {
      headerBackTitle: "Назад",
      headerTruncatedBackTitle: "Назад"
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
          fontFamily: "Stem-Medium",
          fontSize: 14,
          letterSpacing: 0.8
        },
        headerBackTitleStyle: {
          color: "#dcc49c"
        },
        headerStyle: {
          marginTop: Platform.OS === "ios" ? 0 : getStatusBarHeight(),
          backgroundColor: "#292b37"
        }
      }
    }
  },
  {
    navigationOptions: {
      headerTruncatedBackTitle: "Назад"
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
            <Icon
              name={Platform.OS === "ios" ? "ios-close-outline" : "md-close"}
              size={30}
              color="#dcc49c"
            />
          </Touchable>
        ),
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "Stem-Medium",
          fontSize: 14,
          letterSpacing: 0.8
        },
        headerBackTitleStyle: {
          color: "#dcc49c"
        },
        headerStyle: {
          marginTop: Platform.OS === "ios" ? 0 : getStatusBarHeight(),
          backgroundColor: "transparent",
          borderBottomWidth: Platform.OS === "ios" ? 1 : 0,
          marginHorizontal: Platform.OS === "ios" ? 20 : -3,
          borderBottomColor: "rgb(87, 88, 98)"
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
          fontFamily: "Stem-Medium",
          fontSize: 14,
          letterSpacing: 0.8
        },
        headerBackTitleStyle: {
          color: "#dcc49c"
        },
        headerStyle: {
          marginTop: Platform.OS === "ios" ? 0 : getStatusBarHeight(),
          backgroundColor: "#292b37"
        }
      }
    }
  },
  {
    navigationOptions: {
      headerTruncatedBackTitle: "Назад"
    },
    headerMode: "screen",
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
          fontFamily: "Stem-Medium",
          fontSize: 14,
          letterSpacing: 0.8
        },
        headerBackTitleStyle: {
          color: "#dcc49c"
        },
        headerStyle: {
          marginTop: Platform.OS === "ios" ? 0 : getStatusBarHeight(),
          backgroundColor: "#292b37"
        }
      }
    }
  },
  {
    navigationOptions: {
      headerTruncatedBackTitle: "Назад"
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
        tabBarIcon: ({ focused }) => {
          if (!IconD) return <View />;
          return (
            <View style={{}}>
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
        tabBarIcon: ({ focused }) => {
          if (!IconD) return <View />;
          return (
            <View style={{}}>
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
        tabBarIcon: ({ focused }) => {
          if (!IconD) return <View />;
          return (
            <View style={{}}>
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
        tabBarIcon: ({ focused }) => {
          if (!IconD) return <View />;
          return (
            <View style={{}}>
              <CartTabIcon focused={focused} />
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
        backgroundColor: "rgba(39, 40, 48, 1)",
        borderTopColor: "rgba(0, 0, 0, 0)",
        paddingTop: 8
      },
      tabStyle: {
        justifyContent: "space-around",
        borderColor: "rgb(87, 88, 98)",
        borderTopColor: "rgba(0, 0, 0, 0)"
      },
      pressColor: "red",
      inactiveBackgroundColor: "rgba(39, 40, 48, 1)",
      activeBackgroundColor: "rgba(39, 40, 48, 1)",
      activeTintColor: "rgb(225, 199, 155)",
      inactiveTintColor: "rgb(225, 199, 155)"
    }
  }
);
