import "./SignUp.css";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";

// const login = (body) =>
//   axios
//     .post(`${baseURL}/login`, body)
//     .then((res) => {
//       createUserCard(res.data);
//     })
//     .catch((err) => {
//       console.log(err);
//       alert("Whaat Uh oh. Your request did not work.");
//     });
// const register = (body) =>
//   axios
//     .post(`${baseURL}/register`, body)
//     .then((res) => {
//       createUserCard(res.data);
//     })
//     .catch((err) => {
//       console.log(err);
//       alert("Uh oh. Your request did not work.");
//     });

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      isSubmitting: true,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("A username is required"),
      password: Yup.string().required("A password is required"),
    }),

    onSubmit: (values) => {
      axios.get("/login", values).then((res) => {
        console.log(res.data);
      });
      formik.handleReset();
    },
  });
  return (
    <div id="signUp">
      <div id="signupFormContainer">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            className={
              formik.touched.username && formik.errors.username
                ? "signupInput inputError"
                : "signupInput"
            }
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
            className={
              formik.touched.password && formik.errors.password
                ? "signupInput inputError"
                : "signupInput"
            }
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
              formik.values.username === ""
                ? "buttonDisabled"
                : null
            }
            disabled={
              !formik.isValid ||
              formik.isSubmitting ||
              formik.values.username === ""
            }
            id="signupSubmitBtn"
            type="submit"
          >
            Submit
          </button>
        </form>
        <p className="">
          Dont have an account?{" "}
          <span>
            <Link to="/signup">Sign Up here.</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
