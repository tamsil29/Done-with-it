import React from "react";
import { View, StyleSheet } from "react-native";
import { Form, FormField, SubmitButton } from "./forms";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  message: Yup.string().min(1).label("Message"),
});

function ContactSellerForm({ listing }: { listing: any }) {
  return (
    <View style={styles.container}>
      <Form
        initialValues={{
          message: "",
        }}
        onSubmit={(m) => console.log(m)}
        validationSchema={validationSchema}
      >
        <FormField maxLength={255} name="message" placeholder="Message..." />
        <SubmitButton title="Contact Seller" />
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
});

export default ContactSellerForm;
