import { useRoute } from "@react-navigation/native";
import React, {
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  View,
  StyleSheet,
  Alert,
  FlatList,
  Keyboard,
  TextInput,
  ActivityIndicator,
  Modal,
  Text,
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
import { SocketEnums } from "../socket/events";
import { differenceInSeconds } from "date-fns";
import AttachedMessage from "../components/chat/AttachedMessage";

function ChatScreen() {
  const { notification, dismissNotification, socket } = useAppNotifications();
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
  const [chatRoomJoined, setChatRoomJoined] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const deferredValue = useDeferredValue(message);
  const [typingSocketTriggeredOn, setTypingSocketTriggeredOn] = useState(
    null as any
  );
  const [attachedMessage, setAttachedMessage] = useState(null as any);

  useEffect(() => {
    socket.emit(
      SocketEnums.JOIN_CONVERSATION,
      conversation?._id,
      (message: string) => {
        setChatRoomJoined(message === "success" ? true : false);
        console.log("joined room", user.name);
      }
    );
    messageSeen(conversation?._id);

    return () => {
      socket.emit(SocketEnums.LEAVE_CONVERSATION, conversation?._id);
      messageSeen(conversation?._id);
    };
  }, []);

  useEffect(() => {
    socket.on(SocketEnums.TYPING, (isTyping, userId) => {
      if (user?._id !== userId) setIsTyping(isTyping);
    });

    return () => {
      socket.off(SocketEnums.TYPING);
      socket.emit(
        SocketEnums.SENDER_TYPING,
        false,
        conversation?._id,
        user?._id
      );
    };
  }, []);

  useEffect(() => {
    if (deferredValue.length > 0) {
      if (
        typingSocketTriggeredOn === null ||
        differenceInSeconds(Date.now(), typingSocketTriggeredOn) > 3
      ) {
        socket.emit(
          SocketEnums.SENDER_TYPING,
          true,
          conversation?._id,
          user?._id
        );
        setTypingSocketTriggeredOn(Date.now());
      }
    } else
      socket.emit(
        SocketEnums.SENDER_TYPING,
        false,
        conversation?._id,
        user?._id
      );
  }, [deferredValue]);

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
        if (!chatRoomJoined) getMessages(1);
      }
    }
  }, [notification]);

  useEffect(() => {
    getMessages(page);
  }, [page]);

  const updateMessages = (message: any) => {
    setMessages((prevMsgs: any[]) => [message, ...prevMsgs].slice(0, -1));
  };

  useEffect(() => {
    socket.on(SocketEnums.RECIEVE_MESSAGE, (message) => {
      console.log(
        message,
        `${user.name} received message sent by ${message.createdBy.name}`
      );
      if (message.createdBy._id !== user._id) updateMessages(message);
    });

    return () => {
      socket.off(SocketEnums.RECIEVE_MESSAGE);
    };
  }, []);

  const getMessages = async (page: number) => {
    const result = await getConvos(conversation?._id, { page });
    if (!result.ok) return;

    result.data.data.length > 29 ? setPaginate(true) : setPaginate(false);

    if (page === 1) {
      setMessages(result.data.data);
    } else {
      if (result.data.data.length)
        setMessages([...messages, ...result.data.data]);
      else return;
    }
  };

  const handleSend = async () => {
    console.log("sent from api");
    if (!message.length) return Alert.alert("Error", "Please enter a message");

    const result = await postMessage.request({
      conversationId: conversation?._id,
      message: message,
    });
    if (!result.ok) return Alert.alert("Error", "Cannot send message");

    setMessage("");
    updateMessages(result.data.data);
    setHeight(0);
  };

  const handleSendMessageInSocket = () => {
    if (!message.length) return Alert.alert("Error", "Please enter a message");

    console.log("sent from socket");
    socket.emit(
      SocketEnums.SEND_MESSAGE,
      message,
      conversation?._id,
      JSON.stringify({ _id: user._id, name: user.name, email: user.email }),
      (message: any) => updateMessages(message)
    );
    setMessage("");
    setHeight(0);
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

      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          onEndReached={() => (paginate ? setPage(page + 1) : {})}
          initialNumToRender={15}
          inverted
          data={messages}
          keyExtractor={(message) => message?._id?.toString()}
          renderItem={({ item, index }) => (
            <>
              {isTyping && index === 0 && (
                <Message
                  message={"typing..."}
                  isSelf={false}
                  time={Date.now()}
                  isTyping={isTyping}
                />
              )}
              <Message
                message={item?.message}
                isSelf={item?.createdBy?._id === user._id}
                time={item?.createdAt}
                ishighlighted={item?._id === highlightedMessageId}
                setHighlighted={() => handleHilighting(item?._id)}
                selectMessage={() => setAttachedMessage(item)}
              />
              {isLoading && index === messages.length - 1 && (
                <ActivityIndicator
                  color={colors.primary}
                  style={{ backgroundColor: colors.light }}
                  size={40}
                />
              )}
            </>
          )}
        />
      </View>
      {attachedMessage && <AttachedMessage message={attachedMessage} onClose={()=>setAttachedMessage(null as any)} isSelfSelected={user?._id === attachedMessage?.createdBy?._id}/>}
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
          <TouchableOpacity
            onPress={chatRoomJoined ? handleSendMessageInSocket : handleSend}
          >
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
