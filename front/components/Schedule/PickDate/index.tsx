import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import { useAddScheduleMutation } from "../../../_Query/schedule";
import { makeDateForm } from "../../../util/makeDateForm";
import { getTodayInfo } from "../../../util/getTodayInfo";
import { useRecoilState } from "recoil";
import { PickDateInfo } from "../../../_Recoil/schedule";

const useStyles = makeStyles((theme) => ({
  finishButton: {
    marginTop: "20px",
  },
  selectDate: {
    marginTop: "100px",
  },
}));

interface Props {
  setActiveStep: Dispatch<SetStateAction<number>>;
  setDayerror: Dispatch<SetStateAction<boolean>>;
}

const PickDate = ({ setActiveStep, setDayerror }: Props) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [dayInfo, setDayInfo] = useRecoilState(PickDateInfo);

  const AddScheduleSuccessFunction = useCallback(() => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
  }, []);

  const AddScheduleFailureFunction = useCallback(() => {
    setSelectedDate(null);
    setDayerror(true);
  }, []);

  const addScheduleMutation = useAddScheduleMutation(AddScheduleSuccessFunction, AddScheduleFailureFunction);

  const handleDateChange = useCallback(
    (date) => {
      setSelectedDate(date);
      setDayInfo(makeDateForm(date));
    },
    [selectedDate]
  );

  const submitDate = useCallback(() => {
    if (!dayInfo) {
      setSelectedDate(null);
      alert("날짜를 다시 설정해주세요");
      return;
    }
    addScheduleMutation.mutate(Number(dayInfo));
  }, [dayInfo, dayInfo]);

  return (
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
  );
};

export default PickDate;
