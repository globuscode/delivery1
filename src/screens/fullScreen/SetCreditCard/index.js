import React from "react";
import { WebView } from "react-native";
import propTypes from "prop-types";
import { fetchJson } from "../../../etc";

export default class SetCreditCard extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    navigation: propTypes.shape({
      navigate: propTypes.func,
      state: propTypes.shape({
        params: propTypes.shape({
          url: propTypes.string
        })
      })
    })
  };

  _check = async () => {
    let response = await fetchJson(
      "https://dostavka1.com/v1/payture/checkCardAdd"
    );
    if (response.data.result) {
      this.props.navigation.navigate("Feed");
      return 0;
    }
    setTimeout(this._check, 10000);
  };

  render = () => {
    const { url } = this.props.navigation.state.params;
    return (
      <WebView
        onLoadEnd={this._check}
        source={{ uri: url }}
        style={{ flex: 1 }}
      />
    );
  };
}
