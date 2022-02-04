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
import { Colors, Font, Sizes, yyyy } from "../Constants/Constants";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import axios from "axios";

const imageUrl = "https://image.tmdb.org/t/p/original/";

const ActorDetails = (props) => {
  const id = props.route.params;
  //   console.log(id);
  const [loading, setLoading] = useState(true);
  const [actorDetails, setActorDetails] = useState({});
  const [year, setYear] = useState(yyyy);
  const [images, setImages] = useState([]);
  const [viewMore, setViewMore] = useState(false);
  const [moreMovies, setMoreMovies] = useState([]);

  useEffect(() => {
    const fetchActorDetails = async () => {
      const details = await instance.get(`/person/${id}?api_key=${API_KEY}`);
      const moreMovies = await instance.get(
        `/person/${id}/movie_credits?api_key=${API_KEY}`
      );
      //  console.log(moreMovies.data.cast);
      const images = await instance.get(
        `/person/${id}/images?api_key=${API_KEY}`
      );
      //  console.log(images.data.profiles);
      setActorDetails(details.data);
      setLoading(false);
      setMoreMovies(moreMovies.data.cast);
      setYear(details.data.birthday.slice(0, 4));
      setImages(images.data.profiles);
    };
    fetchActorDetails();
  }, []);

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

      <Container>
        {loading && (
          <Text style={{ ...Font.title, marginTop: 100 }}>Loading...</Text>
        )}
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 20,
          }}
        >
          <View
            style={{
              width: Sizes.width,
              height: Sizes.width * 1.5,
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
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{ uri: `${imageUrl}${item.file_path}` }}
                      style={{
                        width: Sizes.width - 0,
                        height: ((Sizes.width - 0) * 13.5) / 9,
                        borderRadius: 20,
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
              <Text
                style={{
                  ...Font.title,
                  fontFamily: "Staat",
                  fontSize: 40,
                  elevation: 10,
                  textShadowColor: "black",
                  letterSpacing: 4,
                }}
              >
                {actorDetails && actorDetails.name
                  ? actorDetails.name
                  : "Unknown"}
              </Text>
            </LinearGradient>
          </View>
          {/* <ImageBackground
            source={{ uri: `${imageUrl}${actorDetails.profile_path}` }}
            style={{
              width: Sizes.width,
              height: (Sizes.width * 16) / 9,
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Text
              style={{
                ...Font.title,
                fontFamily: "Staat",
                fontSize: 40,
                elevation: 10,
                textShadowColor: "black",
                letterSpacing: 4,
              }}
            >
              {actorDetails.name}
            </Text>
          </ImageBackground> */}
          <Text
            style={{
              ...Font.title,
              marginTop: 15,
              textAlign: "left",
              fontSize: 15,
              paddingLeft: 10,
            }}
          >
            Biography
          </Text>
          <Text
            style={{
              ...Font.normal,
              textAlign: "left",
              paddingHorizontal: 10,
              opacity: 0.6,
            }}
            numberOfLines={viewMore ? 0 : 10}
            ellipsizeMode="tail"
          >
            {actorDetails.biography}
          </Text>
          {!viewMore ? (
            <TouchableOpacity
              onPress={() => {
                setViewMore(true);
              }}
            >
              <Text
                style={{
                  ...Font.header,
                  fontSize: 13,
                  color: Colors.primary,
                  textAlign: "left",
                  paddingLeft: 10,
                }}
              >
                View more
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setViewMore(false);
              }}
            >
              <Text
                style={{
                  ...Font.header,
                  fontSize: 13,
                  color: Colors.primary,
                  textAlign: "left",
                  paddingLeft: 10,
                }}
              >
                View less
              </Text>
            </TouchableOpacity>
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
            Born
          </Text>
          <Text
            style={{
              ...Font.normal,
              textAlign: "left",
              paddingHorizontal: 10,
              opacity: 0.6,
            }}
          >
            {actorDetails.birthday}{" "}
            <Text style={{ color: Colors.yellow, opacity: 1 }}>
              {`(${parseInt(yyyy - year)} years old)`}
            </Text>
            {"\n"}
            {actorDetails.place_of_birth}
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
            More by{" "}
            <Text style={{ color: Colors.yellow }}>{actorDetails.name}</Text>
          </Text>
          <FlatList
            horizontal
            data={moreMovies}
            keyExtractor={(item) => {
              item.id;
            }}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    width: Sizes.width / 3,
                    borderRadius: 10,
                    backgroundColor: Colors.lightBg,
                    margin: 5,
                  }}
                >
                  <Image
                    source={{ uri: `${imageUrl}${item.poster_path}` }}
                    style={{
                      width: Sizes.width / 3,
                      height: (Sizes.width / 3) * 1.5,
                      borderRadius: 10,
                    }}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  />
                  <Text style={{ ...Font.light, textAlign: "center" }}>
                    {item.title}
                  </Text>
                </View>
              );
            }}
          />
        </ScrollView>
      </Container>
    </>
  );
};

export default ActorDetails;

const styles = StyleSheet.create({});
