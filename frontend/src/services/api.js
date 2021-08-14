import generateAxiosInstance from "./axios";

const methods = ["get", "post", "put", "update", "delete"];

const api = async ({
  url,
  method,
  params = false,
  body = false,
  isTokenPass = false,
  contentType = null,
}) => {
  const axios = await generateAxiosInstance(contentType, isTokenPass);
  method = method.toLowerCase();
  if (methods.includes(method)) {
    const request = axios[method];
    let args = [];
    if (method === "get") {
      args = params ? [...args, { params }] : args;
    } else {
      args = [...args, body];
    }
    return request(url, ...args)
      .then((res) => res)
      .catch((err) => {
        console.error("err : ", err);
        return err.response;
      });
  } else {
    throw new Error(`Invalid HTTP Method - ${method}`);
  }
};

export default api;