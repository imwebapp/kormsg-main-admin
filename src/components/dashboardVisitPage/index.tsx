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

export default function DashboardVisitTable(props: DashboardOverviewProps) {
  const { className, isViewAll } = props;
  console.log("isViewAll", isViewAll);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [dateTimeSelect, setDateTimeSelect] = useState(["30daysAgo", "today"]);

  const getInfoAnalytics = async () => {
    const params = {
      property: "properties/244725891",
      dimensions: [{ name: "city" }],
      metrics: [{ name: "activeUsers" }],
      dateRanges: [
        { startDate: dateTimeSelect[0], endDate: dateTimeSelect[1] },
      ],
    };
    let result = await analyticsApi.getInfo(params);
    const convertedData = result.data[0].rows.map((item: any) => ({
      city: item.dimensionValues[0].value,
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
  }, [dateTimeSelect]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {};
  const columns: TableColumnsType<any> = [
    {
      title: t("City"),
      dataIndex: "city",
    },
    {
      title: t("User"),
      dataIndex: "user",
    },
  ];

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <BaseText locale size={24} bold>
          City Traffic
        </BaseText>
        {!isViewAll ? (
          <CustomButton onClick={() => navigate(Url.dashboardVisit)} locale>
            View all
          </CustomButton>
        ) : (
          <div className="flex flex-row gap-6">
            <CustomTimePicker
              range
              onDataChange={({ value, dateString }) => {
                if (dateString && dateString[0] !== "") {
                  setDateTimeSelect(dateString);
                } else {
                  setDateTimeSelect(["30daysAgo", "today"]);
                }
              }}
            />
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
