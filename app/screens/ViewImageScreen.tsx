import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import useRouteNavigation from "../hooks/useRouteNavigation";

function ViewImageScreen() {
  const navigation = useRouteNavigation();
  const img =
    "https://aarsunwoods.b-cdn.net/wp-content/uploads/2020/03/Sofa-Chair-for-Luxury-Home-UH-FP-0019.jpg";
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="close"
        color="white"
        size={30}
        style={styles.closeIcon}
        onPress={() => navigation.goBack()}
      />

      <MaterialCommunityIcons
        name="trash-can-outline"
        color="white"
        size={30}
        onPress={() => console.log(1234)}
        style={styles.deleteIcon}
      />

      <Image style={styles.image} resizeMode="contain" source={{ uri: img }} />
    </View>
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
});

export default ViewImageScreen;
