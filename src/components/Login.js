import "./SignUp.css";
import "./Login.css";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setUserHandler, setLoggedInHandler }) => {
  let navigate = useNavigate();
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
      axios.post("/login", values).then((res) => {
        console.log(res.data);
        setUserHandler(res.data);
        setLoggedInHandler();
        navigate("/dashboard");
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
        <p id="signupLoginText">
          Dont have an account?{" "}
          <span>
            <Link id="signupLoginTextLink" to="/signup">
              Sign Up here.
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
