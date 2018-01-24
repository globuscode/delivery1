import React from "react";
import { StatusBar, View, AsyncStorage } from "react-native";
import { Provider, connect } from "react-redux";

import Reducer from "./src/Reducers";
import A from "./ScreenReducer";
import PopupCart from "./src/PopupCart";

import PopupDialog, { SlideAnimation } from "react-native-popup-dialog";

StatusBar.setBarStyle("light-content", true);
StatusBar.setTranslucent(true);
StatusBar.setBackgroundColor("rgb(37, 38, 46)");

const slide = new SlideAnimation({
  slideFrom: "bottom"
});

class ModalComponent extends React.Component {
  componentWillReceiveProps = () => {
    //this.setState({});
  };
  render = () => (
    <View style={{ flex: 1 }}>
      <A />
      <PopupDialog
        dismissOnHardwareBackPress={true}
        overlayBackgroundColor="rgb(37, 38, 46)"
        overlayOpacity={0.9}
        onDismissed={() => {
          Reducer.dispatch({ type: "HIDE_MODAL" });
        }}
        ref={popupDialog => {
          this.popupDialog = popupDialog;
        }}
        dismissOnTouchOutside={true}
        dialogStyle={{
          backgroundColor: "transparent",
          flexDirection: "column",
          flex: 1,
          justifyContent: "flex-end"
        }}
        containerStyle={{
          justifyContent: "flex-end"
        }}
        show={Reducer.getState().modalController.opened}
        dialogAnimation={slide}
      >
        <PopupCart />
      </PopupDialog>
    </View>
  );
}

const M = connect(
  state => ({
    modal: state.modalController
  }),
  dispatch => ({
    open: () => dispatch({ type: "OPEN_MODAL" }),
    close: () => dispatch({ type: "CLOSE_MODAL" })
  })
)(ModalComponent);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { canRender: false };
  }
  async componentDidMount() {
    const fav = await AsyncStorage.getItem("fav");
    const nan = await AsyncStorage.getItem("nan");
    if (fav != nan)
      Reducer.dispatch({ type: "SET_FAV", payload: JSON.parse(fav) });

    this.setState({ canRender: true });
  }

  render() {
    if (this.state.canRender)
      return (
        <Provider store={Reducer}>
          <M />
        </Provider>
      );
    else return null;
  }
}
