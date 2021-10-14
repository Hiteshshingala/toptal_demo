import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  textFilter,
  selectFilter,
  dateFilter,
  customFilter
} from "react-bootstrap-table2-filter";
import { deleteTableBookingList} from "../../services/restaurantService";
import moment from "moment-timezone";
import { Button } from 'react-bootstrap'
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Table({ refId, getReservationById, bookingsData, getBookingData, type }) {
  const [bookingsDataNew, setBookingsDataNew] = useState([])
  useEffect(() =>{
    setBookingsDataNew(bookingsData);
  }, [, bookingsData]);

  const filterByDate = (filterVal, data) => {
    if(type !== 'report') {
      const  todayDate = moment();
      let future = [], past = [];
      data.forEach(date => {
        if (!todayDate.isAfter(date.time)) {
          console.log('Date is future');
          future.push(date)
        }else{
          past.push(date)
            console.log('Date is not future');
        }
      });
      if(filterVal == 1){
        return past;
      } else {
        return future;
      }
    } else {
      return data;
    }
  }

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const timeOptions = [
    { value: 1, label: 'past' },
    { value: 2, label: 'future' }
  ]

  const deleteReservation = async (id) => {
    const resData = await deleteTableBookingList(id);
    if(resData.success) {
      getBookingData(refId);
      toast.success(resData.msg);
    } else {
      toast.error(resData.msg);
    }
  }
  

  const Action = ({id}) => {
    return (
      <>
      <Button variant="danger" size="sm" onClick={(e) => {deleteReservation(id)}}>Delete</Button> 
      <Button variant="dark" size="sm" onClick={(e) => {getReservationById(id)}}>Edit</Button>
      </>
    )
  }

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if(start && end){
      let filteredData=[];
      bookingsData.forEach(date => {
        if(moment(date.time).isBetween(moment(start).subtract(1, 'day'), moment(end).add(1, 'day'), undefined, '[]')){
          filteredData.push(date);
        }
      })
      setBookingsDataNew(filteredData);
    }
  };

  const columns = [
    {
      dataField: "tableId",
      text: "Table Id",
      filter: textFilter({
        style: {
          marginTop: "20px",
        },
      }),
      hidden: type !== 'report',
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: "name",
      text: "Name",
      filter: textFilter({
        style: {
          marginTop: "20px",
        },
      }),
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: "noOfSeats",
      text: "No Of Seats",
      filter: textFilter({
        style: {
          marginTop: "20px",
        },
      }),
      align: "center",
      headerAlign: "center",
    },
    {
      dataField: "contactNumber",
      text: "Contact Number",
      filter: textFilter({
        style: {
          marginTop: "20px",
        },
      }),
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: "time",
      text: "Time for filter",
      formatter: (cell) => {
        return <>{moment(cell).add(1, 'day').format('DD-MM-YYYY hh:mm')}</>
      },
      hidden: (type === 'report'),
      headerAlign: "center",
      align: "center",
      filter: selectFilter({
        onFilter: filterByDate,
        options: timeOptions
      })
    },
    {
      dataField: "time",
      text: "Time for filter",
      formatter: (cell) => {
        return <>{moment(cell).add(1, 'day').format('DD-MM-YYYY hh:mm')}</>
      },
      hidden: (type !== 'report'),
      filter: customFilter(),
      filterRenderer: (onFilter, column) => {
          return (
            <DatePicker    
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              />
          )
      }
    },
    {
      dataField: "_id",
      text: "Action",
      headerAlign: "center",
      align: "center",
      hidden: type === 'report',
      formatter: (cell) => {
        return ( <Action id={cell}/> )
      }
    },
  ];


  return (
    <div>
      <BootstrapTable
        keyField="id"
        selectsRange={true}
        data={bookingsDataNew}
        isClearable={true}
        filter={filterFactory()}
        columns={columns}
      />
    </div>
  );
}

export default Table;
