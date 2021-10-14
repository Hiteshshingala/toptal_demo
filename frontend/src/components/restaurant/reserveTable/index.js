import React, { useState } from "react";
import { Container, Row, Col, Modal} from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import {
  getTableBookings,
  getTableBookingById,
  getTableBookingList
} from "../../../services/restaurantService";
import moment from "moment-timezone";
import Table from "../../common/table";
import ReservationForm from "../../common/reservationForm";

function ReserveTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refId, setRefId] = useState("");
  const [keyboard, setKeyboard] = useState(true);
  const [dateSlot, setDateSlot] = useState([]);
  const [bookingFormOpen, setbookingFormOpen] = useState(false);
  const [bookingsData, setBookingsData] = useState([]);
  const [bookingData, setBookingData] = useState({
    refId: refId,
    noOfSeats: "",
    reserveTime: "",
    name: "",
    contactNumber: "",
    _id: ''
  });

  const getBookingData = async (_refId) => {
    const resData = await getTableBookingList({ refId: _refId });
    if (resData.success && resData.payload) {
      setBookingsData(resData.payload);
    } else {
      setBookingsData([]);
    }
  };
  const openModal = (refId, noOfSeats, name) => {
    setbookingFormOpen(false);
    setIsModalOpen(true);
    setRefId(refId);
    getBookingData(refId);
    setBookingData({...bookingData, refId: refId});
    getTableAvailability({
      refId: refId,
      date: moment().utc().format("YYYY-MM-DD"),
    });
  };
  const closeModal = () => {
    setIsModalOpen(false);
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
    } else {
      console.log('all time slot available')
    }
  };

  const openAddBookingForm = () => {
    setbookingFormOpen(true);
    setBookingData({refId: refId })
  };

  
  const getReservationById = async (id) => {
    const resp = await getTableBookingById(id);
    if(resp && resp.success ){
      setBookingData({...resp.payload, reserveTime:  moment(resp.payload.time).add(1, 'day').toDate(), refId: resp.payload.tableId })
    }
    setbookingFormOpen(true);

  }
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
              <Table bookingsData={bookingsData} refId={refId} getReservationById={getReservationById} getBookingData={getBookingData}/>
            </div>
          </>
        ) : (
          <ReservationForm refId={refId} close={closeModal} data={bookingData}/>
        )}
      </Modal>
    </div>
  );
}

export default ReserveTable;
