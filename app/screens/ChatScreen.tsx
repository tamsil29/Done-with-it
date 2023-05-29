import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import colors from "../config/colors";
import Message from "../components/Message";
import { Form, FormField } from "../components/forms";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from "../components/Icon";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFormikContext } from "formik";
import AppTextInput from "../components/AppTextInput";

function ChatScreen() {
  const route = useRoute();
  const conversation = route.params as any;
  const [height, setHeight] = useState(0);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if(!message.length) return Alert.alert("Error", "Please enter a message")
  };

  return (
    <>
      <View style={styles.container}>
        <Message />
        <Message isSelf={false} />
        <Message />
      </View>
      <View style={styles.chatContainer}>
        <View style={styles.inputContainer}>
          <AppTextInput
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
