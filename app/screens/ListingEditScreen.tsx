import React from "react";
import * as Yup from "yup";
import { StyleSheet } from 'react-native'
import { Form, FormField, FormPicker, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import CategoryPickerItem from "../components/CategoryPickerItem";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
});

const categories = [
  { label: "Furniture & mo", value: 1, backgroundColor:'red', icon:'apps' },
  { label: "Clothing", value: 2, backgroundColor:'green', icon:'email' },
  { label: "Camera", value: 3, backgroundColor:'blue', icon:'lock' },
];

function ListingEditScreen() {
  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <FormField maxLength={255} name="title" placeholder="Title" />
        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
          width={120}
        />
        <FormPicker
          items={categories}
          name={"category"}
          PickerItemComponent={CategoryPickerItem}
          placeholder={"Category"}
          width={'50%'}
          numberOfColumns={3}
        />
        <FormField
          maxLength={255}
          multiline
          numberOfLines={3}
          name="description"
          placeholder="Description"
        />
        <SubmitButton title={"Post"}/>
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
    container: {
        gap: 20,
        marginTop:20,
        marginHorizontal: 10,
      },
})

export default ListingEditScreen;
