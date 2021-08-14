import { APIs } from "../constant"
import api from "./api";

const updateCompanyName = async ( data ) => {
  let url = APIs.base_Url;
  const method = "post";
  const response = await api({
    url: url + "updateCompanyName",
    method,
    body: data,
  });

  if (response && response.status && response.status === 200) {
    const { data } = response;
    return data;
  }
  return response;
};

export { updateCompanyName };