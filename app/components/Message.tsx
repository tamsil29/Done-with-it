import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";

function Message({ isSelf = true }: { isSelf?: boolean }) {
  return (
    <View style={[isSelf ? styles.selfMessageStyle : styles.container]}>
      <View
        style={[
          styles.messageContainer,
          isSelf
            ? { backgroundColor: colors.primary }
            : { backgroundColor: colors.white },
        ]}
      >
        <AppText
          style={[
            styles.message,
            isSelf ? { color: colors.white } : { color: colors.dark },
          ]}
        >
          123
        </AppText>
      </View>
      <AppText style={styles.time}>20 July 2022</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    alignItems: "flex-start",
  },
  messageContainer: {
    borderRadius: 20,
    padding: 10,
    maxWidth: "70%",
  },
  message: {
    fontSize: 16,
    fontWeight: "600",
  },
  time: {
    fontSize: 10,
    marginTop: 2,
    marginHorizontal: 5,
    color: colors.medium,
    fontWeight: "bold",
  },
  selfMessageStyle: {
    margin: 15,
    alignItems: "flex-end",
  },
});

export default Message;
