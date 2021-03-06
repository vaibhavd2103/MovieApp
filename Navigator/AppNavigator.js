import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../src/Authentication/Login";
import SignUp from "../src/Authentication/SignUp";
import Home from "../src/Home";
import Search from "../src/Search";
import MovieDetails from "../src/MovieDetails";
import Profile from "../src/Profile";
import ActorDetails from "../src/ActorDetails";

const AppNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen component={Login} name="Login" />
        <Stack.Screen component={SignUp} name="SignUp" />
        <Stack.Screen component={Home} name="Home" />
        <Stack.Screen component={Search} name="Search" />
        <Stack.Screen component={MovieDetails} name="MovieDetails" />
        <Stack.Screen component={ActorDetails} name="ActorDetails" />
        <Stack.Screen component={Profile} name="Profile" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
