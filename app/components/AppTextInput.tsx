import React from "react";
import { TextInput, View, StyleSheet, TextInputProps } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from '../config/styles'

interface Props {
  icon?: string;
}

const AppTextInput: React.FC<TextInputProps & Props> = ({
  icon,
  ...otherProps
}) => {
  return (
    <View style={styles.container}>
      {icon && (
        <MaterialCommunityIcons
          name={icon as any}
          size={20}
          color={defaultStyles.colors.medium}
        />
      )}
      <TextInput style={[defaultStyles.text, styles.text]} {...otherProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    alignItems: "center",
    gap: 10,
  },
  text:{
    flex:1
  }
});

export default AppTextInput;
