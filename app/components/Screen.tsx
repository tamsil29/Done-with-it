import React from "react";
import Constants from "expo-constants";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";

function Screen({ children }: { children: any }) {
  return <SafeAreaView style={styles.screen}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
  },
});

export default Screen;
