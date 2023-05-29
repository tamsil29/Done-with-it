import { useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Alert, FlatList, Keyboard } from "react-native";
import colors from "../config/colors";
import Message from "../components/Message";
import Icon from "../components/Icon";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppTextInput from "../components/AppTextInput";
import useApi from "../hooks/useApi";
import messagesApi from "../api/message";
import useAuth from "../auth/useAuth";
import useNotifications from "../hooks/useNotifications";

function ChatScreen() {
  const route = useRoute();
  const { user } = useAuth();
  const conversation = route.params as any;
  const [height, setHeight] = useState(0);
  const [message, setMessage] = useState("");
  const flatListRef = useRef(null as any);
  useNotifications({
    notificationListener: (notification: Notification) => {
      // if(notification.data._id === conversation._id) getMessages()
      console.log(notification?.data);
    },
  });

  const {
    data,
    request: getConvos,
    isLoading,
  } = useApi(messagesApi.getMessages);
  const postMessage = useApi(messagesApi.postMessage);

  useEffect(() => {
    getMessages();
    // flatListRef.current.scrollToEnd()
  }, []);

  const getMessages = async () => {
    await getConvos(conversation?._id);
  };

  const handleSend = async () => {
    if (!message.length) return Alert.alert("Error", "Please enter a message");

    const result = await postMessage.request({
      conversationId: conversation?._id,
      message: message,
    });
    if (!result.ok) return Alert.alert("Error", "Cannot send message");

    setMessage("");
    getMessages();
    // Keyboard.dismiss()
    // flatListRef.current.scrollToEnd()
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={data}
          keyExtractor={(messages) => messages._id.toString()}
          renderItem={({ item }) => (
            <Message
              message={item?.message}
              isSelf={item?.createdBy?._id === user._id}
              time={item?.createdAt}
            />
          )}
        />
      </View>
      <View style={styles.chatContainer}>
        <View style={styles.inputContainer}>
          <AppTextInput
            value={message}
            multiline
            width={"85%"}
            style={{
              height: Math.max(35, height),
              maxHeight: 52,
              fontSize: 16,
            }}
            onContentSizeChange={(event) => {
              setHeight(event.nativeEvent.contentSize.height);
            }}
            onChangeText={(text) => setMessage(text)}
            placeholder="Type your message here.."
          />
          <TouchableOpacity onPress={handleSend}>
            <Icon name={"send"} backgroundColor={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    flex: 1,
  },
  chatContainer: {
    // maxHeight: 100,
    backgroundColor: colors.white,
    justifyContent: "center",
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ChatScreen;
