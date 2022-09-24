import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUserInfoQuery } from "../_Query/user";

export const useCheckLogin = () => {
  const { data: UserData, isLoading: UserLoading } = useUserInfoQuery();
  const router = useRouter();
  useEffect(() => {
    if (!UserLoading) {
      if (!UserData) {
        alert("*로그인 후 이용가능합니다");
        router.push("/");
      }
    }
  }, [UserData, UserLoading]);
};
