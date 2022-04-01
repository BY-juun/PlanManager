import axios from "axios";
import { backUrl } from "../config/config";

axios.defaults.baseURL = backUrl;

interface SubmitProps {
  startTime: null | Date;
  endTime: null | Date;
  totaltime: null | number;
  id: number;
}

export const getTodayAPI = async () => {
  const { data } = await axios.get("/day/today");
  return data;
};

export const submitTodayPlanAPI = async (reqData: SubmitProps) => {
  const { data } = await axios.post("/plan/time", reqData);
  return data;
};

export const deleteTodayPlanAPI = async (id: number) => {
  const { data } = await axios.delete(`/plan/${id}`);
  console.log(data);
  return data;
};
