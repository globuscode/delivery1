import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  requireNativeComponent,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Picker from "react-native-wheel-picker";
import { LinearGradient } from 'expo';
import IconD from '../IconD';

var kitchenPhoto = require('../../assets/img/kitchen.jpeg');

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class SelectCity extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    kitchenPhoto = require('../../assets/img/kitchen.jpeg');

  }

  componentDidMount() {
    setTimeout(() => {
       this.props.navigation.navigate('Main');
    }, 2000);
  }

  render() {
    kitchenPhoto = require('../../assets/img/kitchen.jpeg');
    return (
      <Image style={styles.backgroundImage}
        source={{ uri: 'https://cdn-images-1.medium.com/max/1920/1*tLe0R9zkEI19qvaCQDGxdA.jpeg'}}
      >
        <View style={styles.container}>
          <LinearGradient colors={['rgba(44,45,55, 1)', 'rgba(44,45,55, 0.5)']} style={{
            height: viewportHeight,
            position: 'absolute',
            width: viewportWidth
          }}/>
          <Text style={{
            color: '#ffffff',
            width: viewportWidth*0.4,
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
            backgroundColor: 'transparent'
            }}>
            {'Загружаем рекомендации'}
          </Text>
          <View
            style={{
              position: 'absolute',
              backgroundColor: '#292b37',
              top: viewportHeight / 2,
            }}>
          <IconD
            name='dostavka'
            color='#dcc49c'
            size={90} /></View>
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