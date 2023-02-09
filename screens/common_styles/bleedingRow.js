import { StyleSheet } from "react-native"

export const bleedingRowStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomColor: "#e6e6e6",
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
  },
  indicator: {
    borderRadius: 50,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
  },
  stretch: {
    flex: 1,
    alignSelf: "stretch",
  },
})
