import React, {useState}  from 'react'
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Container, Row, Col, Modal, Dropdown  } from "react-bootstrap";
import DropdownButton from 'react-bootstrap/DropdownButton';
import { ErrorMessage, Field, Form, Formik } from "formik";

function ReserveTable() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [refId, setRefId] = useState('')
    const [keyboard, setKeyboard] = useState(true);
    const openModal = (refId, noOfSeats, name) => {
        setIsModalOpen(true);
        setRefId(refId);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }


    const handleSubmit = async (value) => {
        const data = {
          refId: value.refId,
          noOfSeats: value.noOfSeats,
          // name: value.name,
        };
    
        const response ={} // await addTable({ ...data });
        if (response && response.success) {
          toast.success(response.msg);
        } else {
          toast.error(response.msg);
        }
    };
  
    const restaurantSchema = Yup.object().shape({
        noOfSeats: Yup.string().required("Please No of seats"),
        // name: Yup.string().required("Please Enter Name")
    });

    return (
        <>
            <Container>
                {Array.from(Array(15).keys()).map(rowIndex => (
                    <Row>
                      {Array.from(Array(10).keys()).map(colIndex => (
                        <Col onClick={() => {openModal(`table_${rowIndex}${colIndex}`, 0, 'name')}} >Table_{rowIndex}{colIndex}</Col>
                      ))}
                    </Row>
                ))}
            </Container>
            <Modal show={isModalOpen} toggle={closeModal} backdrop={true} onHide={closeModal} keyboard={keyboard}>
                <div>
                <Formik
              initialValues={{
                refId: refId,
                noOfSeats: "",
                name: ""
              }}
              onSubmit={handleSubmit}
              validationSchema={restaurantSchema}
            >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label>Ref ID</label>
                  <Field
                    type="text"
                    name="refId"
                    className="form-control"
                    disabled={true}
                  />
                  <ErrorMessage
                    className="error-class"
                    name="refId"
                    component="div"
                  />
                </div>

                <div className="form-group">
                  <label>No of Seat</label>
                  <Field
                    type="text"
                    name="noOfSeats"
                    className="form-control"
                  />
                  <ErrorMessage
                    className="error-class"
                    name="noOfSeats"
                    component="div"
                  />
                </div>
{/* 
                <div className="form-group">
                  <label>name</label>
                  <Field
                    type="text"
                    name="name"
                    className="form-control"
                  />
                  <ErrorMessage
                    className="error-class"
                    name="name"
                    component="div"
                  />
                </div> */}
                
                <button type="submit" className="btn btn-dark btn-lg btn-block">
                  Submit
                </button>
                
                <button type="button" onClick={closeModal} className="btn btn-dark btn-lg btn-block">
                  cancel
                </button>
                
              </Form>
            )}
          </Formik>


                </div>
            </Modal>
        </>
    );
}

export default ReserveTable
