import axios from "axios";
import { backUrl } from "../config/config";

export const getMyInfoAPI = async () => {
  const { data } = await axios.get(`${backUrl}/user`);
  return data;
};

export const logoutAPI = async () => {
  const { data } = await axios.get(`${backUrl}/user/logOut`);
  return data;
};
