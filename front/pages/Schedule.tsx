import TopLayOut from "../components/LayOut/TopLayOut";
import BottomLayout from "../components/LayOut/BottomLayOut";
import "date-fns";
import React, { useCallback, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import SendIcon from "@material-ui/icons/Send";
import { useUserInfoQuery } from "../_Query/user";
import { 계획_설정하기, 날짜_설정하기, 설정_완료 } from "../util/constant";
import ScheduleStepper from "../components/Schedule/ScheduleStepper";
import PickDate from "../components/Schedule/PickDate";
import SettingPlan from "../components/Schedule/SettingPlan";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginBottom: "15px",
    marginTop: "5px",
  },
  finishButton: {
    marginTop: "20px",
  },
  mainWrapper: {
    textAlign: "center",
    marginTop: "40px",
  },
  selectDate: {
    marginTop: "100px",
  },
  completetext: {
    marginTop: "20px",
    fontSize: "25px",
  },
  finalPage: {
    marginTop: "100px",
  },
  iconStyle: {
    color: "#3f51b5",
    fontSize: "50px",
  },
  mainredirectionbutton: {
    marginTop: "35px",
  },
  snackbar: {
    marginTop: "350px",
  },
  snackbar2: {
    marginBottom: "70px",
  },
}));

const Schedule = () => {
  const classes = useStyles();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [dayerror, setDayerror] = useState<boolean>(false);

  const { data: Userdata, isLoading: getUserInfoLoading } = useUserInfoQuery();

  const onClickMain = useCallback(() => {
    router.push("/");
  }, [router]);

  useEffect(() => {
    if (!getUserInfoLoading) {
      if (!Userdata) {
        alert("로그인한 유저만 이용 가능합니다");
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
            <PickDate setActiveStep={setActiveStep} setDayerror={setDayerror} />
          )}
          {activeStep === 계획_설정하기 && <SettingPlan setActiveStep={setActiveStep} />}
          {activeStep === 설정_완료 && (
            <div className={classes.finalPage}>
              <CheckCircleOutlineIcon className={classes.iconStyle} />
              <div className={classes.completetext}>등록이 완료되었습니다.</div>
              <div className={classes.mainredirectionbutton}>
                <Button variant="contained" color="primary" size="medium" startIcon={<SendIcon />} onClick={onClickMain}>
                  메인화면으로 이동하기
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
      <BottomLayout value={"schedule"}></BottomLayout>
    </>
  );
};

export default Schedule;
