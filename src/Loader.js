import React from "react";
import propTypes from "prop-types";

class Loader extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount = () => {
    const { navigation } = this.props;
    if (navigation.state.params.action === "navigate") {
      const { screen } = navigation.state.params;
      const { props } = navigation.state.params;
      navigation.navigate(screen, props);
    }
  }

  render = () => {
    return null;
  }
}

Loader.propTypes = {
  navigation: propTypes.object,
};

export default Loader;
