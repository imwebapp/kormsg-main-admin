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

export default function DashboardVisitTable(props: DashboardOverviewProps) {
  const { className, isViewAll } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { t } = useTranslation();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {};
  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      key: i,
      name: "anh Duy",
      url: "/Search",
      click: 233,
    });
  }
  const columns: TableColumnsType<any> = [
    {
      title: t("Name"),
      dataIndex: "name",
    },
    {
      title: t("URL"),
      render: ({ url }) => <a href={url}>{url}</a>,
    },
    {
      title: t("Click"),
      dataIndex: "click",
    },
  ];

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <BaseText locale size={24} bold>
          Most visited pages
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
