import axios from "axios";
import Cookies from "universal-cookie";

const cookie = new Cookies();

export const serverApiRequest = (url, params, query = null, token) => {
  const headers = {
    Authorization: token
      ? token
      : cookie.get("user_token")
      ? cookie.get("user_token")
      : "",
    Accept: "application/json",
  };
  let requestUrl = "";
  if (query === null) {
    requestUrl = process.env.BASE_URL + url.relativeUrl;
  } else {
    requestUrl = process.env.BASE_URL + url.relativeUrl + query;
  }
  return axios({
    method: url.method,
    url: requestUrl,
    data: params,
    headers,
  });
};
export const getServerApiRequest = (url, params, token) => {
  const headers = {
    Authorization: token
      ? token
      : cookie.get("user_token")
      ? cookie.get("user_token")
      : "",
    Accept: "application/json",
  };
  return axios({
    method: "GET",
    url: `${process.env.BASE_URL}${url}`,
    data: params,
    headers,
  });
};
