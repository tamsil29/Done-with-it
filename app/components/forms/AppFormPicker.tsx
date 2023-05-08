import {  FormikErrors, FormikTouched, useFormikContext } from "formik";
import React from "react";
import AppPicker from "../AppPicker";
import ErrorMessage from "./ErrorMessage";

interface Props {
  items: any[];
  name: string;
  placeholder: string;
}

function AppFormPicker({ items, name, placeholder }: Props) {
  const { setFieldValue, touched, errors, values } = useFormikContext();
  return (
    <>
      <AppPicker
        items={items}
        selectedItem={values[name]}
        onSelectItem={(item) => setFieldValue(name, item)}
        placeholder={placeholder}
      />
      <ErrorMessage
        visible={touched[name as keyof FormikTouched<unknown>]}
        error={errors[name as keyof FormikErrors<unknown>]}
      />
    </>
  );
}

export default AppFormPicker;
