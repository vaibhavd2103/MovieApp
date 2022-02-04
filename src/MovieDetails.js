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
  Linking,
  ToastAndroid,
} from "react-native";
import { Container } from "../Components/GlobalComponents";
import instance from "../axios";
import { API_KEY, requests } from "../requests";
import { Colors, Font, Sizes } from "../Constants/Constants";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import axios from "axios";

const imageUrl = "https://image.tmdb.org/t/p/original/";

const MovieDetails = (props) => {
  const id = props.route.params;
  const [movieId, setMovieId] = useState(id);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [IMDBid, setIMDBid] = useState("");
  const [cast, setCast] = useState([]);
  const [trailerURL, setTrailerURL] = useState("");
  const [similarMovies, setSimilarMovies] = useState([]);
  const [images, setImages] = useState([]);
  const [icon, setIcon] = useState({});
  const [selectedActor, setSelectedActor] = useState("");
  // const id = id
  useEffect(() => {
    const fetchData = async () => {
      const movieData = await instance.get(
        `/movie/${movieId}?api_key=${API_KEY}`
      );
      const images = await instance.get(
        `/movie/${movieId}/images?api_key=${API_KEY}`
      );
      //  console.log(movieData.data);
      //  console.log(images.data);
      //  setLoading(false);
      const castData = await instance.get(
        `/movie/${movieId}/credits?api_key=${API_KEY}`
      );
      //  console.log(castData.data);
      //  await axios.get(
      //    `https://imdb-api.com/API/FullCast/k_cv8041zd/${movieData.data.imdb_id}`
      //  );
      //  console.log(castData.data);
      const trailerData = await axios.get(
        `https://imdb-api.com/en/API/Trailer/k_cv8041zd/${movieData.data.imdb_id}`
      );
      const similar = await instance.get(
        `/movie/${movieId}/similar?api_key=${API_KEY}`
      );
      //  console.log(similar.data.results);
      //  setLoading(false);
      setIcon(images.data.logos[0]);
      setData(movieData.data);
      setLoading(false);
      setImages(images.data.posters);
      //  setCast(castData.data.actors);
      setCast(castData.data.cast);
      setTrailerURL(trailerData.data.linkEmbed);
      setSimilarMovies(similar.data.results);
    };
    fetchData();
  }, [movieId]);

  //   k_cv8041zd
  // k_n6knabti

  const [currentIndex, setCurrentIndex] = useState(0);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const ImagesRef = useRef(null);

  const scrollToForward = () => {
    if (currentIndex < images.length - 1) {
      ImagesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      console.log("Last Item");
    }
  };

  const scrollToBackward = () => {
    if (currentIndex > 0) {
      ImagesRef.current.scrollToIndex({ index: currentIndex - 1 });
    } else {
      console.log("First Item");
    }
  };

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
              <View
                style={{
                  height: (Sizes.width * 13.5) / 9,
                  width: Sizes.width,
                }}
              >
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    backgroundColor: "rgba(0,0,0,0.4)",
                    left: 15,
                    top: 40,
                    zIndex: 10,
                    borderRadius: 10,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  }}
                  onPress={() => {
                    props.navigation.goBack();
                  }}
                >
                  <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    backgroundColor: "rgba(0,0,0,0.4)",
                    right: 15,
                    top: (Sizes.width * 1.3) / 2,
                    zIndex: 10,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 20,
                  }}
                  onPress={() => {
                    scrollToForward();
                  }}
                >
                  <Ionicons name="chevron-forward" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    backgroundColor: "rgba(0,0,0,0.4)",
                    left: 15,
                    top: (Sizes.width * 1.3) / 2,
                    zIndex: 10,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 20,
                  }}
                  onPress={() => {
                    scrollToBackward();
                  }}
                >
                  <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
                <FlatList
                  data={images}
                  onViewableItemsChanged={viewableItemsChanged}
                  snapToAlignment="center"
                  viewabilityConfig={viewConfig}
                  ref={ImagesRef}
                  pagingEnabled
                  horizontal={true}
                  keyExtractor={(item) => item.file_path}
                  renderItem={({ item }) => {
                    return (
                      <View
                        style={{
                          height: (Sizes.width * 13.5) / 9,
                          width: Sizes.width,
                          backgroundColor: Colors.lightBg,
                        }}
                      >
                        <Image
                          source={{ uri: `${imageUrl}${item.file_path}` }}
                          style={{
                            width: "100%",
                            height: (Sizes.width * 13.5) / 9,
                          }}
                        />
                      </View>
                    );
                  }}
                />
                <LinearGradient
                  style={{
                    height: (Sizes.width * 1.7) / 3,
                    width: "100%",
                    position: "absolute",
                    bottom: 0,
                    justifyContent: "flex-end",
                    padding: 20,
                    alignItems: "center",
                  }}
                  colors={["#fff0", "#0f0f0fdd", Colors.bg]}
                >
                  {icon && icon.file_path ? (
                    <Image
                      source={{ uri: `${imageUrl}${icon.file_path}` }}
                      style={{
                        width: Sizes.width - 50,
                        //     height: (Sizes.width - 50) / icon.aspect_ratio,
                        height: (Sizes.width * 4) / 14,
                      }}
                      resizeMode="contain"
                    />
                  ) : (
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
                  )}
                </LinearGradient>
              </View>
              {/* <ImageBackground
                source={{ uri: `${imageUrl}${data.poster_path}` }}
                style={{
                  width: "100%",
                  height: (Sizes.width * 16) / 9,
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
                  colors={["#fff0", "#0f0f0f99", Colors.bg]}
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
              </ImageBackground> */}
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
              <TouchableOpacity
                onPress={() => {
                  trailerURL === ""
                    ? ToastAndroid.CENTER("Trailer not available at the moment")
                    : Linking.openURL(trailerURL);
                }}
                style={{ flexDirection: "row", marginTop: 15 }}
              >
                <Text
                  style={{
                    ...Font.title,

                    textAlign: "left",
                    fontSize: 15,
                    paddingLeft: 10,
                    maxWidth: Sizes.width - 30,
                  }}
                >
                  Watch trailer {">"}{" "}
                </Text>
                <Text
                  style={{
                    opacity: 0.5,
                    ...Font.normal,
                    textAlign: "left",
                    fontSize: 15,
                    maxWidth: Sizes.width - 100,
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {trailerURL === ""
                    ? "Not available at the moment"
                    : trailerURL}
                </Text>
              </TouchableOpacity>
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
                    alignItems: "center",
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
                      <TouchableOpacity
                        style={{
                          margin: 5,
                          height: (Sizes.width / 2.5 - 40) * 1.5,
                          width: Sizes.width / 2.5 - 40,
                          borderRadius: 5,
                          backgroundColor: Colors.lightBg,
                        }}
                        onPress={() => {
                          //  props.navigation.navigate("MovieDetails", item.id);
                          setLoading(true);
                          setMovieId(item.id);
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
                        {/* <Text style={{ color: "white" }}>{item.title}</Text> */}
                      </TouchableOpacity>
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
                      <TouchableOpacity
                        style={{
                          margin: 5,
                          backgroundColor:
                            selectedActor === item.id
                              ? Colors.lightBg
                              : Colors.lightBg,
                          borderRadius: 10,
                          paddingBottom: 5,
                        }}
                        key={i}
                        onPress={() => {
                          setSelectedActor(item.id);
                        }}
                      >
                        <ImageBackground
                          source={{
                            //    uri: item.image,
                            uri: `${imageUrl}${item.profile_path}`,
                          }}
                          style={{
                            height: (Sizes.width / 3 - 40) * 1.5,
                            width: Sizes.width / 3 - 40,
                          }}
                          borderRadius={10}
                          resizeMode="cover"
                        >
                          {selectedActor === item.id ? (
                            <TouchableOpacity
                              style={{
                                height: "100%",
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "rgba(0,0,0,0.5)",
                              }}
                              onPress={() => {
                                props.navigation.navigate(
                                  "ActorDetails",
                                  item.id
                                );
                              }}
                            >
                              <Text
                                style={{
                                  ...Font.normal,
                                  fontSize: 13,
                                  textAlign: "center",
                                }}
                              >
                                View{"\n"}Details
                              </Text>
                            </TouchableOpacity>
                          ) : null}
                        </ImageBackground>
                        <Text
                          style={{
                            ...Font.light,
                            maxWidth: Sizes.width / 3 - 40,
                            textAlign: "center",
                          }}
                          numberOfLines={selectedActor === item.id ? 0 : 2}
                          ellipsizeMode="tail"
                        >
                          {/* {item.name} */}
                          {item.original_name}
                          {"\n"}
                          <Text
                            style={{
                              ...Font.header,
                              fontSize: 14,
                              color:
                                selectedActor === item.id
                                  ? Colors.yellow
                                  : Colors.primary,
                            }}
                          >
                            {/* {item.asCharacter} */}
                            {item.character}
                          </Text>
                        </Text>
                      </TouchableOpacity>
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
