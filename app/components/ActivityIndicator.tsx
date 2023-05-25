import React from "react";
import { View, StyleSheet } from "react-native";
import AnimatedLottieView from "lottie-react-native";
import { ActivityIndicator } from "react-native";
import colors from "../config/colors";

function AppActivityIndicator({ visible }: { visible: boolean }) {
  if (!visible) return <></>;
  return (
    //    <AnimatedLottieView source={require('../assets/animations/done.json')} autoPlay loop/>
    <ActivityIndicator color={colors.primary} size={40}/>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppActivityIndicator;
