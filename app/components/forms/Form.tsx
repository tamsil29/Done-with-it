import { Formik, FormikHelpers } from "formik";
import React from "react";

interface Props {
  initialValues: any;
  onSubmit: ((values: any, formikHelpers: FormikHelpers<any>) => void | Promise<any>) & React.Dispatch<any>;
  validationSchema: any;
  children: any;
}

function Form({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}: Props) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default Form;
