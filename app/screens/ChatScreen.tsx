import { useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import Message from "../components/Message";
import { Form, FormField } from "../components/forms";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from "../components/Icon";
import { TouchableOpacity } from "react-native-gesture-handler";

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label("Message"),
});

function ChatScreen() {
  const route = useRoute();
  const conversation = route.params as any;

  const handleSubmit = () => {};

  return (
    <>
      <View style={styles.container}>
        <Message />
        <Message isSelf={false} />
        <Message />
      </View>
      <View style={styles.chatContainer}>
        <Form
          initialValues={{ chat: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <View style={styles.inputContainer}>
            <FormField name={"chat"} multiline numberOfLines={1} style={{ width: "85%" }} placeholder="Type your message here.."/>
            <TouchableOpacity onPress={() => {}}>
              <Icon name={"send"} backgroundColor={colors.primary} />
            </TouchableOpacity>
          </View>
        </Form>
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
