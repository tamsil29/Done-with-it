import React from "react";
import { View, Image, StyleSheet } from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'

import colors from "../config/colors";

function ViewImageScreen(props: any) {
  const img =
    "https://aarsunwoods.b-cdn.net/wp-content/uploads/2020/03/Sofa-Chair-for-Luxury-Home-UH-FP-0019.jpg";
  return (
    <View style={styles.container}>
      <View style={styles.closeIcon}>
        <MaterialCommunityIcons name="close" color='white' size={30}/>
      </View>
      <View style={styles.deleteIcon}>
      <MaterialCommunityIcons name="trash-can-outline" color='white' size={30}/>
      </View>
      <Image style={styles.image} resizeMode="contain" source={{ uri: img }} />
    </View>
  );
}

const styles = StyleSheet.create({
  closeIcon: {
    position: "absolute",
    top: 40,
    left: 30,
  },
  container: {
    backgroundColor: colors.black,
  },
  deleteIcon: {
    position: "absolute",
    top: 40,
    right: 30,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

export default ViewImageScreen;
