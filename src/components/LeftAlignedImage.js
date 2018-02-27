import React, { Component } from "react";
import propTypes from "prop-types";
import { StyleSheet, Image, View, Dimensions } from "react-native";

function calcDim(imageWidth, imageHeight, maxHeight, maxWidth) {
  const imageRatio = imageWidth / imageHeight;

  let newImageHeight = Math.min(maxHeight, imageHeight);
  let newImageWidth = newImageHeight * imageRatio;

  if (maxWidth > 0 && newImageWidth > maxWidth) {
    newImageWidth = maxWidth;
    newImageHeight = maxWidth / imageRatio;
  }

  return {
    imageWidth: newImageWidth,
    imageHeight: newImageHeight
  };
}

export class LeftAlignedImage extends Component {
  static propTypes = {
    top: propTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = {
      height: 0,
      width: 0,
      imageWidth: 0,
      imageHeight: 0,
      source: null
    };
  }

  componentWillMount() {
    this._updateState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._updateState(nextProps);
  }

  _updateState(props) {
    const { source, height } = props;
    const width = props.width || Dimensions.get("window").width;

    Image.getSize(source.uri, (iw, ih) => {
      const { imageWidth, imageHeight } = calcDim(iw, ih, height, width);

      this.setState({
        imageWidth,
        imageHeight,
        source,
        height: height,
        width: width
      });
    });
  }

  render() {
    const { source, height, width, imageWidth, imageHeight } = this.state;
    const { top } = this.props;
    const localStyle = height
      ? {
        height: height,
        width: width
      }
      : {};

    return (
      <View
        style={[
          styles.container,
          localStyle,
          top
            ? {
              justifyContent: "flex-start"
            }
            : {}
        ]}
      >
        {source ? (
          <Image
            style={{ width: imageWidth, height: imageHeight }}
            resizeMode="center"
            source={source}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end"
  }
});
