import { Plan } from "./common";

export interface PastPlan {
  UserId: number;
  createdAt: string;
  dayinfo: number;
  id: number;
  updatedAt: string;
  Plans: Array<Plan | null>;
}
