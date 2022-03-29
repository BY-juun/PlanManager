import axios from "axios";
import { backUrl } from "../config/config";

axios.defaults.baseURL = backUrl;

export const addScheduleAPI = async (reqData: number) => {
  const { data } = await axios.post("/day", reqData);
  return data;
};
