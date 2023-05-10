import { FormikErrors, FormikTouched, useFormikContext } from "formik";
import React from "react";
import AppPicker from "../AppPicker";
import ErrorMessage from "./ErrorMessage";

interface Props {
  items: any[];
  name: string;
  numberOfColumns?:number
  placeholder: string;
  width?: string;
  PickerItemComponent?: React.FC<any>;
}

function AppFormPicker({
  items,
  name,
  placeholder,
  numberOfColumns,
  PickerItemComponent,
  width,
}: Props) {
  const { setFieldValue, touched, errors, values } = useFormikContext();
  return (
    <>
      <AppPicker
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
    </>
  );
}

export default AppFormPicker;
