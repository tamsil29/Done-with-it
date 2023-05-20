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

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(3).label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen() {
  const [registerError, setRegisterError] = useState("");
  const { logIn } = useAuth();

  const handleSubmit = async (userInfo: any) => {
    const result = await usersApi.register(userInfo);

    if (!result.ok) {
      if (result?.data) setRegisterError(result.data.message);
      else setRegisterError("An unexpected error occurred!");
      return;
    }

    if (result.headers) logIn(result.headers["x-auth-token"] as string);
  };

  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage error={registerError} visible={!!registerError} />
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
