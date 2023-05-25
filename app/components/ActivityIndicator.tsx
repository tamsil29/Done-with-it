import React from "react";
import { View, StyleSheet } from "react-native";
import AnimatedLottieView from "lottie-react-native";
import { ActivityIndicator } from "react-native";
import colors from "../config/colors";

function AppActivityIndicator({ visible }: { visible: boolean }) {
  if (!visible) return <></>;
  return ( <View style={styles.overlay}>
    <ActivityIndicator color={colors.primary} size={40}/></View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'white',
    position: 'absolute',
    height: '100%',
    width : '100%',
    justifyContent: 'center',
    zIndex: 1,
    opacity: 0.8,
  },
});

export default AppActivityIndicator;

//    <AnimatedLottieView source={require('../assets/animations/done.json')} autoPlay loop/>
