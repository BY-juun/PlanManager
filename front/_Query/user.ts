import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { getMyInfoAPI, loginAPI, logoutAPI } from "../API/users";
import { UserInfo } from "../Types/user";

export const useUserInfoQuery = () =>
  useQuery<UserInfo>("userInfo", () => getMyInfoAPI(), {
    refetchOnWindowFocus: false,
    staleTime: 5000,
    refetchOnMount: false,
  });

export const useLoginMutation = (onSuccess: (data: any) => void) => {
  const queryClient = useQueryClient();
  return useMutation(loginAPI, {
    onSuccess: (data) => {
      queryClient.setQueryData("userInfo", data);
      onSuccess(data);
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(logoutAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries("userInfo");
    },
  });
};
