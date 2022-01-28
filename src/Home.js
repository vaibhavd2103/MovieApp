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

const Home = (props) => {
  const [id, setId] = useState(Math.floor(Math.random() * 10));
  const [moviePoster, setMoviePoster] = useState();
  const [posterDetails, setPosterDetails] = useState({});
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [posters, setPosters] = useState([]);
  const [modal, setModal] = useState(false);
  const showModal = () => {
    setModal(true);
  };
  const hideModal = () => {
    setModal(false);
  };
  const imageUrl = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    setId(Math.floor(Math.random() * 20));
    const fetchAllMovies = async () => {
      const trending = await instance.get(requests.fetchTrending);
      setLoading(false);
      //  console.log(trending);
      //  console.log(trending.data.results[0].id);
      const posterDetails1 = await instance.get(
        `/movie/${trending.data.results[id].id}?api_key=${API_KEY}`
      );
      setPosterDetails(posterDetails1.data);
      const posters1 = await axios.get(
        `https://imdb-api.com/en/API/Posters/k_cv8041zd/${posterDetails1.data.imdb_id}`
      );
      //  console.log(posters1.data);
      const posters2 = posters1.data.posters;
      setPosters([{ key: "left" }, ...posters2, { key: "right" }]);
      //  console.log(posterDetails1.data)
      //  setLoading(false);
      setMovies(trending.data.results);
    };
    fetchAllMovies();
  }, []);

  const scrollX = useRef(new Animated.Value(0)).current;

  //   console.log(posters);
  const Spacing = 10;
  const Item_Size = Sizes.width * 0.8;
  const Spacer_Size = (Sizes.width - Item_Size) / 2;

  const Header = (
    <>
      <LinearGradient
        style={{
          height: (Sizes.width * 1.5) / 5,
          width: "100%",
          position: "absolute",
          paddingTop: 5,
          zIndex: 20,
        }}
        colors={["#000f", "#fff0"]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Image
            source={require("../assets/M.png")}
            style={{ height: 50, width: 50 }}
            resizeMode="cover"
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Search");
              }}
            >
              <Feather name="search" size={24} color="white" />
            </TouchableOpacity>
            <Image
              source={{
                uri: "https://media.gettyimages.com/photos/bearded-businessman-against-gray-background-picture-id1179627332?s=612x612",
              }}
              style={{
                height: 30,
                width: 30,
                borderRadius: 10,
                marginLeft: 20,
                marginRight: 15,
              }}
            />
          </View>
        </View>
      </LinearGradient>
      {
        <View
          style={{
            width: "100%",
            height: Sizes.width * 1.2,
            //   backgroundColor: "grey",
          }}
        >
          {/* <ImageBackground
            source={{ uri: `${imageUrl}${posterDetails.poster_path}` }}
            style={{ width: "100%", height: Sizes.width * 1.5 }}
          > */}
          {/* <Animated.FlatList
            data={posters}
            //   pagingEnabled
            snapToInterval={Item_Size}
            scrollEventThrottle={16}
            decelerationRate={0}
            bounces={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              //     top: 20,
              //     backgroundColor: "grey",
            }}
            horizontal={true}
            keyExtractor={(item) => {
              item.link;
            }}
            renderItem={({ item, index }) => {
              if (!item.link) {
                return <View style={{ width: Spacer_Size - 10 }}></View>;
              }

              const inputRange = [
                (index - 2) * Item_Size,
                (index - 1) * Item_Size,
                index * Item_Size,
              ];
              const translateY = scrollX.interpolate({
                inputRange,
                outputRange: [1, 1.2, 1],
              });
              return (
                <Animated.View
                  style={{
                    height: Item_Size * 1.5,
                    width: Item_Size,
                    transform: [
                      {
                        // translateY
                        scale: translateY,
                      },
                    ],
                    // alignItems: "center",
                    // backgroundColor: "grey",
                  }}
                >
                  <View
                    style={{
                      //   backgroundColor: "white",
                      height: "100%",
                      width: "100%",
                      padding: Spacing * 2,
                      marginHorizontal: Spacing,
                    }}
                  >
                    <Image
                      source={{ uri: item.link }}
                      style={{
                        height: "100%",
                        width: "100%",
                      }}
                    />
                  </View>
                </Animated.View>
              );
            }}
          /> */}
          <Image
            source={{ uri: `${imageUrl}${posterDetails.poster_path}` }}
            style={{ height: "100%", width: "100%", position: "absolute" }}
          />
          <LinearGradient
            style={{
              height: (Sizes.width * 1.2) / 3,
              width: "100%",
              position: "absolute",
              bottom: 0,
              justifyContent: "flex-end",
              padding: 20,
              alignItems: "center",
            }}
            colors={["#fff0", "#0b0b0b99", "#0b0b0bdd", Colors.bg]}
          >
            <Text
              style={{
                ...Font.title,
                fontFamily: "Staat",
                fontSize: 40,
                elevation: 10,
                textShadowColor: "black",
                position: "absolute",
                bottom: 0,
              }}
            >
              {posterDetails.original_title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                position: "absolute",
                bottom: -50,
                width: "100%",
              }}
            >
              <Text style={{ ...Font.light, opacity: 0.7, width: 40 }}>
                {posterDetails && posterDetails.release_date
                  ? posterDetails.release_date.slice(0, 4)
                  : "Unknown"}
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "white",
                  borderRadius: 10,
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  paddingBottom: 10,
                }}
              >
                <Entypo
                  name="controller-play"
                  size={20}
                  color="black"
                  style={{ top: 2 }}
                />
                <Text
                  style={{
                    ...Font.semiBold,
                    color: "black",
                    fontSize: 15,
                    marginRight: 4,
                  }}
                >
                  Play
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                }}
              >
                <AntDesign name="star" size={18} color={Colors.yellow} />
                <Text style={{ ...Font.light, marginLeft: 5, opacity: 0.7 }}>
                  {posterDetails && posterDetails.vote_average
                    ? posterDetails.vote_average
                    : "Unknown"}
                </Text>
              </View>
            </View>
          </LinearGradient>
          {/* </ImageBackground> */}
        </View>
      }
      <Text
        style={{
          ...Font.title,
          fontSize: 20,
          textAlign: "left",
          marginLeft: 20,
          marginTop: 70,
        }}
      >
        Movies for you
      </Text>
    </>
  );

  const Loader = (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: Sizes.height,
      }}
    >
      <Text style={{ ...Font.title, color: "white", fontSize: 30 }}>
        Loading...
      </Text>
    </View>
  );

  return (
    <>
      <Container bg={true}>
        <FlatList
          data={movies}
          numColumns={3}
          style={{
            width: Sizes.width,
            height: "100%",
          }}
          ListHeaderComponent={loading ? Loader : Header}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            return (
              <MovieTile
                item={item}
                index={index}
                selectedMovie={selectedMovie}
                setSelectedMovie={setSelectedMovie}
                showModal={showModal}
              />
            );
          }}
        />
      </Container>
      <Portal>
        <Modal
          visible={modal}
          onDismiss={hideModal}
          contentContainerStyle={{
            height: Sizes.height / 1.2,
            width: Sizes.width - 20,
            alignSelf: "center",
            backgroundColor: Colors.lightBg,
            borderRadius: 20,
          }}
        >
          <MovieDetailPopUp id={selectedMovie} />
        </Modal>
      </Portal>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
