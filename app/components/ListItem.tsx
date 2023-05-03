import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import colors from "../config/colors";

interface Props {
  title: string;
  subTitle: string;
  image: string;
}

function ListItem({ title, subTitle, image }: Props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 10,
  },
  image: {
    borderRadius: 50,
    height: 70,
    width: 70,
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default ListItem;
