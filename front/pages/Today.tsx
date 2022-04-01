import React, { useEffect, VFC } from "react";
import TopLayOut from "../components/LayOut/TopLayOut";
import BottomLayout from "../components/LayOut/BottomLayOut";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import { useRouter } from "next/router";
import AlarmOffIcon from "@material-ui/icons/AlarmOff";

import { useUserInfoQuery } from "../_Query/user";
import { useGetToday } from "../_Query/today";
import PlanList from "../components/PlanList";

const useStyles = makeStyles((theme) => ({
  TodayWrapper: {
    textAlign: "center",
    marginTop: "30px",
  },
  icon: {
    color: "#f48fb1",
    fontSize: "65px",
  },
  noSchedule: {
    marginTop: "170px",
  },
  noScheduleComment: {
    marginTop: "30px",
    fontSize: "20px",
  },
  snackbar: {
    marginTop: "350px",
  },
  chipp: {
    marginBottom: "15px",
  },
}));

const Today: VFC = () => {
  const router = useRouter();
  const { data: UserData, isLoading: UserLoading } = useUserInfoQuery();
  const classes = useStyles();
  const today = new Date();
  const { data: TodayData, isLoading: todayLoading } = useGetToday();

  const dayinfo = String(today.getFullYear()) + " " + String(today.getMonth() + 1) + " " + String(today.getDate());

  useEffect(() => {
    if (!UserLoading) {
      if (!UserData) {
        alert("로그인 후 이용가능합니다");
        router.push("/");
      }
    }
  }, [UserData, UserLoading]);

  return (
    <>
      <TopLayOut />
      {UserData && !todayLoading && (
        <div className={classes.TodayWrapper}>
          <h2>오늘의 일정!</h2>
          <Chip className={classes.chipp} label={dayinfo} color="primary" variant="outlined" />
          {!TodayData?.Plans && (
            <div className={classes.noSchedule}>
              <AlarmOffIcon className={classes.icon} />
              <div className={classes.noScheduleComment}>아직 오늘 일정이 없습니다</div>
            </div>
          )}
          {TodayData?.Plans && TodayData?.Plans.map((plan, index) => <PlanList key={index} plan={plan} />)}
        </div>
      )}
      <BottomLayout value={"today"}></BottomLayout>
    </>
  );
};

export default Today;
