import { useMutation } from "react-query";
import { addScheduleAPI } from "../API/schedule";

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
