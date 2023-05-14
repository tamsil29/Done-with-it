import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import Icon from "./Icon";

interface Props {
  item: any;
  onPress: React.Dispatch<any>;
}

function CategoryPickerItem({ item, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon
        name={item?.icon}
        backgroundColor={item?.backgroundColor}
        size={80}
      />
      <AppText style={styles.label}>{item?.label}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: "center",
    gap: 5,
    width: "33%",
  },
  label: {
    textAlign: "center",
  },
});

export default CategoryPickerItem;
