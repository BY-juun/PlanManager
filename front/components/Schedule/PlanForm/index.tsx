import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useAddPlanMutation } from "../../../_Query/schedule";
import useInput from "../../../hooks/useInput";
import { useRecoilState } from "recoil";
import { CompletePlanFormNum } from "../../../_Recoil/schedule";

const useStyles = makeStyles((theme) => ({
  inputField: {
    width: "180px",
    marginRight: "10px",
  },
  button: {
    marginTop: "13px",
    marginLeft: "15px",
  },
  formWrapper: {
    marginTop: "10px",
    marginBottom: "15px",
  },
  submitComplete: {},
}));

interface Props {
  dayInfo: string;
}

const PlanForm = ({ dayInfo }: Props) => {
  const [plan, onChangePlan] = useInput("");
  const [checkSubmit, setCheckSubmit] = useState(false);
  const [completePlanFormNum, setCompletPlanFormNum] = useRecoilState(CompletePlanFormNum);
  const classes = useStyles();

  const onSuccesFunc = useCallback(
    (data) => {
      if (String(data) === plan) {
        setCheckSubmit(true);
        setCompletPlanFormNum(completePlanFormNum + 1);
      }
    },
    [plan, completePlanFormNum]
  );

  const AddPlanMutation = useAddPlanMutation(onSuccesFunc);

  const submitPlan = useCallback(
    (e) => {
      e.preventDefault();
      const reqData = {
        plan: plan,
        dayInfo: dayInfo,
      };
      AddPlanMutation.mutate(reqData);
    },
    [plan]
  );

  return (
    <div>
      <form className={classes.formWrapper}>
        <TextField label="Plan" value={plan} required onChange={onChangePlan} className={classes.inputField}></TextField>
        {checkSubmit ? (
          <>
            <Button variant="outlined" size="medium" color="secondary" className={classes.button}>
              완료
            </Button>
          </>
        ) : (
          <>
            <Button variant="outlined" size="medium" color="primary" type="submit" className={classes.button} onClick={submitPlan}>
              등록
            </Button>
          </>
        )}
      </form>
    </div>
  );
};

export default PlanForm;
