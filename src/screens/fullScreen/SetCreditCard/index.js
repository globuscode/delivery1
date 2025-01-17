import React from "react";
import { WebView } from "react-native";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { fetchJson, host } from "../../../etc";

let lagTime = 10000;

class SetCreditCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsLength: 0,
      htmlBody: "",
      needToCheck: true,
      canNav: true,
      lagTime: 10000,
      cardsCount: 0
    };
  }

  static propTypes = {
    updateCards: propTypes.func,
    cards: propTypes.array,
    navigation: propTypes.shape({
      navigate: propTypes.func,
      goBack: propTypes.func,
      state: propTypes.shape({
        params: propTypes.shape({
          nextScreen: propTypes.string,
          token: propTypes.string
        })
      })
    })
  };

  componentWillMount = async () => {
    const cardsResponse = await fetchJson(
      `${host}/user/getCards/?token=${this.props.navigation.state.params.token}`
    );
    const cards = cardsResponse.errors === undefined ? cardsResponse.data : [];
    this.setState({ cardsLength: cards.length });
  };

  _check = async () => {
    if (this.state.needToCheck === false) return 0;
    let response = await fetchJson(
      "https://dostavka1.com/v1/payture/checkCardAdd?cardsCount=" +
        this.state.cardsLength +
        "&token=" +
        this.props.navigation.state.params.token
    );
    console.warn(response);
    if (response.data.result) {
      if (this.state.canNav) {
        this.setState({ canNav: false });
        if (this.props.navigation.state.params.nextScreen === "makeOrder") {
          // Обновляет карты
          const cardsResponse = await fetchJson(
            `${host}/user/getCards/?token=${
              this.props.navigation.state.params.token
            }`
          );
          const cards =
            cardsResponse.errors === undefined ? cardsResponse.data : [];
          this.props.updateCards(cards);

          this.props.navigation.goBack();
        } else this.props.navigation.navigate("Feed");
        this.setState({ needToCheck: false });
        setTimeout(() => {
          this.setState({ canNav: true });
        }, 2000);
      }
      return 0;
    }
    setTimeout(this._check, 10000);
    lagTime = 5000;
  };

  render = () => {
    return (
      <WebView
        onLoadEnd={this._check}
        source={{
          uri:
            "https://dostavka1.com/v1/payture/add/?token=" +
            this.props.navigation.state.params.token
        }}
        style={{ flex: 1 }}
      />
    );
  };
}

export default connect(
  ({ cards }) => ({ cards: cards }),
  dispatch => ({
    updateCards: cards => dispatch({ type: "UPDATE_CARDS", payload: cards })
  })
)(SetCreditCard);
