import axios from "axios";
import { backUrl } from "../config/config";

axios.defaults.baseURL = backUrl;

export const getTodayAPI = async () => {
  const { data } = await axios.get("/day/today");
  return data;
};

export const deleteTodayPlanAPI = async (id: number) => {
  const { data } = await axios.delete(`/plan/${id}`);
  console.log(data);
  return data;
};
