import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import HistoryIcon from "@material-ui/icons/History";
import TodayIcon from "@material-ui/icons/Today";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import { getMyInfoAPI, logoutAPI } from "../../../API/users";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { BottomLayOutItem, BottomLayOutWrapper } from "./styles";
import { useLogoutMutation } from "../../../_Query/user";
const useStyles = makeStyles({
  root: {
    position: "fixed",
    left: "0px",
    bottom: "0px",
    zIndex: 9999,
    width: "100%",
  },
});

interface Props {
  value: string | null;
}

//value에 따른 highlighting 처리 해야함.
const BottomLayout = ({ value }: Props) => {
  const router = useRouter();

  const logoutMutation = useLogoutMutation();

  const gotoHistory = useCallback(() => {
    router.push("/Past");
  }, []);

  const gotoToday = useCallback(() => {
    router.push("/Today");
  }, []);

  const gotoSchedule = useCallback(() => {
    router.push("/Schedule");
  }, []);

  const onClickLogout = useCallback(() => {
    logoutMutation.mutate();
    router.push("/");
  }, []);

  const onClickLogin = useCallback(() => {
    router.push("/Login");
  }, []);

  const { data: UserData } = useQuery("myInfo", () => getMyInfoAPI());

  return (
    <BottomLayOutWrapper>
      <BottomLayOutItem onClick={gotoHistory}>
        <HistoryIcon />
        <div>과거</div>
      </BottomLayOutItem>
      <BottomLayOutItem onClick={gotoToday}>
        <AccessAlarmIcon />
        <div>오늘일정</div>
      </BottomLayOutItem>
      <BottomLayOutItem onClick={gotoSchedule}>
        <TodayIcon />
        <div>계획짜기</div>
      </BottomLayOutItem>
      <BottomLayOutItem onClick={UserData ? onClickLogout : onClickLogin}>
        <ExitToAppIcon />
        {UserData ? <div>로그아웃</div> : <div>로그인</div>}
      </BottomLayOutItem>
    </BottomLayOutWrapper>
  );
};

export default BottomLayout;
