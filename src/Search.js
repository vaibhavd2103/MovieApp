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
  ScrollView,
  RefreshControl,
  ToastAndroid,
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

const Search = (props) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchedMovie, setSearchedMovie] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    const fetchAllMovies = async () => {
      const trending = await instance.get(requests.fetchAllMovies);
      const genres = await instance.get(`/genre/movie/list?api_key=${API_KEY}`);
      //  console.log(trending.data);
      //  console.log(trending.data.results[0].id);
      //  console.log(genres.data.genres);
      setMovies(trending.data.results);
      setGenres(genres.data.genres);
      setLoading(false);
    };
    fetchAllMovies();
  }, []);

  const handleSearch = async (text) => {
    const result = await instance.get(
      `/search/movie/?api_key=${API_KEY}&query=${text}`
    );
    //     console.log(result.data.results);
    setSearchedMovie(result.data.results);
  };

  const genreFetch = async () => {
    const response = await instance.get(
      `discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=1&with_genres=${selectedGenre}`
    );
    //     console.log(response.data.results);
    setMovies(response.data.results);
    setLoading(false);
  };

  const [refreshing, setRefreshing] = useState(false);

  const refresher = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      ToastAndroid.show("Refreshed", 500);
    }, 1000);
  };

  return (
    <Container>
      <Text style={{ ...Font.title, marginBottom: 20, marginTop: 40 }}>
        Search Movie
      </Text>
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
          onChangeText={(text) => handleSearch(text)}
        />
      </View>

      {loading ? (
        <View>
          <Text style={{ ...Font.title, fontSize: 30 }}>Loading...</Text>
        </View>
      ) : (
        <>
          <FlatList
            //   refreshControl={
            //     <RefreshControl refreshing={refreshing} onRefresh={refresher} />
            //   }
            data={searchedMovie.length === 0 ? movies : searchedMovie}
            style={{ width: Sizes.width }}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() => {
              return (
                //  <ScrollView horizontal style={{ width: "100%" }}>
                //    {genres.map((item) => {
                //      return (
                //        <TouchableOpacity
                //          key={item.id}
                //          style={{
                //            marginHorizontal: 5,
                //            backgroundColor:
                //              selectedGenre === item.id
                //                ? "#303030"
                //                : "transparent",
                //            height: 40,
                //            paddingHorizontal: 20,
                //            paddingTop: 8,
                //            borderRadius: 20,
                //            marginVertical: 10,
                //          }}
                //          onPress={() => {
                //            setSelectedGenre(item.id);
                //            setLoading(true);
                //            genreFetch();
                //          }}
                //        >
                //          <Text style={{ ...Font.normal }}>{item.name}</Text>
                //        </TouchableOpacity>
                //      );
                //    })}
                //  </ScrollView>
                <FlatList
                  data={genres}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={refresher}
                    />
                  }
                  horizontal
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        key={item.id}
                        style={{
                          marginHorizontal: 5,
                          backgroundColor:
                            selectedGenre === item.id
                              ? "#303030"
                              : "transparent",
                          height: 40,
                          paddingHorizontal: 20,
                          paddingTop: 8,
                          borderRadius: 20,
                          marginVertical: 10,
                        }}
                        onPress={() => {
                          setSelectedGenre(item.id);
                          setLoading(true);
                          genreFetch();
                        }}
                      >
                        <Text style={{ ...Font.normal }}>{item.name}</Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              );
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: 10,
                    backgroundColor: "#151515",
                  }}
                  onPress={() => {
                    props.navigation.navigate("MovieDetails", item.id);
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
                  <Text
                    style={{
                      ...Font.light,
                      opacity: 0.7,
                      width: 40,
                      position: "absolute",
                      bottom: 10,
                      right: 5,
                    }}
                  >
                    {item && item.release_date
                      ? item.release_date.slice(0, 4)
                      : "Unknown"}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </>
      )}
    </Container>
  );
};

export default Search;

const styles = StyleSheet.create({});
