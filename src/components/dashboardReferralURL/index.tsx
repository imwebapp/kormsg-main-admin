import React, { useState } from "react";
import { Table, TableColumnsType, TablePaginationConfig } from "antd";
import BaseText from "../text";
import CustomButton from "../button";
import Images from "../../assets/gen";
import BaseTable from "../table";
import { useTranslation } from "react-i18next";
import { getURL } from "../../utils/common";
import CustomTimePicker from "../calendar";
import { useNavigate } from "react-router-dom";
import { Url } from "../../routers/paths";

type DashboardOverviewProps = {
  isViewAll: boolean;
  className?: string; // for tailwindcss
};

export default function DashboardReferralTable(props: DashboardOverviewProps) {
  const { className, isViewAll } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {};
  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      key: i,
      url: "https://kormsg.com/",
      click: 123,
    });
  }
  const columns: TableColumnsType<any> = [
    {
      title: "",
      render: (text) => <img className="w-6 h-6" src={Images.android} />,
    },
    {
      title: t("URL"),
      render: ({ url }) => <a href={getURL(url)}>{url}</a>,
    },
    {
      title: t("Click"),
      dataIndex: "click",
    },
  ];

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <BaseText locale size={24} bold>
          Referral URL
        </BaseText>
        {!isViewAll ? (
          <CustomButton
            onClick={() => navigate(Url.dashboardReferral)}
            locale
          >
            View all
          </CustomButton>
        ) : (
          <div className="flex flex-row gap-6">
            <CustomTimePicker range />
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
