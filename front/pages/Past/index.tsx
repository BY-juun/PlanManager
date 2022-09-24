import React, { useCallback, useEffect, useState, VFC } from "react";
import TopLayOut from "../../components/LayOut/TopLayOut";
import BottomLayout from "../../components/LayOut/BottomLayOut";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import { useUserInfoQuery } from "../../_Query/user";
import { useGetPast } from "../../_Query/past";
import { makeDateForm } from "../../util/makeDateForm";
import PastPlanCard from "../../components/PastPlanCard";
import { PastPlan } from "../../Types/past";
import { PastListWrapper } from "./styles";
import { useCheckLogin } from "../../hooks/useCheckLogin";

const useStyles = makeStyles((theme) => ({
  mainwrraper: {
    textAlign: "center",
    marginTop: "130px",
  },
  icon: {
    color: "#3f51b5",
    fontSize: "50px",
  },
  ment: {
    marginTop: "25px",
    fontSize: "25px",
  },
  finishButton: {
    marginTop: "20px",
    width: "222px",
  },
  pastListWrapper: {
    textAlign: "center",
    marginTop: "20px",
  },
  snackbar: {
    marginTop: "350px",
  },
  snackbar2: {
    marginBottom: "70px",
  },
}));

const past: VFC = () => {
  const classes = useStyles();
  const router = useRouter();
  const { data: UserData, isLoading: UserLoading } = useUserInfoQuery();
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);

  const [FromdayInfo, setFromdayInfo] = useState<string | null>(null);
  const [TodayInfo, setTodayInfo] = useState<string | null>(null);
  const { data: pastPlan, isLoading: pastPlanLoading } = useGetPast({ FromdayInfo: FromdayInfo, TodayInfo: TodayInfo });
  const handleFromDateChange = useCallback(
    (date) => {
      setSelectedFromDate(date);
    },
    [selectedFromDate]
  );

  const handleToDateChange = useCallback(
    (date) => {
      setSelectedToDate(date);
    },
    [selectedToDate]
  );

  const submitPast = useCallback(() => {
    if (!selectedFromDate || !selectedToDate) {
      setSelectedFromDate(null);
      setSelectedToDate(null);
      return alert("*기간을 설정하셔야 합니다");
    } else if (selectedFromDate >= selectedToDate) {
      setSelectedFromDate(null);
      setSelectedToDate(null);
      return alert("*기간 설정이 잘못되어있습니다");
    } else {
      setFromdayInfo(makeDateForm(selectedFromDate));
      setTodayInfo(makeDateForm(selectedToDate));
    }
  }, [selectedFromDate, selectedToDate]);

  useCheckLogin();
  console.log(pastPlan);
  return (
    <>
      <TopLayOut />
      {!UserLoading && !pastPlanLoading && (
        <>
          {pastPlan?.length === 0 ? (
            <div className={classes.mainwrraper}>
              <CheckCircleOutlineIcon className={classes.icon} />
              <div className={classes.ment}>보고싶은 기간을 설정해주세요</div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justifyContent="space-around">
                  <div>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="From"
                      format="MM/dd/yyyy"
                      value={selectedFromDate}
                      onChange={handleFromDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </div>
                  <div>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="To"
                      format="MM/dd/yyyy"
                      value={selectedToDate}
                      onChange={handleToDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </div>
                </Grid>
              </MuiPickersUtilsProvider>
              <div>
                <Button variant="outlined" color="primary" className={classes.finishButton} onClick={submitPast}>
                  설정 완료
                </Button>
              </div>
            </div>
          ) : (
            <PastListWrapper>
              {pastPlan.map((plan: PastPlan, index: number) => (
                <PastPlanCard key={index} dayinfo={plan.dayinfo} planList={plan.Plans} />
              ))}
            </PastListWrapper>
          )}
        </>
      )}
      <BottomLayout value={"past"} />
    </>
  );
};

export default past;
