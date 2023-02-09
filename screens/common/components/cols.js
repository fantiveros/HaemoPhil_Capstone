import * as React from "react";
import { View } from "react-native";
import { gridStyles } from "../../common_styles/grid";

export function Col({ count, children }) {
  return <View style={gridStyles[`col${count}`]}>{children}</View>;
}
