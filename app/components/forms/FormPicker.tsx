import { FormikErrors, FormikTouched, useFormikContext } from "formik";
import React from "react";
import Picker from "../Picker";
import ErrorMessage from "./ErrorMessage";
import { View } from "react-native";

interface Props {
  items: any[];
  name: string;
  numberOfColumns?:number
  placeholder: string;
  width?: string;
  PickerItemComponent?: React.FC<any>;
}

function FormPicker({
  items,
  name,
  placeholder,
  numberOfColumns,
  PickerItemComponent,
  width,
}: Props) {
  const { setFieldValue, touched, errors, values } = useFormikContext();
  return (
    <View>
      <Picker
        items={items}
        selectedItem={values[name]}
        numberOfColumns={numberOfColumns}
        onSelectItem={(item) => setFieldValue(name, item)}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        width={width}
      />
      <ErrorMessage
        visible={touched[name as keyof FormikTouched<unknown>]}
        error={errors[name as keyof FormikErrors<unknown>]}
      />
    </View>
  );
}

export default FormPicker;
