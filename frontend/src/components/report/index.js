import React, {useState, useEffect} from 'react';
import { toast } from "react-toastify";
import { getTableBookingListByCompany, getTableBookingById } from '../../services/restaurantService';
import Table from '../common/table'


function Report() {
  const [bookingsData, setBookingsData] = useState([]);

    useEffect(() => {
        getBookingData();
    }, [])
    const getBookingData = async () => {
        const resData = await getTableBookingListByCompany();
        if (resData.success) {
          if(resData.payload) {
            setBookingsData(resData.payload);
          } else {
            console.log('No booking available')
          }
        } else {
          toast.error('something went wrong');
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
            <h1>Report</h1>
            <Table bookingsData={bookingsData} refId={''} getReservationById={false} type={'report'} getBookingData={getBookingData}/>
        </>
    )
}

export default Report;
