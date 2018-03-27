import React from "react";
import { StatusBar, View, AsyncStorage } from "react-native";
import { Provider, connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import propTypes from "prop-types";

import Reducer from "./src/Reducers";
import A from "./ScreenReducer";
import PopupCart from "./src/components/modals/PopupCart";
import CollectionModal from "./src/components/modals/CollectionThemes";

import PopupDialog, { SlideAnimation } from "react-native-popup-dialog";

StatusBar.setBarStyle("light-content", true);
StatusBar.setTranslucent(true);
StatusBar.setBackgroundColor("rgb(37, 38, 46)");

const slide = new SlideAnimation({
  slideFrom: "bottom"
});

class ModalComponent extends React.Component {
  static propTypes = {
    spinnerController: propTypes.object
  };
  render = () => {
    const { modalController } = Reducer.getState();
    return (
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
            height: 550,
            justifyContent:
              modalController.type === "cart" ? "flex-end" : "center"
          }}
          containerStyle={{
            justifyContent:
              modalController.type === "cart" ? "flex-end" : "center"
          }}
          show={modalController.opened}
          dialogAnimation={slide}
        >
          {modalController.type === "cart" ? (
            <PopupCart />
          ) : (
            <CollectionModal />
          )}
        </PopupDialog>

        <Spinner
          color="#dcc49c"
          overlayColor="rgba(37, 38, 46, 0.9)"
          animation="fade"
          visible={this.props.spinnerController.show}
          textStyle={{ color: "#FFF" }}
        />
      </View>
    );
  };
}

const M = connect(
  ({ modalController, spinnerController }) => ({
    modal: modalController,
    spinnerController: spinnerController
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
