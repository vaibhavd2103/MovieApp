import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Container, LinearBorder } from "../../Components/GlobalComponents";
import { Font, Sizes, Colors } from "../../Constants/Constants";
import { AntDesign, FontAwesome, Feather } from "@expo/vector-icons";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Container
      style={{
        paddingHorizontal: 20,
        justifyContent: "center",
        height: "100%",
      }}
    >
      <View style={styles.header}>
        <Text style={{ ...Font.title, fontSize: 24 }}>Log in</Text>
      </View>
      <View
        style={{
          marginTop: 40,
          width: "100%",
        }}
      >
        <Text style={{ ...Font.normal }}>
          Login with one of the following options
        </Text>
        <View style={styles.optionView}>
          <TouchableOpacity style={styles.optionButton}>
            <AntDesign name="google" size={24} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <FontAwesome name="facebook-f" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: 40 }}>
        <Text style={{ ...Font.semiBold, fontSize: 15, marginLeft: 10 }}>
          Email
        </Text>
        <View style={{ marginTop: 10 }}>
          <LinearBorder style={{ flexDirection: "row" }}>
            <Feather name="mail" size={24} color={Colors.grey} />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Enter your email"
              placeholderTextColor={Colors.grey}
              style={{
                flex: 1,
                height: "100%",
                fontFamily: "QuickSemiBold",
                fontSize: 15,
                color: Colors.white,
                paddingLeft: 10,
              }}
              selectionColor={Colors.primary}
            />
          </LinearBorder>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ ...Font.semiBold, fontSize: 15, marginLeft: 10 }}>
          Password
        </Text>
        <View style={{ marginTop: 10 }}>
          <LinearBorder style={{ flexDirection: "row" }}>
            <Feather name="mail" size={24} color={Colors.grey} />
            <TextInput
              value={email}
              onChangeText={(text) => setPassword(text)}
              placeholder="Enter your password"
              placeholderTextColor={Colors.grey}
              style={{
                flex: 1,
                height: "100%",
                fontFamily: "QuickSemiBold",
                fontSize: 15,
                color: Colors.white,
                paddingLeft: 10,
              }}
              selectionColor={Colors.primary}
            />
          </LinearBorder>
        </View>
      </View>
      <TouchableOpacity
        style={styles.login}
        onPress={() => {
          props.navigation.navigate("Home");
        }}
      >
        <Text style={{ ...Font.title, bottom: 3 }}>Login</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 5,
          width: "100%",
          justifyContent: "space-evenly",
          marginBottom: 100,
        }}
      >
        <Text style={{ ...Font.light }}>Don't have an account?</Text>
        <TouchableOpacity>
          <Text style={{ ...Font.title, color: Colors.primary, fontSize: 15 }}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default Login;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    //     paddingTop: 20,
    width: "100%",
  },
  optionButton: {
    width: Sizes.width / 2 - 30,
    height: 56,
    borderWidth: 1,
    borderColor: "#fff3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightBg,
  },
  optionView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  login: {
    width: Sizes.width - 100,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 50,
  },
});
