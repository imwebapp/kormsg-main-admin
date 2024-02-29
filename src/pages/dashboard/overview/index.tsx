import { DashboardOverviewTable } from "../../../components";

const DashboardOverviewPage = () => {
  return (
    <div className="p-6">
      <DashboardOverviewTable isViewAll={true} />
    </div>
  );
};

export default DashboardOverviewPage;
