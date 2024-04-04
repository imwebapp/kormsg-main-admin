import { useEffect, useState } from "react";
import Images from "../../assets/gen";
import { BaseText, CustomButton } from "../../components";
import { BaseInput } from "../../components/input/BaseInput";
import { BaseInputSelect } from "../../components/input/BaseInputSelect";

import {
  CheckOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  TeamOutlined,
  SearchOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { BaseModal } from "../../components/modal/BaseModal";
import { User, classNames } from "../../utils/common";
import UserManageTable from "../../components/userManageTable";
import { useNavigate } from "react-router-dom";
import { Url } from "../../routers/paths";
import { useTranslation } from "react-i18next";
import { getMethod } from "../../utils/request";
import { userApi } from "../../apis/userApi";
import { groupApi } from "../../apis/groupApi";
import { ListTypeUser, TypeUser } from "../../utils/constants";
import { employeeApi } from "../../apis/employeeApi";
import { Input, Select } from "antd";

const listUserGroups = [
  {
    id: 1,
    name: "ALL",
    numberUser: 0,
  },
];

type IGroups = {
  id: number;
  name: string;
  numberUser: number;
};
type ITypeUser = {
  id: string;
  name: string;
};
const UserManage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [groupSelected, setGroupSelected] = useState<IGroups>(
    listUserGroups[0]
  );
  const [typeUserSelected, setTypeUserSelected] = useState<ITypeUser>(
    ListTypeUser[0]
  );
  const [openModalCreateGroup, setOpenModalCreateGroup] = useState(false);
  const [openModalCreateUser, setOpenModalCreateUser] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [valueInputCreateGroup, setValueInputCreateGroup] = useState("");
  const [formDataCreateUser, setFormDataCreateUser] = useState({
    userType: "",
    userGroup: "",
    userId: "",
    password: "",
    userName: "",
    avatar: "",
  });

  const [countTypeUser, setCountTypeUser] = useState({
    countAdmin: 0,
    countBizUser: 0,
    countFreeUser: 0,
    countPaidUser: 0,
  });

  const [listUserGroup, setListUserGroup] = useState(listUserGroups);
  const [listUser, setListUser] = useState<User[]>([]);
  const [isEditingGroupName, setIsEditingGroupName] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [isCreatingGroupName, setIsCreatingGroupName] = useState(false);

  const [reloading, setReloading] = useState(false);
  const [valueKeywordFilter, setValueKeywordFilter] = useState("");

  console.log("reloading: ", reloading);

  console.log("listUser: ", listUser);

  const handleClickGroup = (group: IGroups) => {
    if (groupSelected && groupSelected.id === group.id) {
      // setGroupSelected(listUserGroup[0]);
    } else {
      setGroupSelected(group);
    }
  };

  const handleEditGroupName = () => {
    setIsEditingGroupName(true);
    setNewGroupName(groupSelected.name);
  };

  const handleSaveGroupName = async () => {
    if (newGroupName === "" || newGroupName === groupSelected.name) {
      setNewGroupName(groupSelected.name);
      setIsEditingGroupName(false);
      return;
    }
    const resEditGroup: any = await groupApi.update(
      groupSelected.id.toString(),
      { name: newGroupName.trim() }
    );
    if (resEditGroup?.code === 200) {
      console.log("resEditGroup: ", resEditGroup);
      const updatedGroups = listUserGroup.map((group) => {
        if (group.id === groupSelected.id) {
          setGroupSelected({ ...group, name: newGroupName.trim() });
          return { ...group, name: newGroupName.trim() };
        }
        return group;
      });
      setListUserGroup(updatedGroups);
      setReloading(!reloading);
    }
    setIsEditingGroupName(false);
  };

  //create group
  const handleOpenModalCreateGroup = () => {
    setOpenModalCreateGroup(true);
  };

  const handleCloseModalCreateGroup = () => {
    setOpenModalCreateGroup(false);
  };

  const handleCreateGroup = async () => {
    console.log("create group:", valueInputCreateGroup);
    if (valueInputCreateGroup.trim() === "") {
      setIsCreatingGroupName(false);
      return;
    }
    const res: any = await groupApi.create({ name: valueInputCreateGroup });
    if (res.code === 200) {
      const newGroup = {
        id: res.results.object.id,
        name: valueInputCreateGroup,
        numberUser: 0,
      };
      setListUserGroup([...listUserGroup, newGroup]);
      setValueInputCreateGroup("");
      setIsCreatingGroupName(false);
    } else {
      console.log("err: ", res);
      setIsCreatingGroupName(false);
    }
  };

  const handleClickTypeUser = (item: any) => {
    console.log("item: ", item);
    setTypeUserSelected(item);
  };

  //create user
  const handleOpenModalCreateUser = () => {
    setOpenModalCreateUser(true);
  };

  const handleCloseModalCreateUser = () => {
    setOpenModalCreateUser(false);
  };

  const handleInputChange = (name: string, value: any) => {
    setFormDataCreateUser({ ...formDataCreateUser, [name]: value });
  };

  const isFormDataValid = () => {
    for (const key in formDataCreateUser) {
      if (
        key !== "avatar" &&
        !formDataCreateUser[key as keyof typeof formDataCreateUser]
      ) {
        return false;
      }
    }
    return true;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setFormDataCreateUser({
            ...formDataCreateUser,
            avatar: reader.result,
          });
        } else {
          console.error("Invalid data type for avatar.");
        }
      };
    }
  };

  const handleCreateUser = () => {
    if (isFormDataValid()) {
      console.log("FormData is valid. Submitting...", formDataCreateUser);
      setOpenModalCreateUser(false);
      setFormDataCreateUser({
        userType: "",
        userGroup: "",
        userId: "",
        password: "",
        userName: "",
        avatar: "",
      });
    } else {
      console.log("FormData is not valid. Please fill all fields.");
    }
  };

  //jump up
  const [openModalAddJumpUp, setOpenModalAddJumpUp] = useState(false);
  const [valueInputJumpUp, setValueInputJumpUp] = useState(1);
  const [JumpUpValue, setJumpUpValue] = useState({
    id: "",
    jumpLimit: 0,
  });
  const handleOpenModalJumpUp = (id: any, jumpLimit: number) => {
    console.log("handleOpenModalJumpUp id: ", id, jumpLimit);
    setJumpUpValue({
      id: id,
      jumpLimit: jumpLimit,
    });
    setOpenModalAddJumpUp(true);
  };
  const handleCloseModalJumpUp = () => {
    setValueInputJumpUp(1);
    setJumpUpValue({
      id: "",
      jumpLimit: 0,
    });
    setOpenModalAddJumpUp(false);
  };
  const handleJumpUp = async () => {
    const dataUpdate = {
      jump_limit: valueInputJumpUp + JumpUpValue.jumpLimit,
    };
    const res: any = await userApi.updateJumpLimit(JumpUpValue.id, dataUpdate);
    console.log("res jump up: ", res);
    listUser.map((item) => {
      if (item.id === JumpUpValue.id) {
        item.jump_limit = valueInputJumpUp + JumpUpValue.jumpLimit;
      }
    });
    setValueInputJumpUp(1);
    setJumpUpValue({
      id: "",
      jumpLimit: 0,
    });
    setOpenModalAddJumpUp(false);
  };
  const handleChangeTextKeyword = (e: any) => {
    setValueKeywordFilter(e.target.value);
  };

  useEffect(() => {
    const convertFilter: any = {
      account_type: typeUserSelected.id,
    };
    if (groupSelected.id !== 1) {
      convertFilter["group_id"] = groupSelected.id;
    }
    if (valueSearch !== "") {
      convertFilter["$or"] = [
        { nickname: { $like: `%${valueSearch}%` } },
        { email: { $like: `%${valueSearch}%` } },
      ];
    }
    if (valueSearch !== "") {
      convertFilter["$or"] = [
        { nickname: { $like: `%${valueSearch}%` } },
        { email: { $like: `%${valueSearch}%` } },
      ];
    }

    if (typeUserSelected.id === TypeUser.ADMIN) {
      // employeeApi.getList({ limit: 50, fields: '["$all"]', filter: JSON.stringify(convertFilter) }
      employeeApi
        .getList({ limit: 50, fields: '["$all"]' })
        .then((res: any) => {
          console.log("res getList EMPLOYEE: ", res.results.objects.rows);
          const listUserConvert = res.results.objects.rows.map((item: any) => {
            return {
              ...item,
              nickname: item.fullname,
              account_type: TypeUser.ADMIN,
            };
          });
          setListUser(listUserConvert);
        })
        .catch((err: any) => {
          console.log("err: ", err);
        });
    } else {
      userApi
        .getList({
          limit: 50,
          fields: '["$all"]',
          filter: JSON.stringify(convertFilter),
        })
        .then((res: any) => {
          console.log("res getList User: ", res.results.objects.rows);
          setListUser(res.results.objects.rows);
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    }
  }, [groupSelected, typeUserSelected, valueSearch]);

  useEffect(() => {
    userApi
      .getCount(groupSelected.id === 1 ? "" : groupSelected.id)
      .then((res: any) => {
        console.log("res getCount User: ", res);
        setCountTypeUser(res.results.object);
      })
      .catch((err) => {
        console.log("err getCount User: ", err);
      });
  }, [groupSelected]);

  useEffect(() => {
    groupApi
      .getList({
        limit: 50,
        fields: '["$all"]',
      })
      .then((res: any) => {
        console.log("res getList Group: ", res.results.objects);
        listUserGroups[0].numberUser = res.results?.objects?.count || 0;
        setListUserGroup([listUserGroups[0], ...res.results?.objects?.rows]);
      })
      .catch((err) => {
        console.log("err getList Group: ", err);
      });
  }, []);

  return (
    <>
      <div
        className={classNames("flex overflow-hidden")}
        style={{ height: "calc(100vh - 71px)" }}
      >
        <div className={classNames("w-1/6 border-r border-darkNight100 p-6")}>
          <div className={classNames("flex items-center justify-between mb-4")}>
            <BaseText bold locale size={16} className="">
              User group
            </BaseText>
            <PlusOutlined
              className={classNames("text-xl cursor-pointer")}
              // onClick={handleOpenModalCreateGroup}
              onClick={() => {
                setIsCreatingGroupName(true);
              }}
            />
          </div>
          <div
            className={classNames("overflow-y-auto")}
            style={{ height: "calc(100% - 40px)" }}
          >
            {listUserGroup.map((item, index) => {
              const checkSelected =
                groupSelected && groupSelected.id === item.id;
              return (
                <div
                  className={classNames(
                    "flex items-center gap-1 py-2 mb-2 cursor-pointer"
                  )}
                  onClick={() => handleClickGroup(item)}
                  onDoubleClick={handleEditGroupName}
                >
                  {isEditingGroupName && groupSelected.id === item.id ? (
                    <>
                      {checkSelected && (
                        <CheckOutlined
                          className={classNames("text-dayBreakBlue500 text-xl")}
                        />
                      )}
                      <BaseInput
                        value={newGroupName}
                        onChange={(value) => setNewGroupName(value)}
                        onBlur={handleSaveGroupName}
                        onSave={handleSaveGroupName}
                        autoFocus
                        styleInputContainer="w-full font-medium bg-white border rounded-lg border-dayBreakBlue500 text-darkNight900"
                        styleInput="w-full bg-white focus:outline-none font-medium text-darkNight900"
                      />
                    </>
                  ) : (
                    <>
                      {!isCreatingGroupName && checkSelected && (
                        <CheckOutlined
                          className={classNames("text-dayBreakBlue500 text-xl")}
                        />
                      )}
                      <BaseText
                        medium
                        size={14}
                        className={classNames(
                          checkSelected && !isCreatingGroupName
                            ? "text-dayBreakBlue500"
                            : "pl-6"
                        )}
                      >
                        {item.name}
                      </BaseText>
                      <span
                        className={classNames(
                          "",
                          checkSelected && !isCreatingGroupName
                            ? "text-dayBreakBlue500 font-medium"
                            : "font-medium"
                        )}
                      >
                        ({item?.numberUser || 0})
                      </span>
                    </>
                  )}
                </div>
              );
            })}
            {isCreatingGroupName && (
              <div
                className={classNames(
                  "flex items-center gap-1 py-2 mb-2 cursor-pointer"
                )}
                onClick={() => {}}
                // onDoubleClick={handleEditGroupName}
              >
                <CheckOutlined
                  className={classNames("text-dayBreakBlue500 text-xl")}
                />
                <BaseInput
                  value={valueInputCreateGroup}
                  onChange={(value) => setValueInputCreateGroup(value)}
                  placeholder="Enter group name"
                  onBlur={handleCreateGroup}
                  onSave={handleCreateGroup}
                  autoFocus
                  styleInputContainer="w-full font-medium bg-white border rounded-lg border-dayBreakBlue500 text-darkNight900"
                  styleInput="w-full bg-white focus:outline-none font-medium text-darkNight900"
                />
              </div>
            )}
          </div>
        </div>
        <div
          className={classNames("w-5/6 p-6 flex flex-col gap-6  overflow-auto")}
        >
          <BaseText
            bold
            size={24}
            className="w-full leading-none text-darkNight900"
          >
            {groupSelected.name}
          </BaseText>
          <div
            className={classNames("flex flex-row justify-between items-center")}
          >
            <div>
              <div className="flex gap-4 text-base font-medium leading-6 whitespace-nowrap max-w-[651px] max-md:flex-wrap my-4">
                <div className="flex flex-wrap flex-1 gap-2.5 gap-y-2.5 justify-between content-center px-4 py-2.5 rounded-xl border border-solid border-stone-300 text-neutral-900">
                  <Select
                    suffixIcon={<CaretDownOutlined />}
                    bordered={false}
                    placeholder="ID"
                    defaultValue="ID"
                    // onChange={handleChangeFilter}
                    options={[
                      {
                        value: "username",
                        label: "ID",
                      },
                      {
                        value: "nickname",
                        label: "nickname",
                      },
                      {
                        value: "email",
                        label: "gmail",
                      },
                      {
                        value: "title",
                        label: "title",
                      },
                      {
                        value: "contact_phone",
                        label: "Phone number",
                      },
                    ]}
                    className="flex-1"
                  />
                </div>
                <Input
                  className="items-start justify-center flex-1 px-4 py-3 rounded-xl bg-neutral-100 text-zinc-400 max-md:pr-5"
                  placeholder="Keyword"
                  onChange={handleChangeTextKeyword}
                  value={valueKeywordFilter}
                />
                <CustomButton
                  className="self-center justify-center h-full px-5 py-3 font-bold text-white bg-blue-600 rounded-xl"
                  onClick={() => {}}
                >
                  {t("Search")}
                </CustomButton>
              </div>
            </div>
            <div className={classNames("flex gap-4")}>
              <CustomButton
                primary
                locale
                bold
                icon={<PlusCircleOutlined className="text-2xl" />}
                className={" px-4 py-6"}
                onClick={handleOpenModalCreateUser}
              >
                Create a user
              </CustomButton>
            </div>
          </div>

          <div className={classNames("flex flex-row gap-3 items-center")}>
            {ListTypeUser.map((item) => {
              let count = 0;
              switch (item.id) {
                case TypeUser.ADMIN:
                  count = countTypeUser.countAdmin;
                  break;
                case TypeUser.BIZ_USER:
                  count = countTypeUser.countBizUser;
                  break;
                case TypeUser.FREE_USER:
                  count = countTypeUser.countFreeUser;
                  break;
                case TypeUser.PAID_USER:
                  count = countTypeUser.countPaidUser;
                  break;
                default:
                  break;
              }
              return (
                <CustomButton
                  className="text-base font-medium rounded-full"
                  style={{
                    backgroundColor:
                      typeUserSelected.id === item.id ? "black" : "white",
                    color: typeUserSelected.id === item.id ? "white" : "black",
                  }}
                  onClick={() => handleClickTypeUser(item)}
                >
                  {t(item.name)}
                  {"(" + count + ")"}
                </CustomButton>
              );
            })}
          </div>

          <UserManageTable
            data={listUser}
            reload={reloading}
            onOpenJumpUp={handleOpenModalJumpUp}
          />
        </div>
      </div>
      {/* <BaseModal
        isOpen={openModalCreateGroup}
        onClose={handleCloseModalCreateGroup}
        onSubmit={handleCreateGroup}
        title="Create Group"
        disableSubmitBtn={!valueInputCreateGroup}
      >
        <BaseInput
          title="Group name"
          value={valueInputCreateGroup}
          onChange={(value) => setValueInputCreateGroup(value)}
          placeholder="Enter group name"
          className="mb-2"
          required
        />
      </BaseModal> */}

      <BaseModal
        isOpen={openModalAddJumpUp}
        onClose={handleCloseModalJumpUp}
        onSubmit={handleJumpUp}
        title="Add"
        disableSubmitBtn={!valueInputJumpUp}
      >
        <BaseText bold locale size={14}>
          Jump- up limit
        </BaseText>
        <div className="flex items-center justify-between w-full px-2 py-3 mt-2 rounded-lg bg-darkNight50">
          <img
            src={Images.minusCircle}
            onClick={() => {
              if (valueInputJumpUp <= 1) return;
              setValueInputJumpUp(valueInputJumpUp - 1);
            }}
            className="w-6 h-6 cursor-pointer"
          />
          <input
            value={valueInputJumpUp}
            onChange={(e) => {
              if (e.target.value === "" || Number(e.target.value) < 1) {
                setValueInputJumpUp(1);
              } else if (
                typeof e.target.value === "string" &&
                isNaN(Number(e.target.value))
              ) {
                return;
              } else {
                setValueInputJumpUp(Number(e.target.value));
              }
            }}
            className="flex font-bold text-center bg-darkNight50 focus:outline-none text-dark"
            // type="number"
          />
          <img
            src={Images.plusCircle}
            onClick={() => setValueInputJumpUp(valueInputJumpUp + 1)}
            className="w-6 h-6 cursor-pointer"
          />
        </div>
      </BaseModal>

      <BaseModal
        isOpen={openModalCreateUser}
        onClose={handleCloseModalCreateUser}
        onSubmit={handleCreateUser}
        title="Create a user"
        disableSubmitBtn={!isFormDataValid()}
      >
        <div className={classNames(" flex flex-col gap-4")}>
          <div className={classNames(" flex items-center justify-center")}>
            <input
              type="file"
              accept="image/*"
              id="avatarInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label
              htmlFor="avatarInput"
              className={classNames("relative inline-block")}
            >
              <img
                src={formDataCreateUser.avatar || Images.avatarEmpty}
                className={classNames(
                  "w-20 h-20 rounded-full mx-auto mb-5 cursor-pointer"
                )}
                alt="Avatar"
              />
              <div className="absolute right-0 items-center justify-center p-1 bg-white rounded-full cursor-pointer bottom-4">
                <img
                  src={Images.cameraBlue}
                  className={classNames("w-6 h-6 cursor-pointer")}
                  alt="Avatar"
                />
              </div>
            </label>
          </div>
          <BaseInputSelect
            title="Type"
            required
            value={formDataCreateUser.userType}
            onChange={(value) => handleInputChange("userType", value)}
            placeholder="Select type user"
            options={(ListTypeUser || []).map((item) => ({
              value: item.id,
              label: t(item.name),
            }))}
          />
          <BaseInputSelect
            title="Group"
            required
            value={formDataCreateUser.userGroup}
            onChange={(value) => handleInputChange("userGroup", value)}
            placeholder="Select a group"
            options={(listUserGroup || []).map((item) => ({
              value: item.id,
              label: item.name,
            }))}
          />
          {/* <div className={classNames('flex justify-between pb-4 border-b border-darkNight50')}>
            <BaseText bold locale size={14}>Management Team</BaseText>
            <div className={classNames('flex gap-4 items-center')}>
              <Switch
                value={formDataCreateUser.checkedUser}
                onChange={(value) => handleInputChange('checkedUser', value)}
                className="bg-darkNight200"
                autoFocus
              />
              <BaseText bold locale size={14}>Operate</BaseText>
            </div>
          </div> */}
          <BaseInput
            title="ID account"
            required
            value={formDataCreateUser.userId}
            onChange={(value) => handleInputChange("userId", value)}
            placeholder="Id account"
          />
          <BaseInput
            title="Password"
            required
            value={formDataCreateUser.password}
            onChange={(value) => handleInputChange("password", value)}
            placeholder="Password"
          />
          <BaseInput
            title="User name"
            required
            value={formDataCreateUser.userName}
            onChange={(value) => handleInputChange("userName", value)}
            placeholder="User Name"
            className="mb-4"
          />
        </div>
      </BaseModal>
    </>
  );
};

export default UserManage;
