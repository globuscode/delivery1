import React from "react";
import { WebView } from "react-native";
import propTypes from "prop-types";
import { fetchJson } from "../../../etc";

export default class SetCreditCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlBody: ""
    };
  }

  static propTypes = {
    navigation: propTypes.shape({
      navigate: propTypes.func,
      state: propTypes.shape({
        params: propTypes.shape({
          sessionId: propTypes.string
        })
      })
    })
  };

  componentDidMount = () => {
    const { sessionId } = this.props.navigation.state.params;
    const form = new FormData();
    const headers = new Headers();

    form.append("SessionId", sessionId);
    headers.append(("Content-Type": "multipart/form-data"));
    const options = {
      // headers: { "Content-Type": "multipart/form-data" },
      // body: "SessionId:" + sessionId,
      headers: headers,
      body: form,
      method: "post"
    };
    fetch("https://sandbox2.payture.com/vwapi/Add", options).then(
      async response => {
        const text = await response.text();
        this.setState({ htmlBody: text });
      }
    );
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
    // console.warn("SessionId:" + sessionId);
    return (
      <WebView
        onLoadEnd={this._check}
        source={{
          html: this.state.htmlBody
        }}
        style={{ flex: 1 }}
      />
    );
  };
}
