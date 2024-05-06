import React, { useState } from "react";
import { Table, TableColumnsType, TablePaginationConfig } from "antd";
import BaseText from "../text";
import Images from "../../assets/gen";
import BaseTable from "../table";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { convertDateTime } from "../../utils/common";

type PointDetailProps = {
  data: any[];
  className?: string; // for tailwindcss
  pagination?: {};
};

export default function PointDetailTable(props: PointDetailProps) {
  const { className, data, pagination } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [platformsSelected, setPlatformSelected] = useState<Array<string>>([]);
  const [listRowSelected, setListRowSelected] = useState<string[]>([]);
  console.log("ListRowSelected: ", listRowSelected);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setListRowSelected(newSelectedRowKeys as string[]);
  };

  const columns: TableColumnsType<any> = [
    {
      title: t("No"),
      render: (text, record, index) => (
        <div className="min-w-[40px]">
          <BaseText>{index + 1}</BaseText>
        </div>
      ),
      width: 40,
    },
    {
      title: t("Date"),
      render: (record) => (
        <BaseText medium className="">{record?.date || 0}</BaseText>
      ),
    },
    {
      title: t("ID"),
      render: (record) => (
        <BaseText medium className="">{record?.username}</BaseText>
      ),
    },
    {
      title: t("Contact"),
      render: (record) => (
        <BaseText medium className="">{record?.contact}</BaseText>
      ),
    },
    {
      title: t("Transaction type"),
      render: (record) => (
        <BaseText medium className="">{record?.transactionType}</BaseText>
      ),
    },
    {
      title: t("Point type"),
      render: (record) => (
        <BaseText medium className="text-polaGreen500">{record?.pointType}</BaseText>
      ),
    },
    {
      title: t("Acquired points"),
      render: (record) => (
        <BaseText bold>{(record?.acquiredPoint || 0) + "P"}</BaseText>
      ),
    },
    {
      title: t("Total holding port"),
      render: (record) => <BaseText bold>{(record?.totalHoldingPort || 0) + "P"}</BaseText>,
    },
  ];

  return (
    <BaseTable
      onSelectChange={onSelectChange}
      className={className}
      pagination={pagination || { pageSize: 10 }}
      columns={columns}
      data={data.map((item, index) => ({ ...item, key: item.id }))} // add key for each item
    />
  );
}
