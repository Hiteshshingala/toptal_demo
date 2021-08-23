import { APIs } from "../constant"
import api from "./api";

const login = async ({ data } = { data: {} }) => {
  let url = APIs.base_Url + 'users/';
  const method = "post";
  const response = await api({
    url: url + "login",
    method,
    body: data,
  });

  if (response && response.status && response.status === 200) {
    const { data } = response;
    return data;
  }
  return false;
};

const Sign_Up = async ({ data } = { data: {} }) => {
  let url = APIs.base_Url + 'users/';
  const method = "post";
  const response = await api({
    url: url + "register",
    method,
    body: data,
  });

  if (response && response.status) {
    const { data } = response;
    return data;
  }
  return false;
};

const Sign_Out = async () => {
  let url = APIs.base_Url + 'users/';
  const method = "delete";
  const response = await api({
    url: url + "sign_out",
    method,
    isTokenPass: true
  });

  if (response && response.status && response.status === 200) {
    const { data } = response;
    return data;
  }
  return false;
};

export { login, Sign_Up, Sign_Out };