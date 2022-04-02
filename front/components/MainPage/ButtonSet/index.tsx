import React, { useCallback } from "react";
import { LOGIN, NOT_LOGIN } from "../../../util/constant";
import { useLogoutMutation, useUserInfoQuery } from "../../../_Query/user";
import { useRouter } from "next/router";
import { Divider, HelloUser, LogOutBtn, NotLoginWrapper } from "./styles";

interface Props {
  mode: boolean;
}

const ButtonSet = ({ mode }: Props) => {
  const { data: UserData } = useUserInfoQuery();
  const router = useRouter();

  const onClickLoginBtn = useCallback(() => {
    router.push("/Login");
  }, [router]);

  const onClickSignUpBtn = useCallback(() => {
    router.push("/Signup");
  }, [router]);

  const logoutMutation = useLogoutMutation();

  const onClickLogout = useCallback(() => {
    logoutMutation.mutate();
  }, []);

  return (
    <>
      {mode === NOT_LOGIN && (
        <>
          <NotLoginWrapper>
            <div onClick={onClickLoginBtn}>로그인</div>
            <Divider>|</Divider>
            <div onClick={onClickSignUpBtn}>회원가입</div>
          </NotLoginWrapper>
        </>
      )}
      {mode === LOGIN && (
        <>
          <HelloUser>
            안녕하세요. <span>{UserData?.nickname}</span> 님
          </HelloUser>
          <LogOutBtn onClick={onClickLogout}>로그아웃</LogOutBtn>
        </>
      )}
    </>
  );
};

export default ButtonSet;
