import { PieChart } from "@mui/x-charts";
import "./styles.css";
import BaseText from "../text";
import { useEffect, useState } from "react";
import { classNames } from "../../utils/common";
import BaseCard from "../baseCard";
import { BaseInputSelect } from "../input/BaseInputSelect";
import { useTranslation } from "react-i18next";
import { analyticsApi } from "../../apis/analyticsApi";

type PieChartProps = {
  className?: string; // for tailwindcss
};
export default function BasePieChart(props: PieChartProps) {
  const { className } = props;
  const { t } = useTranslation();
  const [data, setData] = useState<any[]>([]);

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
  const getInfoAnalytics = async () => {
    const params = {
      property: "properties/244725891",
      dimensions: [{ name: "deviceCategory" }],
      metrics: [{ name: "active28DayUsers" }],
      dateRanges: [{ startDate: "30daysAgo", endDate: "yesterday" }],
    };
    let result = await analyticsApi.getInfo(params);
    const convertedData = result.data[0].rows.map((item: any) => {
      const value = parseFloat(item.metricValues[0].value);
      const totalValue = result.data[0].rows.reduce(
        (acc: any, curr: any) => acc + parseFloat(curr.metricValues[0].value),
        0
      );
      const percentage = (value / totalValue) * 100;

      return {
        name: item.dimensionValues[0].value,
        value: value,
        percentage: `${percentage.toFixed(2)}%`,
      };
    });

    setData(convertedData);
  };
  useEffect(() => {
    getInfoAnalytics();
    return () => {};
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     const textElements: any = document.querySelectorAll("#pie-chart text");
  //     changeStyle(textElements);
  //   }, 400);
  // }, [data]);
  function getColorByIndex(index: any) {
    const colors = [
      "bg-rose-900",
      "bg-purple",
      "bg-blue-700",
      "bg-emerald-600",
    ];
    return colors[index];
  }
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
            colors={["#9f1239", "#722ed1", "#1d4ed8", "#059669"]}
            series={[
              {
                arcLabel: (item) => `${item.percentage}`,
                data: data,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: { innerRadius: 0, additionalRadius: -2, color: "gray" },
                cx: 150,
                cy: 150,
                paddingAngle: 0,
                color: "red",
              },
            ]}
          />
        </div>
        <div className="flex flex-row mt-10 max-w-[375px]">
          <div className="flex flex-row items-start justify-center">
            {/* <div className="h-full w-0 border-[0.5px] mx-4"></div> */}
            {data.map((item, index) => (
              <>
                <div
                  className={classNames(
                    `w-3 h-3 mt-1 rounded-full ${getColorByIndex(index)}`
                  )}
                />

                <div className="flex flex-col pl-2">
                  <BaseText locale>{item.name}</BaseText>
                  <BaseText size={18} bold>
                    {item.percentage}
                  </BaseText>
                </div>
                {/* <div className="h-full w-0 border-[0.5px] mx-4"></div> */}
              </>
            ))}
          </div>
        </div>
      </div>
    </BaseCard>
  );
}
