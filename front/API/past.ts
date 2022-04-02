import axios from "axios";
import { backUrl } from "../config/config";

axios.defaults.baseURL = backUrl;

interface ReqData {
  FromdayInfo: string | null;
  TodayInfo: string | null;
}

export const getPastPlanAPI = async (reqData: ReqData) => {
  const { data } = await axios.post("/day/past", reqData);
  return data;
};
