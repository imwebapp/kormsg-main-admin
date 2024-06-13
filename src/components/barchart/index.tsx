import {
  BarChart,
  BarPlot,
  ChartsXAxis,
  ChartsYAxis,
  ChartsTooltip,
} from "@mui/x-charts";
import "./styles.css";
import { useEffect, useState } from "react";
import BaseCard from "../baseCard";
import BaseText from "../text";
import CustomTimePicker from "../calendar";
import BaseSegmented from "../segmented";
import { useTranslation } from "react-i18next";
import { classNames } from "../../utils/common";
import { useLocalStorage } from "../../stores/localStorage";
import { analyticsApi } from "../../apis/analyticsApi";
import dayjs from "dayjs";
import { PARAMS_PROPERTY_WEB } from "../../utils/constants";

export interface BarChartDataInterface {
  label: string;
  value: number;
}
type BarChartProps = {
  onSelectDateTime?: (dateTime: string[]) => void;
};

const columnYLabelWidth = 80;
const columnWidth = 68;

export default function BaseBarChart(props: BarChartProps) {
  const { onSelectDateTime } = props;
  const { collapsed } = useLocalStorage((state) => state);
  const [uData, setuData] = useState<Array<number>>([]);
  const [xLabels, setxLabels] = useState<Array<string>>([]);
  const { t } = useTranslation();
  const [data, setData] = useState<Array<BarChartDataInterface>>([]);
  const [dateTimeSelect, setDateTimeSelect] = useState(["30daysAgo", "today"]);

  const [optionTime, setOptionTime] = useState(t("Days"));
  const getInfoAnalytics = async () => {
    try {
      const params = {
        property: PARAMS_PROPERTY_WEB,
        dimensions: [{ name: optionTime === t("Hours") ? "hour" : "date" }],
        metrics: [{ name: "screenPageViews" }],
        dateRanges: [
          {
            startDate: dateTimeSelect ? dateTimeSelect[0] : "30daysAgo",
            endDate: dateTimeSelect ? dateTimeSelect[1] : "today",
          },
        ],
        orderBys: [
          {
            dimension: {
              orderType: "NUMERIC",
              dimensionName: optionTime === t("Hours") ? "hour" : "date",
            },
          },
        ],
      };

      let result = await analyticsApi.getInfo(params);
      //  get user active today
      const convertedData = result.data[0].rows.map((item: any) => ({
        label:
          optionTime === t("Hours")
            ? item.dimensionValues[0].value
            : dayjs(item.dimensionValues[0].value, "YYYYMMDD").format("MM/DD"),
        value: item.metricValues[0].value,
      }));
      setData(convertedData.slice(-30));
    } catch (error) {}
  };
  useEffect(() => {
    getInfoAnalytics();
    return () => {};
  }, [dateTimeSelect, optionTime]);

  useEffect(() => {
    if (data[0]) {
      setuData(data.map((item) => item.value));
      setxLabels(data.map((item) => item.label));
    }
  }, [data]);

  // useEffect(() => {
  //   const scrollableContainer = document.getElementById("bar-chart");
  //   const scrollableContent = document.getElementById("bar-chart-content");
  //   if (scrollableContainer && scrollableContent)
  //     scrollableContainer.scrollLeft = scrollableContent.scrollWidth;
  // }, [uData]);

  const getWidthBarChart = () => {
    let width = columnWidth * uData.length + columnYLabelWidth;
    switch (uData.length) {
      case 1:
        width = width + 18;
        break;
      case 2:
        width = width + 16;
        break;
      case 3:
        width = width + 12;
        break;
      default:
        break;
    }
    return width;
  };

  useEffect(() => {
    if (onSelectDateTime) onSelectDateTime(dateTimeSelect);
  }, [dateTimeSelect]);
  return (
    <BaseCard className="flex flex-col items-end flex-1 mr-4">
      <div className="flex flex-row justify-between w-full">
        <BaseText locale size={24} bold>
          Traffic
        </BaseText>
        <div className="flex flex-row items-center">
          <CustomTimePicker
            range
            onDataChange={({ value, dateString }) => {
              if (value && value[0] && value[1]) {
                setDateTimeSelect(dateString);
              } else if (value === null) {
                setDateTimeSelect(["30daysAgo", "today"]);
              }
            }}
          />
          <BaseSegmented
            className="ml-3"
            options={[t("Hours"), t("Days")]}
            onChange={(value) => {
              console.log(value); // string
              setOptionTime(value);
            }}
          />
        </div>
      </div>
      <div
        id="bar-chart"
        className={classNames(
          "overflow-auto flex-1",
          collapsed ? "w-[calc(100vw-550px)]" : "w-[calc(100vw-730px)]"
        )}
      >
        {uData[0] && (
          <div id="bar-chart-content">
            <BarChart
              width={getWidthBarChart()}
              height={285}
              series={[{ data: uData, type: "bar" }]}
              xAxis={[
                {
                  scaleType: "band",
                  data: xLabels,
                  categoryGapRatio: 0.3,
                } as any,
              ]}
            >
              <ChartsTooltip />
              <BarPlot />
              <ChartsXAxis />
              <ChartsYAxis position="left" />
            </BarChart>
          </div>
        )}
      </div>
    </BaseCard>
  );
}
