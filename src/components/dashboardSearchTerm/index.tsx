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
import dayjs from "dayjs";
import { URL_SEARCH_SITE } from "../../utils/constants";
import { showError } from "../../utils/showToast";

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
  const [dateTimeSelect, setDateTimeSelect] = useState([
    dayjs().startOf("year").format("YYYY-MM-DD"),
    dayjs().format("YYYY-MM-DD"),
  ]);

  const navigate = useNavigate();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {};
  const getInfoAnalytics = async () => {
    try {
      const params = {
        siteUrl: URL_SEARCH_SITE,
        startDate: dateTimeSelect[0],
        endDate: dateTimeSelect[1],
        dimensions: ["query"],
      };
      let result: any = await analyticsApi.getQuerySearch(params);

      const convertedData = result.data.data.rows.map((item: any) => ({
        query: item.keys[0],
        click: item.clicks,
        impressions: item.impressions,
      }));

      if (isViewAll) {
        setData(convertedData);
      } else {
        setData(convertedData.slice(0, 10));
      }
    } catch (error) {
      showError(error);
    }
  };
  useEffect(() => {
    getInfoAnalytics();
    return () => {};
  }, [dateTimeSelect]);
  const columns: TableColumnsType<any> = [
    {
      title: t("Query"),
      dataIndex: "query",
    },
    {
      title: t("Click"),
      dataIndex: "click",
    },
    {
      title: t("Impressions"),
      dataIndex: "impressions",
    },
  ];

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <BaseText locale size={24} bold>
          Search keywords
        </BaseText>
        {!isViewAll ? (
          <CustomButton onClick={() => navigate(Url.dashboardIncoming)} locale>
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
                  setDateTimeSelect([
                    dayjs().startOf("year").format("YYYY-MM-DD"),
                    dayjs().format("YYYY-MM-DD"),
                  ]);
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
