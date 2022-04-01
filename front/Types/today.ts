export interface TodayPlan {
  UserId: number;
  createdAt: string;
  dayinfo: number;
  id: number;
  updatedAt: string;
  Plans: Array<Plan>;
}

export interface Plan {
  DayId: number;
  content: string;
  endtime: null | Date;
  starttime: null | Date;
  totaltime: null | number;
  id: number;
}
