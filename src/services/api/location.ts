import axiosClient from "@/app/axiosClient";
import { LocationPayload } from "@/store/type";

export const getLocations = (query?: string) => {
  return axiosClient.get<LocationPayload>(`/location?search=${query ?? ""}`);
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

export const markVisitedLocation = (
  planId: number | string,
  locationid: number | string
) => {
  return axiosClient.put<any>(`/plan/${planId}/location/${locationid}`, {
    isVisited: true,
  });
};

export const getReviews = (id: number | string) => {
  return axiosClient.get<any>(`/location/${id}/reviews`);
}