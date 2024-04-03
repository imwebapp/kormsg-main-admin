import React, { useState } from "react";
import { Table, TableColumnsType, TablePaginationConfig } from "antd";
import BaseText from "../text";
import Images from "../../assets/gen";
import BaseTable from "../table";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { convertDateTime } from "../../utils/common";

type HistoryPaymentProps = {
  data: any[];  
  className?: string; // for tailwindcss
};

export default function HistoryPaymentTable(props: HistoryPaymentProps) {
  const { className, data } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { t } = useTranslation();
  const [platformsSelected, setPlatformSelected] = useState<Array<string>>([]);
  const navigate = useNavigate();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {};

  const columns: TableColumnsType<any> = [
    {
      title: t("Date"),
      dataIndex: "created_at",
      render: (text) => <BaseText medium className="">{convertDateTime(text)}</BaseText>,
    },
    {
      title: t("Detail"),
      dataIndex: "content",
    },
    {
      title: t("Contact Id"),
      render: (text) => <BaseText medium className="text-primary ">Master</BaseText>,
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
    <BaseTable
      className={className}
      pagination={{ pageSize: 10 }}
      columns={columns}
      data={data}
    />
  );
}
