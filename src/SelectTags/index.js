import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  AsyncStorage,
  WebView
} from 'react-native';

import Touchable from 'react-native-platform-touchable';
var webapp = require('./BallPool.html');

const scale = 5;

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');














var centersOfCircles = [];

function distance(a, b) {
  return ((a.x - b.x) ^ 2 + (a.y - b.y) ^ 2) ^ (1 / 2);
}

function generateCircles(count, radius) {
  var result = [];

  for (var i = 0; i < count / 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (i * j < count)
        result.push({
          x: 2 * radius * j + 120 + (i % 2) * 80,
          y: 2 * radius * i,
        })
    }
  }

  return result;
}













export default class SelectTags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canNav: true,
      kitchens: [
        {
          title: 'Россия',
          icon: 'ios-person',
          selected: false,
        }, {
          title: 'Италия',
          icon: 'ios-person',
          selected: false,
        }, {
          title: 'Америка',
          icon: 'ios-person',
          selected: false,
        }, {
          title: 'Китай',
          icon: 'ios-person',
          selected: false,
        }, {
          title: 'Италия',
          icon: 'ios-person',
          selected: false,
        }, {
          title: 'Япония',
          icon: 'ios-person',
          selected: false,
        }, {
          ешеду: 'Шведция',
          icon: 'ios-person',
          selected: false,
        }, {
          title: 'Мексика',
          icon: 'ios-person',
          selected: false,
        },
      ],
      canRender: true,
      positions: [
        [0, 20],
        [10, 20],
        [0, 20],
        [10, 20],
        [0, 20],
      ],
    }
  };

  async componentWillMount() {
    fetch('http://dostavka1.com/v1/classificator/tag-groups?cityId=36')
      .then((response) => response.json())
      .then((responseJson) => {
        this.state.kitchens = [];
        for (name in responseJson.data) {
          responseJson.data[name].selected = false;
          this.state.kitchens.push(responseJson.data[name]);
        }
        this.setState({});
        return responseJson;
      });
    webapp = await require('./BallPool.html');
  }


  selectRandom(count) {
    this.state.selected = [];
    for (var i = 0; i < count; i++) {
      this.state.kitchens[i].selected = (Math.random() > 0.5);
    }
    this.webview.postMessage(JSON.stringify({ update: true, tags: this.state.kitchens }));
    this.setState({});
  };

  getSelectedTags() {
    let result = [];
    selectedKitchens = this.state.kitchens.map((element, index) => {
      if (element.selected === true)
        result.push(element);
    });
    return result;
  };

  setTags = async () => {
    await AsyncStorage.setItem('tags', JSON.stringify(this.getSelectedTags()));
    return 0;
  };

  next = () => {
    this.setTags();
    if (this.isNext())
    if (this.state.canNav) {
      this.props.navigation.navigate('SelectTastes');
      this.state.canNav = false;
      setTimeout(() => {
        this.state.canNav = true;
      }, 1500);
    }
  };

  isNext = () => {
    var isNext = false;
    let i = 0;
    while (!isNext && i < this.state.kitchens.length) {
      isNext = this.state.kitchens[i].selected;
      i++;
    }
    /*
    for (var i = 0; i < this.state.kitchens.length; i++) {
      isNext = isNext || this.state.kitchens[i].selected;
    }*/
    return isNext;
  }

  /**
   * Обработчик сообщений из WebView
   */
  onMessage = (event) => {
    data = JSON.parse(event.nativeEvent.data);
    if (data.index >= 0) {
      var index = parseInt(data.index);
      this.state.kitchens[index].selected = !this.state.kitchens[index].selected;
      this.setState({});
    }
  }

  render() {
    var result = (
      <View style={styles.container}>
        <View style={{ alignSelf: 'stretch', paddingHorizontal: 15 }}>
          <View style={{ alignSelf: 'stretch', justifyContent: 'center', borderBottomWidth: 2, borderColor: 'rgb(87, 88, 98)' }}>
            <TouchableOpacity onPress={() => this.selectRandom(this.state.kitchens.length)}>
              <Text style={[
                styles.text, {
                  color: 'rgb( 225, 199, 155)',
                  fontFamily: 'open-sans',
                  alignSelf: 'flex-end',
                  fontSize: 14,
                  letterSpacing: 0.4,
                  paddingTop: 13,
                  paddingBottom: 13
                }]}>
              {'Выбрать наугад'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={[{ 
          marginTop: 9,
          fontSize: 16,
          lineHeight: 20,
          letterSpacing: 1,
          fontFamily: 'stem-medium',
          color: 'rgb( 255, 255, 255)'
        }]}>Поведайте свои предпочтения</Text>
        <Text style={[{
          fontSize: 12,
          lineHeight: 13,
          paddingHorizontal: 35,
          letterSpacing: 0.8,
          color: 'rgb(119, 122, 136)',
          textAlign: 'center'
        }]}>Рассскажите кухни каких стран наиболее привлекательны для вас и мы составим список рекомендаций</Text>

          <View style={{
            height: viewportHeight - 193,
            backgroundColor: '#292b37',
          }}>
            <WebView
              ref={(c) => { this.webview = c; }}
              mixedContentMode='always'
              domStorageEnabled={true}
              injectedJavaScript={'tags = JSON.parse(' + JSON.stringify(this.state.tags) + ');'}
              source={webapp}
              scalesPageToFit={true}
              onMessage={this.onMessage}
              onLoadEnd={() => {
                this.webview.postMessage(JSON.stringify({ update: false, tags: this.state.kitchens }))
              }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              style={{ 
                backgroundColor: 'transparent', 
                height: viewportHeight - 193, 
                width: viewportWidth }}
            />
          </View>

          <View style={{
            position: 'absolute',
            alignSelf: 'center',
            width: viewportWidth - 30,
            bottom: 0,
            height: 49,
            borderTopWidth: 2,
            borderColor: this.isNext() ? '#dcc49c' : '#575862',
            flexDirection: 'row',
            justifyContent: 'center'
          }}>
            <Touchable 
              background={Touchable.Ripple('gray')} 
              onPress={this.next}
              style={{
                alignSelf: 'stretch',
                flexDirection: 'column',
                justifyContent: "center",
                width: viewportWidth
              }}>
              <Text style={[
                styles.nextButtonText,
                {
                  color: this.isNext() ? '#dcc49c' : '#575862'
                }
              ]}>Далее</Text>
            </Touchable>
          </View>
      </View>
    );
    return result;
  }
};


const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 20,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#292b37',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    color: '#dcc49c',
    alignSelf: 'center',
    textAlign: 'center',
    letterSpacing: 0.8,
    fontFamily: 'stem-regular'
  },
});
