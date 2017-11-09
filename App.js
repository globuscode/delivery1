import React from 'react';
import { Font } from 'expo';
import Expo from 'expo';
import { StatusBar, Platform} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import IconD from './src/IconD';
import Reducer from './src/Reducers';

import Login from           './src/Login';
import Registration from    './src/Registration';
import RegistratePhone from './src/RegistatePhone';
import SelectCity from      './src/SelectCity';
import SelectTags from      './src/SelectTags';
import SetAddress from      './src/SetAddress';
import SelectTastes from    './src/SelectTastes';
import About from           './src/about';
import SpecialScreen from   './src/SpecialScreen';
import LoadingScreen from   './src/LoadingScreen';
import Main from            './src/Main'; 
import AllRestourans from   './src/AllRestourans';
import Restaurant from      './src/Restaurant'; 
import RestaurantMenu from  './src/RestaurantMenu';
import Plate from           './src/Plate';
import Profile from         './src/Profile';


StatusBar.setBarStyle('light-content', true);

const tabs = StackNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  },
  Restaurant: {
    screen: Restaurant,
    navigationOptions: {
      header: null,
    }
  },
  SetAddress: {
    screen: SetAddress,
    navigationOptions: {
      header: null,
    }
  },
},{
  cardStyle: {
    backgroundColor: 'rgba(39, 40, 48, 1)'
  }});

const A = StackNavigator({
  SpecialScreen: {
    screen: SpecialScreen,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
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
      title: 'Номер телефона',
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
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: 'Личный кабинет',
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
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Авторизация',
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
  Registration: {
    screen: Registration,
    navigationOptions: {
      title: 'Регистрация',
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
  TabNav: {
    screen: tabs,
  }
}, {
  headerStyle: {
    backcroundColor: '#292b37'
  },
  cardStyle: {
    backgroundColor: '#292b37'
  }
  });


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {canRender: false};
  }
  async componentDidMount() {
    await Font.loadAsync({
      'open-sans-semibold': require('./assets/fonts/OpenSans-Semibold.ttf'),
      'open-sans': require('./assets/fonts/OpenSans.ttf'),
      'stem-medium': require('./assets/fonts/Stem-Medium.ttf'),
      'stem-regular': require('./assets/fonts/Stem-Regular.ttf'),
    });

    this.setState({ canRender: true });
  }

  render() {
    if (this.state.canRender)
      return (
        <Provider store={Reducer}>
          <A />
        </Provider>
      )
    else return null;
  }
}