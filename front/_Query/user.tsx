import { QueryClient, useMutation, useQuery } from "react-query";
import { getMyInfoAPI, logoutAPI } from "../API/users";
import { UserInfo } from "../Types/user";

export const useUserInfoQuery = () => useQuery<UserInfo>("userInfo", () => getMyInfoAPI());

export const useLogoutMutation = () => {
  const queryClient = new QueryClient();
  return useMutation(["LogOut"], () => logoutAPI(), {
    onSuccess: () => {
      queryClient.setQueriesData("userInfo", null);
      return queryClient.invalidateQueries("userInfo");
    },
  });
};
