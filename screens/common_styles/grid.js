import { StyleSheet } from "react-native";

export const gridStyles = StyleSheet.create({
  grid: {
    flex: 5,
    marginHorizontal: "auto",
    width: "100%",
  },
  gridTwoColumn: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  row: {
    flexDirection: "row",
  },
  col1: {
    flex: 1,
  },
  col2: {
    flex: 2,
  },
  col25: {
    flex: 2.5,
  },
  col3: {
    flex: 3,
  },
  col4: {
    flex: 4,
  },
  col5: {
    flex: 5,
  },
});
