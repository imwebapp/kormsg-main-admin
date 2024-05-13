import React, { useState } from "react";
import { Table, TableColumnsType, TablePaginationConfig } from "antd";
import BaseText from "../text";
import Images from "../../assets/gen";
import BaseTable from "../table";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type CommunityPostProps = {
  data: any[];
  className?: string; // for tailwindcss
  pagination?: {};
};



export default function CommunityPostTable(props: CommunityPostProps) {
  const { className, data, pagination } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { t } = useTranslation();
  const [platformsSelected, setPlatformSelected] = useState<Array<string>>([]);
  const navigate = useNavigate();
  
  const calculateTimeAgo = (timestamp: Date) => {
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; 
    const oneHourInMilliseconds = 60 * 60 * 1000;
    const oneMinuteInMilliseconds = 60 * 1000;
  
    const currentDate = new Date();
    const targetDate = new Date(timestamp);
  
    const currentDateMilliseconds = currentDate.getTime();
    const targetDateMilliseconds = targetDate.getTime();
  
    const differenceMilliseconds =
      currentDateMilliseconds - targetDateMilliseconds;
  
    if (differenceMilliseconds < oneHourInMilliseconds) {
      const differenceMinutes = Math.round(
        differenceMilliseconds / oneMinuteInMilliseconds
      );
      return `${differenceMinutes}${t("minute(s) ago")}`;
    } else if (differenceMilliseconds < oneDayInMilliseconds) {
      const differenceHours = Math.floor(
        differenceMilliseconds / oneHourInMilliseconds
      );
      return `${differenceHours}${t("hour(s) ago")}`;
    } else {
      const differenceDays = Math.floor(
        differenceMilliseconds / oneDayInMilliseconds
      );
      return `${differenceDays}${t("day(s) ago")}`;
    }
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
      title: t("Image"),
      render: (record) => (
        <img src={record?.images[0] || "https://via.placeholder.com/150"} className="w-[150px] h-[100px] rounded-xl" />
      ),
      width: 150,
    },
    {
      title: t("Title"),
      dataIndex: "title",
    },
    {
      title: t("Writer"),
      render: (record) => (
        <div className="flex items-center gap-2">
          <img src={record?.user?.avatar || Images.avatarEmpty} className="rounded-full w-7 h-7" />
          <BaseText medium className="">{record?.user?.nickname }</BaseText>
        </div>
      ),
    },
    {
      title: t("Creation time"),
      render: (record) => (
        <BaseText medium className="">{calculateTimeAgo(record?.created_at || 0)}</BaseText>
      ),
    },
    {
      title: t("Views"),
      render: (record) => (
        <BaseText medium className="">{record?.view || 0}</BaseText>
      ),
    },
    {
      title: t("Suggestion"),
      render: (record) => (
        <BaseText medium className="text-polaGreen500">{record?.like || 0}</BaseText>
      ),
    },
    {
      title: t("The opposite"),
      render: (record) => <BaseText medium className="text-red-500">{record?.dislike || 0}</BaseText>,
    },
  ];

  return (
    <BaseTable
      className={className}
      pagination={pagination || { pageSize: 10 }}
      columns={columns}
      data={data}
    />
  );
}
