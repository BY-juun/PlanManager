import React, { useCallback } from "react";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ActiveStep, CompletePlanFormNum, PickDateInfo, PlanFormNum } from "../../../_Recoil/schedule";
import PlanForm from "../PlanForm";

const SettingPlan = () => {
  const [planFormNum, setPlanFormNum] = useRecoilState(PlanFormNum);
  const completePlanFormNum = useRecoilValue(CompletePlanFormNum);
  const DayInfo = useRecoilValue(PickDateInfo);
  const setActiveStep = useSetRecoilState(ActiveStep);

  const submitPlanComplete = useCallback(() => {
    if (planFormNum !== completePlanFormNum) {
      alert("아직 등록하지 않은 계획이 있습니다");
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  }, [planFormNum, completePlanFormNum]);

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
      <div style={{ marginBottom: "100px" }}>
        <Button variant="contained" color="primary" size="small" startIcon={<SaveIcon />} onClick={submitPlanComplete}>
          등록완료
        </Button>
      </div>
    </>
  );
};

export default SettingPlan;
