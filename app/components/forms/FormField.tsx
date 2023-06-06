import React from "react";
import AppTextInput from "../AppTextInput";
import ErrorMessage from "./ErrorMessage";
import { StyleSheet, TextInputProps, View } from "react-native";

import { FormikTouched, FormikErrors, useFormikContext } from "formik";

interface Props {
  name: string;
  icon?: string;
  endIcon?: string;
  width?: number | string;
  onEndIconPress?: React.Dispatch<any>;
}

function FormField({
  name,
  icon,
  width,
  endIcon,
  onEndIconPress,
  ...otherProps
}: Props & TextInputProps) {
  const { setFieldTouched, setFieldValue, touched, errors, values } =
    useFormikContext();
  return (
    <View>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        icon={icon}
        endIcon={endIcon}
        onEndIconPress={onEndIconPress}
        //@ts-ignore
        value={values[name]}
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
