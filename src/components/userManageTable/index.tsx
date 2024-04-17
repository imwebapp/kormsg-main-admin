import { Popover, TableColumnsType, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Images from "../../assets/gen";
import { Url } from "../../routers/paths";
import { User, checkAccountType, convertDate } from "../../utils/common";
import { INIT_TAB_USER_DETAIL, ListTypeUser, PLATFORM } from "../../utils/constants";
import CustomButton from "../button";
import { BaseInput } from "../input/BaseInput";
import BaseTable from "../table";
import BaseText from "../text";
import { TypeUser } from "../../utils/constants";
import { groupApi } from "../../apis/groupApi";
import { BaseInputSelect } from "../input/BaseInputSelect";

type UserManageTableProps = {
  data: User[];
  className?: string; // for tailwindcss
  reload?: boolean;
  pagination?: {};
  onOpenJumpUp: (id: number, jumpLimit: number) => void;
  onDeleteUser: (id: string) => void;
  onDeleteUsers: (ids: string[]) => void;
  onChangeTypeUser: (id: string, type: string) => void;
  onChangeGroupUser: (id: string, groupId: string) => void;
};

export default function UserManageTable(props: UserManageTableProps) {
  const { className, data, reload, pagination, onOpenJumpUp, onDeleteUser, onDeleteUsers, onChangeTypeUser, onChangeGroupUser } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [listUserGroup, setListUserGroup] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [idOpen, setIdOpen] = useState<string>("");
  const [listRowSelected, setListRowSelected] = useState<string[]>([]);
  console.log("ListRowSelected: ", listRowSelected);

  // const _getCount = async () => {
  //   userApi
  //     .getCount(groupSelected.id === 1 ? "" : groupSelected.id)
  //     .then((res: any) => {
  //       console.log("res getCount User: ", res);
  //       setCountTypeUser(res.results.object);
  //     })
  //     .catch((err) => {
  //       console.log("err getCount User: ", err);
  //     });
  // }
  const handleOpenChange = (newOpen: boolean, id: string) => {
    setIdOpen(id);
    setOpen(newOpen);
  };

  const handleDeleteUser = async (id: string) => {
    setOpen(false);
    onDeleteUser && onDeleteUser(id);
  };
  const handleDeleteUsers = async () => {
    onDeleteUsers && onDeleteUsers(listRowSelected);
    setListRowSelected([]);
  };
  const handleChangeTypeUser = async (id: string, type: string) => {
    onChangeTypeUser(id, type);
  }
  const handleChangeGroupUser = async (id: string, groupId: string) => {
    onChangeGroupUser(id, groupId);
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setListRowSelected(newSelectedRowKeys as string[]);
  };

  const storeStatus = (title: string, item: any, value: number, account_type?: any) => {
    console.log("storeStatus: ", item, "xx", title, "yy", value, 'zz', account_type);
    if (account_type !== TypeUser.BIZ_USER) {
      return;
    }
    return (
      <div className="flex flex-row cursor-pointer" onClick={() => navigate(Url.userDetail, { state: { data: item, initTab: INIT_TAB_USER_DETAIL.SHOP_INFORMATION } })}>
        <BaseText locale medium size={16}>
          {title}
        </BaseText>
        <BaseText medium size={16}>
          : {value}
        </BaseText>
      </div>
    );
  };

  const renderTypeAndGroup = (account_type: any, group_id: any, id: string) => {
    let groupName = "";
    listUserGroup.map((item: any) => {
      if (item.id === group_id) {
        groupName = item.name;
      }
    });
    let bgColor = "";
    switch (account_type) {
      case TypeUser.BIZ_USER:
        bgColor = "#F9F0FF";
        break;
      case TypeUser.FREE_USER:
        bgColor = "#FFF2E8";
        break;
      case TypeUser.PAID_USER:
        bgColor = "#E6F4FF";
        break;
      default:
        bgColor = "#F6F6F6";
        break;
    }
    return (
      <div className="flex flex-col gap-1">
        {
          account_type !== TypeUser.ADMIN ? (
            <div className="flex flex-col gap-1">
              <BaseInputSelect
                required
                defaultValue={account_type}
                value={account_type}
                onChange={(value) => { handleChangeTypeUser(id, value) }}
                placeholder="Select type user"
                options={(ListTypeUser || []).slice(0, 3).map((item) => ({
                  value: item.id,
                  label: t(item.name),
                }))}
                className="min-w-[150px]"
                customizeStyleSelect={
                  {
                    selectorBg: bgColor,
                    colorBorder: bgColor,
                  }
                }
                allowClear={false}
              />
              <BaseInputSelect
                required
                defaultValue={group_id === null ? undefined : group_id}
                value={group_id === null ? undefined : group_id}
                onChange={(value) => { handleChangeGroupUser(id, value) }}
                placeholder="Select a group"
                options={[ ...listUserGroup].map((item: any) => ({
                  value: item.id,
                  label: item.name,
                }))}
                allowClear={false}
              />
            </div>

          ) : (
            <div className="flex flex-col gap-1">
              <BaseText
                className={checkAccountType(account_type).CustomStyle}
                bold
                locale
              >
                {checkAccountType(account_type).type}
              </BaseText>
              <BaseText
                medium
                className={"text-darkNight900 flex px-4 py-2 items-center bg-darkNight50 rounded-md"}
              >
                {groupName === '' ? 'All' : groupName}
              </BaseText>
            </div>
          )
        }
      </div>
    )
  }
  const renderJumpLimit = (item: any, jump_limit: number, account_type?: any,) => {
    if (account_type !== TypeUser.BIZ_USER) {
      return;
    }
    return (
      <div className="flex flex-col items-center gap-1">
        <CustomButton className="w-10" primary onClick={() => { onOpenJumpUp(item.id, jump_limit) }}>
          {jump_limit}
        </CustomButton>
        <CustomButton locale primary onClick={() => navigate(Url.userDetail, { state: { data: item, initTab: INIT_TAB_USER_DETAIL.HISTORY_PAYMENT } })}>
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
      title: t("Id/Phone number"),
      render: ({ username, phone }) => (
        <div className="flex flex-col justify-center">
          <BaseText >{username}</BaseText>
          <BaseText >{phone || t('not added by user')}</BaseText>
        </div>
      ),
    },
    {
      title: t("Type/Group"),
      render: ({ account_type, group_id, id }) => renderTypeAndGroup(account_type, group_id, id),
    },
    {
      title: t("Jump up limit"),
      render: (item: any) => renderJumpLimit(item, item?.jump_limit, item?.account_type),
    },
    {
      title: t("Store status"),
      render: (item: any) => (
        <div className="flex flex-col gap-1 min-w-[180px]">
          {storeStatus("Announcement", item, item.current_active_post, item.account_type)}
          {storeStatus("Expiration", item, item.current_expired_post, item.account_type)}
          {storeStatus("Recommended store", item, item.current_recommendation_post, item.account_type)}
          {storeStatus("During the event", item, item.current_on_event_shop, item.account_type)}
        </div>
      ),
    },
    {
      title: t("Date create/ By"),
      render: ({ platform_create, created_at }) => (
        <div className="flex flex-col items-center gap-2 min-w-[90px]">
          {
            platform_create === PLATFORM.ANDROID ? <img src={Images.android} className="w-6 h-6" /> :
              platform_create === PLATFORM.APPLE ? <img src={Images.iphone} className="w-6 h-6" /> :
                <img src={Images.web} className="w-6 h-6" />
          }
          <BaseText medium size={16}>
            {convertDate(created_at)}
          </BaseText>
        </div>
      ),
    },
    {
      title: t("Store"),
      render: (item: any) => (
        <div className="min-w-[30px] cursor-pointer " onClick={() => navigate(Url.userDetail, { state: { data: item, initTab: INIT_TAB_USER_DETAIL.SHOP_INFORMATION } })}>
          {/* <div className="min-w-[30px] cursor-pointer" onClick={() => console.log(item)}> */}
          <Tooltip title={t('Detail')}>
            <img src={Images.eye} className="w-6 h-6" />
          </Tooltip>
        </div>
      ),
    },
    {
      title: t("Post/comment/ review/requests"),
      render: ({ totalPost, totalReview }) => (
        <BaseText size={16} medium>
          {totalPost || 0}/0/{totalReview || 0}/0
        </BaseText>
      ),
    },
    {
      title: "",
      render: (item: any) => (
        <div className="flex flex-row items-center w-[50px]">
          <Tooltip title={t('Edit')}>
            <img src={Images.edit} className="w-6 h-6 cursor-pointer" onClick={() => navigate(Url.userDetail, { state: { data: item, initTab: INIT_TAB_USER_DETAIL.INFORMATION, showModalEdit: true } })} />
          </Tooltip>
          <Popover
            placement="bottomRight"
            content={(
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1 p-2 rounded-lg cursor-pointer hover:bg-darkNight100" onClick={() => navigate(Url.userDetail, { state: { data: item, initTab: INIT_TAB_USER_DETAIL.INFORMATION, showModalEdit: true } })}>
                  <img src={Images.edit2} className="w-5 h-5 cursor-pointer" />
                  <BaseText locale size={16}>
                    Edit information
                  </BaseText>
                </div>
                <div className="flex items-center gap-1 p-2 rounded-lg cursor-pointer hover:bg-darkNight100" onClick={() => handleDeleteUser(item.id)}>
                  <img src={Images.trash} className="w-5 h-5 cursor-pointer" />
                  <BaseText locale size={16}>
                    Delete user
                  </BaseText>
                </div>
              </div>
            )}
            trigger="click"
            open={idOpen === item.id ? open : false}
            onOpenChange={(newOpen) => handleOpenChange(newOpen, item.id)}
          >
            <img
              src={Images.dot}
              className="w-6 h-6 cursor-pointer"
            />
          </Popover>
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
    <div>
      {listRowSelected.length > 0 ?
        <img src={Images.trash2} className="w-10 h-10 p-2 rounded-lg bg-darkNight50" onClick={handleDeleteUsers} />
        : <div className="h-10" />}
      <BaseTable
        onSelectChange={onSelectChange}
        className={className}
        columns={columns}
        data={data.map((item, index) => ({ ...item, key: item.id }))} // add key for each item
        pagination={pagination || { pageSize: 10 }}
      />
    </div>
  );
}
