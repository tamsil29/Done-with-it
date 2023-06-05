import React, { Dispatch, useEffect, useState } from "react";
import * as Yup from "yup";
import { KeyboardAvoidingView, Platform, StyleSheet, View, ScrollView, Alert } from "react-native";
import { Form, FormField, FormPicker, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import CategoryPickerItem from "../components/CategoryPickerItem";
import FormImagePicker from "../components/forms/FormImagePicker";
import useLocation from "../hooks/useLocation";
import AppText from "../components/AppText";
import listingsApi from "../api/listings";
import filesApi from "../api/files";
import categoriesApi from "../api/category";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().label("Category"),
  images: Yup.array().required().min(1, "Please select atleast one image!"),
});

function ListingEditScreen() {
  const [categories, setCategories] = useState([] as any);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const { location } = useLocation();

  const handleSubmit = async (listing: any, actions: any) => {
    let payloadData = {
      ...listing,
      categoryId: listing?.category?._id,
      location,
    };
    delete payloadData?.category;

    setProgress(0);
    setUploadVisible(true);

    try {
      const updatedImages = await uploadingMultipleFiles(listing.images);
      if(updatedImages.length) payloadData.images = updatedImages
    } catch (error: any) {
      setUploadVisible(false);
      return Alert.alert('Error uploading images', error);
    }

    const result = await listingsApi.addListing(
      payloadData,
      (progress: number) => setProgress(progress)
    );

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the listing");
    }
    actions.resetForm();
  };

  const uploadingMultipleFiles = async (images: string[]) => {
    let imageUris: string[] = [];
    for(let i = 0; i < images.length; i++) {
      const result = await filesApi.uploadImage(images[i], (progress: number) => console.log(progress, i+1, 'image'));
      if(result.data?.data?._id) imageUris.push(filesApi.getImage(result?.data?.data))
    }
  
    return imageUris.length ? Promise.resolve(imageUris) : Promise.reject("Could not upload images to the server");
  }

  const getCategories = async () => {
    const result = await categoriesApi.getCategories();
    if (result.ok) return setCategories(result?.data?.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Screen style={styles.container}>
      <UploadScreen
        progress={progress}
        visible={uploadVisible}
        onDone={() => setUploadVisible(false)}
      />
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -100}
      >
        <ScrollView>
          <View style={styles.formView}>
            <Form
              initialValues={{
                title: "",
                price: "",
                description: "",
                category: null,
                images: [],
              }}
              onSubmit={handleSubmit as any}
              validationSchema={validationSchema}
            >
              <FormImagePicker name={"images"} />
              <FormField maxLength={255} name="title" placeholder="Title" />
              <FormField
                keyboardType="numeric"
                maxLength={8}
                name="price"
                placeholder="Price"
                width={"50%"}
                icon="currency-rupee"
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
                textAlignVertical="top"
                numberOfLines={3}
                name="description"
                placeholder="Description"
              />
              <SubmitButton title={"Post"} />
            </Form>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 10,
    paddingTop: 0,
  },
  formView: {
    gap: 20,
  },
});

export default ListingEditScreen;
