import { atom } from "recoil";
import { getTodayInfo } from "../util/getTodayInfo";

export const PickDateInfo = atom({
  key: "PickDateInfo",
  default: getTodayInfo(),
});
