import React, {useState, useEffect} from 'react';
import { getTableBookingListByCompany, getTableBookingById } from '../../services/restaurantService';
import Table from '../common/table'


function Report() {
  const [bookingsData, setBookingsData] = useState([]);

    useEffect(() => {
        getBookingData();
    }, [])
    const getBookingData = async () => {
        const resData = await getTableBookingListByCompany();
        console.log('@@@resData', resData)
        if (resData.success && resData.payload) {
          setBookingsData(resData.payload);
        }
      };

      
  
  const getReservationById = async (id) => {
    const resp = await getTableBookingById(id);
    if(resp && resp.success ){
    //   setBookingData({...resp.payload, reserveTime:  moment(resp.payload.time).add(1, 'day').toDate(), refId: resp.payload.tableId })
    }
  }
    return (
        <>
            <h1>report</h1>
            <Table bookingsData={bookingsData} refId={''} getReservationById={getReservationById} />
        </>
    )
}

export default Report;
