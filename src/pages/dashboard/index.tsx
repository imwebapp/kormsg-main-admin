import { useEffect, useState } from "react";
import {
  BaseBarChart,
  BasePieChart,
  BaseCard,
  DashboardOverviewTable,
  DashboardInflowDomaineTable,
  DashboardStatistic,
  DashboardReferralTable,
  DashboardSearchTermTable,
  DashboardVisitTable,
} from "../../components";

const Dashboard = () => {
  const [dateChart, setDateChart] = useState(["30daysAgo", "today"]);
  return (
    <div className="p-6">
      <DashboardStatistic />
      <div className="flex flex-row w-full mt-4">
        <BaseBarChart
          onSelectDateTime={(value: any) => {
            if (value) {
              setDateChart(value);
            }
          }}
        />
        <BasePieChart date={dateChart} />
      </div>
      <BaseCard className="mt-4">
        <DashboardOverviewTable isViewAll={false} />
      </BaseCard>
      <div className="flex flex-row gap-4 mt-4">
        <BaseCard className="flex-1 w-1/2">
          <DashboardInflowDomaineTable isViewAll={false} />
        </BaseCard>
        <BaseCard className="flex-1 w-1/2">
          <DashboardReferralTable isViewAll={false} />
        </BaseCard>
      </div>
      <div className="flex flex-row gap-4 mt-4">
        <BaseCard className="flex-1 w-1/2">
          <DashboardVisitTable isViewAll={false} />
        </BaseCard>
        <BaseCard className="flex-1 w-1/2">
          <DashboardSearchTermTable isViewAll={false} />
        </BaseCard>
      </div>
    </div>
  );
};

export default Dashboard;
