import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Sign_Up } from "../../../services/authServices";
// import { Validation } from "../../../constants";
import "./register.css";

const Register = (pops) => {
  const handleSubmit = async (value) => {
    const data = {
        email: value.email,
        password: value.password,
        managerName: value.managerName
    };

    const response = await Sign_Up({ data });
    if (response && response.success) {
      const token = response.tokendata;
      localStorage.setItem('jwt', token);
      localStorage.setItem('user', JSON.stringify(response.payload));
      toast.success(response.msg);
      pops.history.push("/dashboard");
    } else {
      toast.error(response.msg);
    }
  };

  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("email is required")
      .email("Invalid email"),
    password: Yup.string()
      .required("Please Enter your password"),
      managerName: Yup.string()
      .required("Please Enter manager name")
  });

  return (
    <div className="login-body">
      <div className="outer">
        <div className="inner">
          <h3>Sign Up</h3>

          <Formik
            initialValues={{
              email: "",
              password: "",
              managerName: ""
            }}
            onSubmit={handleSubmit}
            validationSchema={RegisterSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label>Manager Name</label>
                  <Field
                    type="text"
                    name="managerName"
                    className="form-control"
                    placeholder="Enter Manager Name"
                  />
                  <ErrorMessage
                    className="error-class"
                    name="managerName"
                    component="div"
                  />
                </div>

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
                  I have account{" "}
                  <span
                    className="cursor-pointer"
                    onClick={() => pops.history.push("/login")}
                  >
                    login?
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

export default Register;