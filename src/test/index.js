import React from 'react';
import {
  WebView,
  View,
  Text,
  Dimensions,
} from 'react-native';

const scale = 5;

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

import Bubble from '../SelectTags/Bubble.js';
export default class GLExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kitchens: [
        {
          title: 'Мексика',
          icon: 'ios-person',
          selected: false
        }, {
          title: 'Франция',
          icon: 'ios-person',
          selected: false
        }, {
          title: 'Кавказ',
          icon: 'ios-person',
          selected: false
        }, {
          title: 'Индия',
          icon: 'ios-person',
          selected: false
        }, {
          title: 'Россия',
          icon: 'ios-person',
          selected: false
        },
      ],
      selected: [],
      positions: [
        [0, 20],
        [10, 20],
        [0, 20],
        [10, 20],
        [0, 20],
      ],
    }
  }

  onMessage = (event) => {
    var data = JSON.parse(event.nativeEvent.data);
    var p = [];
    data.forEach((point, i) => {
      p[point[1]] = point[0]; 
    });
    this.setState({positions: p});
  }


  render() {

    return <View style={{
      flex: 1,
      backgroundColor: '#292b37',
       }}>
      <WebView
        ref={(c) => { this.webview = c; }}
        source={webapp}
        style={{ marginTop: 20, display: 'none', height: 0, }}
        onMessage={this.onMessage}
        onLoadStart={() => this.webview.postMessage('5')}
      />
    </View>;
  }
}