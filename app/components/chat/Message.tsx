import React, { Dispatch, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../AppText";
import colors from "../../config/colors";
import { TouchableWithoutFeedback } from "react-native";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import MessageSwipeAction from "./MessageSwipeAction";

interface Props {
  isSelf: boolean;
  message: string;
  time: any;
  ishighlighted?: boolean;
  setHighlighted?: Dispatch<any>;
  isTyping?: boolean;
  isAttachedMessageSelf?: boolean;
  attachedMessage?: any;
  selectMessage?: any;
}

function Message({
  isSelf,
  message,
  time,
  ishighlighted = false,
  setHighlighted,
  isTyping,
  isAttachedMessageSelf = false,
  attachedMessage = "43",
  selectMessage,
}: Props) {
  const swipableRef = useRef<any>();

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={() =>
          !isTyping && isSelf && <MessageSwipeAction color={colors.primary} />
        }
        renderLeftActions={() => !isTyping && !isSelf && <MessageSwipeAction />}
        ref={swipableRef}
        onSwipeableOpen={() => {
          selectMessage();
          swipableRef.current?.close();
        }}
      >
        <View style={[isSelf ? styles.selfMessageContainer : styles.container]}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.attachedMessageContainer,
                isAttachedMessageSelf
                  ? { backgroundColor: "#fd969c" }
                  : { backgroundColor: "#A9A9A9" },
                isSelf
                  ? { borderBottomRightRadius: 5, borderBottomLeftRadius: 20 }
                  : { borderBottomRightRadius: 20, borderBottomLeftRadius: 5 },
              ]}
            >
              <AppText style={[styles.message, { color: colors.light }]}>
                baklol in the chat guyz
              </AppText>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={setHighlighted}>
            <View
              style={[
                isSelf
                  ? { alignItems: "flex-end" }
                  : { alignItems: "flex-start" },
              ]}
            >
              <View
                style={[
                  styles.messageContainer,
                  attachedMessage
                    ? isSelf
                      ? styles.hasReplySelf
                      : styles.hasReply
                    : isSelf
                    ? styles.hasNotReplySelf
                    : styles.hasNotReply,

                  ishighlighted || isTyping
                    ? isSelf
                      ? { backgroundColor: "#cc4141" }
                      : { backgroundColor: "#DCDCDC" }
                    : {},
                ]}
              >
                <AppText
                  style={[
                    styles.message,
                    isSelf
                      ? { color: colors.white }
                      : !isTyping
                      ? { color: colors.dark }
                      : { color: colors.dark },
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
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginHorizontal: 10,
    alignItems: "flex-start",
  },
  selfMessageContainer: {
    marginVertical: 5,
    marginHorizontal: 10,
    alignItems: "flex-end",
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
  attachedMessageContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    maxWidth: "70%",
    backgroundColor: colors.medium,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 2,
  },

  hasReplySelf: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: colors.primary,
  },
  hasNotReplySelf: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 20,
    backgroundColor: colors.primary,
  },
  hasReply: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: colors.white,
  },
  hasNotReply: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 5,
    backgroundColor: colors.white,
  },
});

export default Message;
