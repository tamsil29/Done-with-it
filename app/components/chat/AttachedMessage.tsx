import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  isSelfSelected?: boolean;
  message: any;
  onClose: () => void;
}

function AttachedMessage({ isSelfSelected = false, message, onClose }: Props) {
  return (
    <View
      style={[
        styles.container,
        isSelfSelected
          ? { backgroundColor: "#fd969c" }
          : { backgroundColor: "#A9A9A9" },
      ]}
    >
      <View style={styles.replyContainer}>
        <AppText style={styles.heading}>
          Replying to {isSelfSelected ? "Yourself" : message?.createdBy?.name}
        </AppText>
        <AppText style={styles.message} numberOfLines={1}>
          {message?.message}
        </AppText>
      </View>
      <MaterialCommunityIcons
        name="close-circle"
        size={25}
        color={"#3a3b3c"}
        style={{ top: 2, right: 2, position: 'absolute' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    justifyContent: "space-between",
    flexDirection: "row",
    borderTopRightRadius: 15,
  },
  replyContainer: {
    padding: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3a3b3c",
  },
  message: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3a3b3c",
  },
});

export default AttachedMessage;
