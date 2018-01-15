import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import fontelloConfig from "../assets/icons/selection.json";
import { Font } from "expo";

Font.loadAsync({
  FontName: require("../assets/icons/fonts/icomoon.ttf")
});

export default createIconSetFromIcoMoon(fontelloConfig, "FontName");
