import { User } from "@/store/type";
import axiosClient from "@/app/axiosClient";

const REGISTER_ENDPOINT = "/user/signup";
const LOGIN_ENDPOINT = "/user/signin";

export const register = (user: User) => {
  return axiosClient.post(REGISTER_ENDPOINT, user);
};

export const login = (user: User) => {
  return axiosClient.post(LOGIN_ENDPOINT, user);
};
