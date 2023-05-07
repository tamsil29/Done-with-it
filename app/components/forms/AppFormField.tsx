import React from "react";
import AppTextInput from "../AppTextInput";
import ErrorMessage from "./ErrorMessage";
import { StyleSheet, TextInputProps, View } from "react-native";

import { useFormikContext } from "formik";

interface Props {
  name: string;
  icon: string;
}

function AppFormField({ name,icon, ...otherProps }: Props & TextInputProps ) {
  const { setFieldTouched, handleChange, touched, errors } = useFormikContext();
  return (
    <View>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        icon={icon}
        {...otherProps}
      />
      <ErrorMessage visible={touched[name]} error={errors[name]} />
    </View>
  );
}

export default AppFormField;
