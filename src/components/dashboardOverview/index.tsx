import React, { useState } from "react";
import { Table, TableColumnsType, TablePaginationConfig } from "antd";
import BaseText from "../text";
import CustomButton from "../button";
import Images from "../../assets/gen";
import BaseTable from "../table";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../calendar";
import { useNavigate } from "react-router-dom";
import { Url } from "../../routers/paths";

type DashboardOverviewProps = {
  isViewAll: boolean;
  className?: string; // for tailwindcss
};

export default function DashboardOverviewTable(props: DashboardOverviewProps) {
  const { className, isViewAll } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { t } = useTranslation();
  const [platformsSelected, setPlatformSelected] = useState<Array<string>>([]);
  const navigate = useNavigate();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {};
  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      key: i,
      date: "2025-12-12",
      ip: "135 . 31 . 234",
      address: `London, Park Lane no. ${i}`,
      sale: 0,
      order: 1,
      joined: 4,
      inquiry: 5,
      comment: 2,
    });
  }
  const columns: TableColumnsType<any> = [
    {
      title: t("Date"),
      dataIndex: "date",
    },
    {
      title: t("IP Adress"),
      dataIndex: "ip",
    },
    {
      title: t("Use by"),
      dataIndex: "user_by",
      render: (text) => <img className="w-6 h-6" src={Images.android} />,
    },
    {
      title: t("Sales"),
      dataIndex: "sale",
    },
    {
      title: t("Orders"),
      dataIndex: "order",
    },
    {
      title: t("Joined"),
      dataIndex: "joined",
    },
    {
      title: t("Inquiry"),
      dataIndex: "inquiry",
    },
    {
      title: t("Comments"),
      dataIndex: "comment",
    },
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
            <CustomTimePicker range />
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
