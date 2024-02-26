import React, { useState } from "react";
import { Table, TableColumnsType, TablePaginationConfig } from "antd";
import BaseText from "../text";
import CustomButton from "../button";
import Images from "../../assets/gen";
import BaseCard from "../baseCard";
import CardStatistic from "../cardStatistic";

export default function DashboardStatistic() {
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
}
