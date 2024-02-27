import React, { useState } from "react";
import { Table, TableColumnsType, TablePaginationConfig } from "antd";
import BaseText from "../text";
import CustomButton from "../button";
import Images from "../../assets/gen";
import { useTranslation } from "react-i18next";

type DashboardOverviewProps = {
  isViewAll: boolean;
  className?: string; // for tailwindcss
};

export default function DashboardSearchTermTable(props: DashboardOverviewProps) {
  const { className, isViewAll } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { t } = useTranslation();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {};
  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      key: i,
      last_click: "2025-12-12",
      click: 2,
      query: 'Home'
    });
  }
  const columns: TableColumnsType<any> = [
    {
      title: t("Query"),
      dataIndex: "query",
    },
    {
      title: t("Search Engines"),
      dataIndex: "platform",
      render: (text) => <img className="w-6 h-6" src={Images.android} />,
    },
    {
      title: t("Click"),
      dataIndex: "click",
    },
    {
      title: t("Last click"),
      dataIndex: "last_click",
    },
  ];

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <BaseText locale size={24} bold>
          Incoming search terms
        </BaseText>
        <CustomButton locale>View all</CustomButton>
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
