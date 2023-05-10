import React from "react";
import { Text, TextProps } from "react-native";
import defaultStyles from "../config/styles";

interface Props{
  style?: any
  children:any
}

function AppText({ style, children, ...otherProps }: Props & TextProps) {
  return <Text style={[defaultStyles.text, style]} {...otherProps}>{children}</Text>;
}

export default AppText;
