import axios from "axios";
import { backUrl } from "../config/config";

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

interface loginProps {
  email: string;
  password: string;
}

interface signUpProps {
  email: string;
  password: string;
  nickname: string;
}

export const getMyInfoAPI = async () => {
  const { data } = await axios.get(`/user`);
  return data;
};

export const signUpApi = async (signupData: signUpProps) => {
  try {
    const { data } = await axios.post(`/user/signup`, signupData);
    return data;
  } catch (error: any) {
    return error.response;
  }
};

export const loginAPI = async (loginData: loginProps) => {
  try {
    const { data } = await axios.post(`/user/login`, loginData);
    return data;
  } catch (error: any) {
    return error.response;
  }
};

export const logoutAPI = async () => {
  const { data } = await axios.get(`/user/logOut`);
  return data;
};
