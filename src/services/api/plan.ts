import axiosClient from "@/app/axiosClient";
import { NewPlanPayload } from "../../store/type";

export const getAllPlans = () => {
  return axiosClient.get("/plan");
};

export const createNewPlan = (plan: NewPlanPayload) => {
  return axiosClient.post("/plan", plan);
};
