import { useFormik } from "formik";
import * as Yup from "yup";
import "./register.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";

const initialValues = {
  name: "",
  username: "",
  email: "",
  phone: "",
  password: "",
  cpassword: "",
};

const signUpSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  username: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Invalid phone number")
    .required("Phone is required"),
  password: Yup.string()
    .required("Password required")
    .min(8, "Password must be at least 6 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[^a-zA-Z0-9]/, "Password must contain at least one symbol"),

  cpassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

const Register = () => {
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const notifyEmailExists = () =>
    toast.error("Email already exists", {
      position: toast.POSITION.TOP_RIGHT,
    });
  const notifyPhoneExists = () =>
    toast.error("Phone Number already exists", {
      position: toast.POSITION.TOP_RIGHT,
    });
  const notifyUsernameExists = () =>
    toast.error("The username is taken", {
      position: toast.POSITION.TOP_RIGHT,
    });
  const notifyEmailSent = () =>
    toast.success("Email sent, verify your email", {
      position: toast.POSITION.TOP_CENTER,
    });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values, action) => {
        const user = {
          name: values.name,
          username: values.username,
          email: values.email,
          phone: values.phone,
          password: values.password,
        };

        try {
          setLoading(true);
          const { data: res } = await axios.post("/api/auth/register", user);
          setSignupSuccess(res.message);
          notifyEmailSent();
          action.resetForm();
        } catch (error) {
          console.log("889=>", error.response.data);
          if (error.response.data.emailExists) notifyEmailExists();
          if (error.response.data.phoneExists) notifyPhoneExists();
          if (error.response.data.usernameExists) notifyUsernameExists();
          setSignupSuccess(false);
        } finally {
          setLoading(false);
        }
      },
    });

  return (
    <div className="register pt-5 pb-5" style={{ minHeight: "max-content" }}>
      <ToastContainer autoClose={8000} />

      {/* <CircularProgress color="success" style={{ display: signupSuccess ? "" : "none", position: "absolute", top: '50%', left: '50%' }} /> */}
      <div className="registerCard">
        <div className="left">
          <h1>Binge!</h1>
          <p>
            {`Welcome to Binge! We're thrilled to have you here. Our website
            offers an extensive collection of the latest and greatest movies, as
            well as beloved classics that you won't find anywhere else.`}
          </p>
          <span>Already have an account?</span>
          <Link to="/login">
            <button className="btn">Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>

          <form action="" onSubmit={handleSubmit}>
            <>
              <input
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                name="name"
                placeholder="Enter your name"
              />
              {errors.name && touched.name ? (
                <p className="form-error">{errors.name}</p>
              ) : null}
            </>

            <input
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              name="username"
              placeholder="Choose a username"
            />
            {errors.username && touched.username ? (
              <p className="form-error">{errors.username}</p>
            ) : null}

            <input
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              name="email"
              placeholder="Enter your email"
            />
            {errors.email && touched.email ? (
              <p className="form-error">{errors.email}</p>
            ) : null}

            <input
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              name="phone"
              placeholder="Enter your phone number"
            />
            {errors.phone && touched.phone ? (
              <p className="form-error">{errors.phone}</p>
            ) : null}

            <input
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              name="password"
              placeholder="Choose a password"
            />
            {errors.password && touched.password ? (
              <p className="form-error">{errors.password}</p>
            ) : null}

            <input
              value={values.cpassword}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              name="cpassword"
              placeholder="Confirm your password"
            />
            {errors.cpassword && touched.cpassword ? (
              <p className="form-error">{errors.cpassword}</p>
            ) : null}

            <button className="btn" type="submit">
              {loading && (
                <CircularProgress size={"15px"} sx={{ color: "white" }} />
              )}
              Register
            </button>
          </form>
          <span className="login-txt">
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
