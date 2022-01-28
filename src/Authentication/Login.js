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
    <Container bg={true} style={{ paddingHorizontal: 20 }}>
      <View style={styles.header}>
        <Text style={{ ...Font.title, fontSize: 24 }}>Log in</Text>
      </View>
      <View
        style={{
          marginTop: 40,
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
                fontFamily: "QuickBold",
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
                fontFamily: "QuickBold",
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
        style={{ marginTop: 50 }}
        onPress={() => {
          props.navigation.navigate("Home");
        }}
      >
        <LinearBorder>
          <Text style={Font.title}>Login</Text>
        </LinearBorder>
      </TouchableOpacity>
    </Container>
  );
};

export default Login;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
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
    marginTop: 10,
  },
});
