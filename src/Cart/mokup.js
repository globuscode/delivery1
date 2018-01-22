import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from "react-native";
import { adaptWidth } from "../etc";

const { width: viewportWidth } = Dimensions.get("window");
const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 20
  },
  row: {
    flexDirection: "row",
    alignSelf: "stretch"
  },
  nextButtonText: {
    fontSize: 16,
    color: "#dcc49c",
    marginTop: 17,
    marginBottom: 17,
    textAlign: "center",
    letterSpacing: 0.8,
    fontFamily: "stem-regular"
  },
  column: {
    flexDirection: "column",
    alignSelf: "stretch"
  },
  container: {
    flex: 1,
    elevation: -10
  }
});

export const renderButton = (title, callback) => {
  return (
    <View style={{ alignSelf: "stretch" }}>
      <View
        style={[
          styles.row,
          {
            justifyContent: "center",
            position: "absolute",
            width: viewportWidth - 30,
            borderWidth: 1,
            height: adaptWidth(44, 52, 57),
            marginTop: 31,
            marginBottom: 10,
            marginHorizontal: 15,
            alignItems: "center",
            alignContent: "center",
            borderRadius: 4,
            borderColor: "white"
          }
        ]}
      >
        <Text
          style={{
            color: "#ffffff",
            fontSize: 14,
            top: 2,
            fontFamily: "stem-medium"
          }}
        >
          {title}
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0}
        onPress={callback}
        style={[
          styles.row,
          {
            justifyContent: "center",
            borderWidth: 1,
            height: adaptWidth(44, 52, 57),
            marginTop: 31,
            marginBottom: 10,
            marginHorizontal: 15,
            alignItems: "center",
            alignContent: "center",
            borderRadius: 4,
            borderColor: "#dcc49c"
          }
        ]}
      >
        <Text
          style={{
            color: "#ffffff",
            fontSize: 14,
            top: 2,
            fontFamily: "stem-medium"
          }}
        >
          {"Открыть меню ресторана"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
