import React, { useState } from "react";
import { StyleSheet } from "react-native";
import AppTextInput from "../components/AppTextInput";
import Screen from "../components/Screen";
import { Ionicons } from "@expo/vector-icons";
import AppButton from "../components/AppButton";

function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  return (
    <Screen style={styles.container}>
      <Ionicons
        name="logo-amplify"
        size={100}
        color="#fc5c65"
        style={styles.logo}
      />
      <AppTextInput
        autoCapitalize="none"
        autoCorrect={false}
        icon="email"
        keyboardType="email-address"
        placeholder="Email"
        textContentType="emailAddress"
        value={email}
        onChangeText={(email:string) => setEmail(email)}
      />
      <AppTextInput
        autoCapitalize="none" 
        autoCorrect={false}
        icon="lock"
        placeholder="Password"
        secureTextEntry
        textContentType="password"
        value={password}
        onChangeText={(password:string) => setPassword(password)}
      />
      <AppButton title={"Login"} onPress={()=> console.log({email, password}) }/>
    </Screen>
  );
}

const styles = StyleSheet.create({
    container:{
        gap: 20
    },
  logo: {
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
