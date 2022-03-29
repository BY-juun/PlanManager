import TopLayout from "../components/TopLayout";
import BottomLayout from "../components/BottomLayout";
import "date-fns";
import React, { useCallback, useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import PlanForm from "../components/PlanForm";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import SendIcon from "@material-ui/icons/Send";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useUserInfoQuery } from "../_Query/user";
import { useAddScheduleMutation } from "../_Query/schedule";
import { 계획_설정하기, 날짜_설정하기, 설정_완료 } from "../util/constant";
import ScheduleStepper from "../components/ScheduleStepper";

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  const [selectedDate, setSelectedDate] = useState(null);
  let dayInfo = String(new Date().getFullYear()) + String(new Date().getMonth() + 1) + String(new Date().getDate());

  const [countList, setCountList] = useState([]);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [dayinfo, setDayinfo] = useState<number>(0);
  const [dayerror, setDayerror] = useState<boolean>(false);
  const [dayinfoerror, setDayinfoerror] = useState<boolean>(false);

  const AddScheduleSuccessFunction = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, []);

  const AddScheduleFailureFunction = useCallback(() => {
    setSelectedDate(null);
    setDayerror(true);
  }, []);

  const addScheduleMutation = useAddScheduleMutation(AddScheduleSuccessFunction, AddScheduleFailureFunction);

  const { data: Userdata, isLoading: getUserInfoLoading } = useUserInfoQuery();

  const handleDateChange = useCallback(
    (date) => {
      setSelectedDate(date);
      if (date.getMonth() + 1 < 10) {
        if (date.getDate() < 10) {
          dayInfo = String(date.getFullYear()) + "0" + String(date.getMonth() + 1) + "0" + String(date.getDate());
        } else {
          dayInfo = String(date.getFullYear()) + "0" + String(date.getMonth() + 1) + String(date.getDate());
        }
      } else {
        if (date.getDate() < 10) {
          dayInfo = String(date.getFullYear()) + String(date.getMonth() + 1) + "0" + String(date.getDate());
        } else {
          dayInfo = String(date.getFullYear()) + String(date.getMonth() + 1) + String(date.getDate());
        }
      }
      setDayinfo(Number(dayInfo));
    },
    [selectedDate]
  );

  const submitDate = useCallback(() => {
    if (!dayinfo) {
      setSelectedDate(null);
      return setDayinfoerror(true);
    }
    addScheduleMutation.mutate(dayinfo);
  }, [dayInfo, dayinfo]);

  const addInput = useCallback(() => {
    let countArr: any = [...countList];
    let counter: any = countArr.slice(-1)[0];
    counter += 1;
    countArr.push(counter); // index 사용 X
    // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용
    setCountList(countArr);
  }, [countList]);

  const removeInput = useCallback(() => {
    let countArr = [...countList];
    countArr.pop();
    setCountList(countArr);
  }, [countList]);

  const submitPlanComplete = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, [activeStep]);

  const onClickMain = useCallback(() => {
    router.push("/");
  }, [router]);

  const handleClose = (event: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setDayerror(false);
    setDayinfoerror(false);
  };

  useEffect(() => {
    if (!getUserInfoLoading) {
      if (!Userdata) {
        alert("로그인한 유저만 이용 가능합니다");
        router.push("/");
      }
    }
  }, [getUserInfoLoading]);

  console.log(activeStep);
  return (
    <>
      <TopLayout></TopLayout>
      {!getUserInfoLoading && Userdata && (
        <div className={classes.mainWrapper}>
          <ScheduleStepper activeStep={activeStep} />
          {activeStep === 날짜_설정하기 && ( //1단계일 때,
            <div className={classes.selectDate}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justifyContent="space-around">
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="날짜 선택"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <div>
                <Button variant="outlined" color="primary" className={classes.finishButton} onClick={submitDate}>
                  설정 완료
                </Button>
              </div>
            </div>
          )}
          {activeStep === 계획_설정하기 && (
            <>
              <IconButton color="primary" aria-label="add plan" onClick={addInput}>
                <AddCircleIcon />
              </IconButton>
              <IconButton color="secondary" aria-label="remove plan" onClick={removeInput}>
                <RemoveCircleIcon />
              </IconButton>
              {countList.map((value, index) => (
                <PlanForm key={index} dayInfo={String(dayinfo)} />
              ))}
              <div>
                <Button variant="contained" color="primary" size="small" startIcon={<SaveIcon />} onClick={submitPlanComplete}>
                  등록완료
                </Button>
              </div>
            </>
          )}
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
      {/* <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "center" }} open={dayerror} className={classes.snackbar2} onClose={handleClose}>
            <Alert severity="error" onClose={handleClose}>
            {addDayError}
            </Alert>
        </Snackbar> */}
      <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "center" }} open={dayinfoerror} className={classes.snackbar2} onClose={handleClose}>
        <Alert severity="error" onClose={handleClose}>
          날짜를 제대로 설정해주세요.
        </Alert>
      </Snackbar>
      <BottomLayout value={"schedule"}></BottomLayout>
    </>
  );
};

export default Schedule;
