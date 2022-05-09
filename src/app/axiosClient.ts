import axios from "axios";
import queryString from "query-string";
import userService from "@/services/user";
// Set up default config for http requests here
// import userService from "./service/user.service";

const axiosClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_SERVER_URL ||
    "https://travel-flow-hackathon-2022.herokuapp.com/",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  const user = userService.getUser();
  if (user !== null) {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    // if (response && response.data) {
    //   return response.data;
    // }
    return response;
  },
  (error) => {
    // Handle errors
    return Promise.reject(error);
  }
);
export default axiosClient;
