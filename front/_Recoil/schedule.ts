import { atom } from "recoil";
import { getTodayInfo } from "../util/getTodayInfo";

export const PickDateInfo = atom({
  key: "PickDateInfo",
  default: getTodayInfo(),
});

export const ActiveStep = atom({
  key: "ActiveStep",
  default: 0,
});

export const PlanFormNum = atom({
  key: "PlanFormNum",
  default: 1,
});

export const CompletePlanFormNum = atom({
  key: "CompletePlanFormNum",
  default: 0,
});
