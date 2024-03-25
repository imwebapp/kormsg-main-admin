import { TableColumnsType } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Images from "../../assets/gen";
import { Url } from "../../routers/paths";
import { User, checkAccountType, convertDate } from "../../utils/common";
import { INIT_TAB_USER_DETAIL } from "../../utils/constants";
import CustomButton from "../button";
import { BaseInput } from "../input/BaseInput";
import BaseTable from "../table";
import BaseText from "../text";
import { TypeUser } from "../../utils/constants";
import { groupApi } from "../../apis/groupApi";

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
  reload?: boolean;
};

export default function UserManageTable(props: UserManageTableProps) {
  const { className, data, reload } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [listUserGroup, setListUserGroup] = useState<any>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => { };

  const storeStatus = (title: string, value: number, account_type?: any) => {
    if (account_type !== TypeUser.BIZ_USER) {
      return;
    }
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

  const renderTypeAndGroup = (account_type: any, group_id: any) => {
    let groupName = "";
    listUserGroup.map((item: any) => {
      if (item.id === group_id) {
        groupName = item.name;
      }
    });
    return (
      <div className="flex flex-col gap-1">
        {/* <BaseInputSelect
            required
            value={account_type}
            onChange={(value) => { }}
            placeholder="Select type user"
            options={ListTypeUser.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
            className="min-w-[160px]"
            disabled
          /> */}
        <BaseText
          className={checkAccountType(account_type).CustomStyle}
          bold
          locale
        >
          {checkAccountType(account_type).type}
        </BaseText>
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
        <BaseText
          medium
          className={"text-darkNight900 flex px-4 py-2 items-center bg-darkNight50 rounded-md"}
        >
          {groupName === '' ? 'All' : groupName}
        </BaseText>
      </div>
    )
  }
  const renderJumpLimit = (jump_limit: number, account_type?: any) => {
    if (account_type === TypeUser.ADMIN) {
      return;
    }
    return (
      <div className="flex flex-col items-center gap-1">
        <CustomButton className="w-10" primary>
          {jump_limit}
        </CustomButton>
        <CustomButton locale primary>
          View history
        </CustomButton>
      </div>
    )
  }
  const columns: TableColumnsType<any> = [
    {
      title: t("Name"),
      render: ({ nickname }) => (
        <div className="flex flex-col min-w-[100px]">
          <img src={Images.adult} className="w-[18px] h-[18px]" />
          <BaseText bold>{nickname}</BaseText>
        </div>
      ),
    },
    {
      title: t("Id"),
      render: ({ username }) => (
        <BaseText >{username}</BaseText>
      ),
    },
    {
      title: t("Type/Group"),
      render: ({ account_type, group_id }) => renderTypeAndGroup(account_type, group_id),
    },
    {
      title: t("Jump up limit"),
      render: ({ jump_limit, account_type }) => renderJumpLimit(jump_limit, account_type),
    },
    {
      title: t("Store status"),
      render: ({ current_active_post, current_pending_post, current_expired_post, current_rejected_post, current_recommendation_post, account_type }) => (
        <div className="flex flex-col gap-1 min-w-[230px]">
          {storeStatus("Announcement Store", current_active_post, account_type)}
          {storeStatus("Store under review", current_pending_post, account_type)}
          {storeStatus("Stores that refuse review", current_rejected_post, account_type)}
          {storeStatus("Expired store", current_expired_post, account_type)}
          {storeStatus("Recommended store", current_recommendation_post, account_type)}
          {storeStatus("During the event", 0, account_type)}
        </div>
      ),
    },
    {
      title: t("Date create/ By"),
      render: ({ created_at }) => (
        <div className="flex flex-col items-center gap-2 min-w-[90px]">
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
        <div className="min-w-[30px] cursor-pointer" onClick={() => navigate(Url.userDetail, { state: { data: item, initTab: INIT_TAB_USER_DETAIL.INFORMATION } })}>
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

  useEffect(() => {
    groupApi.getList({
      limit: 50, fields: '["$all"]'
    }).then((res: any) => {
      console.log("res getList Group: ", res.results.objects);

      setListUserGroup(res.results?.objects?.rows);
    })
      .catch((err) => {
        console.log("err getList Group: ", err);
      });
  }, [reload]);

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
