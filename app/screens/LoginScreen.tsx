import React from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import * as Yup from "yup";
import {AppFormField, SubmitButton, AppForm} from "../components/forms";


const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen() {
  return (
    <Screen style={styles.container}>
      <Ionicons
        name="logo-amplify"
        size={100}
        color="#fc5c65"
        style={styles.logo}
      />

      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />

        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Login" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    marginHorizontal: 10,
  },
  logo: {
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
