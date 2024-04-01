import React, { useEffect, useState } from "react";
import { Table, TableColumnsType, TablePaginationConfig } from "antd";
import BaseText from "../text";
import CustomButton from "../button";
import Images from "../../assets/gen";
import BaseTable from "../table";
import { useTranslation } from "react-i18next";
import { getURL } from "../../utils/common";
import CustomTimePicker from "../calendar";
import { useNavigate } from "react-router-dom";
import { Url } from "../../routers/paths";
import { analyticsApi } from "../../apis/analyticsApi";

type DashboardOverviewProps = {
  isViewAll: boolean;
  className?: string; // for tailwindcss
};

export default function DashboardInflowDomaineTable(
  props: DashboardOverviewProps
) {
  //{"dimensions":[{"name":"fullPageUrl"}],"metrics":[{"name":"active28DayUsers"}],"dateRanges":[{"startDate":"30daysAgo","endDate":"yesterday"}]}
  const { className, isViewAll } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page: any) => {
    console.log("Trang hiện tại:", page);
    setCurrentPage(page);
  };
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {};
  const getInfoAnalytics = async () => {
    const params = {
      property: "properties/244725891",
      dimensions: [{ name: "fullPageUrl" }],
      metrics: [{ name: "active28DayUsers" }],
      dateRanges: [{ startDate: "30daysAgo", endDate: "yesterday" }],
    };
    let result = await analyticsApi.getInfo(params);
    console.log("result.data[0].rows", result.data[0].rows);

    const convertedData = result.data[0].rows.map((item: any) => ({
      url: item.dimensionValues[0].value,
      view: item.metricValues[0].value,
    }));
    setData(convertedData);
  };
  useEffect(() => {
    getInfoAnalytics();
    return () => {};
  }, []);
  const columns: TableColumnsType<any> = [
    {
      title: t("No"),
      render: (text, record, index) => (
        <div className="min-w-[40px]">
          <BaseText>{(currentPage - 1) * 10 + index + 1}</BaseText>
        </div>
      ),
    },
    {
      title: t("Domaine"),
      dataIndex: "url",

      render: (url) => (
        <div>
          {url.length > 80 ? url.slice(0, 80) + "..." : url.slice(0, 80)}
        </div>
      ),
    },
    {
      title: t("View"),
      dataIndex: "view",
    },
  ];

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <BaseText locale size={24} bold>
          Inflow Domaine
        </BaseText>
        {!isViewAll ? (
          <CustomButton
            onClick={() => navigate(Url.dashboardInflowDomaine)}
            locale
          >
            View all
          </CustomButton>
        ) : (
          <div className="flex flex-row gap-6">
            <CustomTimePicker range />
          </div>
        )}
      </div>
      <BaseTable
        className={className}
        pagination={
          !!isViewAll ? { pageSize: 10, onChange: handlePageChange } : false
        }
        columns={columns}
        data={data}
      />
    </>
  );
}
