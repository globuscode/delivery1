import React from "react";
import Expo from "expo";
import { StatusBar, Platform } from "react-native";
import { StackNavigator } from "react-navigation";

import Login from "./src/Login";
import Registration from "./src/Registration";
import RegistratePhone from "./src/RegistatePhone";
import SelectCity from "./src/SelectCity";
import SelectTags from "./src/SelectTags";
import SetAddress from "./src/SetAddress";
import SelectTastes from "./src/SelectTastes";
import About from "./src/about";
import SpecialScreen from "./src/SpecialScreen";
import LoadingScreen from "./src/LoadingScreen";
import Main from "./src/Main";
import AllRestourans from "./src/AllRestourans";
import Restaurant from "./src/Restaurant";
import RestaurantMenu from "./src/RestaurantMenu";
import Plate from "./src/Plate";
import Profile from "./src/Profile";
import MakeOrder from "./src/MakeOrder";
import MyOrders from "./src/MyOrders";
import MyOrderDetail from "./src/MyOrderDetail";
import PersonalInformation from "./src/PersonalInformation";
import SetFullAddress from "./src/SetFullAddress";

const tabs = StackNavigator(
  {
    Main: {
      screen: Main,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
  },
  {
    cardStyle: {
      backgroundColor: "rgba(39, 40, 48, 1)"
    }
  }
);

export default StackNavigator(
  {
    SpecialScreen: {
      screen: SpecialScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    SetFullAddress: {
      screen: SetFullAddress,
      navigationOptions: {
        title: "Адрес доставки",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "stem-medium",
          fontSize: 14,
          letterSpacing: 0.8
        },
        headerTintColor: "#dcc49c",
        headerBackTitleStyle: {
          color: "#dcc49c"
        },
        headerStyle: {
          marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
          backgroundColor: "#292b37"
        }
      }
    },
    SelectCity: {
      screen: SelectCity,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    About: {
      screen: About,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    RegistratePhone: {
      screen: RegistratePhone,
      navigationOptions: {
        title: "Номер телефона",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "stem-medium",
          fontSize: 14,
          letterSpacing: 0.8
        },
        headerTintColor: "#dcc49c",
        headerBackTitleStyle: {
          color: "#dcc49c"
        },
        headerStyle: {
          marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
          backgroundColor: "#292b37"
        }
      }
    },
    SetAddress: {
      screen: SetAddress,
      navigationOptions: {
        title: "Адрес доставки",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "stem-medium",
          fontSize: 14,
          letterSpacing: 0.8
        },
        headerTintColor: "#dcc49c",
        headerBackTitleStyle: {
          color: "#dcc49c"
        },
        headerStyle: {
          marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
          backgroundColor: "#292b37"
        }
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: "Личный кабинет",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "stem-medium",
          fontSize: 14,
          letterSpacing: 0.8
        },
        headerTintColor: "#dcc49c",
        headerBackTitleStyle: {
          color: "#dcc49c"
        },
        headerStyle: {
          marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
          backgroundColor: "#292b37"
        }
      }
    },
    MakeOrder: {
      screen: MakeOrder,
      navigationOptions: {
        title: "Оплатить заказ",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "stem-medium",
          fontSize: 14,
          letterSpacing: 0.8
        },
        headerTintColor: "#dcc49c",
        headerBackTitleStyle: {
          color: "#dcc49c"
        },
        headerStyle: {
          marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
          backgroundColor: "#292b37"
        }
      }
    },
    MyOrders: {
      screen: MyOrders,
      navigationOptions: {
        title: "Мои заказы",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "stem-medium",
          fontSize: 14,
          letterSpacing: 0.8
        },
        headerTintColor: "#dcc49c",
        headerBackTitleStyle: {
          color: "#dcc49c"
        },
        headerStyle: {
          marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
          backgroundColor: "#292b37"
        }
      }
    },
    MyOrderDetail: {
      screen: MyOrderDetail,
      navigationOptions: {
        title: "Заказ",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "stem-medium",
          fontSize: 14,
          letterSpacing: 0.8
        },
        headerTintColor: "#dcc49c",
        headerBackTitleStyle: {
          color: "#dcc49c",
          tintColor: "#dcc49c",
        },
        headerStyle: {
          marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
          backgroundColor: "#292b37"
        }
      }
    },
    PersonalInformation: {
      screen: PersonalInformation,
      navigationOptions: {
        title: "Мои данные",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "stem-medium",
          fontSize: 14,
          letterSpacing: 0.8
        },
        headerTintColor: "#dcc49c",
        headerBackTitleStyle: {
          color: "#dcc49c"
        },
        headerStyle: {
          marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
          backgroundColor: "#292b37"
        }
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        title: "Авторизация",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "stem-medium",
          fontSize: 14,
          letterSpacing: 0.8
        },
        headerBackTitleStyle: {
          color: "#dcc49c"
        },
        headerTintColor: "#dcc49c",
        headerStyle: {
          marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
          backgroundColor: "#292b37"
        }
      }
    },
    Registration: {
      screen: Registration,
      navigationOptions: {
        title: "Регистрация",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "stem-medium",
          fontSize: 14,
          letterSpacing: 0.8
        },
        headerTintColor: "#dcc49c",
        headerBackTitleStyle: {
          color: "#dcc49c"
        },
        headerStyle: {
          marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
          backgroundColor: "#292b37"
        }
      }
    },
    SelectTags: {
      screen: SelectTags,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    SelectTastes: {
      screen: SelectTastes,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    LoadingScreen: {
      screen: LoadingScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    Tabs: {
      screen: tabs,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
  },
  {
    headerStyle: {
      backcroundColor: "#292b37"
    },
    cardStyle: {
      backgroundColor: "#292b37"
    }
  }
);