import React from "react";
import { Font } from "expo";
import Expo from "expo";
import { StatusBar, Platform, View, AsyncStorage } from "react-native";
import { StackNavigator } from "react-navigation";
import { Provider, connect } from "react-redux";

import IconD from "./src/IconD";
import Reducer from "./src/Reducers";
import A from "./ScreenReducer";
import PopupCart from "./src/PopupCart";

import PopupDialog, {
  SlideAnimation
} from 'react-native-popup-dialog';

StatusBar.setBarStyle("light-content", true);

const slide = new SlideAnimation({
  slideFrom: 'bottom',
});

class ModalComponent extends React.Component {
  componentWillReceiveProps = (nextProps) => {this.setState({})}
  render = () => <View style={{flex: 1}}>
    <A />
    <PopupDialog
      dismissOnHardwareBackPress={false}
      ref={(popupDialog) => { this.popupDialog = popupDialog; }}
      dismissOnTouchOutside={false}
      dialogStyle={{
        backgroundColor: 'transparent',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-end'
      }}
      containerStyle={{
        justifyContent: 'flex-end',
      }}
      show={Reducer.getState().modalController.opened}
      dialogAnimation={slide}
    >
    <PopupCart />
  </PopupDialog>
</View>
}

const M = connect(
  state => ({
    modal: state.modalController
  }),
  dispatch => ({
    open: () => dispatch({ type: "OPEN_MODAL"}),
    close: () => dispatch({ type: "CLOSE_MODAL"}),
  })
)(ModalComponent);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { canRender: false };
  }
  async componentDidMount() {
    await Font.loadAsync({
      "open-sans-semibold": require("./assets/fonts/OpenSans-Semibold.ttf"),
      "open-sans": require("./assets/fonts/OpenSans.ttf"),
      "stem-medium": require("./assets/fonts/Stem-Medium.ttf"),
      "stem-regular": require("./assets/fonts/Stem-Regular.ttf")
    });

    const fav = await AsyncStorage.getItem('fav');
    const nan = await AsyncStorage.getItem('nan');
    if (fav != nan)
      Reducer.dispatch({type: 'SET_FAV', payload: JSON.parse(fav)});

    this.setState({ canRender: true });
  }

  render() {

    if (this.state.canRender)
      return (
        <Provider store={Reducer}>
          <M/>
        </Provider>
      );
    else return null;
  }
}
