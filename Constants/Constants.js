import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Colors = {
  primary: "#6E01C0",
  mPurple: "#4D0484",
  dPurple: "#2C0847",
  bg: "#0B0B0B",
  white: "#ffffff",
  black: "#000000",
  red: "#FF2626",
  yellow: "#FFC947",
  lightBg: "#0f0f0f",
  grey: "#5d5d5d",
};

const Sizes = {
  height: height,
  width: width,
  padding: 10,
  margin: 15,
};

const Font = StyleSheet.create({
  title: {
    fontFamily: "QuickBold",
    fontSize: 20,
    textAlign: "center",
    color: Colors.white,
  },
  header: {
    fontFamily: "QuickBold",
    fontSize: 16,
    textAlign: "center",
    color: Colors.white,
  },
  normal: {
    fontFamily: "QuickRegular",
    fontSize: 14,
    textAlign: "left",
    color: Colors.white,
  },
  light: {
    fontFamily: "QuickLight",
    fontSize: 14,
    textAlign: "left",
    color: Colors.white,
  },
  semiBold: {
    fontFamily: "QuickSemiBold",
    fontSize: 14,
    textAlign: "left",
    color: Colors.white,
  },
});

let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
let yyyy = today.getFullYear();

export { Colors, Sizes, Font, dd, mm, yyyy };
