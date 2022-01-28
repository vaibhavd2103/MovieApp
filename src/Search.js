import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  Image,
  TouchableOpacity,
  Animated,
  TextInput,
} from "react-native";
import { Container } from "../Components/GlobalComponents";
import instance from "../axios";
import { API_KEY, requests } from "../requests";
import { Colors, Font, Sizes } from "../Constants/Constants";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { MovieDetailPopUp, MovieTile } from "../Components/HomeComponents";
import { Modal, Portal } from "react-native-paper";
import { AntDesign, Entypo } from "@expo/vector-icons";
import axios from "axios";

const imageUrl = "https://image.tmdb.org/t/p/original/";

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllMovies = async () => {
      const trending = await instance.get(requests.fetchTrending);
      //  console.log(trending.data);
      //  console.log(trending.data.results[0].id);
      setMovies(trending.data.results);
      setLoading(false);
    };
    fetchAllMovies();
  }, []);

  return (
    <Container>
      <View>
        <Text style={{ ...Font.title, marginBottom: 20, marginTop: 10 }}>
          Search Movie
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 15,
          width: Sizes.width - 40,
          backgroundColor: Colors.lightBg,
          alignItems: "center",
          borderRadius: 10,
          alignSelf: "center",
        }}
      >
        <Feather name="search" size={24} color="white" />
        <TextInput
          placeholder="Search for a movie"
          placeholderTextColor={"#8d8d8d"}
          style={{
            height: 50,
            paddingLeft: 10,
            backgroundColor: Colors.lightBg,
            color: Colors.white,
            fontSize: 14,
            fontFamily: "QuickSemiBold",
            width: Sizes.width - 90,
          }}
        />
      </View>
      {loading ? (
        <View>
          <Text style={{ ...Font.title, fontSize: 30 }}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          style={{ width: Sizes.width, marginTop: 20 }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: (Sizes.width - 250) * 0.56,
                  width: "100%",
                  marginBottom: 10,
                  backgroundColor: "#15151577",
                }}
              >
                <Image
                  source={{ uri: `${imageUrl}${item.backdrop_path}` }}
                  style={{
                    width: Sizes.width - 250,
                    height: (Sizes.width - 250) * 0.56,
                    borderRadius: 5,
                  }}
                />
                <View style={{ flex: 1, paddingLeft: 10 }}>
                  <Text
                    style={{ ...Font.semiBold, maxWidth: Sizes.width - 200 }}
                  >
                    {item.original_title ? item.original_title : "Unknown"}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 5,
                    }}
                  >
                    <AntDesign name="star" size={18} color={Colors.yellow} />
                    <Text
                      style={{ ...Font.light, marginLeft: 5, opacity: 0.7 }}
                    >
                      {item && item.vote_average
                        ? item.vote_average
                        : "Unknown"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </Container>
  );
};

export default Search;

const styles = StyleSheet.create({});
