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

export default function DashboardInflowDomaineTable(props: DashboardOverviewProps) {
  const { className, isViewAll } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { t } = useTranslation();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {};
  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      key: i,
      domaine: 'www.google.com.kr',
      click: 223
    });
  }
  const columns: TableColumnsType<any> = [
    {
      title: "",
      render: (text) => <img className="w-6 h-6" src={Images.android} />,
    },
    {
      title: t("Domaine"),
      dataIndex: "domaine",
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
