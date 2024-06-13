import React, { useEffect, useState } from "react";
import { Table, TableColumnsType, TablePaginationConfig } from "antd";
import BaseText from "../text";
import CustomButton from "../button";
import Images from "../../assets/gen";
import BaseTable from "../table";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../calendar";
import { useNavigate } from "react-router-dom";
import { Url } from "../../routers/paths";
import { analyticsApi } from "../../apis/analyticsApi";
import { PARAMS_PROPERTY_WEB } from "../../utils/constants";

type DashboardOverviewProps = {
  isViewAll: boolean;
  className?: string; // for tailwindcss
};

export default function DashboardOverviewTable(props: DashboardOverviewProps) {
  const { className, isViewAll } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { t } = useTranslation();
  const [platformsSelected, setPlatformSelected] = useState<Array<string>>([]);
  const [data, setData] = useState<any[]>([]);
  const [dateTimeSelect, setDateTimeSelect] = useState(["30daysAgo", "today"]);

  const navigate = useNavigate();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {};

  const getInfoAnalytics = async () => {
    try {
      const params = {
        property: PARAMS_PROPERTY_WEB,
        dimensions: [{ name: "firstUserPrimaryChannelGroup" }],
        metrics: [
          { name: "activeUsers" },
          { name: "bounceRate" },
          { name: "eventCount" },
        ],
        dateRanges: [
          { startDate: dateTimeSelect[0], endDate: dateTimeSelect[1] },
        ],
      };
      let result = await analyticsApi.getInfo(params);

      const convertedData = result.data[0].rows.map((item: any) => ({
        name: item.dimensionValues[0].value,
        userActive: item.metricValues[0].value,
        bounceRate: item.metricValues[1].value,
        eventCount: item.metricValues[2].value,
      }));
      setData(convertedData);
    } catch (error) {}
  };
  useEffect(() => {
    getInfoAnalytics();
    return () => {};
  }, [dateTimeSelect]);
  const columns: TableColumnsType<any> = [
    {
      title: t("Primary Channel"),
      dataIndex: "name",
    },
    // {
    //   title: t("IP Adress"),
    //   dataIndex: "ip",
    // },
    {
      title: t("User Active"),
      dataIndex: "userActive",
      // render: (text) => <img className="w-6 h-6" src={Images.android} />,
    },
    {
      title: t("Session"),
      dataIndex: "bounceRate",
    },
    {
      title: t("Number Of Events"),
      dataIndex: "eventCount",
    },
    // {
    //   title: t("Joined"),
    //   dataIndex: "joined",
    // },
    // {
    //   title: t("Inquiry"),
    //   dataIndex: "inquiry",
    // },
    // {
    //   title: t("Comments"),
    //   dataIndex: "comment",
    // },
  ];

  const selectPlatformFilter = (value: string) => {
    const exist = platformsSelected.filter((item) => item === value);
    if (exist.length > 0) {
      setPlatformSelected(platformsSelected.filter((item) => item !== value));
    } else {
      setPlatformSelected([...platformsSelected, value]);
    }
  };

  const filterPlatform = () => {
    return (
      <div className="flex flex-row gap-6 h-[48px] border rounded-[10px] px-3 items-center">
        {platformsSelected.includes("web") ? (
          <img
            onClick={() => selectPlatformFilter("web")}
            src={Images.web}
            className="w-6 h-6"
          />
        ) : (
          <img
            onClick={() => selectPlatformFilter("web")}
            src={Images.web2}
            className="w-6 h-6"
          />
        )}
        {platformsSelected.includes("android") ? (
          <img
            onClick={() => selectPlatformFilter("android")}
            src={Images.android}
            className="w-6 h-6"
          />
        ) : (
          <img
            onClick={() => selectPlatformFilter("android")}
            src={Images.android2}
            className="w-6 h-6"
          />
        )}
        {platformsSelected.includes("ios") ? (
          <img
            onClick={() => selectPlatformFilter("ios")}
            src={Images.iphone}
            className="w-6 h-6"
          />
        ) : (
          <img
            onClick={() => selectPlatformFilter("ios")}
            src={Images.iphone2}
            className="w-6 h-6"
          />
        )}
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <BaseText locale size={24} bold>
          Overview
        </BaseText>
        {!isViewAll ? (
          <CustomButton onClick={() => navigate(Url.dashboardOverview)} locale>
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
            {filterPlatform()}
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
