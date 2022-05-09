import axiosClient from "@/app/axiosClient";
import { NewPlanPayload } from "../../store/type";

export const getAllPlans = () => {
  return axiosClient.get("/plan");
};

export const getPlanById = (id: number) => {
  return axiosClient.get(`/plan/${id}`);
};

export const createNewPlan = (plan: NewPlanPayload) => {
  return axiosClient.post("/plan", plan);
};

export const addLocationToPlan = (
  planId: number,
  locationId: number,
  date: Date,
  numberOfPeople: number
) => {
  return axiosClient.post(`/plan/${planId}/location`, {
    locationId,
    date,
    numberOfPeople,
  });
};

export const getUserPlan = () => {
  return axiosClient.get("/planlocation");
};
