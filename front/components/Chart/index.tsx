import React, { useMemo, useRef } from "react";
import { Plan } from "../../Types/common";
import { useMakeChart } from "./useMakeChart";

interface Props {
  planList: Array<Plan | null>;
}

const Chart = ({ planList }: Props) => {
  const chartWrapperRef = useRef<HTMLDivElement>(null);
  const totalTime = useMemo(() => {
    return planList.reduce((acc, cur) => acc + Number(cur!.totaltime), 0);
  }, [planList]);

  const planListPercentData = useMemo(
    () =>
      planList.map((plan) => {
        return { id: plan?.id, content: plan?.content, percent: Math.ceil((Number(plan?.totaltime) / totalTime) * 100) };
      }),
    [planList]
  );

  useMakeChart(planListPercentData, chartWrapperRef);

  return <div ref={chartWrapperRef}></div>;
};

export default Chart;
