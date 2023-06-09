import { useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  FlatList,
  Keyboard,
  TextInput,
  ActivityIndicator,
  Modal,
} from "react-native";
import colors from "../config/colors";
import Message from "../components/chat/Message";
import Icon from "../components/Icon";
import { TouchableOpacity } from "react-native-gesture-handler";
import useApi from "../hooks/useApi";
import messagesApi from "../api/message";
import useAuth from "../auth/useAuth";
import ChatHeader from "../components/chat/ChatHeader";
import Screen from "../components/Screen";
import useRouteNavigation from "../hooks/useRouteNavigation";
import { useAppNotifications } from "../notification/useAppNotifications";
import { getUserImage } from "../utility/utilities";
import ProfileScreen from "./ProfileScreen";

function ChatScreen() {
  const { notification, dismissNotification } = useAppNotifications();
  const navigation = useRouteNavigation();
  const route = useRoute();
  const { user } = useAuth();
  const conversation = route.params as any;
  const [height, setHeight] = useState(0);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([] as any[]);
  const [paginate, setPaginate] = useState(true);
  const [highlightedMessageId, setHighlightedMessageId] = useState("");
  const [page, setPage] = useState(1);
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);

  const {
    data,
    request: getConvos,
    isLoading,
  } = useApi(messagesApi.getMessages);
  const postMessage = useApi(messagesApi.postMessage);

  const { request: messageSeen } = useApi(messagesApi.updateSeenMessage);

  useEffect(() => {
    if (notification && notification.request.content.data?.type === "chat") {
      if (notification.request.content.data?.data?._id === conversation._id) {
        dismissNotification(notification.request.identifier);
        getMessages(1);
      }
    }
  }, [notification]);

  useEffect(() => {
    getMessages(page);
  }, [page]);

  useEffect(() => {
    messageSeen(conversation?._id);
  }, []);

  const getMessages = async (page: number) => {
    const result = await getConvos(conversation?._id, { page });
    if (!result.ok) return;

    result.data.data.length > 39 ? setPaginate(true) : setPaginate(false);

    if (page === 1) {
      setMessages(result.data.data);
    } else {
      if (result.data.data.length)
        setMessages([...messages, ...result.data.data]);
      else return;
    }
  };

  const handleSend = async () => {
    if (!message.length) return Alert.alert("Error", "Please enter a message");

    const result = await postMessage.request({
      conversationId: conversation?._id,
      message: message,
    });
    if (!result.ok) return Alert.alert("Error", "Cannot send message");

    setMessage("");
    let uniqueMessages = [...messages];
    if(uniqueMessages.length > 39) uniqueMessages.pop();
    setMessages([result.data.data, ...uniqueMessages]);
  };

  const handleHilighting = async (messageId: string) => {
    if (messageId === highlightedMessageId) setHighlightedMessageId("");
    else setHighlightedMessageId(messageId);
  };

  const secondaryUser =
    conversation.userId1 === user._id
      ? conversation.user2Data
      : conversation.user1Data;

  return (
    <Screen>
      <ChatHeader
        name={secondaryUser.name}
        email={secondaryUser.email}
        dp={getUserImage(secondaryUser.imageId)}
        onBackCick={() => navigation.goBack()}
        onNameCick={() => setProfileModalVisible(true)}
      />
      {isLoading && (
        <ActivityIndicator
          color={colors.primary}
          style={{ backgroundColor: colors.light }}
          size={40}
        />
      )}
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          onEndReached={() => (paginate ? setPage(page + 1) : {})}
          initialNumToRender={15}
          inverted
          data={messages}
          keyExtractor={(message) => message._id.toString()}
          renderItem={({ item }) => (
            <Message
              message={item?.message}
              isSelf={item?.createdBy?._id === user._id}
              time={item?.createdAt}
              ishighlighted={item?._id === highlightedMessageId}
              setHighlighted={() => handleHilighting(item?._id)}
            />
          )}
        />
      </View>
      <View style={styles.chatContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            value={message}
            multiline
            style={[styles.textInput, { height: Math.max(40, height) }]}
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
      <Modal visible={isProfileModalVisible} animationType="slide">
        <ProfileScreen
          user={secondaryUser}
          isSelf={false}
          onClose={() => setProfileModalVisible(false)}
        />
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    flex: 1,
  },
  chatContainer: {
    backgroundColor: colors.white,
    justifyContent: "center",
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  textInput: {
    backgroundColor: colors.light,
    borderRadius: 20,
    fontSize: 16,
    maxHeight: 78,
    padding: 10,
    width: "85%",
  },
});

export default ChatScreen;
