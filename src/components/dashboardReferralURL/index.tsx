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

export default function DashboardReferralTable(props: DashboardOverviewProps) {
  const { className, isViewAll } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const getInfoAnalytics = async () => {
    const params = {
      property: "properties/244725891",
      dimensions: [{ name: "browser" }, { name: "pageReferrer" }],
      metrics: [{ name: "newUsers" }],
      dateRanges: [{ startDate: "30daysAgo", endDate: "yesterday" }],
      dimensionFilter: {
        filter: {
          stringFilter: {
            matchType: "FULL_REGEXP",
            caseSensitive: false,
            value: "^.+$", // check not null
          },
          fieldName: "pageReferrer",
        },
      },
    };
    let result = await analyticsApi.getInfo(params);
    const convertedData = result.data[0].rows.map((item: any) => ({
      communication: item.dimensionValues[0].value,
      url: item.dimensionValues[1].value,
      click: item.metricValues[0].value,
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

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {};
  const columns: TableColumnsType<any> = [
    {
      title: "Communication",
      dataIndex: "communication",
      render: (communication) => <div>{communication}</div>,
    },
    {
      title: t("URL"),
      dataIndex: "url",
      render: (url) => (
        <a href={getURL(url)}>
          {url.length > 80 ? url.slice(0, 80) + "..." : url.slice(0, 80)}
        </a>
      ),
      width: "75%",
    },
    {
      title: "Click",
      dataIndex: "click",
      render: (click) => <div>{click}</div>,
    },
  ];

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <BaseText locale size={24} bold>
          Referral URL
        </BaseText>
        {!isViewAll ? (
          <CustomButton onClick={() => navigate(Url.dashboardReferral)} locale>
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
        pagination={!!isViewAll ? { pageSize: 10 } : false}
        columns={columns}
        data={data}
      />
    </>
  );
}
