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
import dayjs from "dayjs";
import { notification } from "antd";

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
  const [data, setData] = useState<Array<BarChartDataInterface>>([]);

  const [dateSelected, setDateSelected] = useState("today");
  const getInfoAnalytics = async () => {
    const params = {
      property: "properties/244725891",
      dimensions: [{ name: "firstSessionDate" }],
      metrics: [{ name: "screenPageViews" }],
      dateRanges: [
        {
          startDate:
            dateSelected !== null && dateSelected !== "today"
              ? dateSelected
              : "30daysAgo",
          endDate: "today",
        },
      ],
      metricFilter: {
        filter: {
          numericFilter: {
            operation: "GREATER_THAN",
            value: { int64Value: "0" },
          },
          fieldName: "screenPageViews",
        },
      },
      orderBys: [
        {
          dimension: {
            orderType: "ALPHANUMERIC",
            dimensionName: "firstSessionDate",
          },
        },
      ],
      metricAggregations: ["MAXIMUM"],
    };
    // if(dateSelected !)
    console.log("s", dateSelected);

    if (dayjs(dateSelected).isBefore(dayjs()) || dateSelected === "today") {
      let result = await analyticsApi.getInfo(params);

      //  get user active today
      const convertedData = result.data[0].rows.map((item: any) => ({
        label: dayjs(item.dimensionValues[0].value, "YYYYMMDD").format("DD/MM"),
        value: item.metricValues[0].value,
      }));
      const selectedData = convertedData.filter(
        (item: any) =>
          item.label === dayjs(dateSelected, "YYYY-MM-DD").format("DD/MM")
      );
      if (dateSelected && dateSelected !== "today") {
        setData(selectedData);
      } else {
        setData(convertedData.slice(-30));
      }
    } else {
      notification.warning({
        message: "Please select a date smaller than the current date",
        description: "Date Invalid",
      });
    }
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
              console.log("value", value);

              const date =
                value !== null && moment(value.$d).format("YYYY-MM-DD");
              if (date) {
                setDateSelected(date);
              } else {
                setDateSelected("today");
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
