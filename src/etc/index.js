import { Dimensions } from "react-native";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

const host = "http://dostavka1.com/v1";

const adaptWidth = (width320, width375, width414) => {
  if (viewportWidth <= 320) return width320;
  if (320 < viewportWidth && viewportWidth <= 375) return width375;
  if (viewportWidth >= 414) return width414;
};

export { adaptWidth };

export { host };
