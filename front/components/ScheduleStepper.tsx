import { Step, StepLabel, Stepper } from "@material-ui/core";
import React from "react";

interface Props {
  activeStep: number;
}

const steps = ["날짜 설정하기", "계획 설정하기", "설정 완료"];

const ScheduleStepper = ({ activeStep }: Props) => {
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps?.map((step) => (
        <Step key={step}>
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default ScheduleStepper;
