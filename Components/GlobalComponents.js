import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React, { useState } from "react";
import { Colors, Sizes } from "../Constants/Constants";
import { LinearGradient } from "expo-linear-gradient";

const Container = (props) => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      {/* {bg ? (
        <ImageBackground
          blurRadius={10}
          source={require("../assets/bg.png")}
          style={{
            height: "100%",
            width: Sizes.width,
            ...props.style,
          }}
          resizeMode="cover"

          //    blurRadius={1}
        >
          {props.children}
        </ImageBackground>
      ) : null} */}
      {props.children}
    </View>
  );
};

const LinearBorder = (props) => {
  return (
    <LinearGradient
      style={{ ...styles.gradientButton, ...props.style }}
      colors={[
        Colors.primary,
        Colors.mPurple,
        Colors.dPurple,
        Colors.mPurple,
        Colors.primary,
      ]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={{ ...styles.insideButton, ...props.style }}>
        {props.children}
      </View>
    </LinearGradient>
  );
};

export { Container, LinearBorder };

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: Sizes.width,
    backgroundColor: Colors.bg,
    alignItems: "center",
  },
  gradientButton: {
    width: "100%",
    padding: 2.2,
    height: 56,
    borderRadius: 10,
  },
  insideButton: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.bg,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
});
