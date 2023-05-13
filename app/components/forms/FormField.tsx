import React from "react";
import AppTextInput from "../AppTextInput";
import ErrorMessage from "./ErrorMessage";
import { StyleSheet, TextInputProps, View } from "react-native";

import { FormikTouched, FormikErrors, useFormikContext } from "formik";

interface Props {
  name: string;
  icon?: string;
  width?: number|string
}

function FormField({ name, icon,width, ...otherProps }: Props & TextInputProps) {
  const { setFieldTouched, handleChange, touched, errors } = useFormikContext();
  return (
    <View>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        icon={icon}
        {...otherProps}
        width={width}
      />
      <ErrorMessage
        visible={touched[name as keyof FormikTouched<unknown>]}
        error={errors[name as keyof FormikErrors<unknown>]}
      />
    </View>
  );
}

export default FormField;