import { APIs } from "../constant"
import api from "./api";

const addTable = async (data = {}) => {
    let url = APIs.base_Url + 'restaurant/';
    const method = "post";
    const response = await api({
        url: url + "addTable",
        method,
        body: data,
        isTokenPass: true
    });

    if (response && response.status && response.status === 200) {
        const { data } = response;
        return data;
    }
  return false;  
}

const getTableData = async (data = {}) => {
    let url = APIs.base_Url + 'restaurant/';
    const method = "get";
    const response = await api({
        url: url,
        method,
        body: {},
        isTokenPass: true
    });

    if (response && response.status && response.status === 200) {
        const { data } = response;
        return data;
    }
  return false;  
}

const getTableBookings = async (data = {}) => {
    let url = APIs.base_Url + 'restaurant/tableData';
    const method = "post";
    const response = await api({
        url: url,
        method,
        body: data,
        isTokenPass: true
    });

    if (response && response.status && response.status === 200) {
        const { data } = response;
        return data;
    }
  return false;  
}

const reserveTables = async (data = {}) => {
    let url = APIs.base_Url + 'restaurant/reserveTable';
    const method = "post";
    const response = await api({
        url: url,
        method,
        body: data,
        isTokenPass: true
    });

    if (response && response.status && response.status === 200) {
        const { data } = response;
        return data;
    }
  return false;  
}

const deleteTables = async (data) => {
    let url = APIs.base_Url + `restaurant/${data.refId}`;
    const method = "delete";
    const response = await api({
        url: url,
        method,
        body: data,
        isTokenPass: true
    });

    if (response && response.status && response.status === 200) {
        const { data } = response;
        return data;
    }
  return false;  
}

const getTableBookingList = async (data) => {
    let url = APIs.base_Url + `restaurant/getReservationList/${data.refId}`;
    const method = "get";
    const response = await api({
        url: url,
        method,
        isTokenPass: true
    });

    if (response && response.status && response.status === 200) {
        const { data } = response;
        return data;
    }
  return false;  
}

const getTableBookingListByCompany = async (data) => {
    let url = APIs.base_Url + `restaurant/getReservationList`;
    const method = "get";
    const response = await api({
        url: url,
        method,
        isTokenPass: true
    });

    if (response && response.status && response.status === 200) {
        const { data } = response;
        return data;
    }
  return false;  
}

const deleteTableBookingList = async (id) => {
    let url = APIs.base_Url + `restaurant/reservation/${id}`;
    const method = "delete";
    const response = await api({
        url: url,
        method,
        isTokenPass: true
    });

    if (response && response.status && response.status === 200) {
        const { data } = response;
        return data;
    }
  return false;  
}

const getTableBookingById = async (id) => {
    let url = APIs.base_Url + `restaurant/reservation/${id}`;
    const method = "get";
    const response = await api({
        url: url,
        method,
        isTokenPass: true
    });

    if (response && response.status && response.status === 200) {
        const { data } = response;
        return data;
    }
  return false;  
}


const updateTableBooking = async (data = {}) => {
    let url = APIs.base_Url + 'restaurant/reserveTable';
    const method = "put";
    const response = await api({
        url: url,
        method,
        body: data,
        isTokenPass: true
    });

    if (response && response.status && response.status === 200) {
        const { data } = response;
        return data;
    }
  return false;  
}
export { addTable, getTableData, getTableBookings, reserveTables, deleteTables, getTableBookingList, deleteTableBookingList, getTableBookingById, updateTableBooking, getTableBookingListByCompany };