import React, { Dispatch } from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../AppText";
import colors from "../../config/colors";
import { TouchableWithoutFeedback } from "react-native";

interface Props {
  isSelf: boolean;
  message: string;
  time: any;
  ishighlighted?: boolean;
  setHighlighted?: Dispatch<any>;
}

function Message({
  isSelf,
  message,
  time,
  ishighlighted = false,
  setHighlighted,
}: Props) {
  return (
    <TouchableWithoutFeedback onPress={setHighlighted}>
      <View style={[isSelf ? styles.selfMessageContainer : styles.container]}>
        <View
          style={[
            styles.messageContainer,
            isSelf
              ? {
                  backgroundColor: colors.primary,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 5,
                }
              : {
                  backgroundColor: colors.white,
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 20,
                },
            ishighlighted
              ? isSelf
                ? { backgroundColor: "#cc4141" }
                : { backgroundColor: "#DCDCDC" }
              : {},
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
        {ishighlighted && (
          <AppText style={styles.time}>
            {new Date(parseInt(time)).toLocaleString()}
          </AppText>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginHorizontal: 10,
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
  selfMessageContainer: {
    marginVertical: 5,
    marginHorizontal: 10,
    alignItems: "flex-end",
  },
});

export default Message;
