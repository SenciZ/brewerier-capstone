import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";

import "./SignUp.css";
const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      isSubmitting: true,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Your first name is required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Your last name is required"),
      email: Yup.string()
        .email("Please enter a valid email address")
        .required("Your email is required"),
      username: Yup.string()
        .max(40, "Must be 40 characters or less")
        .required("A username is required"),
      password: Yup.string()
        .matches(/^(?=.*[a-z])/, "Must contain at least 1 lowercase letter")
        .matches(/^(?=.*[A-Z])/, "Must contain at least 1 uppercase letter")
        .matches(/^(?=.*[0-9])/, "Must contain at least 1 Number")
        .matches(
          /^(?=.*[!@#\$%\^&\*])/,
          "Must contain at least 1 special character"
        )
        .min(8, "Must be at least 8 characters or more")
        .max(32, "Must be 32 characters or less")
        .required("A password is required"),
    }),

    onSubmit: (values) => {
      const user = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        username: values.username,
        password: values.password,
      };
      console.log(user);
      formik.handleReset();
    },
  });
  return (
    <div id="signUp">
      <div id="signupFormContainer">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="firstName">First Name:</label>
          <input
            className="signupInput"
            id="firstName"
            type="text"
            {...formik.getFieldProps("firstName")}
          />
          <div className="errorPlaceholder">
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="formErrors">{formik.errors.firstName}</div>
            ) : null}
          </div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            className="signupInput"
            id="lastName"
            type="text"
            {...formik.getFieldProps("lastName")}
          />
          <div className="errorPlaceholder">
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="formErrors">{formik.errors.lastName}</div>
            ) : null}
          </div>
          <label htmlFor="email">Email Address:</label>
          <input
            className="signupInput"
            id="email"
            type="email"
            {...formik.getFieldProps("email")}
          />
          <div className="errorPlaceholder">
            {formik.touched.email && formik.errors.email ? (
              <div className="formErrors">{formik.errors.email}</div>
            ) : null}
          </div>
          <label htmlFor="username">Username:</label>
          <input
            className="signupInput"
            id="username"
            type="text"
            {...formik.getFieldProps("username")}
          />
          <div className="errorPlaceholder">
            {formik.touched.username && formik.errors.username ? (
              <div className="formErrors">{formik.errors.username}</div>
            ) : null}
          </div>
          <label htmlFor="password">Password:</label>
          <input
            className="signupInput"
            id="password"
            type="password"
            {...formik.getFieldProps("password")}
          />
          <div className="errorPlaceholder">
            {formik.touched.password && formik.errors.password ? (
              <div className="formErrors">{formik.errors.password}</div>
            ) : null}
          </div>

          <button
            className={
              !formik.isValid ||
              formik.isSubmitting ||
              formik.values.firstName === ""
                ? "buttonDisabled"
                : null
            }
            disabled={
              !formik.isValid ||
              formik.isSubmitting ||
              formik.values.firstName === ""
            }
            id="signupSubmitBtn"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
