import React, { useState } from "react";
import { Table, TableColumnsType, TablePaginationConfig } from "antd";
import BaseText from "../text";
import Images from "../../assets/gen";
import BaseTable from "../table";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { convertDateTime } from "../../utils/common";

type CommentProps = {
  data: any[];
  className?: string; // for tailwindcss
  pagination?: {};
};

export default function CommentTable(props: CommentProps) {
  const { className, data, pagination } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [platformsSelected, setPlatformSelected] = useState<Array<string>>([]);

  const renderType = (record: any) => {
    if (record?.type === "reply") {
      return (
        <div className="flex flex-col gap-3">
          <BaseText bold className="text-primary">
            Reply
          </BaseText>
          <div className="flex items-center gap-1">
            <img src={Images.forward} className="w-6 h-6" />
            <img src={record?.replyUser?.avatar || Images.avatarEmpty} className="rounded-full w-7 h-7" />
            <BaseText medium>
              {record?.replyUser?.name}
            </BaseText>
          </div>
        </div>
      );
    }
    else {
      return (
        <BaseText locale bold size={16} className="text-primary" >
          {record?.type}
        </BaseText>
      );
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
      title: t("Type"),
      render: (record) => renderType(record),
    },
    {
      title: t("Contents of comments"),
      dataIndex: "content",
    },
    {
      title: t("Creation time"),
      render: (record) => (
        <BaseText medium className="">{record?.creationTime || 0}</BaseText>
      ),
    },
    {
      title: t("Suggestion"),
      render: (record) => (
        <BaseText medium className="text-polaGreen500">{record?.suggestion || 0}</BaseText>
      ),
    },
    {
      title: t("The opposite"),
      render: (record) => <BaseText medium className="text-red-500">{record?.theOpposite || 0}</BaseText>,
    },
    {
      title: t("Action"),
      render: (record) => (
        <div onClick={() => console.log('View Post', record?.id)}>
          <BaseText locale medium className="underline cursor-pointer text-primary">View Post</BaseText>
        </div>
      ),
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
