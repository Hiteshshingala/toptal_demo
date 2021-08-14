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
export { addTable };