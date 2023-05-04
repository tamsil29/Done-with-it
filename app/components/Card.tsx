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
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    overflow: "hidden",
    marginBottom: 20,
  },
  image: { height: 200, width: "100%" },
  detailsContainer: {
    padding: 20,
    gap: 10,
  },
  title: { fontSize: 18, fontWeight: "600" },
  subTitle: { fontSize: 18, color: colors.secondary, fontWeight: "bold" },
});

export default Card;
