import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import * as Yup from "yup";
import {
  FormField,
  SubmitButton,
  Form,
  ErrorMessage,
} from "../components/forms";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import AppActivityIndicator from "../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen() {
  const loginApi = useApi(authApi.login)
  const { logIn } = useAuth();

  const handleSubmit = async (values: { email: string; password: string }) => {
    const result = await loginApi.request(values.email, values.password);
    if (result.ok) logIn(result.data as string);
  };

  return (
    <Screen style={styles.container}>
      <Ionicons
        name="logo-amplify"
        size={100}
        color="#fc5c65"
        style={styles.logo}
      />
      <AppActivityIndicator visible={loginApi.isLoading}/>
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage error={loginApi.error} visible={loginApi.isError} />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />

        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Login" />
      </Form>
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
