import React, {useState, useEffect} from 'react';
import { getTableBookingById } from '../../services/restaurantService';
import { toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  getTableBookings,
  reserveTables,
  updateTableBooking
} from "../../services/restaurantService";
import moment from "moment-timezone";
import * as Yup from "yup";

function ReservationForm({refId, close, data}) {
  // const [bookingsData, setBookingsData] = useState([]);
//   const [refId, setRefId] = useState("");
  const [dateSlot, setDateSlot] = useState([]);
  const [isData, SetIsData] = useState(false);
  const [bookingData, setBookingData] = useState({
    refId: refId,
    noOfSeats: "",
    reserveTime: "",
    name: "",
    contactNumber: "",
    _id: ''
  });
    useEffect(() => {

      setBookingData({...data});
        SetIsData(true);
    }, [])
      const handleSubmit = async (value) => {
        const data = {
          _id: value._id,
          refId: value.refId,
          noOfSeats: value.noOfSeats,
          name: value.name,
          contactNumber: value.contactNumber,
          reserveTime: moment(value.reserveTime).utc(),
        };
        if(data._id) {
          const response = await updateTableBooking({ ...data });
          if (response && response.success) {
            toast.success(response.msg);
            close();
          } else {
            toast.error(response.msg);
          }
        } else {
          const response = await reserveTables({ ...data });
          if (response && response.success) {
            toast.success(response.msg);
            close();
          } else {
            toast.error(response.msg);
          }
        }
      };
    
      
  let handleColor = (time) => {
    let isAvailable = true;
    dateSlot.forEach(t => {
      if(moment(time).isSame(t)){
        isAvailable = false;
      }
    })
    return (time.getHours() > 12 && isAvailable) ? "text-success" : "text-error";
  };

  const changedate = (selectedDate) => {
    getTableAvailability({
      refId: refId,
      date: moment(selectedDate).utc().format("YYYY-MM-DD"),
    });
  };

  const getTableAvailability = async (body) => {
    const resData = await getTableBookings(body);
    if (resData.success && resData.payload && resData.payload.length > 0) {
      let _excludeTimeSlot = [];
      resData.payload.forEach((_date) => {
        if (moment(_date.time).isSame(moment(body.date), "day")) {
          let a = new Date(moment(_date.time).add(1, 'day'));
          _excludeTimeSlot.push(a);
        }
      });
      setDateSlot(_excludeTimeSlot);
    } else {
      console.log('time slot available')
    }
  };
    
  const restaurantSchema = Yup.object().shape({
    noOfSeats: Yup.string().required("Please Enter No of seats"),
    reserveTime: Yup.string().required("Please select date and time"),
    name: Yup.string().required("Please Enter Name"),
    contactNumber: Yup.string().required("Please Enter Contact Number"),
  });  
  const getReservationById = async (id) => {
    const resp = await getTableBookingById(id);
    if(resp && resp.success ){
      setBookingData({...resp.payload, reserveTime:  moment(resp.payload.time).add(1, 'day').toDate(), refId: resp.payload.tableId })
    }
  }

    return (
        <>
          <Formik
            initialValues={bookingData}
            enableReinitialize 
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
                    dateFormat="MMMM d yyyy HH:mm"
                    className="form-control"
                    name="reserveTime"
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={60}
                    timeCaption="time"
                    timeClassName={handleColor}
                    onChange={(date) => {
                      setFieldValue("reserveTime", date);
                      changedate(date);
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
                    onClick={close}
                    className="btn btn-dark btn-lg btn-block"
                  >
                    cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </>
    )
}

export default ReservationForm;
