import React, { useEffect, useState } from "react";
import { Table, TableColumnsType, TablePaginationConfig } from "antd";
import BaseText from "../text";
import CustomButton from "../button";
import Images from "../../assets/gen";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../calendar";
import { useNavigate } from "react-router-dom";
import { Url } from "../../routers/paths";
import { analyticsApi } from "../../apis/analyticsApi";

type DashboardOverviewProps = {
  isViewAll: boolean;
  className?: string; // for tailwindcss
};

export default function DashboardSearchTermTable(
  props: DashboardOverviewProps
) {
  const { className, isViewAll } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { t } = useTranslation();
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigate();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {};
  const getInfoAnalytics = async () => {
    const params = {
      property: "properties/244725891",
      dimensions: [{ name: "country" }],
      metrics: [{ name: "active28DayUsers" }],
      dateRanges: [{ startDate: "30daysAgo", endDate: "yesterday" }],
    };
    let result = await analyticsApi.getInfo(params);

    const convertedData = result.data[0].rows.map((item: any) => ({
      nameCountry: item.dimensionValues[0].value,
      user: item.metricValues[0].value,
    }));
    if (isViewAll) {
      setData(convertedData);
    } else {
      setData(convertedData.slice(0, 10));
    }
  };
  useEffect(() => {
    getInfoAnalytics();
    return () => {};
  }, []);
  const columns: TableColumnsType<any> = [
    {
      title: t("Country"),
      dataIndex: "nameCountry",
    },
    // {
    //   title: t("Search Engines"),
    //   dataIndex: "platform",
    //   render: (text) => <img className="w-6 h-6" src={Images.android} />,
    // },
    // {
    //   title: t("Click"),
    //   dataIndex: "click",
    // },
    {
      title: t("User"),
      dataIndex: "user",
    },
  ];

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <BaseText locale size={24} bold>
          Country search
        </BaseText>
        {!isViewAll ? (
          <CustomButton onClick={() => navigate(Url.dashboardIncoming)} locale>
            View all
          </CustomButton>
        ) : (
          <div className="flex flex-row gap-6">
            <CustomTimePicker range />
          </div>
        )}
      </div>
      <Table
        className={className}
        pagination={!!isViewAll ? { pageSize: 10 } : false}
        columns={columns}
        dataSource={data}
      />
    </>
  );
}
