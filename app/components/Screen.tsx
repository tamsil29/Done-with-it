import React from "react";
import Constants from "expo-constants";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";

function Screen({ children, style }: { children: any, style?: any }) {
  return <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1
  },
});

export default Screen;
