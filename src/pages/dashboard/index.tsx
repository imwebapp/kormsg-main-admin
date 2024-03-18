import { useEffect } from "react";
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
import { analyticsApi } from "../../apis/analyticsApi";

const Dashboard = () => {
  return (
    <div className="p-6">
      <DashboardStatistic />
      <div className="flex flex-row w-full mt-4">
        <BaseBarChart />
        <BasePieChart />
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
