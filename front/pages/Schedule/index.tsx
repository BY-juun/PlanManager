import TopLayOut from "../../components/LayOut/TopLayOut";
import BottomLayout from "../../components/LayOut/BottomLayOut";
import "date-fns";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { useUserInfoQuery } from "../../_Query/user";
import { 계획_설정하기, 날짜_설정하기, 설정_완료 } from "../../util/constant";
import ScheduleStepper from "../../components/Schedule/ScheduleStepper";
import PickDate from "../../components/Schedule/PickDate";
import SettingPlan from "../../components/Schedule/SettingPlan";
import { useRecoilValue } from "recoil";
import { ActiveStep } from "../../_Recoil/schedule";
import Complete from "../../components/Schedule/Complete";

const useStyles = makeStyles((theme) => ({
  mainWrapper: {
    textAlign: "center",
    marginTop: "40px",
  },
}));

const Schedule = () => {
  const classes = useStyles();
  const router = useRouter();
  const activeStep = useRecoilValue(ActiveStep);

  const { data: Userdata, isLoading: getUserInfoLoading } = useUserInfoQuery();

  useEffect(() => {
    if (!getUserInfoLoading) {
      if (!Userdata) {
        alert("*로그인후 이용 가능합니다");
        router.push("/");
      }
    }
  }, [getUserInfoLoading]);

  return (
    <>
      <TopLayOut />
      {!getUserInfoLoading && Userdata && (
        <div className={classes.mainWrapper}>
          <ScheduleStepper activeStep={activeStep} />
          {activeStep === 날짜_설정하기 && ( //1단계일 때,
            <PickDate />
          )}
          {activeStep === 계획_설정하기 && <SettingPlan />}
          {activeStep === 설정_완료 && <Complete />}
        </div>
      )}
      <BottomLayout value={"schedule"}></BottomLayout>
    </>
  );
};

export default Schedule;
