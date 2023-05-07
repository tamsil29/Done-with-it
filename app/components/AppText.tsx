import React from "react";
import { Text } from "react-native";
import defaultStyles from "../config/styles";

function AppText({ style, children }: any) {
  return <Text style={[defaultStyles.text, style]}>{children}</Text>;
}

export default AppText;
