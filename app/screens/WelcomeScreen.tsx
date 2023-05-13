import React from "react";
import { StyleSheet, ImageBackground, View, Image, Text } from "react-native";
import Button from "../components/Button";

import { Ionicons } from "@expo/vector-icons";
import useRouteNavigation from "../hooks/useRouteNavigation";

function WelcomeScreen() {
  const { navigate } = useRouteNavigation();
  return (
    <ImageBackground
      blurRadius={5}
      style={styles.background}
      source={{
        uri: "https://decoholic.org/wp-content/uploads/2016/10/sophisticated-white-home.jpg",
      }}
    >
      <View style={styles.logoContainer}>
        {/* <Image source={require("../assets/logo.png")} style={styles.logo} /> */}
        <Ionicons name="logo-amplify" size={100} color="#fc5c65" />
        <Text style={styles.tagline}>Sell what you don't need!</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Button title="Login" onPress={() => navigate("Login")} />
        <Button
          title="Register"
          onPress={() => navigate("Register")}
          color={"secondary"}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
    gap: 20,
  },
  logo: {
    height: 100,
    width: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
    gap: 10,
  },
  tagline: {
    fontSize: 25,
    fontWeight: "600",
  },
});

export default WelcomeScreen;
