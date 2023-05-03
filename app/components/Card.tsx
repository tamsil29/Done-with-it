import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import colors from "../config/colors";

interface Props {
  title: string;
  subTitle: string;
  image: string;
}

function Card({ title, subTitle, image }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      <View style={styles.detailsContainer}>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>{title}</Text>
        <Text style={{ fontSize: 14 }}>{subTitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  image: { height: 200, width: "100%" },
  detailsContainer: {
    padding: 20,
    gap: 10,
  },
});

export default Card;
