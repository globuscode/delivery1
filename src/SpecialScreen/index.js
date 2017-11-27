import React from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  View,
  TouchableOpacity,
  Dimensions,
  requireNativeComponent,
  Image,
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient, Font } from 'expo';

var kitchenPhoto = require('../../assets/img/kitchen.jpeg');

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class SelectCity extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    kitchenPhoto = await require('../../assets/img/kitchen.jpeg');

  }

  async componentDidMount() {
    var city = await AsyncStorage.getItem('city');
    fetch('http://dostavka1.com/v1/classificator/cities')
    .then((response) => {
      if (!response.ok) {
        Alert.alert('Ошибка', 'Ошибка соединения с сервером.')
      }
      else 
      if (0)
        this.props.navigation.navigate('SelectCity'); 
      else {
        if (city == null)
          this.props.navigation.navigate('SelectCity');
        else
          this.props.navigation.navigate('LoadingScreen'); 
      }
        
        
      });
  }

  render() {
    kitchenPhoto = require('../../assets/img/kitchen.jpeg');
    return (
      <Image style={styles.backgroundImage}
        source={kitchenPhoto}
      >
        <View style={styles.container}>
          <LinearGradient colors={['rgba(0, 0, 0, 0.9)', 'transparent']} style={{
            height: 80,
            position: 'absolute',
            width: viewportWidth
          }}/>
          <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.9)']} style={{
            height: 80,
            position: 'absolute',
            width: viewportWidth,
            bottom: 0
          }} />
          <Text style={{
            color: '#ffffff',
            width: viewportWidth*0.8,
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
            backgroundColor: 'transparent'
            }}>
            {'Первый рекомендательный сервис еды'}
          </Text>
          <Icon
            name='ios-grid'
            color='#dcc49c'
            size={90}
            style={{
              backgroundColor: 'transparent'
            }} />
          <Text style={{
            color: '#ffffff',
            width: viewportWidth * 0.8,
            textAlign: 'center',
            fontSize: 12,
            backgroundColor: 'transparent'
          }}>
            {'Москва, Санкт-Петербург, Екатеренбург, Казань, Краснодар, Нижний Новгород'}
          </Text>
        </View>
      </Image>
    );
  }
}

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
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});