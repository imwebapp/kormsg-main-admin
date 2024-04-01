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
import moment from "moment";
import { analyticsApi } from "../../apis/analyticsApi";

export interface BarChartDataInterface {
  label: string;
  value: number;
}

const columnYLabelWidth = 80;
const columnWidth = 68;

export default function BaseBarChart() {
  const { collapsed } = useLocalStorage((state) => state);
  const [uData, setuData] = useState<Array<number>>([]);
  const [xLabels, setxLabels] = useState<Array<string>>([]);
  const { t } = useTranslation();
  const [data, setData] = useState<Array<BarChartDataInterface>>([
    { label: "01", value: 1233 },
    { label: "02", value: 3434 },
    { label: "03", value: 2355 },
    { label: "04", value: 3333 },
    { label: "05", value: 3566 },
    { label: "06", value: 8999 },
    { label: "07", value: 6766 },
    { label: "08", value: 4442 },
    { label: "09", value: 1123 },
    { label: "10", value: 1233 },
    { label: "11", value: 8988 },
    { label: "12", value: 6884 },
    { label: "13", value: 3432 },
    { label: "14", value: 6564 },
    { label: "15", value: 5333 },
    { label: "16", value: 7878 },
    { label: "17", value: 3312 },
    { label: "18", value: 2343 },
    { label: "19", value: 4542 },
    { label: "20", value: 1212 },
    { label: "21", value: 6884 },
    { label: "22", value: 3242 },
    { label: "23", value: 2884 },
    { label: "24", value: 5884 },
  ]);
  const [dateSelected, setDateSelected] = useState("today");
  const getInfoAnalytics = async () => {
    const params = {
      property: "properties/244725891",
      dimensions: [{ name: "browser" }, { name: "pageReferrer" }],
      metrics: [{ name: "newUsers" }],
      dateRanges: [{ startDate: "30daysAgo", endDate: "yesterday" }],
      dimensionFilter: {
        filter: {
          stringFilter: {
            matchType: "FULL_REGEXP",
            caseSensitive: false,
            value: "^.+$", // check not null
          },
          fieldName: "pageReferrer",
        },
      },
    };
    let result = await analyticsApi.getInfo(params);

    //  get user active today
    console.log("result", result.data[0]);
  };
  useEffect(() => {
    getInfoAnalytics();
    return () => {};
  }, [dateSelected]);

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

  return (
    <BaseCard className="flex-1 mr-4 flex flex-col items-end">
      <div className="flex flex-row w-full justify-between">
        <BaseText locale size={24} bold>
          Traffic
        </BaseText>
        <div className="flex flex-row items-center">
          <CustomTimePicker
            onDataChange={({ value }) => {
              const date = moment(value.$d).format("YYYY-MM-DD");
              if (date) {
                setDateSelected(date);
              }
            }}
          />
          <BaseSegmented
            className="ml-3"
            options={[t("Hours"), t("Days")]}
            onChange={(value) => {
              console.log(value); // string
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
