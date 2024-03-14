import { TableColumnsType } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Images from "../../assets/gen";
import { Url } from "../../routers/paths";
import { User, convertDate } from "../../utils/common";
import { INIT_TAB_USER_DETAIL } from "../../utils/constants";
import CustomButton from "../button";
import { BaseInput } from "../input/BaseInput";
import BaseTable from "../table";
import BaseText from "../text";

const listUserGroup = [
  {
    id: 1,
    name: "ALL",
    count: 10,
  },
  {
    id: 2,
    name: "Group A",
    count: 20,
  },
  {
    id: 3,
    name: "Group B",
    count: 30,
  },
  {
    id: 4,
    name: "Group C",
    count: 40,
  },
];

type UserManageTableProps = {
  data: User[];
  className?: string; // for tailwindcss
};

export default function UserManageTable(props: UserManageTableProps) {
  const { className, data } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => { };

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
  const columns: TableColumnsType<any> = [
    {
      title: t("Name"),
      render: ({ nickname }) => (
        <div className="flex flex-col min-w-[100px]">
          <img src={Images.adult} className="w-[18px] h-[18px]" />
          <BaseText>{nickname}</BaseText>
        </div>
      ),
    },
    {
      title: t("Id"),
      dataIndex: "id",
    },
    {
      title: t("Type/Group"),
      render: ({ account_type, group }) => (
        <div className="flex flex-col gap-1">
          {/* <BaseInputSelect
            required
            value={account_type}
            onChange={(value) => { }}
            placeholder="Select type user"
            options={TypeUser.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
            className="min-w-[160px]"
            disabled
          /> */}
          <BaseInput
            required
            value={account_type}
            onChange={(value) => { }}
            placeholder="Type user"
            disabled
          />
          {/* <BaseInputSelect
            required
            value={group === null ? 1 : group}
            onChange={(value) => { }}
            placeholder="Select type user"
            options={listUserGroup.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
            disabled
          /> */}
          <BaseInput
            required
            value={group === null ? 'All' : group}
            onChange={(value) => { }}
            placeholder="Group User"
            disabled
          />
        </div>
      ),
    },
    {
      title: t("Jump up limit"),
      render: ({ jump_limit }) => (
        <div className="flex flex-col items-center gap-1">
          <CustomButton className="w-10" primary>
            {jump_limit}
          </CustomButton>
          <CustomButton locale primary>
            View history
          </CustomButton>
        </div>
      ),
    },
    {
      title: t("Store status"),
      render: ({ current_active_post, current_pending_post, current_expired_post, current_rejected_post, current_recommendation_post }) => (
        <div className="flex flex-col gap-1 min-w-[230px]">
          {storeStatus("Announcement Store", current_active_post)}
          {storeStatus("Store under review", current_pending_post)}
          {storeStatus("Stores that refuse review", current_rejected_post)}
          {storeStatus("Expired store", current_expired_post)}
          {storeStatus("Recommended store", current_recommendation_post)}
          {storeStatus("During the event", 0)}
        </div>
      ),
    },
    {
      title: t("Date create/ By"),
      render: ({ created_at }) => (
        <div className="flex flex-col items-center gap-1">
          <img src={Images.web} className="w-6 h-6" />
          <BaseText medium size={16}>
            {convertDate(created_at)}
          </BaseText>
        </div>
      ),
    },
    {
      title: t("Store"),
      render: (item: any) => (
        <div className="min-w-[30px] cursor-pointer" onClick={() => navigate(Url.userDetail, { state: {data: item, initTab: INIT_TAB_USER_DETAIL.INFORMATION } })}>
          {/* <div className="min-w-[30px] cursor-pointer" onClick={() => console.log(item)}> */}
          <img src={Images.eye} className="w-6 h-6" />
        </div>
      ),
    },
    {
      title: t("Post/comment/ review/requests"),
      render: ({ }) => (
        <BaseText size={16} medium>
          0/0/0/0
        </BaseText>
      ),
    },
    {
      title: "",
      render: ({ }) => (
        <div className="flex flex-row items-center w-[50px]">
          <img src={Images.edit} className="w-6 h-6 cursor-pointer" />
          <img src={Images.dot} className="w-6 h-6 cursor-pointer" />
        </div>
      ),
    },
  ];

  return (
    <BaseTable
      onSelectChange={() => { }}
      className={className}
      pagination={{ pageSize: 10 }}
      columns={columns}
      data={data}
    />
  );
}
