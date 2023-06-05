import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";

import colors from "../config/colors";
import useRouteNavigation from "../hooks/useRouteNavigation";

function ViewImageScreen() {
  const navigation = useRouteNavigation();
  const img =
    "https://aarsunwoods.b-cdn.net/wp-content/uploads/2020/03/Sofa-Chair-for-Luxury-Home-UH-FP-0019.jpg";
  return (
    <>
      <MaterialCommunityIcons
        name="close"
        color="white"
        size={30}
        style={styles.closeIcon}
        onPress={() => navigation.goBack()}
      />

      <MaterialCommunityIcons
        name="share"
        color="white"
        size={30}
        onPress={() => console.log(1234)}
        style={styles.deleteIcon}
      />
      <Swiper
        style={styles.swiper}
        activeDotColor={colors.primary}
        dotColor={colors.light}
        loop={false}

      >
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{ uri: img }}
        />
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{ uri: img }}
        />
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{ uri: img }}
        />
      </Swiper>
    </>
  );
}

const styles = StyleSheet.create({
  closeIcon: {
    position: "absolute",
    top: 40,
    left: 30,
    zIndex: 1,
  },
  container: {
    backgroundColor: colors.black,
  },
  deleteIcon: {
    position: "absolute",
    top: 40,
    right: 30,
    zIndex: 1,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  swiper: {
    backgroundColor: colors.black,
    position: "relative",
  },
});

export default ViewImageScreen;
