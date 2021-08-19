import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Container, Row, Col, Modal, Dropdown } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import { ErrorMessage, Field, Form, Formik } from "formik";

// import Dropdown from 'react-bootstrap/Dropdown'
import "./restaurantLayout.css";
import {
  addTable,
  getTableData,
  deleteTables,
} from "../../../services/restaurantService";

function RestaurantLayout(pops) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refId, setRefId] = useState("");
  const [modelData, setModelData] = useState("");
  const [keyboard, setKeyboard] = useState(true);
  const [restaurantsData, setRestaurantsData] = useState({});
  const openModal = (refId, noOfSeats, name) => {
    setIsModalOpen(true);
    setRefId(refId);
    setModelData({
      refId: refId,
      noOfSeats: noOfSeats,
    });
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getRestaurantsData = async () => {
    const resData = await getTableData();
    if (
      resData.success &&
      resData.payload &&
      resData.payload.bookings &&
      resData.payload.bookings.length > 0
    ) {
      let data = {};
      resData.payload.bookings.forEach((booking) => {
        data[booking.tableNo] = booking.noOfSeats;
      });
      setRestaurantsData(data);
    }
  };

  useEffect(() => {
    getRestaurantsData();
  }, []);

  const handleSubmit = async (value) => {
    const data = {
      refId: value.refId,
      noOfSeats: value.noOfSeats,
    };

    const response = await addTable({ ...data });
    if (response && response.success) {
      let newData = {};
      newData[value["refId"]] = value["noOfSeats"];
      setRestaurantsData({ ...restaurantsData, ...newData });
      toast.success(response.msg);
      closeModal();
    } else {
      toast.error(response.msg);
    }
  };

  const findNoOfSeats = (tableId) => {
    if (tableId && restaurantsData[tableId]) {
      return restaurantsData[tableId];
    } else {
      return 0;
    }
  };

  const deleteTable = async (tableId) => {
    const data = {
      refId: modelData.refId,
    };
    const response = await deleteTables({ ...data });
    if (response && response.success) {
      let oldData = restaurantsData;
      oldData[modelData.refId] = 0;
      setRestaurantsData(oldData);
      toast.success(response.msg);
      closeModal();
    } else {
      toast.error(response.msg);
    }
  };

  const restaurantSchema = Yup.object().shape({
    noOfSeats: Yup.string().required("Please No of seats"),
  });

  return (
    <>
      <Container>
        {Array.from(Array(15).keys()).map((rowIndex) => (
          <Row key={`table_${rowIndex}`}>
            {Array.from(Array(10).keys()).map((colIndex) => (
              <Col
                onClick={() => {
                  openModal(
                    `table_${rowIndex}${colIndex}`,
                    findNoOfSeats(`table_${rowIndex}${colIndex}`),
                    "name"
                  );
                }}
                key={`table_${rowIndex}${colIndex}`}
              >
                <div>
                  TableId: Table_{rowIndex}
                  {colIndex}
                </div>
                <div>
                  Seats :{findNoOfSeats(`table_${rowIndex}${colIndex}`)}
                </div>
              </Col>
            ))}
          </Row>
        ))}
      </Container>
      <Modal
        show={isModalOpen}
        backdrop={true}
        onHide={closeModal}
        keyboard={keyboard}
      >
        <div>
          <Formik
            initialValues={{
              refId: modelData.refId,
              noOfSeats: modelData.noOfSeats,
              name: "",
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
                <div className="modal-footer">
                  {modelData.noOfSeats > 0 ? (
                    <button
                      type="button"
                      onClick={deleteTable}
                      className="btn btn-danger  btn-lg btn-block"
                    >
                      delete
                    </button>
                  ) : null}

                  <button
                    type="submit"
                    className="btn btn-primary  btn-lg btn-block"
                  >
                    Submit
                  </button>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="btn btn-dark btn-lg btn-block"
                  >
                    cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
}

export default RestaurantLayout;
