import React from "react";
import { TableColumnsType } from "antd";
import BaseText from "../text";
import CustomButton from "../button";
import Images from "../../assets/gen";
import BaseTable from "../table";
import { useTranslation } from "react-i18next";
import { BaseInputSelect } from "../input/BaseInputSelect";

type StoreListTableProps = {
  className?: string; // for tailwindcss
};

export default function StoreListTable(props: StoreListTableProps) {
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
      index: i + 1,
      id: "abcxyz1223.naver.abcxyz1",
      title: "미인애ㅁㅁㄴㅇㅇ 맘스케어",
      category: "로드샵",
    });
  }
  const columns: TableColumnsType<any> = [
    {
      title: t("No"),
      render: ({ index }) => (
        <div className="min-w-[40px]">
          <BaseText>{index}</BaseText>
        </div>
      ),
    },
    {
      title: t("Id"),
      dataIndex: "id",
    },
    {
      title: t("Title"),
      render: ({ title }) => (
        <div className="min-w-[200px]">
          <BaseText>{title}</BaseText>
        </div>
      ),
    },
    {
      title: t("Category"),
      render: ({ category }) => (
        <div className="min-w-[40px]">
          <BaseText>{category}</BaseText>
        </div>
      ),
    },
    {
      title: t("Start/End/Remaining Period"),
      render: ({}) => (
        <div className="flex flex-col items-center">
          <BaseText locale size={16} medium>
            2022.11.30~2024.01.04
          </BaseText>
          <BaseText locale size={16} medium className="text-violet2 ">
            78남음
          </BaseText>
        </div>
      ),
    },
    {
      title: t("Event"),
      render: ({}) => (
        <div className="w-[60px]">
          <BaseText locale size={16} medium className="text-violet2 underline">
            이벤트
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
      title: t("Management"),
      render: ({}) => (
        <div className="flex flex-row items-center w-[50px] gap-2">
          <img src={Images.edit2} className="w-6 h-6 cursor-pointer" />
          <img src={Images.copy} className="w-6 h-6 cursor-pointer" />
          <img src={Images.trash} className="w-6 h-6 cursor-pointer" />
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
