import React, { Dispatch, useEffect, useState } from "react";
import * as Yup from "yup";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
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
import { FormikValues } from "formik";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().label("Category"),
  images: Yup.array().required().min(1, "Please select atleast one image!"),
});

const categories = [
  { label: "Furniture & mo", value: 1, backgroundColor: "red", icon: "apps" },
  { label: "Clothing", value: 2, backgroundColor: "green", icon: "email" },
  { label: "Camera", value: 3, backgroundColor: "blue", icon: "lock" },
];

function ListingEditScreen() {
  const [categories, setCategories] = useState([] as any);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  // const [localImages, setLocalImages] = useState([] as string[]);
  // const [imagesUrl, setImagesUrl] = useState([] as string[]);
  // const [payloadData, setPayloadData] = useState({} as any);

  const { location } = useLocation();

  const handleSubmit = async (listing: any, actions: any) => {
    let payloadData = {
      ...listing,
      categoryId: listing?.category?._id,
      location,
    };
    // setLocalImages(listing.images);
    delete payloadData?.category;

    setProgress(0);
    setUploadVisible(true);
    const result = await listingsApi.addListing(
      payloadData,
      (progress: number) => setProgress(progress)
    );

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the listing");
    }
    actions.resetForm();
    // delete payloadData?.images;
    // setPayloadData(payloadData);
  };

  // const submitData = async () => {
  //   const result = await listingsApi.addListing(
  //     { ...payloadData, images: [...imagesUrl] },
  //     (progress: number) => console.log({ progress })
  //   );

  //   if (!result.ok) return alert("Could not save the listing");
  //   alert("success");
  // };

  const getCategories = async () => {
    const result = await categoriesApi.getCategories();
    if (result.ok) return setCategories(result?.data?.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  // useEffect(() => {
  //   if (
  //     localImages.length > 0 &&
  //     imagesUrl.length > 0 &&
  //     localImages.length === imagesUrl.length
  //   ) {
  //     submitData();
  //   }
  // }, [localImages, imagesUrl]);

  return (
    <Screen style={styles.container}>
      <UploadScreen
        progress={progress}
        visible={uploadVisible}
        onDone={() => setUploadVisible(false)}
      />
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
      >
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
              width={150}
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
      </KeyboardAvoidingView>
      {/* {localImages.length > 0 &&
        localImages.map((image, index) => (
          <ImageUploadItem
            imageUri={image}
            key={index}
            setImagesUrl={setImagesUrl}
            imagesUrl={imagesUrl}
          />
        ))} */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 10,
    paddingTop: 0
  },
  formView: {
    gap: 20,
  },
});

export default ListingEditScreen;

const ImageUploadItem = ({
  imageUri,
  setImagesUrl,
  imagesUrl,
}: {
  imageUri: string;
  setImagesUrl: React.Dispatch<any>;
  imagesUrl: string[];
}) => {
  const uploadSingleImage = async () => {
    const result = await filesApi.uploadImage(imageUri);
    console.log(result.data?.data);
    if (result.ok)
      setImagesUrl([
        ...imagesUrl,
        result.data?.data?.baseUrl + "" + result.data?.data?.key,
      ]);
  };

  useEffect(() => {
    uploadSingleImage();
  }, []);

  return <></>;
};
