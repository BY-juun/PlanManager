import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import { useRecoilValue } from "recoil";
import { PickDateInfo } from "../../../_Recoil/schedule";
import PlanForm from "../PlanForm";

interface Props {
  setActiveStep: Dispatch<SetStateAction<number>>;
}

const SettingPlan = ({ setActiveStep }: Props) => {
  const [planFormNum, setPlanFormNum] = useState<number>(1);
  const DayInfo = useRecoilValue(PickDateInfo);

  const submitPlanComplete = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, []);

  const addInput = useCallback(() => {
    setPlanFormNum((prevNum) => prevNum + 1);
  }, []);

  const removeInput = useCallback(() => {
    if (planFormNum === 1) {
      alert("1개 이상 작성해야합니다");
      return;
    }
    setPlanFormNum((prevNum) => prevNum - 1);
  }, [planFormNum]);

  return (
    <>
      <IconButton color="primary" aria-label="add plan" onClick={addInput}>
        <AddCircleIcon />
      </IconButton>
      <IconButton color="secondary" aria-label="remove plan" onClick={removeInput}>
        <RemoveCircleIcon />
      </IconButton>
      {Array.from({ length: planFormNum }, () => null).map((value, index) => (
        <PlanForm key={index} dayInfo={String(DayInfo)} />
      ))}
      <div>
        <Button variant="contained" color="primary" size="small" startIcon={<SaveIcon />} onClick={submitPlanComplete}>
          등록완료
        </Button>
      </div>
    </>
  );
};

export default SettingPlan;
