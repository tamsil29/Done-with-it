import React from "react";
import { FormikErrors, FormikTouched, useFormikContext } from "formik";
import ImageInputList from "../ImageInputList";
import ErrorMessage from "./ErrorMessage";
import { View } from "react-native";

interface Props {
  name: string;
}

function FormImagePicker({ name }: Props) {
  const { setFieldValue, touched, errors, values } = useFormikContext();
  //@ts-ignore
  const imageUris = values[name];

  const handleAdd = (uri: string) => {
    setFieldValue(name, [...imageUris, uri]);
  };

  const handleRemove = (uri: string) => {
    setFieldValue(
      name,
      imageUris.filter((image: any) => image !== uri)
    );
  };

  return (
    <View>
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      <ErrorMessage
        visible={touched[name as keyof FormikTouched<unknown>]}
        error={errors[name as keyof FormikErrors<unknown>]}
      />
    </View>
  );
}

export default FormImagePicker;
