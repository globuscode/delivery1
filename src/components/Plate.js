import React from "react";
import { View, Image, Dimensions, Text } from "react-native";
import { connect } from "react-redux";
import propTypes from "prop-types";
import Touchable from "react-native-platform-touchable";
import LinearGradient from "react-native-linear-gradient";

import IconD from "./ui/IconD";
import { adaptWidth } from "../etc";
import PriceButton from "./ui/PriceButton";

const { width: viewportWidth } = Dimensions.get("window");
const imageHeight = adaptWidth(100, 117, 130);

class Plate extends React.Component {
  static propTypes = {
    onPress: propTypes.func,
    onFavPress: propTypes.func,
    onPriceButtonPress: propTypes.func,
    onDeletePlatePress: propTypes.func,
    key: propTypes.number,
    itemCount: propTypes.number,
    data: propTypes.object,
    fav: propTypes.bool,
    inFav: propTypes.bool
  };
  render = () => {
    const e = this.props.data;
    const itemCount =
      this.props.itemCount != undefined ? this.props.itemCount : 0;
    return (
      <Touchable
        key={this.props.key}
        background={Touchable.Ripple("gray")}
        onPress={this.props.onPress}
      >
        <View
          style={{
            flexDirection: "row",
            marginLeft: 10,
            width: viewportWidth - 10,
            marginTop: 10,
            justifyContent: "flex-start"
          }}
        >
          <View
            styel={{
              width: imageHeight,
              height: imageHeight,
              borderWidth: e.image.indexOf(".png") > 0 ? 1.5 : 0,
              borderColor: "rgb(225, 199, 155)",
              borderRadius: 10
            }}
          >
            <Image
              source={{
                uri: "http:" + e.image,
                cache: "force-cache"
              }}
              resizeMode={e.image.indexOf(".png") > 0 ? "contain" : "cover"}
              style={{
                width: imageHeight,
                height: imageHeight,
                borderWidth: e.image.indexOf(".png") > 0 ? 1.5 : 0,
                borderColor: "rgb(225, 199, 155)",
                borderRadius: 10
              }}
            />
            {e.image.indexOf(".png") > 0 ? null : (
              <LinearGradient
                colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={{
                  width: imageHeight,
                  height: imageHeight,
                  borderRadius: 10,
                  position: "absolute"
                }}
              />
            )}
            <Touchable
              style={{ position: "absolute", right: 5, top: 5 }}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              foreground={Touchable.SelectableBackgroundBorderless()}
              onPress={this.props.onFavPress}
            >
              <View style={{ backgroundColor: "transparent" }}>
                <IconD
                  name={
                    this.props.inFav
                      ? "trash"
                      : this.props.fav ? "heart_full" : "heart_empty"
                  }
                  size={18}
                  color="#dcc49c"
                />
              </View>
            </Touchable>
          </View>

          <View
            style={{
              flexDirection: "column",
              marginLeft: 10,
              marginBottom: 5,
              flex: 1,
              justifyContent: "space-between",
              width: viewportWidth - 20 - 20 - imageHeight
            }}
          >
            <View
              style={{
                flexDirection: "column"
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  color: "#fff",
                  fontSize: 15,
                  fontFamily: "Stem-Medium",
                  top: 3,
                  lineHeight: 18,
                  letterSpacing: 1
                }}
              >
                {e.title}
              </Text>
              <View
                style={{
                  marginBottom: 5
                }}
              >
                <Text
                  numberOfLines={3}
                  style={{
                    color: "rgb(135, 136, 140)",
                    fontSize: 12,
                    lineHeight: 14,
                    marginBottom: 5
                  }}
                >
                  {e.description
                    .replace(/(<([^>]+)>)/gi, "")
                    .replace(/  +/g, " ")}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <PriceButton
                value={e.price}
                pressed={itemCount !== 0}
                count={itemCount}
                onPress={this.props.onPriceButtonPress}
              />
              {itemCount === 0 ? null : (
                <Touchable
                  background={Touchable.SelectableBackground()}
                  onPress={this.props.onDeletePlatePress}
                  style={{
                    width: adaptWidth(28, 30, 34),
                    marginLeft: 10,
                    height: adaptWidth(28, 30, 34),
                    borderRadius: 4,
                    justifyContent: "center",
                    backgroundColor: "#dcc49c",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ color: "rgba(41,43,55, 1)" }}>{"–"}</Text>
                </Touchable>
              )}
              <Text
                style={{
                  color: "rgb(135, 136, 140)",
                  marginLeft: 10,
                  fontSize: 12,
                  lineHeight: 14,
                  maxWidth: 80,
                  letterSpacing: 0.4,
                  fontFamily: "OpenSans",
                  fontWeight: "600"
                }}
              >
                {e.weight}
              </Text>
            </View>
          </View>
        </View>
      </Touchable>
    );
  };
}

export default connect(null, null)(Plate);
