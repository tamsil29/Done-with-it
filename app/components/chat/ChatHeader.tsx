import React, { Dispatch } from "react";
import { View, StyleSheet, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "../AppText";
import colors from "../../config/colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

interface Props {
  name: string;
  email: string;
  dp: string;
  onBackCick: Dispatch<any>;
  onNameCick: Dispatch<void>;
}

function ChatHeader({ name, email, dp, onBackCick, onNameCick }: Props) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="arrow-left"
        size={25}
        onPress={onBackCick}
      />
      <Image source={{ uri: dp }} style={styles.dp} />
      <TouchableWithoutFeedback onPress={onNameCick}>
        <AppText>{name}</AppText>
        <AppText style={styles.email}>{email}</AppText>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  dp: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  email: {
    fontSize: 16,
    color: colors.medium,
  },
});

export default ChatHeader;
