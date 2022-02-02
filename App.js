import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { useState } from "react";
import { Colors } from "./Constants/Constants";
import AppNavigator from "./Navigator/AppNavigator";
import { Provider } from "react-native-paper";

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchFonts = () => {
    return Font.loadAsync({
      QuickBold: require("./assets/fonts/Quicksand-Bold.ttf"),
      QuickRegular: require("./assets/fonts/Quicksand-Regular.ttf"),
      QuickMedium: require("./assets/fonts/Quicksand-Medium.ttf"),
      QuickSemiBold: require("./assets/fonts/Quicksand-SemiBold.ttf"),
      QuickLight: require("./assets/fonts/Quicksand-Light.ttf"),
      Staat: require("./assets/fonts/Staatliches-Regular.ttf"),
    });
  };

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={() => fetchFonts()}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <>
      <Provider>
        {/* <View
          style={{
            height: 35,
            width: "100%",
            backgroundColor: Colors.bg,
          }}
        ></View> */}
        <StatusBar style="light" />
        <AppNavigator />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
  },
});
