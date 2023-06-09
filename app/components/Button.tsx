import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";

function Button({
  title,
  onPress,
  color = 'primary',
}: {
  title: string;
  onPress: React.Dispatch<any>;
  color?: keyof typeof colors;
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color as keyof typeof colors]}]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default Button;
