import { useQuery } from "react-query";
import { getPastPlanAPI } from "../API/past";
import { PastPlan } from "../Types/past";

interface Period {
  FromdayInfo: string | null;
  TodayInfo: string | null;
}

export const useGetPast = (period: Period) => {
  return useQuery(
    ["Past", period.FromdayInfo, period.TodayInfo],
    ({ queryKey }) =>
      getPastPlanAPI({
        FromdayInfo: queryKey[1],
        TodayInfo: queryKey[2],
      }),
    { refetchOnWindowFocus: false, cacheTime: Infinity }
  );
};
