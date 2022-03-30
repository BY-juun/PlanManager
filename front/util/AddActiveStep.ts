import { useSetRecoilState } from "recoil";
import { ActiveStep } from "../_Recoil/schedule";

export const AddActiveStep = () => {
  const setActiveStep = useSetRecoilState(ActiveStep);
  setActiveStep((prevActiveStep) => prevActiveStep + 1);
};
