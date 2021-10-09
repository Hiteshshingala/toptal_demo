import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  textFilter,
  dateFilter,
  selectFilter 
} from "react-bootstrap-table2-filter";
import { getTableBookingList,  deleteTableBookingList} from "../../services/restaurantService";
import moment from "moment-timezone";
import { Button } from 'react-bootstrap'

function Table({ refId, getReservationById, bookingsData }) {
  const filterByDate = (filterVal, data) => {
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
  }

  const timeOptions = [
    { value: 1, label: 'past' },
    { value: 2, label: 'future' }
  ]

  const deleteReservation = (id) => {
    deleteTableBookingList(id)
  }
  

  const Action = ({id}) => {
    return (
      <>
      {/* <button className="btn btn-danger btn-xs btn-block btn-wrapper"> Action </button> */}
      <Button variant="danger" size="sm" onClick={(e) => {deleteReservation(id)}}>Delete</Button> 
      <Button variant="dark" size="sm" onClick={(e) => {getReservationById(id)}}>Edit</Button>{' '}
      </>
    )
  }

  const columns = [
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
      text: "noOfSeats",
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
      text: "contactNumber",
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
      filter: selectFilter({
        onFilter: filterByDate,
        options: timeOptions
      })
    },
    {
      dataField: "_id",
      text: "Action",
      formatter: (cell) => {
        return ( <Action id={cell}/> )
      }
    },
  ];


  return (
    <div>
      <BootstrapTable
        keyField="id"
        data={bookingsData}
        filter={filterFactory()}
        columns={columns}
      />
    </div>
  );
}

export default Table;
