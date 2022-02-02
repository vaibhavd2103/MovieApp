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
  ScrollView,
} from "react-native";
import { Container } from "../Components/GlobalComponents";
import instance from "../axios";
import { API_KEY, requests } from "../requests";
import { Colors, Font, Sizes } from "../Constants/Constants";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Entypo } from "@expo/vector-icons";
import axios from "axios";

const imageUrl = "https://image.tmdb.org/t/p/original/";

const MovieDetails = (props) => {
  const id = props.route.params;

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [IMDBid, setIMDBid] = useState("");
  const [cast, setCast] = useState([]);
  const [trailerURL, setTrailerURL] = useState("");
  const [similarMovies, setSimilarMovies] = useState([]);
  // const id = id
  useEffect(() => {
    const fetchData = async () => {
      const movieData = await instance.get(`/movie/${id}?api_key=${API_KEY}`);
      //  console.log(movieData.data);
      //  setLoading(false);
      const castData = await axios.get(
        `https://imdb-api.com/API/FullCast/k_cv8041zd/${movieData.data.imdb_id}`
      );
      //  console.log(castData.data);
      const trailerData = await axios.get(
        `https://imdb-api.com/en/API/Trailer/k_cv8041zd/${movieData.data.imdb_id}`
      );
      const similar = await instance.get(
        `/movie/${id}/similar?api_key=${API_KEY}`
      );
      //  console.log(similar.data.results);
      setLoading(false);
      setData(movieData.data);
      setCast(castData.data.actors);
      setTrailerURL(trailerData.data.linkEmbed);
      setSimilarMovies(similar.data.results);
    };
    fetchData();
  }, []);

  //   k_cv8041zd
  // k_n6knabti

  return (
    <>
      <LinearGradient
        style={{
          height: 40,
          width: "100%",
          position: "absolute",
          paddingTop: 5,
          zIndex: 20,
        }}
        colors={[Colors.bg, "#0b0b0bbb", "#fff0"]}
      ></LinearGradient>
      <Container
        style={{
          overflow: "hidden",
          width: "100%",
          height: "100%",
        }}
      >
        <ScrollView
          //    scrollEventThrottle={16}
          style={{ borderRadius: 10 }}
          contentContainerStyle={{ borderRadius: 10 }}
        >
          {loading ? (
            <Text
              style={{
                ...Font.title,
                textAlign: "center",
                fontSize: 30,
                marginTop: 100,
              }}
            >
              Loading...
            </Text>
          ) : (
            <>
              <ImageBackground
                source={{ uri: `${imageUrl}${data.backdrop_path}` }}
                style={{
                  width: "100%",
                  height: (Sizes.width - 20) / 1.8,
                }}
              >
                <LinearGradient
                  style={{
                    height: (Sizes.width * 1.5) / 4,
                    width: "100%",
                    position: "absolute",
                    bottom: -1,
                    justifyContent: "flex-end",
                    padding: 20,
                  }}
                  colors={["#fff0", "#0f0f0f99", Colors.lightBg]}
                >
                  <Text
                    style={{
                      ...Font.title,
                      fontFamily: "Staat",
                      fontSize: 30,
                      elevation: 10,
                      textShadowColor: "black",
                    }}
                  >
                    {data && data.original_title
                      ? data.original_title
                      : "Unknown"}
                  </Text>
                </LinearGradient>
              </ImageBackground>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Text style={{ ...Font.light, opacity: 0.7 }}>
                  {data && data.release_date
                    ? data.release_date.slice(0, 4)
                    : "Unknown"}
                </Text>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {data && data.genres ? (
                    data.genres.slice(0, 2).map((item, i) => {
                      return (
                        <Text style={{ ...Font.light, opacity: 0.7 }} key={i}>
                          {item.name}
                          {", "}
                        </Text>
                      );
                    })
                  ) : (
                    <Text>Unknown</Text>
                  )}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AntDesign name="star" size={18} color={Colors.yellow} />
                  <Text style={{ ...Font.light, marginLeft: 5, opacity: 0.7 }}>
                    {data && data.vote_average ? data.vote_average : "Unknown"}
                  </Text>
                </View>
              </View>
              <View style={{ paddingHorizontal: 10 }}>
                <Text
                  style={{
                    ...Font.title,
                    marginTop: 10,
                    textAlign: "left",
                    fontSize: 15,
                  }}
                >
                  Overview
                </Text>
                <Text style={{ ...Font.normal, opacity: 0.7 }}>
                  {data.overview}
                </Text>
              </View>
              <Text
                style={{
                  ...Font.title,
                  marginTop: 15,
                  textAlign: "left",
                  fontSize: 15,
                  paddingLeft: 10,
                }}
              >
                Watch trailer {">"} {trailerURL}
              </Text>
              <Text
                style={{
                  ...Font.title,
                  marginTop: 15,
                  textAlign: "left",
                  fontSize: 15,
                  paddingLeft: 10,
                }}
              >
                Collection
              </Text>
              {data.belongs_to_collection &&
              data.belongs_to_collection.backdrop_path ? (
                <ImageBackground
                  source={{
                    uri: `${imageUrl}${data.belongs_to_collection.backdrop_path}`,
                  }}
                  borderRadius={10}
                  style={{
                    width: "100%",
                    height: (Sizes.width - 20) / 1.8,
                    justifyContent: "center",
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      ...Font.title,
                      fontSize: 24,
                      maxWidth: Sizes.width - 40,
                    }}
                  >
                    {data.belongs_to_collection.name}
                  </Text>
                </ImageBackground>
              ) : (
                <Text
                  style={{
                    ...Font.light,
                    fontSize: 15,
                    opacity: 0.7,
                    paddingLeft: 10,
                  }}
                >
                  Unknown
                </Text>
              )}
              <Text
                style={{
                  ...Font.title,
                  marginTop: 15,
                  textAlign: "left",
                  fontSize: 15,
                  paddingLeft: 10,
                }}
              >
                Similar Movies
              </Text>
              <ScrollView style={{ paddingHorizontal: 10 }} horizontal={true}>
                {similarMovies ? (
                  similarMovies.map((item, i) => {
                    return (
                      <View
                        style={{
                          margin: 5,
                          height: (Sizes.width / 2.5 - 40) * 1.5,
                          width: Sizes.width / 2.5 - 40,
                          borderRadius: 5,
                          backgroundColor: Colors.lightBg,
                        }}
                        key={i}
                      >
                        <Image
                          source={{
                            uri: `${imageUrl}${item.poster_path}`,
                          }}
                          style={{
                            height: (Sizes.width / 2.5 - 40) * 1.5,
                            width: Sizes.width / 2.5 - 40,
                            borderRadius: 5,
                          }}
                          resizeMode="cover"
                        />
                      </View>
                    );
                  })
                ) : (
                  <Text
                    style={{
                      ...Font.light,
                      fontSize: 15,
                      opacity: 0.7,
                      paddingLeft: 10,
                    }}
                  >
                    Unknown
                  </Text>
                )}
              </ScrollView>
              <Text
                style={{
                  ...Font.title,
                  marginTop: 15,
                  textAlign: "left",
                  fontSize: 15,
                  paddingLeft: 10,
                }}
              >
                Cast
              </Text>
              <ScrollView style={{ paddingHorizontal: 10 }} horizontal={true}>
                {cast ? (
                  cast.map((item, i) => {
                    return (
                      <View style={{ margin: 5 }} key={i}>
                        <Image
                          source={{
                            uri: item.image,
                          }}
                          style={{
                            height: (Sizes.width / 3 - 40) * 1.5,
                            width: Sizes.width / 3 - 40,
                            borderRadius: 10,
                          }}
                          resizeMode="cover"
                        />
                        <Text
                          style={{
                            ...Font.light,
                            maxWidth: Sizes.width / 3 - 40,
                            textAlign: "center",
                          }}
                          numberOfLines={2}
                          ellipsizeMode="tail"
                        >
                          {item.name}
                          {"\n"}
                          <Text
                            style={{
                              color: Colors.primary,
                              fontFamily: "QuickBold",
                            }}
                          >
                            {item.asCharacter}
                          </Text>
                        </Text>
                      </View>
                    );
                  })
                ) : (
                  <Text
                    style={{
                      ...Font.light,
                      fontSize: 15,
                      opacity: 0.7,
                      paddingLeft: 10,
                    }}
                  >
                    Unknown
                  </Text>
                )}
              </ScrollView>
              <Text
                style={{
                  ...Font.title,
                  marginTop: 15,
                  textAlign: "left",
                  fontSize: 15,
                  paddingLeft: 10,
                  marginBottom: 10,
                }}
              >
                Production Companies
              </Text>
              <View style={{ paddingHorizontal: 10 }}>
                {data.production_companies ? (
                  data.production_companies.map((item, i) => {
                    return (
                      <View style={styles.companyTile} key={i}>
                        <Image
                          source={{
                            uri: `${imageUrl}${item.logo_path}`,
                          }}
                          style={{ height: 70, width: Sizes.width - 40 }}
                          resizeMode="contain"
                        />
                        <Text
                          style={{
                            ...Font.semiBold,
                            color: Colors.black,
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                    );
                  })
                ) : (
                  <Text
                    style={{
                      ...Font.light,
                      fontSize: 15,
                      opacity: 0.7,
                      paddingLeft: 10,
                    }}
                  >
                    Unknown
                  </Text>
                )}
              </View>
            </>
          )}
        </ScrollView>
      </Container>
    </>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  tile: {
    width: Sizes.width / 3 - 10,
    margin: 5,
    backgroundColor: Colors.lightBg,
    borderRadius: 5,
  },
  companyTile: {
    backgroundColor: Colors.white,
    marginBottom: 10,
    borderRadius: 10,
    padding: 5,
  },
});
