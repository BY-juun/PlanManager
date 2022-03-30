import { useMutation } from "react-query";
import { addPlanAPI, addScheduleAPI } from "../API/schedule";

export const useAddScheduleMutation = (onSuccess: () => void, onFailure: (response: any) => void) => {
  return useMutation(addScheduleAPI, {
    onSuccess: () => {
      onSuccess();
    },
    onError: (response) => {
      onFailure(response);
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
