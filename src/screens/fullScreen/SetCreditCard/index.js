import React from "react";
import { WebView } from "react-native";
import propTypes from "prop-types";

export default class SetCreditCard extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    navigation: propTypes.shape({
      state: propTypes.shape({
        params: propTypes.shape({
          url: propTypes.string
        })
      })
    })
  };

  render = () => {
    const { url } = this.props.navigation.state.params;
    return <WebView source={{ uri: url }} style={{ flex: 1 }} />;
  };
}
