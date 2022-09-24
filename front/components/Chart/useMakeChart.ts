import { useEffect } from "react";
import { ANIMATION_DURATION, COLORS, CX, CY, DASHARRAY, RADIUS, START_ANGLE, STROKE_WIDTH } from "../../util/constant";

type PlanListDataPercent = Array<{ id: number | undefined; content: string | undefined; percent: number }>;

export const useMakeChart = (data: PlanListDataPercent, chartWrapperRef: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    makeCircle(data, chartWrapperRef);
  }, []);
};

const makeCircle = (
  data: Array<{ id: number | undefined; content: string | undefined; percent: number }>,
  chartWrapperRef: React.RefObject<HTMLDivElement>
) => {
  let filled = 1;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("viewBox", "0 0 100 100");
  if (!chartWrapperRef.current) return;
  chartWrapperRef.current.innerHTML = "";
  chartWrapperRef.current.appendChild(svg);
  data.forEach((o, idx) => {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const dashOffset = DASHARRAY - (DASHARRAY * o.percent) / 100;
    const angle = (filled * 360) / 100 + START_ANGLE;
    const currentDuration = (ANIMATION_DURATION * o.percent) / 100;
    const delay = (ANIMATION_DURATION * filled) / 100;
    const attributes = [
      { type: "r", value: RADIUS },
      { type: "cx", value: CX },
      { type: "cy", value: CY },
      { type: "fill", value: "transparent" },
      { type: "stroke", value: COLORS[idx] },
      { type: "stroke-width", value: STROKE_WIDTH },
      { type: "stroke-dasharray", value: DASHARRAY },
      { type: "stroke-dashoffset", value: DASHARRAY },
      { type: "transform", value: `rotate (${angle} ${CX} ${CY})` },
    ];
    attributes.forEach(({ type, value }) => {
      circle.setAttribute(type, String(value));
    });
    circle.style.transition = `stroke-dashoffset ${currentDuration}ms linear ${delay}ms`;
    svg.appendChild(circle);

    filled += o.percent;
    setTimeout(function () {
      circle.style.strokeDashoffset = String(dashOffset);
    }, 100);
  });
};
