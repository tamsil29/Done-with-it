import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";

interface Props {
    color?: string;
}

function MessageSwipeAction({color = ''}: Props) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="share-circle" size={30} color={color || colors.secondary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

export default MessageSwipeAction;
