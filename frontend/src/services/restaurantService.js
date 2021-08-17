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
export { addTable, getTableData, getTableBookings };