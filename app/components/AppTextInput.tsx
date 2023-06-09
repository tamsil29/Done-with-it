import React, { Dispatch } from "react";
import { TextInput, View, StyleSheet, TextInputProps } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";

interface Props {
  icon?: string;
  width?: number | string;
  endIcon?: string;
  onEndIconPress?: Dispatch<any>;
}

const AppTextInput: React.FC<TextInputProps & Props> = ({
  icon,
  width = "100%",
  endIcon,
  onEndIconPress,
  ...otherProps
}) => {
  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon as any}
          size={20}
          color={defaultStyles.colors.medium}
        />
      )}
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={[defaultStyles.text, styles.text]}
        {...otherProps}
      />
      {endIcon && (
        <MaterialCommunityIcons
          name={endIcon as any}
          size={20}
          color={defaultStyles.colors.medium}
          onPress={onEndIconPress}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    gap: 10,
  },
  text: {
    flex: 1,
  },
});

export default AppTextInput;
