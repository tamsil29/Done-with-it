import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";
import { format } from "date-fns";

interface Props{
  isSelf: boolean;
  message: string;
  time: any;
}

function Message({ isSelf, message, time }: Props) {
  return (
    <View style={[isSelf ? styles.selfMessageStyle : styles.container]}>
      <View
        style={[
          styles.messageContainer,
          isSelf
            ? { backgroundColor: colors.primary, borderBottomLeftRadius: 20, borderBottomRightRadius: 5 }
            : { backgroundColor: colors.white, borderBottomLeftRadius: 5, borderBottomRightRadius: 20 },
        ]}
      >
        <AppText
          style={[
            styles.message,
            isSelf ? { color: colors.white } : { color: colors.dark },
          ]}
        >
          {message}
        </AppText>
      </View>
      <AppText style={styles.time}>{new Date(parseInt(time)).toLocaleString()}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: "flex-start",
  },
  messageContainer: {
    // borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
