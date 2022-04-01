import { useMutation, useQuery, useQueryClient } from "react-query";
import { getTodayAPI, deleteTodayPlanAPI } from "../API/today";
import { TodayPlan } from "../Types/today";

export const useGetToday = () =>
  useQuery<TodayPlan>("today", () => getTodayAPI(), {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchOnMount: false,
  });

export const useDeletePlanMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteTodayPlanAPI, {
    onSuccess: (response) => {
      console.log(response);
      console.log(queryClient.getQueryData("today"));
      queryClient.setQueryData<TodayPlan>("today", (prevData: any) => {
        console.log(prevData);
        let newData = prevData;
        newData?.Plans?.filter((plan: any) => plan?.id !== response);
        return newData;
      });
      console.log(queryClient.getQueryData("today"));
    },
  });
};
