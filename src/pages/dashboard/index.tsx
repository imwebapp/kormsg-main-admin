import BaseBarChart from "../../components/barchart";
import BasePieChart from "../../components/piechart";
import BaseCard from "../../components/baseCard";
import CardStatistic from "../../components/cardStatistic";
import Images from "../../assets/gen";
import { useMemo } from "react";
import { BaseText, CustomTimePicker } from "../../components";
import { Radio } from "antd";

const Dashboard = () => {
  const _buildStatistis = useMemo(() => {
    return (
      <div className="flex flex-row w-full justify-between gap-2">
        <BaseCard className="flex-1">
          <CardStatistic
            title="Total Visitors"
            icon={Images.statistic1}
            count="345k"
            growth={21.01}
          />
        </BaseCard>
        <BaseCard className="flex-1">
          <CardStatistic
            title="Earning"
            icon={Images.statistic1}
            count="345k"
            growth={-21.01}
          />
        </BaseCard>
        <BaseCard className="flex-1">
          <CardStatistic
            title="Total Order"
            icon={Images.statistic1}
            count="345k"
            growth={21.01}
          />
        </BaseCard>
        <BaseCard className="flex-1">
          <CardStatistic
            title="New Register"
            icon={Images.statistic1}
            count="345k"
            growth={21.01}
          />
        </BaseCard>
      </div>
    );
  }, []);

  const _buildBarChart = useMemo(() => {
    return (
      <BaseCard className="flex-1 mr-4 flex flex-col items-end">
        <div className="flex flex-row w-full justify-between">
          <BaseText locale size={24} bold>
            Traffic
          </BaseText>
          <div className="flex flex-row items-center">
            <CustomTimePicker />
            <Radio.Group
              className="!mb-0 ml-3"
              // onChange={handleModeChange}
              value={"top"}
              style={{ marginBottom: 8 }}
            >
              <Radio.Button value="top">Horizontal</Radio.Button>
              <Radio.Button value="left">Vertical</Radio.Button>
            </Radio.Group>
          </div>
        </div>
        <BaseBarChart className="mt-7" />
      </BaseCard>
    );
  }, []);

  const _buildPieChart = useMemo(() => {
    return (
      <BaseCard className="flex flex-col justify-between w-[375px]">
        <div className="flex flex-row">
          <BaseText locale size={24} bold>
            Used by
          </BaseText>
        </div>
        <BasePieChart className="mt-7" application={55} browser={45} />
      </BaseCard>
    );
  }, []);
  return (
    <div className="p-6">
      {_buildStatistis}
      <div className="flex flex-row mt-4 w-full">
        {_buildBarChart}
        {_buildPieChart}
      </div>
    </div>
  );
};

export default Dashboard;
