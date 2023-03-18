import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import YupPassword from 'yup-password'
YupPassword(yup) // extend yup

const LoginForm = () => {
  const initialValues = { email: '', password: '' };
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string()
      // .password()
      // .min(8)
      // .minLowercase(1)
      // .minUppercase(1)
      // .minNumbers(1)
      // .minSymbols(1)
      .required(),
  });

  const onSubmit = (values) => {
    console.log(JSON.stringify(values, null, 2));
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={schema}
    >
      {() => (
        <Form className="row g-3">
          <div className="mb-3">
            <Field type="email" name="email" className="form-control" />
            <ErrorMessage name="email" className="invalid-feedback" />
          </div>
          <div className="mb-3">
            <Field name="password" type="password" className="form-control" />
            <ErrorMessage name="password" className="invalid-feedback" />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;