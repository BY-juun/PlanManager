import { useMutation, useQueryClient } from "react-query";
import { addPlanAPI, addScheduleAPI } from "../API/schedule";

export const useAddScheduleMutation = (onSuccess: () => void, onFailure: (response: any) => void) => {
  const queryClient = useQueryClient();
  return useMutation(addScheduleAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries("today");
      onSuccess();
    },
    onError: (response) => {
      onFailure(response);
    },
  });
};

export const useAddPlanMutation = (onSuccess: (reponse: any) => void) => {
  const queryClient = useQueryClient();
  return useMutation(addPlanAPI, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("today");
      onSuccess(response);
    },
  });
};
