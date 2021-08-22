import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Container, Row, Col, Modal, Dropdown } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import { ErrorMessage, Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  addTable,
  getTableData,
  getTableBookings,
  reserveTables,
} from "../../../services/restaurantService";
import moment from "moment-timezone";
import Table from "../../common/table";

function ReserveTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refId, setRefId] = useState("");
  const [modelData, setModelData] = useState("");
  const [keyboard, setKeyboard] = useState(true);
  const [restaurantsData, setRestaurantsData] = useState({});
  const [dateSlot, setDateSlot] = useState([]);
  const [bookingFormOpen, setbookingFormOpen] = useState(false);
  const openModal = (refId, noOfSeats, name) => {
    setbookingFormOpen(false);
    setIsModalOpen(true);
    setRefId(refId);
    setModelData({
      refId: refId,
      noOfSeats: noOfSeats,
    });
    getTableAvailability({
      refId: refId,
      date: moment().utc().format("YYYY-MM-DD"),
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
  const getTableAvailability = async (body) => {
    const resData = await getTableBookings(body);
    if (resData.success && resData.payload && resData.payload.length > 0) {
      let _excludeTimeSlot = [];
      resData.payload.forEach((_date) => {
        if (moment(_date.time).isSame(moment(body.date), "day")) {
          let a = new Date(_date.time);
          _excludeTimeSlot.push(a);
        }
      });
      setDateSlot(_excludeTimeSlot);
    }
  };

  useEffect(() => {
    getRestaurantsData();
  }, []);

  const handleSubmit = async (value) => {
    const data = {
      refId: value.refId,
      noOfSeats: value.noOfSeats,
      name: value.name,
      contactNumber: value.contactNumber,
      reserveTime: moment(value.reserveTime).utc(),
    };

    const response = await reserveTables({ ...data });
    if (response && response.success) {
      toast.success(response.msg);
    } else {
      toast.error(response.msg);
    }
  };

  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  const changedata = (selectedDate) => {
    getTableAvailability({
      refId: refId,
      date: moment(selectedDate).utc().format("YYYY-MM-DD"),
    });
  };

  const openAddBookingForm = () => {
    setbookingFormOpen(true);
  };

  const restaurantSchema = Yup.object().shape({
    noOfSeats: Yup.string().required("Please Enter No of seats"),
    reserveTime: Yup.string().required("Please select date and time"),
    name: Yup.string().required("Please Enter Name"),
    contactNumber: Yup.string().required("Please Enter Contact Number"),
  });
  return (
    <div>
      <Container className="booking-width">
        {Array.from(Array(15).keys()).map((rowIndex) => (
          <Row key={`table_${rowIndex}`}>
            {Array.from(Array(10).keys()).map((colIndex) => (
              <Col
                onClick={() => {
                  openModal(`table_${rowIndex}${colIndex}`, 0, "name");
                }}
                className={'border-1px mr-5px'}
                key={`table_${rowIndex}${colIndex}`}
              >
                Table_{rowIndex}
                {colIndex}
              </Col>
            ))}
          </Row>
        ))}
      </Container>
      <Modal
        className="booking-modal"
        show={isModalOpen}
        backdrop={true}
        onHide={closeModal}
        keyboard={keyboard}
      >
        <Modal.Header closeButton>
          <Modal.Title>Booking</Modal.Title>
        </Modal.Header>
        {!bookingFormOpen ? (
          <>
            <div className="booking-popup">
              <div className="mb-3">
                <button
                  type="submit"
                  onClick={openAddBookingForm}
                  className="btn btn-primary  btn-lg btn-block btn-wrapper"
                >
                  Add Booking
                </button>
              </div>
              <Table refId={refId} />
            </div>
          </>
        ) : (
          <Formik
            initialValues={{
              refId: refId,
              noOfSeats: "",
              reserveTime: "",
              name: "",
              contactNumber: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={restaurantSchema}
          >
            {({ isSubmitting, values, setFieldValue }) => (
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

                <div className="form-group">
                  <label>Name</label>
                  <Field type="text" name="name" className="form-control" />
                  <ErrorMessage
                    className="error-class"
                    name="name"
                    component="div"
                  />
                </div>

                <div className="form-group">
                  <label>Contact No</label>
                  <Field
                    type="text"
                    name="contactNumber"
                    className="form-control"
                  />
                  <ErrorMessage
                    className="error-class"
                    name="contactNumber"
                    component="div"
                  />
                </div>
                <div className="form-group col-6 mb-4">
                  <label>Time</label>
                  <DatePicker
                    selected={values.reserveTime}
                    dateFormat="MMMM d yyyy HH:mm aa"
                    className="form-control"
                    name="reserveTime"
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    timeCaption="time"
                    timeClassName={handleColor}
                    onChange={(date) => {
                      setFieldValue("reserveTime", date);
                      changedata(date);
                    }}
                    minDate={moment().toDate()}
                    excludeTimes={dateSlot}
                  />
                  <ErrorMessage
                    className="error-class"
                    name="reserveTime"
                    component="div"
                  />
                </div>
                <div className="modal-footer">
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
        )}
      </Modal>
    </div>
  );
}

export default ReserveTable;
