import { Formik } from "formik";
import React from "react";

interface Props {
  initialValues: any;
  onSubmit: React.Dispatch<any>;
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
