import { useMutation } from "react-query";
import { addPlanAPI, addScheduleAPI } from "../API/schedule";

export const useAddScheduleMutation = (onSuccess: () => void, onFailure: () => void) => {
  return useMutation(addScheduleAPI, {
    onSuccess: () => {
      onSuccess();
    },
    onError: () => {
      onFailure();
    },
  });
};

export const useAddPlanMutation = (onSuccess: (reponse: any) => void) => {
  return useMutation(addPlanAPI, {
    onSuccess: (response) => {
      onSuccess(response);
    },
  });
};
