import React, { Dispatch } from "react";
import { View, StyleSheet, Keyboard, Alert } from "react-native";
import { Form, FormField, SubmitButton } from "./forms";
import * as Yup from "yup";
import useApi from "../hooks/useApi";
import messagesApi from '../api/message'
import * as Notifications from "expo-notifications";

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label("Message"),
});

function ContactSellerForm({ listing }: { listing: any }) {
  const messageApi = useApi(messagesApi.postMessage)
 
  const handleSubmit = async (values: { message: string }, actions: any) => {
    Keyboard.dismiss()
    const result = await messageApi.request({...values, listingId: listing._id});

    if(!result.ok){
      console.error('Error', result)
      return Alert.alert("Error", "Could not send message to the Seller")
    }

    actions.resetForm();

    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Awesome!',
        body: "Your message was sent to the Seller",
      },
      identifier: 'local',
      trigger: null,
    });
  }

  return (
    <View style={styles.container}>
      <Form
        initialValues={{ message: "" }}
        onSubmit={handleSubmit as any}
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
