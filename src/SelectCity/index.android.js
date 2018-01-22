
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  requireNativeComponent,
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Picker from "../Picker";
import Touchable from 'react-native-platform-touchable';
import { NavigationActions } from 'react-navigation';

import { host } from '../etc';

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'About'}),
  ]
});
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class SelectCity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canNav: true,
      cities: [
        {
          title: 'Москва',
          restaurantCount: 1,
          deliveryTime: 10
        },
      ]
    };

    for (var i = 0; i < this.state.cities.length; i++) {
      if (this.state.cities[i].title == 'Москва')
        this.state.selectedItem = i;
    }
    this.state.selectedCity = this.state.cities[parseInt(this.state.cities.length / 2)];
  };

  async componentWillMount() {
    //var city = await AsyncStorage.getItem('city');
    if (0)
      this.props.navigation.navigate('Main');
    fetch(`${host}/classificator/cities`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.state.cities = responseJson.data;

        for (var i = 0; i < this.state.cities.length; i++) {
          if (this.state.cities[i].title == 'Москва') {
            this.state.selectedItem = i;
            this.state.selectedCity = this.state.cities[i];
          }
        }
        this.setState({});
        return responseJson;
      });
  };

  async setCity(city) {
    await AsyncStorage.setItem('city', city);
    return 0;
  };

  onPikcerSelect(index) {
    this.setState({
      selectedItem: index,
      selectedCity: this.state.cities[index],
    });
  };

  next = () => {
    this.setCity(JSON.stringify(this.state.selectedCity));

    if (this.state.canNav) {
      this.props.navigation.dispatch(resetAction);
      this.state.canNav = false;
      setTimeout(() => {
        this.state.canNav = true;
      }, 1500);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Выберите ваш город</Text>

        <View style={{}}>
          <View style={{ backgroundColor: '#dcc49c', alignSelf: 'center', width: viewportWidth, height: 1, position: 'relative', top: 94 }} />
          <View style={{ backgroundColor: '#dcc49c', alignSelf: 'center', width: viewportWidth, height: 1, position: 'relative', top: 129 }} />
          <Picker style={{ width: viewportWidth, height: 200 }}
            selectedValue={this.state.selectedItem}
            data={this.state.cities.map(e => e.title)}
            itemStyle={{ color: "#dcc49c", fontSize: 30 }}
            onValueChange={(index) => this.onPikcerSelect(index)}
          />
        </View>


        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#3A3B46',
            paddingVertical: 23,
            alignSelf: 'stretch',
            marginHorizontal: 20,
          }}>
          <View style={{
            marginLeft: 15,
            flexDirection: 'column',
            width: (viewportWidth - 30) / 2,
            justifyContent: 'space-between',
          }}>
            <Text style={styles.header2}>{'Доступно\nресторанов'}</Text>
            <Text style={styles.afterHeader2}>{this.state.selectedCity.restaurantCount}</Text>
          </View>

          <View style={{
            flexDirection: 'column',
            width: (viewportWidth - 40) / 2,
            justifyContent: 'space-between',
          }}>
            <Text style={styles.header2}>{'Время доставки\nпо городу'}</Text>
            <Text style={styles.afterHeader2}>до {this.state.selectedCity.deliveryTime} мин</Text>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.checkingInfo}>{'Все партнеры компании проходят \nстрогую проверку качества'}</Text>
        </View>

        <View style={{
          position: 'absolute',
          alignSelf: 'center',
          width: viewportWidth - 30,
          bottom: 0,
          height: 49,
          borderTopWidth: 2,
          borderColor: '#dcc49c',
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <Touchable background={Touchable.Ripple('gray')} onPress={this.next}
            style={{
              alignSelf: 'stretch',
              flexDirection: 'column',
              justifyContent: "center",
              width: viewportWidth,
            }}>
            <Text style={styles.nextButtonText}>Далее</Text>
          </Touchable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 20,
  },
  header: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1.1,
    lineHeight: 20,
    fontFamily: 'stem-medium'
  },
  header2: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
    fontFamily: "OpenSans", fontWeight: "600",
  },
  afterHeader2: {
    color: '#dcc49c',
    fontWeight: 'bold',
    fontSize: 25,
    fontFamily: "OpenSans", fontWeight: "600",
  },
  nextButtonText: {
    fontSize: 16,
    color: '#dcc49c',
    alignSelf: 'center',
    textAlign: 'center',
    letterSpacing: 0.8,
    fontFamily: 'stem-regular'
  },
  checkingInfo: {
    fontFamily: "OpenSans",
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'center',
    color: 'rgb( 87, 88, 98)'
  },
  container: {
    flex: 1,
    paddingTop: 55,
    backgroundColor: 'rgb( 45, 46, 58)',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});