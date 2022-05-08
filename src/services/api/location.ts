import axiosClient from "@/app/axiosClient";
import { LocationPayload } from "@/store/type";

export const getLocations = () => {
  return axiosClient.get<LocationPayload>("/location");
};

export const getLocationById = (id: string | number) => {
  return axiosClient.get<any>(`/location/${id}`);
};

export const getLocationGraphData = (id: string, filter: string) => {
  return axiosClient.get<any>(`/location/${id}/graph?filter=${filter}`);
};

export const getFavouriteLocations = () => {
  return axiosClient.get<LocationPayload>("/user/favorite");
};
