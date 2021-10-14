import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { login } from "../../../services/authServices";
import { saveToken, saveUser } from "../../../services/localStorage";
// import { Validation } from "../../../constants";
import "./login.css";

const Login = (pops) => {
  const handleSubmit = async (value) => {
    const data = {
        email: value.email,
        password: value.password
    };

    const response = await login({ data });
    if (response && response.success) {
      const token = response.tokendata;
      saveToken(token);
      saveUser(response.payload);
      toast.success(response.msg);
      pops.history.push("/dashboard");
    } else {
      toast.error(response.msg);
    }
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("email is required")
      .email("Invalid email"),
    password: Yup.string()
      .required("Please Enter your password")
  });

  return (
    <div className="login-body">
      <div className="outer">
        <div className="inner">
          <h3>Log in</h3>

          <Formik
            initialValues={{
              email: "",
              password: ""
            }}
            onSubmit={handleSubmit}
            validationSchema={LoginSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label>Email</label>
                  <Field
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="Enter email"
                  />
                  <ErrorMessage
                    className="error-class"
                    name="email"
                    component="div"
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter password"
                  />
                  <ErrorMessage
                    className="error-class"
                    name="password"
                    component="div"
                  />
                </div>

                
                <button type="submit" className="btn btn-dark btn-lg btn-block mt-4">
                  Submit
                </button>
                <p className="forgot-password text-right">
                  go to{" "}
                  <span
                    className="cursor-pointer"
                    onClick={() => pops.history.push("/sign-up")}
                  >
                    sign up?
                  </span>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;