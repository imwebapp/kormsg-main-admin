import BaseBarChart, { BarChartDataInterface } from "../../components/barchart";
import BasePieChart from "../../components/piechart";
import BaseCard from "../../components/baseCard";
import DashboardOverviewTable from "../../components/dashboardOverview";
import DashboardStatistic from "../../components/dashboardStatistic";

const Dashboard = () => {
  return (
    <div className="p-6">
      <DashboardStatistic/>
      <div className="flex flex-row mt-4 w-full">
        <BaseBarChart />
        <BasePieChart />
      </div>
      <BaseCard className="mt-4">
        <DashboardOverviewTable isViewAll={false} />
      </BaseCard>
    </div>
  );
};

export default Dashboard;
