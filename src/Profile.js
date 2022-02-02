import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TextInput,
  FlatList,
  Animated,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Container } from "../Components/GlobalComponents";
import { Font, Sizes, Colors } from "../Constants/Constants";
import { Feather, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { PlanTile } from "../Components/ProfileComponents";

// import AsyncStorage from "@react-native-async-storage/async-storage";

const Spacing = 10;
const Item_Size = Sizes.width * 0.6;
const Spacer_Size = (Sizes.width - Item_Size) / 2;

const Profile = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const FlatRef = useRef(null);

  const [image, setImage] = useState(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAilBMVEX///82NjYxMTE3NzcuLi4jIyP8/PwqKiolJSUoKCgwMDAgICAdHR339/fz8/Pp6enc3NyUlJTj4+O3t7c/Pz/T09OMjIyurq6fn5/AwMBcXFzOzs6EhISmpqZVVVV4eHhISEhERERvb29lZWUWFhaRkZFpaWmFhYW9vb1OTk4SEhJ8fHzHx8cAAAAT6SZ6AAANBklEQVR4nO1d2XKjOhAFIYTY8Qo28W4nccL9/9+7AuyYRcII5CCmch6mpiYTm0NL6lavivKHP/zhD38YAxAa+gleDaT88xQTb+gneCnIGvX0yK//+wDP8jqs/oOnzWLqZ/A898bu3yCJ/Jj8GTkQ27qOMTYNCLT9ejeZBf8EwfSQCU6X2P/cqwUAAA3s6KfNVPknjlr/+2wc5modAONtOPZTyJt9X3VIYUegZSTVyTg5ZjrQna3PGAI6vx+YzmakGtPdzHXrCbtckvp1McbdGM/xM+k9NqQTjUuKiAhk8tWaXwr75I1JjORR33QefgRwPh2VGDcOJ0GyUuFi6KfmQMBPMFUcwXgW6jtDAz6hOHeHfvC2CHg34Q16OPSTt0J6zHQSoapax/SwGcFCdU0uRfEAuKbspGeIlLDjIiUqYy39Ok3fv691JUikqO99uYVINuHi0MIYZcNYD83hGWK94ya8QbMlX6gL3IsfYQisoTk0wjv0k2AKOxmaRROWZm+CKvyW9qxBivfVn6Cqymy8TQwRDJ1gaB4sILTvvwsJ8GxoJkx0ujTVYUyGJsJE2FdV5IC7oYkwsex4p6jAeh+aCBPHXvbag6G8httRkAxPQxNhouvNt8pQ3n0YCVGHKrwMTYSJUIDNRmBuhibCxKrz5b4EiTX+QozGl/hyMRXEUFq7VPHE2DR2PXFDFrg9fFAFQHlvT+gq4m4BDrJegAlOIsw2IK/Rpig7EUaNdRyaRgOEXC7g29A0GiDEbJP4AqwoMxHqwpTZJZyIMNvwamgaDQhsAQztWGJ/qX8WwNCZDk2kCSI8wl/ymjQEIvbheWgSbCCkCAjMqJa8gW7yXO/9zTawlZehEp1EmN77UzQ0ERYWZ0H+0nM8NBUGIjGOKGLVyCrEpRhnIrG9P4amwsCHGIewqkl7u1gaYrwY8spQTARYlfj+JCh8SBjK6vRORDHUZXUJT0UxxLK6hN25kEQFcphKW0WzFsMwtUwlhSCVbyyHJsLE5z8fXfPFxJ4ceSMzguIWe2mvh4IsU2ltthQrvb9lquky+0tRf1+bpn5JvEiFZEVJnC+UQkA2hsS6IgXa9xWi9OVdAdT72N+m6cjqhboBKX44664yzDBayOsszZBVSHbPhdbQGGoskfLdVYgSp86W0TmBz5DVT1rFtGsU0ZF9E/6g610fDv3grXHpdhOG3xJHncqIu1k2tswmdxmo2zKV1wFVR6fcqHSRjgadyoNkt9fK2PIvU6mdF3XwhzA0acOiNCCE+JfpeUTnTIoJZyxRM2SNirLg896ETalzvepAvB5+uBuLOfMDn0+EcGQiTMEViCKqYmwiVBBnips7OoYuH0FT3mgMCz7fSWOPbx9O+RKi7TG1Msux4GModTiGjhUfQ8l9+TTM+Bxuo7K7c3CWz0icncACv9U2Nuz4TG/Jo4Y0rPkYguvQD8wNzrQMcBj6gXnB7VAckysxg8fHj2zEsRmmPq/H1JQ145KFgNfZpo/NMI15GUpdV0kDd9oJlrk2lgZul/Bo4r9ph/zU5dJNhvfflhxxuqP8pwMDKsj8pYvPMcRIo/+yUzHi8+s72d1i+iX3FSNtpz9d20aquxFfW3ZnksnO1fA+UOSVI3muEMDc/iJkw/azEfT7aIQ9sNIjR1aGindM5ZY1X0nl+dlWiufwPm0mvZHoa1n9bmiTjVsp3IMWraQICl6orI7YciYS5ieiINrjfHLMvb0MEUowf35LBCB+LMtb+xdzPlnItVLj5d6+N2Iv3NbJwTN/ZoEDUDxaPjLfh6YBw56/JYOTRNne8VY77BiP5QhLDXS8a7O/Bs5Lt6ZCrhGAun2c5efyQMj6r4fvwC6LqehTSucFnZrcisbWKzGoFGla2FpnU68GYhlEa4xrG62YFpMKGR3ZBpy59m4r4YZ6GSrA9nbyuzer/IG8eDkvrk06wxwfLIr4WBUO1csKDEd9u00Y/CWrlWy9uc3aX5RC7AmdIq7/T6YfGerqcfZLrhyy9Uy9wa6uMyQWHK3SxLnkPywxbNi0ENv5KLrXIH8QtIj2X/Wt94QhwWflukgUp00rZ37SlgEY5/kkfpk54CUfc2yCZ3ky9AS8xKj8ok4NNj2PdgADz79XL1iv/uxI1EIbI4wagUBKUJoKAc4JVQG0KuknmtJ4D0Ws1/s57i6iq/NkbRYYMlrmpeZNLkaNGDKM87910wJoOofLz3rtesCmyiyYTY7k3OS4sDNLCvzr3TSw5iznKE/Eilh22nESBm4Pe8CP9o5uWEBVOZLUWFEkpLjb/PlTS43xTLzdpNNhn/NLtwWLFDThkt0Pw4bWlVnIDazZb71LMQoxCN68LmIMrt1KtBqq6VFWngi27JOwY89zY94hvziGHevsLHYk8Ghmqx2ye111bYAK8CcvwUXneldWC1mkvN0XhfHOYsgZVy3ga8W3UH2te905q0SyYJ1iVlr+tTNDwBm8Oho8x2cZjFjnppBgo2G6X7TPkBNr21qGRM+v+jRHoMc6P8vlXg41TOHS5iK3hb7huFv1asNi0NRTLdpm0+xSr085PzDam+ScGVsV6JQNEdRNWlpvee7s8BI4AnT9WjpT0gyntCvJuV5t2K9LEdHELVep169/Rz3NEG1psgFabVV1He95/+a25lu/RarVFgtSQop21W7RmCLifl16cbseYahv33GjNmIEKZFdWxc6pYVJz35obdsv9TrQVIbpHVXXn05zdvQdVNOypiHp24IF09TSpKxidapV07NZmNZy3G7viT/0nO2ouMeoEuzfhanNpCjy9nv3CWKkVYSF2AbtfyABLd3Pz5U+EjAshr7hkfJ91xngRFdc/UcrtEiIRyI6WNKLJwrKjj4rx+vfZarV/MsOBa5V0Ac2FcaR0/Nl++nh/INbdLfxBbTGp04ZKRXpU/3BIuZ/OM/DVDMh4w2Cip8CVZKGAayvJg8I6PbWoqpByCAVyvck5bVBuQfMBLRCa2HWiOnQCea1D64Y32TDVIUopnMmfJZrHIt4kZTuATWvgV49jXwhk3bVp043QV3H4Vtln9UEBA7uq765WWEIarKqgvLzU8Z165WXLWbSLjFOm0XoiunPWa5FQ9TWUZUzIRb1zc60UYaJiEExKSoqsS5CTf0qeR07t8+q4om3RljT8XI/Z5fSOUorzZMRYLHd8KQJjKhtSC4YHwXvJXXCjv04b5GyEdUp+4nh5oma35B62QtfRL2vlM51UY2y1SezhhJR2z11SM0eO5466ao4myt2BA0dUJ9sxImw3VD2XlKvto/5AEjUNOgMjcWa4rahWjLzqUkkhcQbYf3qU4A9m2BfL1sZP+8S0TtjFUY3izvCU1ADJzkEzbe/42EEU5XdQ2V6PaKVFDT0fRM0k/kO8yfrnhq8BtdbKpmYO+kDkF20IeRu+ANNhXeVSPeM/MQtukd+qWi4I4pdLJmvImPICHxiLxehMJP0Dpul832BSinD/WUyDIm8f75YVZF/MCuk3zPyQ8HNMGP4sm/qZCp2F6rZxYZ+vRA03r6AWxYf44y+uW+FDcJ6fC2rM5rYgyZDngLCuJPl5lXPeCwNzJnJQmY3lJE39GDEI/L4hrhbRQH0o4az71E7nN00Pkr/5HzMg/iFw5w/z9kVqB0yzymj6651JOwFTW4pgxGgETKuuAINzBFzg2fRPgFhkjoY8T3xZ1qKNCzLyDhMLwHCtX0GRia2kNHvNaTWJ+MIS/0N76/YhqwLlCiHZQV6ohwYP7K8ngk0TFCzB33QPR2xCWDrsj4X+y9QwVlSOnVyWwDbVyZzAc9Yn2uuXqEL0w+md132N5rzkl1xYK6Nl2wMy4YRNQCV2qrxDpuvEeTvQFOBaR9XSlNwxt9s9ZdojV8B1PfRtIkeyn62WEL7Jav1xbB0/S1uFF8ByTewX6IdXwZLN3efXMn67udRta2R7EmgW+8z736YtENehn7ETcWikgDqTk4PlYumWxJN3hj1zHIAQEf7/uxeU5q9ELSYbA0MucrXfgOaapnmdZmVIPao775JfRoeHUcqRQkM+3wKg5scxJSwL6I11vMFO6A0s9YiBta3k1h0YX529CSXLcSDbktg6Mb14/MVHQjR7ZzyV5erYxtDKEuLrMz98iXsqnDj6Dh3flOYFsSO9j5Jfqs/ZtazajpbrjUbd63DbA0Asa1uP2bBb7Yd+tnjXkBoGo5uvsQuANDQHXz9CAOv8r2/DT/ZfK9VPZVn8ajlnFFS+BVgQdO2re0uSqaDtxn6gTtNwo/TAZgYG7BbKqyWSs3UMTis3zZJkGdnysPwBi9IwsluC89nJ6VKpPqULJEYNDB2zmfzeryESfA4LKWjV4S/SGbRcndaH1Sy4mxbx6aJTSOHSf6O9eyfwXx72i2jcLXwpebTAOS6/jSIk89ZuNlEk8vlMomiTRjOVvEi8F1Xws5sbcF1VZNzz/3hD3/4wx9u+B+Yds5+5L2KrQAAAABJRU5ErkJggg=="
  );
  let nameRef = useRef(null);

  const [selected, setSelected] = useState("2");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState("Vaibhav Dange");

  const scrollX = useRef(new Animated.Value(0)).current;

  const plans = [
    { key: "0", id: "0" },
    {
      id: "1",
      name: "Basic",
      perks: {
        amount: "$7.99",
        screens: "1",
        quality: "480p (SD)",
      },
    },
    {
      id: "2",
      name: "Standard",
      perks: {
        amount: "$9.99",
        screens: "2",
        quality: "1080p (FHD)",
      },
    },
    {
      id: "3",
      name: "Premium",
      perks: {
        amount: "$11.99",
        screens: "4",
        quality: "2160p (UHD)",
      },
    },
    {
      key: "5",
      id: "5",
    },
  ];

  return (
    <ScrollView
      style={{ paddingTop: 40, backgroundColor: Colors.bg }}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <Text style={{ ...Font.title, marginBottom: 20 }}>Profile</Text>
      <ImageBackground
        source={{ uri: image }}
        style={{
          width: Sizes.width,
          height: Sizes.width,
          alignItems: "center",
          justifyContent: "center",
        }}
        blurRadius={7}
      >
        <View
          style={{
            width: Sizes.width,
            height: Sizes.width,
            position: "absolute",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        ></View>
        <LinearGradient
          style={{
            width: Sizes.width,
            height: Sizes.width / 3,
            position: "absolute",
            bottom: 0,
          }}
          colors={["#fff0", Colors.bg]}
        ></LinearGradient>
        <ImageBackground
          source={{ uri: image }}
          style={{
            width: Sizes.width / 1.6,
            height: Sizes.width / 1.6,
          }}
          borderRadius={50}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              position: "absolute",
              bottom: -5,
              right: -5,
              backgroundColor: "white",
              padding: 4,
              borderRadius: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              pickImage();
            }}
          >
            <Feather name="edit" size={17} color="black" />
            <Text
              style={{
                ...Font.semiBold,
                fontSize: 15,
                marginLeft: 5,
                color: "black",
              }}
            >
              Edit
            </Text>
          </TouchableOpacity>
        </ImageBackground>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: Sizes.width,
            justifyContent: "center",
            paddingHorizontal: 15,
          }}
        >
          <TextInput
            value={name}
            ref={(ref) => (nameRef = ref)}
            onFocus={() => {
              setEditable(true);
            }}
            onBlur={() => {
              setEditable(false);
            }}
            onChangeText={(text) => {
              setName(text);
            }}
            editable={editable}
            style={{
              ...Font.title,
              fontSize: 24,
              marginTop: 10,
              letterSpacing: 2,
              width: Sizes.width - 100,
              //     backgroundColor: "grey",
            }}
          />
          <TouchableOpacity
            style={{
              borderRadius: 10,
              position: "absolute",
              right: 15,
            }}
            onPress={() => {
              setEditable(true);
              nameRef.focus();
            }}
          >
            <Text
              style={{
                ...Font.semiBold,
                fontSize: 15,
                marginLeft: 5,
                color: "white",
              }}
            >
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <Text style={{ ...Font.normal, fontSize: 15, opacity: 0.5 }}>
        Click on a plan to select
      </Text>
      <Animated.FlatList
        style={{ flex: 1 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={plans}
        snapToInterval={Item_Size + Spacing * 2}
        scrollEventThrottle={16}
        onViewableItemsChanged={viewableItemsChanged}
        snapToAlignment="center"
        viewabilityConfig={viewConfig}
        ref={FlatRef}
        decelerationRate={0}
        //    pagingEnabled={true}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          if (!item.name) {
            return (
              <View
                style={{
                  width: Spacer_Size - 10,
                }}
              ></View>
            );
          }
          const inputRange = [
            (index - 2) * Item_Size + Spacing * 2,
            (index - 1) * Item_Size + Spacing * 2,
            index * Item_Size + Spacing * 2,
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -20, 0],
          });

          const rotate = scrollX.interpolate({
            inputRange,
            outputRange: ["45deg", "0deg", "-45deg"],
          });
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.1, 0.8],
          });

          return (
            <Animated.View
              style={{
                ...styles.planTile,
                backgroundColor:
                  selected === item.id ? Colors.dPurple : "#151515",
                transform: [
                  { translateY },
                  //  { rotateZ: rotate },
                  { scale },
                ],
              }}
            >
              <TouchableOpacity
                style={{
                  height: "100%",
                  width: "100%",
                  alignItems: "center",
                }}
                onPress={() => {
                  setSelected(item.id);
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  {[...Array(index)].map((item, i) => {
                    return (
                      <AntDesign
                        name="star"
                        size={24}
                        color={Colors.yellow}
                        key={i}
                      />
                    );
                  })}
                </View>
                <Text
                  style={{
                    ...Font.header,
                    textAlign: "center",
                    color: Colors.white,
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    ...Font.light,
                    textAlign: "center",
                    marginVertical: 5,
                    fontSize: 12,
                  }}
                >
                  {`Quality ${item.perks.quality}`}
                </Text>
                <Text
                  style={{ ...Font.light, textAlign: "center", fontSize: 12 }}
                >
                  {`Number of sceens ${item.perks.screens}`}
                </Text>
                <Text
                  style={{
                    ...Font.title,
                    textAlign: "center",
                    color:
                      selected === item.id ? Colors.yellow : Colors.primary,
                    marginTop: 10,
                  }}
                >
                  {item.perks.amount}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        }}
      />
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  planTile: {
    width: Item_Size,
    alignItems: "center",
    backgroundColor: "#151515",
    marginHorizontal: Spacing,
    borderRadius: 10,
    padding: 10,
    //     height: 150,
    marginVertical: 40,
    paddingBottom: 15,
  },
});
