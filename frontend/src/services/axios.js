  
import axios from "axios";
import { getToken } from '../services/localStorage'

const generateAxiosInstance = async (contentType = null, isToken = false) => {
  let header = {
    "content-type": contentType ? contentType : "application/json"
  }
  if(isToken) {
    const token = getToken();
    header.Authorization = `Bearer ${token}`
  }
  return new Promise((resolve) => {
    const instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: header,
    });

    resolve(instance);
  });
};

export default generateAxiosInstance;