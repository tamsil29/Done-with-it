import React, { useState } from "react";
import { StyleSheet } from "react-native";

import Screen from "../components/Screen";
import * as Yup from "yup";
import {
  FormField,
  SubmitButton,
  Form,
  ErrorMessage,
} from "../components/forms";
import usersApi from "../api/users";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import AppActivityIndicator from "../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(3).label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen() {
  const registerApi = useApi(usersApi.register);
  const { logIn } = useAuth();

  const handleSubmit = async (userInfo: any) => {
    const result = await registerApi.request(userInfo);

    if (!result.ok) return;

    if (result.headers) logIn(result.headers["x-auth-token"] as string);
  };

  return (
    <>
      <AppActivityIndicator visible={registerApi.isLoading} />
      <Screen style={styles.container}>
        <Form
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage
            error={registerApi.error}
            visible={registerApi.isError}
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="face-man"
            keyboardType="default"
            name="name"
            placeholder="Name"
            textContentType="name"
          />
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
          <SubmitButton title="Register" />
        </Form>
      </Screen>
    </>
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

export default RegisterScreen;
