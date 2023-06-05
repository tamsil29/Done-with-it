import React, { Dispatch } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

interface Props {
  isSelected?: boolean;
  name: string;
  onPress: Dispatch<any>
}

function FilterPill({ isSelected = false, name, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}
      style={[
        styles.container,
        isSelected ? { backgroundColor: colors.secondary } : {},
      ]}
    >
      <AppText style={[styles.text,isSelected ? { color: colors.white } : {}]}>
        {name}
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 20,
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  text:{
    fontSize: 16,
  }
});

export default FilterPill;
