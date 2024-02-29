import React from "react";
import { TableColumnsType } from "antd";
import BaseText from "../text";
import CustomButton from "../button";
import Images from "../../assets/gen";
import BaseTable from "../table";
import { useTranslation } from "react-i18next";
import { BaseInputSelect } from "../input/BaseInputSelect";

type UserManageTableProps = {
  className?: string; // for tailwindcss
};

export default function UserManageTable(props: UserManageTableProps) {
  const { className } = props;
  const { t } = useTranslation();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {};

  const storeStatus = (title: string, value: number) => {
    return (
      <div className="flex flex-row">
        <BaseText locale medium size={16}>
          {title}
        </BaseText>
        <BaseText medium size={16}>
          : {value}
        </BaseText>
      </div>
    );
  };
  const data = [];
  for (let i = 0; i < 45; i++) {
    data.push({
      key: i,
      name: "Luong Nhat Duy",
      id: "abcxyz1223.naver.abcxyz1",
    });
  }
  const columns: TableColumnsType<any> = [
    {
      title: t("Name"),
      render: ({ name }) => (
        <div className="flex flex-col min-w-[100px]">
          <img src={Images.adult} className="w-[18px] h-[18px]" />
          <BaseText>{name}</BaseText>
        </div>
      ),
    },
    {
      title: t("Id"),
      dataIndex: "id",
    },
    {
      title: t("Type/Group"),
      render: ({ name }) => (
        <div className="flex flex-col gap-1">
          <BaseInputSelect
            required
            value={"Admin"}
            onChange={(value) => {}}
            placeholder="Select type user"
            options={["Admin", "Biz", "Normal"].map((item) => ({
              value: item,
              label: item,
            }))}
          />
          <BaseInputSelect
            required
            value={"GroupA"}
            onChange={(value) => {}}
            placeholder="Select type user"
            options={["GroupA", "GroupB", "GroupC"].map((item) => ({
              value: item,
              label: item,
            }))}
          />
        </div>
      ),
    },
    {
      title: t("Jump up limit"),
      render: ({}) => (
        <div className="flex flex-col gap-1 items-center">
          <CustomButton className="w-10" primary>
            0
          </CustomButton>
          <CustomButton locale primary>
            View history
          </CustomButton>
        </div>
      ),
    },
    {
      title: t("Store status"),
      render: ({}) => (
        <div className="flex flex-col gap-1 min-w-[230px]">
          {storeStatus("Announcement Store", 0)}
          {storeStatus("Store under review", 0)}
          {storeStatus("Stores that refuse review", 110)}
          {storeStatus("Expired store", 0)}
          {storeStatus("Recommended store", 110)}
          {storeStatus("During the event", 0)}
        </div>
      ),
    },
    {
      title: t("Date create/ By"),
      render: ({}) => (
        <div className="flex flex-col gap-1 items-center">
          <img src={Images.web} className="w-6 h-6" />
          <BaseText medium size={16}>
            2023.12.12
          </BaseText>
        </div>
      ),
    },
    {
      title: t("Store"),
      render: ({}) => (
        <div className="min-w-[30px] cursor-pointer">
          <img src={Images.eye} className="w-6 h-6" />
        </div>
      ),
    },
    {
      title: t("Post/comment/ review/requests"),
      render: ({}) => (
        <BaseText size={16} medium>
          0/0/0/0
        </BaseText>
      ),
    },
    {
      title: "",
      render: ({}) => (
        <div className="flex flex-row items-center w-[50px]">
          <img src={Images.edit} className="w-6 h-6 cursor-pointer" />
          <img src={Images.dot} className="w-6 h-6 cursor-pointer" />
        </div>
      ),
    },
  ];

  return (
    <BaseTable
      onSelectChange={() => {}}
      className={className}
      pagination={{ pageSize: 10 }}
      columns={columns}
      data={data}
    />
  );
}
