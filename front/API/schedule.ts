import axios from "axios";
import { backUrl } from "../config/config";

axios.defaults.baseURL = backUrl;

export const addScheduleAPI = async (dayinfo: number) => {
  const reqData = {
    dayinfo: dayinfo,
  };
  const { data } = await axios.post("/day", reqData);
  return data;
};

export const addPlanAPI = async ({ plan, dayInfo }: { plan: string; dayInfo: string }) => {
  const reqData = {
    plan: plan,
    dayInfo: dayInfo,
  };
  const { data } = await axios.post("/plan", reqData);
  return data;
};
