import React, { useCallback, useState } from "react";
import Button from "@material-ui/core/Button";
import { MuiPickersUtilsProvider, KeyboardTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import AlarmOnIcon from "@material-ui/icons/AlarmOn";
import { useDeletePlanMutation, useSubmitPlanMutation } from "../../../_Query/today";
import { BtnWrapper, DeleteBtn, ExecutionTime, PlanCardRoot, PlanContent, SubmitBtn } from "./styles";
import { Plan } from "../../../Types/common";

const useStyles = makeStyles((theme) => ({
  timepicker: {
    width: "100%",
  },
  totlatimeDiv: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  clearIcon: {
    color: "#3f51b5",
  },
}));

const makeTimeDiff = (startTime: Date | null, endTime: Date | null) => {
  if (!(startTime && endTime)) return null;
  return new Date(endTime).getHours() * 60 + new Date(endTime).getMinutes() - (new Date(startTime).getHours() * 60 + new Date(startTime).getMinutes());
};

const IsStartTimeOverEndTime = (startTime: Date | null, endTime: Date | null) => {
  if (startTime && endTime) {
    if (startTime > endTime) return true;
  }
  return false;
};

interface Props {
  plan: Plan;
}

const PlanCard = ({ plan }: Props) => {
  const classes = useStyles();
  const [startTime, setStartTime] = useState<null | Date>(plan.starttime);
  const [endTime, setEndTime] = useState<null | Date>(plan.endtime);
  const deletePlanMutation = useDeletePlanMutation();
  const submitPlanMutation = useSubmitPlanMutation();

  const onChangeStartTime = useCallback(
    (date) => {
      setStartTime(date);
    },
    [startTime]
  );

  const onChangeEndTime = useCallback(
    (date) => {
      setEndTime(date);
    },
    [endTime]
  );

  const submitTime = useCallback(() => {
    let totaltime = null;

    if (IsStartTimeOverEndTime(startTime, endTime)) {
      setStartTime(plan.starttime);
      setEndTime(plan.endtime);
      return alert("*시간 설정이 잘못되었습니다");
    }

    totaltime = makeTimeDiff(startTime, endTime);
    if (totaltime && totaltime <= 0) {
      return alert("*시간은 오늘 24시 안으로 설정해주세요.");
    }
    const id = plan.id;
    const reqData = {
      id,
      startTime,
      endTime,
      totaltime,
    };
    submitPlanMutation.mutate(reqData);
  }, [startTime, endTime]);

  const onClickDelete = useCallback(() => {
    deletePlanMutation.mutate(plan.id);
  }, [deletePlanMutation, plan]);

  return (
    <>
      <PlanCardRoot>
        <PlanContent>{plan.content}</PlanContent>
        <div>
          {plan.endtime && plan.totaltime ? (
            <div className={classes.totlatimeDiv}>
              <AlarmOnIcon className={classes.clearIcon} />
              <ExecutionTime>
                수행시간 : {Math.floor(plan?.totaltime / 60)}시간 {plan?.totaltime % 60}분
              </ExecutionTime>
            </div>
          ) : (
            <>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="시작 시간"
                  className={classes.timepicker}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                  value={startTime}
                  onChange={onChangeStartTime}
                />
                <KeyboardTimePicker
                  margin="normal"
                  className={classes.timepicker}
                  id="time-picker"
                  label="마무리 시간"
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                  value={endTime}
                  onChange={onChangeEndTime}
                />
              </MuiPickersUtilsProvider>
            </>
          )}
        </div>
        {plan.starttime && plan.endtime && plan.totaltime ? null : (
          <BtnWrapper>
            <DeleteBtn onClick={onClickDelete}>삭제</DeleteBtn>
            <SubmitBtn onClick={submitTime}>제출</SubmitBtn>
          </BtnWrapper>
        )}
      </PlanCardRoot>
    </>
  );
};

export default PlanCard;
