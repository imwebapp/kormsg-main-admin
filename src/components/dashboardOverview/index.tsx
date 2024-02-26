import React, { useState } from "react";
import { Table, TableColumnsType, TablePaginationConfig } from "antd";
import BaseText from "../text";
import CustomButton from "../button";
import Images from "../../assets/gen";
import BaseTable from "../table";
import { useTranslation } from "react-i18next";

type DashboardOverviewProps = {
  isViewAll: boolean;
  className?: string; // for tailwindcss
};

export default function DashboardOverviewTable(props: DashboardOverviewProps) {
  const { className, isViewAll } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { t } = useTranslation();

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

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <BaseText locale size={24} bold>
          Overview
        </BaseText>
        <CustomButton locale>View all</CustomButton>
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
