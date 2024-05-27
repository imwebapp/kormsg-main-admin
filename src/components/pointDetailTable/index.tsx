import React, { useState } from "react";
import { Table, TableColumnsType, TablePaginationConfig } from "antd";
import BaseText from "../text";
import Images from "../../assets/gen";
import BaseTable from "../table";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { convertDate, convertDateTime } from "../../utils/common";
import { POINT_ACTION } from "../../utils/constants";

type PointDetailProps = {
  data: any[];
  className?: string; // for tailwindcss
  pagination?: {};
};

const checkPointType = (pointType: string) => {
  switch (pointType) {
    case POINT_ACTION.ATTENDANCE:
      return <BaseText medium className="" locale>Attendance</BaseText>;
    case POINT_ACTION.BUY:
      return <BaseText medium className="" locale>Buy</BaseText>;
    case POINT_ACTION.INVITE:
      return <BaseText medium className="" locale>Invite</BaseText>;
    case POINT_ACTION.LOTTERY:
      return <BaseText medium className="" locale>Lottery</BaseText>;
    case POINT_ACTION.RESERVATION:
      return <BaseText medium className="" locale>Reservation</BaseText>;
    case POINT_ACTION.REVIEW:
      return <BaseText medium className="" locale>Review</BaseText>;
    default:
      return <BaseText medium className="" locale>{pointType}</BaseText>;
  }
};

export default function PointDetailTable(props: PointDetailProps) {
  const { className, data, pagination } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [platformsSelected, setPlatformSelected] = useState<Array<string>>([]);
  const [listRowSelected, setListRowSelected] = useState<string[]>([]);

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
        <BaseText medium className="">{convertDate(record?.created_at || 0)}</BaseText>
      ),
    },
    {
      title: t("ID"),
      render: (record) => (
        <BaseText medium className="">{record?.user?.username}</BaseText>
      ),
    },
    {
      title: t("Contact"),
      render: (record) => (
        <BaseText medium className="">{record?.user?.contact || 'null'}</BaseText>
      ),
    },
    {
      title: t("Transaction type"),
      render: (record) => (
        <BaseText medium className={record?.point > 0 ? 'text-polaGreen500' : 'text-red-500'} locale>{record?.point > 0 ? 'Plus' : 'Minus'}</BaseText>
      ),
    },
    {
      title: t("Point type"),
      render: (record) => checkPointType(record?.action),
    },
    {
      title: t("Acquired points"),
      render: (record) => (
        <BaseText bold>{(record?.point || 0) + "P"}</BaseText>
      ),
    },
    {
      title: t("Total holding port"),
      render: (record) => <BaseText bold>{(record?.current_user_point || 0) + "P"}</BaseText>,
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
