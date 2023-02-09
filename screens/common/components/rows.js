import * as React from "react";
import { View } from "react-native";
import { gridStyles } from "../../common_styles/grid";

export function Row({ children }) {
  return <View style={gridStyles.row}>{children}</View>;
}
