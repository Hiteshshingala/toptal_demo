import React from 'react'
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateCompanyName } from "../../../services/userServices";


function AddRestaurantName(pops) {

    const handleSubmit = async (value) => {
        const id = getCompanyName();
        const data = {
            id: id,
            companyName: value.companyName
        }

        const response = await updateCompanyName(data);
        if (response && response.success) {
            toast.success(response.msg);
        } else {
            toast.error(response.msg);
          }

    }   

    const getCompanyName = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user && user._id) {
          return user._id;
        } else {
            return null;
        }

  }

    const LoginSchema = Yup.object().shape({
          companyName: Yup.string()
          .required("Please Enter your password")
      });

    return (
        <>
       <Formik
            initialValues={{
                companyName: ""
            }}
            onSubmit={handleSubmit}
            validationSchema={LoginSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label>Company Name</label>
                  <Field
                    type="text"
                    name="companyName"
                    className="form-control"
                    placeholder="Enter email"
                  />
                  <ErrorMessage
                    className="error-class"
                    name="companyName"
                    component="div"
                  />
                </div>

                
                <button type="submit" className="btn btn-primary btn-lg btn-block">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </>
    )
}

export default AddRestaurantName
