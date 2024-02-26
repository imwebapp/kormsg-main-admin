import { PieChart } from "@mui/x-charts";
import "./styles.css";
import BaseText from "../text";
import { useEffect, useState } from "react";
import { classNames } from "../../utils/common";
import BaseCard from "../baseCard";
import { BaseInputSelect } from "../input/BaseInputSelect";
import { useTranslation } from "react-i18next";

type PieChartProps = {
  className?: string; // for tailwindcss
};
export default function BasePieChart(props: PieChartProps) {
  const { className } = props;
  const [application, setApplication] = useState(45);
  const [browser, setBrowser] = useState(55);
  const { t } = useTranslation();

  const changeStyle = (textElements: any) => {
    textElements.forEach((textElement: any) => {
      if (textElement) {
        const currentTransform = textElement.style.transform;
        if (!currentTransform.includes("scale")) {
          textElement.style.cssText = `fill: white !important; transform: ${currentTransform} scale(0.4)`;
        }
      }
    });
  };

  useEffect(() => {
    setTimeout(() => {
      const textElements: any = document.querySelectorAll("#pie-chart text");
      changeStyle(textElements);
    }, 400);
  }, [application, browser]);

  return (
    <BaseCard
      className={classNames(
        "flex flex-col justify-between w-[375px]",
        className
      )}
    >
      <div className="flex flex-row justify-between">
        <BaseText locale size={24} bold>
          Used by
        </BaseText>
        <BaseInputSelect
          onChange={() => {}}
          value="Weekly"
          options={[
            {
              value: "Weekly",
              label: t("Weekly"),
            },
            {
              value: "Monthly",
              label: t("Monthly"),
            },
            {
              value: "Annually",
              label: t("Annually"),
            },
          ]}
        />
      </div>
      <div className="flex flex-col items-center mt-7">
        <div id="pie-chart" className="w-[160px] h-[160px] ">
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.value}%`,
                data: [
                  { id: 1, value: browser, color: "#4318FF" },
                  { id: 2, value: application, color: "#00CCFF" },
                ],
                highlightScope: { faded: "global", highlighted: "item" },
                faded: { innerRadius: 0, additionalRadius: -2, color: "gray" },
                cx: 150,
                cy: 150,
                paddingAngle: 0,
              },
            ]}
          />
        </div>
        <div className="flex flex-row mt-10">
          <div className="flex flex-row justify-center items-start">
            <div className="w-3 h-3 bg-violet rounded-full mt-1"></div>
            <div className="flex flex-col pl-2">
              <BaseText locale>Browser</BaseText>
              <BaseText size={18} bold>
                {browser}%
              </BaseText>
            </div>
            <div className="h-full w-0 border-[0.5px] mx-4"></div>
            <div className="w-3 h-3 bg-lightBlue rounded-full mt-1"></div>
            <div className="flex flex-col pl-2">
              <BaseText locale>Application</BaseText>
              <BaseText size={18} bold>
                {application}%
              </BaseText>
            </div>
          </div>
        </div>
      </div>
    </BaseCard>
  );
}
