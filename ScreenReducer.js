import { Platform } from "react-native";
import { StackNavigator } from "react-navigation";
import { getStatusBarHeight } from "react-native-status-bar-height";

import { adaptWidth } from "./src/etc";

import Login from "./src/screens/fullScreen/Login";
import Registration from "./src/Registration";
import RegistratePhone from "./src/RegistatePhone";
import SelectCity from "./src/SelectCity";
import SelectTags from "./src/SelectTags";
import SetAddress from "./src/SetAddress";
import SelectTastes from "./src/SelectTastes";
import About from "./src/about";
import SpecialScreen from "./src/screens/fullScreen/SpecialScreen";
import LoadingScreen from "./src/LoadingScreen";
import Main from "./src/Main";
import Loader from "./src/screens/fullScreen/Loader";
import Profile from "./src/Profile";
import MakeOrder from "./src/MakeOrder";
import MyOrders from "./src/MyOrders";
import MyOrderDetail from "./src/MyOrderDetail";
import PersonalInformation from "./src/PersonalInformation";
import SetFullAddress from "./src/SetFullAddress";
import SetCard from "./src/SetCard";

const headerStyleIOS = title => ({
  title: title,
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
    backgroundColor: "transparent",
    padding: 0,
    borderBottomWidth: Platform.OS === "ios" ? 1 : 0,
    marginHorizontal: Platform.OS === "ios" ? 20 : -3,
    borderBottomColor: "rgb(87, 88, 98)"
  }
});

const tabs = StackNavigator(
  {
    Main: {
      screen: Main,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    }
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
      navigationOptions: headerStyleIOS("Адрес доставки")
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
      navigationOptions: headerStyleIOS("Номер телефона")
    },
    SetAddress: {
      screen: SetAddress,
      navigationOptions: {
        ...headerStyleIOS(adaptWidth(0, 1, 1) ? "Адрес доставки" : "Адрес"),
        headerBackTitle: null
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: headerStyleIOS("Личный кабинет")
    },
    MakeOrder: {
      screen: MakeOrder,
      navigationOptions: headerStyleIOS("Оплатить заказ")
    },
    MyOrders: {
      screen: MyOrders,
      navigationOptions: headerStyleIOS("Мои заказы")
    },
    SetCard: {
      screen: SetCard,
      navigationOptions: headerStyleIOS("Прикрепить карту")
    },
    MyOrderDetail: {
      screen: MyOrderDetail,
      navigationOptions: headerStyleIOS("Заказ")
    },
    PersonalInformation: {
      screen: PersonalInformation,
      navigationOptions: headerStyleIOS("Мои данные")
    },
    Login: {
      screen: Login,
      navigationOptions: headerStyleIOS("Авторизация")
    },
    Registration: {
      screen: Registration,
      navigationOptions: headerStyleIOS("Регистрация")
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
    Loader: {
      screen: Loader,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    }
  },
  {
    headerMode: "screen",
    headerStyle: {
      backcroundColor: "#292b37"
    },
    cardStyle: {
      backgroundColor: "#292b37"
    }
  }
);
