import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 50,
    paddingBottom: 20,
    width: "100%",
  },
  innerContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  largeLbl: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#E15C63",
  },
  linkLbl: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#E15C63",
  },
  submitButton: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: 45,
    backgroundColor: "#E15C63",
  },
  transparentBtn: {
    marginTop: 20,
    borderWidth: 4,
    borderRadius: 10,
    height: 45,
    borderColor: "#E15C63",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    alignItems: "center",
    justifyContent: "center",
  },
  centerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    flex: 5,
    marginHorizontal: "auto",
    width: "100%",
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
})
