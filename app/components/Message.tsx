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
  // const date = format(new Date(time), 'dd MMM YYYY HH:mm:ss')
  const date = new Date(time).toDateString()
  console.log(date)
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
          {message}
        </AppText>
      </View>
      {/* <AppText style={styles.time}>{format(new Date(time), 'dd MMM yyyy HH:mm:ss')}</AppText> */}
      <AppText style={styles.time}>{time}</AppText>
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
