import {
  BarChart,
  BarPlot,
  ChartsXAxis,
  ChartsYAxis,
  ChartsTooltip,
} from "@mui/x-charts";
import "./styles.css";
import { useEffect, useState } from "react";

type BarChartProps = {
  className?: string; // for tailwindcss
};
const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490, 4000];

const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F333",
  "Page B1",
  "Page C1",
  // "Page D1",
  // "Page E1",
  // "Page F1",
  // "Page G1",
];
export default function BaseBarChart(props: BarChartProps) {
  const { className } = props;
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to run effect only once on component mount

  //className="w-[calc(100vw/2.2)]
  return (
    <div id="bar-chart" className={className}>
      <BarChart
        width={screenWidth / 2.2}
        height={265}
        series={[{ data: uData, type: "bar" }]}
        xAxis={[
          {
            scaleType: "band",
            data: xLabels,
            categoryGapRatio: 0.3,
          } as any,
        ]}
        leftAxis={null}
      >
        <ChartsTooltip />
        <BarPlot sx={{ rx: 8 }} color="#00CCFF" />
        <ChartsXAxis />
        <ChartsYAxis position="right" />
      </BarChart>
    </div>
  );
}
