import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { StyleSheet } from "react-native";
import { Form, FormField, FormPicker, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import CategoryPickerItem from "../components/CategoryPickerItem";
import FormImagePicker from "../components/forms/FormImagePicker";
import useLocation from "../hooks/useLocation";
import AppText from "../components/AppText";
import listingsApi from "../api/listings";
import filesApi from '../api/files'
import categoriesApi from '../api/category'

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().required().min(1, "Please select atleast one image!"),
});

const categories = [
  { label: "Furniture & mo", value: 1, backgroundColor: "red", icon: "apps" },
  { label: "Clothing", value: 2, backgroundColor: "green", icon: "email" },
  { label: "Camera", value: 3, backgroundColor: "blue", icon: "lock" },
];

function ListingEditScreen() {
  const [categories, setCategories] = useState([] as any)
  const { location } = useLocation();

  const handleSubmit = async (listing: any) => {
    // const result = await listingsApi.addListing(
    //   { ...listing, location },
    //   (progress: number) => console.log({progress})
    // );
    // console.log(result.data);
    // if (!result.ok) return alert("Could not save the listing");
    // alert("success");
    const image = listing.images[0];
    console.log({image})
    const result = await filesApi.uploadImage(image)
    console.log({result: result.data});
    if (!result.ok) return alert("Could not save the listing");

  };

  const getCategories = async () => {
    const result = await categoriesApi.getCategories();
    if(result.ok) return setCategories(result?.data?.data);
  }

  useEffect(()=> {
    getCategories()
  }, [])

  return (
    <Screen style={styles.container}>
      <AppText style={{ fontSize: 28 }}>Add new listing</AppText>
      <Form
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images: [],
        }}
        onSubmit={(values)=>console.log(values)}
        validationSchema={validationSchema}
      >
        <FormImagePicker name={"images"} />
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
          width={"50%"}
          numberOfColumns={3}
        />
        <FormField
          maxLength={255}
          multiline
          numberOfLines={3}
          name="description"
          placeholder="Description"
        />
        <SubmitButton title={"Post"} />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    marginTop: 20,
    marginHorizontal: 10,
  },
});

export default ListingEditScreen;
