import { useMutation, useQuery, useQueryClient } from "react-query";
import { getTodayAPI, deleteTodayPlanAPI, submitTodayPlanAPI } from "../API/today";
import { TodayPlan } from "../Types/today";

export const useGetToday = () =>
  useQuery<TodayPlan>("today", () => getTodayAPI(), {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchOnMount: false,
  });

export const useSubmitPlanMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(submitTodayPlanAPI, {
    onSuccess: (value, data) => {
      queryClient.setQueryData<TodayPlan>("today", (prevData: any) => {
        let newData = prevData;
        console.log(newData);
        const findIdx = prevData?.Plans.findIndex((plan: any) => plan?.id === data.id);
        console.log(String(data.endTime));
        newData.Plans[findIdx].endtime = data.endTime;
        newData.Plans[findIdx].starttime = data.startTime;
        newData.Plans[findIdx].totaltime = data.totaltime;
        console.log(newData);
        return newData;
      });
    },
  });
};

export const useDeletePlanMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteTodayPlanAPI, {
    onSuccess: (response) => {
      queryClient.setQueryData<TodayPlan>("today", (prevData: any) => {
        let newData = prevData;
        newData.Plans = newData?.Plans?.filter((plan: any) => plan?.id !== response);
        return newData;
      });
    },
  });
};
