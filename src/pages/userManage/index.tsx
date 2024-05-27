import { useEffect, useState } from "react";
import Images from "../../assets/gen";
import { BaseText, CustomButton } from "../../components";
import { BaseInput } from "../../components/input/BaseInput";
import { BaseInputSelect } from "../../components/input/BaseInputSelect";
import ReactFlagsSelect from "react-flags-select";
import {
  CheckOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  TeamOutlined,
  SearchOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { BaseModal } from "../../components/modal/BaseModal";
import { User, classNames, formatPhoneNumber } from "../../utils/common";
import UserManageTable from "../../components/userManageTable";
import { useNavigate } from "react-router-dom";
import { Url } from "../../routers/paths";
import { useTranslation } from "react-i18next";
import { getMethod } from "../../utils/request";
import { userApi } from "../../apis/userApi";
import { groupApi } from "../../apis/groupApi";
import {
  ListCountries,
  ListTypeUser,
  PLATFORM,
  TypeUser,
} from "../../utils/constants";
import { employeeApi } from "../../apis/employeeApi";
import { Input, Select, App, Spin, Switch } from "antd";
import { UploadApi } from "../../apis/uploadApi";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const listUserGroups = [
  {
    id: 1,
    name: "All",
    numberUser: 0,
    index: 1,
  },
];

const isMobile = () => {
  return (
    /Mobi|Android/i.test(navigator.userAgent) ||
    /iPhone|iPad|iPod/i.test(navigator.userAgent)
  );
};

const customLabels = ListCountries.reduce((acc: any, item) => {
  acc[item.code] = {
    primary: item.name,
    secondary: item.dial_code,
  };
  return acc;
}, {});

type IGroups = {
  id: number | string;
  name: string;
  numberUser: number;
  index: number;
};
type ITypeUser = {
  id: string;
  name: string;
};
const UserManage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { message } = App.useApp();

  const [loadingScreen, setLoadingScreen] = useState(false);
  const [groupSelected, setGroupSelected] = useState<IGroups>(
    listUserGroups[0]
  );
  const [typeUserSelected, setTypeUserSelected] = useState<ITypeUser>({
    id: "ALL",
    name: "All",
  });
  const [openModalCreateGroup, setOpenModalCreateGroup] = useState(false);
  const [openModalDeleteGroup, setOpenModalDeleteGroup] = useState(false);
  const [openModalCreateUser, setOpenModalCreateUser] = useState(false);
  const [dialCode, setDialCode] = useState("+82");
  const [selected, setSelected] = useState("KR");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [valueInputCreateGroup, setValueInputCreateGroup] = useState("");
  const [formDataCreateUser, setFormDataCreateUser] = useState({
    userType: "",
    userGroup: "",
    userId: "",
    password: "",
    userName: "",
    avatar: "",
    checkedUser: false,
    phoneNumber: "",
  });
  const [imageCreateUser, setImageCreateUser] = useState<File>();
  const [countTypeUser, setCountTypeUser] = useState({
    countAdmin: 0,
    countBizUser: 0,
    countFreeUser: 0,
    countPaidUser: 0,
    totalUser: 0,
  });

  const [listUserGroup, setListUserGroup] = useState(listUserGroups);
  const [listUser, setListUser] = useState<User[]>([]);
  const [isEditingGroupName, setIsEditingGroupName] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [isCreatingGroupName, setIsCreatingGroupName] = useState(false);
  const [idGroupDelete, setIdGroupDelete] = useState("");
  const [selectedButton, setSelectedButton] = useState("");

  const [reloading, setReloading] = useState(false);
  const [valueSearch, setValueSearch] = useState("");

  const [page, setPage] = useState(1);
  const [totalCountUser, setTotalCountUser] = useState(0);
  const limit = 10;

  const handleClickGroup = (group: IGroups) => {
    if (groupSelected && groupSelected.id === group.id) {
      // setGroupSelected(listUserGroup[0]);
    } else {
      setGroupSelected(group);
    }
  };

  const handleDeleteGroup = async (item: any) => {
    console.log("listUserGroup", listUserGroup);

    if (item?.numberUser === 0) {
      try {
        const resDeleteGroup: any = await groupApi.delete(item?.id.toString());
        if (resDeleteGroup?.code === 200) {
          const newListUserGroup = listUserGroup.filter(
            (group) => group.id !== item?.id
          );
          setListUserGroup(newListUserGroup);
          setGroupSelected(listUserGroup[0]);
          setReloading(!reloading);
          message.success("Delete group successfully");
        }
      } catch (error) {
        message.error("Delete group failed");
      }
    } else {
      setOpenModalDeleteGroup(true);
      setSelectedButton("");
      setIdGroupDelete(item?.id);
    }
  };

  const handleCloseModalDeleteGroup = () => {
    setOpenModalDeleteGroup(false);
    setIdGroupDelete("");
  };

  const handleDeleteGroupHasNumber = async (id: string) => {
    // console.log("buttio id", id);
    // console.log("buttio vc", selectedButton);

    try {
      const resDeleteGroup: any = await groupApi.delete(
        id.toString(),
        selectedButton
      );
      if (resDeleteGroup?.code === 200) {
        setIdGroupDelete("");
        setOpenModalDeleteGroup(false);
        const newListUserGroup = listUserGroup.filter(
          (group) => group.id.toString() !== id
        );
        setListUserGroup(newListUserGroup);
        await getListGroup();
        setGroupSelected(listUserGroup[0]);
        setReloading(!reloading);
        message.success("Delete group successfully");
      }
    } catch (error) {
      setIdGroupDelete("");
      setOpenModalDeleteGroup(false);
      message.error("Delete group failed");
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
    if (valueInputCreateGroup.trim() === "") {
      setIsCreatingGroupName(false);
      return;
    }
    const res: any = await groupApi.create({ name: valueInputCreateGroup });
    if (res.code === 200) {
      // const newGroup = {
      //   id: res.results.object.id,
      //   name: valueInputCreateGroup,
      //   numberUser: 0,
      //   index: res.results.object.index,
      // };
      // setListUserGroup([...listUserGroup, newGroup]);
      getListGroup();
      setValueInputCreateGroup("");
      setIsCreatingGroupName(false);
      setReloading(!reloading);
    } else {
      console.log("err: ", res);
      setIsCreatingGroupName(false);
    }
  };

  const handleClickTypeUser = (item: any) => {
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
        key !== "checkedUser" &&
        !(
          key === "userGroup" &&
          formDataCreateUser["userType"] === TypeUser.ADMIN
        ) &&
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
      setImageCreateUser(file);
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

  const handleCreateUser = async () => {
    try {
      const deviceType = isMobile()
        ? PLATFORM.BROWSER_MOBILE
        : PLATFORM.BROWSER;

      //Upload Image
      let resUploadImg: string = "";
      setLoadingScreen(true);
      if (imageCreateUser !== undefined) {
        const ResUploadImg = await UploadApi.uploadImage(imageCreateUser);
        resUploadImg = ResUploadImg?.url;
      }

      const cleanedPhoneNumber = formatPhoneNumber(
        formDataCreateUser?.phoneNumber
      );

      const dataCreateConvert = {
        account_type: formDataCreateUser?.userType,
        approve: false,
        attachments: [],
        avatar: resUploadImg || null,
        deposit_amount: null,
        deposit_date: null,
        depositor: null,
        email: formDataCreateUser?.userId,
        event_type: null,
        exposure_bulletin_board: null,
        group_id:
          formDataCreateUser?.userGroup == "1"
            ? null
            : formDataCreateUser.userGroup,
        memo: null,
        nickname: formDataCreateUser?.userName,
        password: formDataCreateUser?.password,
        phone: dialCode + cleanedPhoneNumber,
        post_limit: 1,
        start_date: null,
        uniqueness: null,
        username: formDataCreateUser.userId,
        platform_create: deviceType,
      };
      console.log("dataCreateConvert", dataCreateConvert);

      //create Admin
      if (formDataCreateUser?.userType === TypeUser.ADMIN) {
        const dataCreateAdmin = {
          fullname: formDataCreateUser?.userName,
          avatar: resUploadImg || null,
          phone: dialCode + cleanedPhoneNumber,
          email: formDataCreateUser?.userId,
          username: formDataCreateUser?.userId,
          password: formDataCreateUser?.password,
          type: TypeUser.ADMIN,
        };
        const resCreateAdmin: any = await employeeApi.createAdmin(
          dataCreateAdmin
        );
        message.success("Create user successfully");
        setLoadingScreen(false);
        setFormDataCreateUser({
          userType: "",
          userGroup: "",
          userId: "",
          password: "",
          userName: "",
          avatar: "",
          checkedUser: false,
          phoneNumber: "",
        });
        await getListGroup();
        setImageCreateUser(undefined);
        setOpenModalCreateUser(false);
        return;
      }

      //create user
      const resCreateUser: any = await userApi.createUser(dataCreateConvert);
      if (resCreateUser.code === 200) {
        setListUser([resCreateUser?.results?.object, ...listUser]);
        message.success("Create user successfully");
        setLoadingScreen(false);
        setFormDataCreateUser({
          userType: "",
          userGroup: "",
          userId: "",
          password: "",
          userName: "",
          avatar: "",
          checkedUser: false,
          phoneNumber: "",
        });
        await getListGroup();
        setImageCreateUser(undefined);
        setOpenModalCreateUser(false);
      }
    } catch (error: any) {
      console.log("error Create user", error);
      message.error(error?.response?.data?.message || "Create user failed");
      setLoadingScreen(false);
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
  const getButtonStyle = (buttonKey: any) => {
    const isSelected = buttonKey === selectedButton;
    return {
      backgroundColor: isSelected ? "black" : "white",
      color: isSelected ? "white" : "black",
    };
  };
  const handleButtonClick = (id: any) => {
    setSelectedButton(id);
  };
  const getTextColor = (buttonStatus: any) => {
    return buttonStatus === selectedButton ? "white" : "black";
  };

  const handleDeleteUser = async (id: string, typeUser: string) => {
    try {
      setLoadingScreen(true);
      const res: any =
        typeUser === TypeUser.ADMIN
          ? await employeeApi.deleteAdmin(id)
          : await userApi.delete(id);
      if (res.code === 200) {
        const newListUser = listUser.filter((item) => item.id !== id);
        setListUser(newListUser);
        getListGroup();
        setLoadingScreen(false);
        message.success("Delete user successfully");
      }
    } catch (error: any) {
      console.log("err delete user: ", error);
      setLoadingScreen(false);
      message.error("Delete user failed");
    }
  };

  const handleDeleteUsers = async (ids: string[]) => {
    try {
      setLoadingScreen(true);
      // const res: any = typeUser === TypeUser.ADMIN ? await employeeApi.deleteAdmin(id) : await userApi.deleteUsers(JSON.stringify(ids));;
      const res: any = await userApi.deleteUsers(JSON.stringify(ids));
      if (res.code === 200) {
        const newListUser = listUser.filter((item) => !ids.includes(item.id));
        setListUser(newListUser);
        getListGroup();
        setLoadingScreen(false);
        message.success("Delete users successfully");
      }
    } catch (error: any) {
      console.log("err delete users: ", error);
      setLoadingScreen(false);
      message.error("Delete users failed");
    }
  };

  const handleUpdateTypeUser = async (id: string, type: string) => {
    try {
      const res: any = await userApi.updateUser(id, { account_type: type });
      if (res.code === 200) {
        searchUser();
        message.success("Update type user successfully");
      }
    } catch (error: any) {
      console.log("err update type user: ", error);
      message.error("Update type user failed");
    }
  };

  const handleChangeGroupUser = async (id: string, group_id: string) => {
    try {
      const res: any = await userApi.updateUser(id, { group_id: group_id });
      if (res.code === 200) {
        await getListGroup();
        searchUser();
        message.success("Update group user successfully");
      }
    } catch (error: any) {
      console.log("err update group user: ", error);
      message.error("Update group user failed");
    }
  };

  const orderGroup = async (
    prev_index_number: number | undefined,
    next_index_number: number | undefined,
    id: string
  ) => {
    try {
      if (prev_index_number === 1) {
        const resOrderGroup = await groupApi.orderGroup(id, {
          undefined,
          next_index_number,
        });
      } else {
        const resOrderGroup = await groupApi.orderGroup(id, {
          prev_index_number,
          next_index_number,
        });
        console.log("resOrderGroup: ", resOrderGroup);
      }

      await getListGroup();
    } catch (error) {
      message.error("Order group failed");
    }
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const newListUserGroup = [...listUserGroup];
    const [draggedItem] = newListUserGroup.splice(sourceIndex, 1);
    newListUserGroup.splice(destinationIndex, 0, draggedItem);
    // setListUserGroup(newListUserGroup);

    const beforeIndex = destinationIndex > 0 ? destinationIndex - 1 : null;
    const afterIndex =
      destinationIndex < newListUserGroup.length - 1
        ? destinationIndex + 1
        : null;

    const beforeItemData =
      beforeIndex !== null ? newListUserGroup[beforeIndex] : null;
    const afterItemData =
      afterIndex !== null ? newListUserGroup[afterIndex] : null;

    await orderGroup(
      beforeItemData?.index,
      afterItemData?.index,
      String(draggedItem.id)
    );
  };

  const onDragEnd = (result: any) => {
    console.log("result onDragEnd", result);
    if (!result.destination) {
      return;
    }
    if (result.destination.droppableId === result.source.droppableId) return;
    if (result.destination.droppableId === "ALL") return;
    if (result.destination.droppableId === TypeUser.ADMIN) return;

    handleUpdateTypeUser(result.draggableId, result.destination.droppableId);
  };

  const searchUser = () => {
    const convertFilter: any = {};
    if (typeUserSelected.id !== "ALL") {
      convertFilter["account_type"] = typeUserSelected.id;
    }
    if (groupSelected.id !== 1) {
      convertFilter["group_id"] = groupSelected.id;
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
        .getList({
          limit: limit,
          page,
          fields: '["$all"]',
        })
        .then((res: any) => {
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
          limit: limit,
          page,
          fields: '["$all"]',
          filter: JSON.stringify(convertFilter),
          statistic: true,
        })
        .then((res: any) => {
          setListUser(res.results.objects.rows);
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    }
  };

  const getListGroup = async () => {
    try {
      const resListGroup: any = await groupApi.getList({
        limit: 50,
        fields: '["$all"]',
      });
      if (resListGroup?.code === 200) {
        console.log("res getList Group: ", resListGroup.results?.objects?.rows);
        listUserGroups[0].numberUser =
          resListGroup.results?.objects?.totalUser || 0;
        setListUserGroup([
          listUserGroups[0],
          ...resListGroup.results?.objects?.rows,
        ]);
      }
    } catch (error: any) {
      console.log("err getList Group: ", error);
    }
  };
  useEffect(() => {
    setPage(0);
    setTimeout(() => {
      setPage(1);
    }, 50);
  }, [groupSelected, typeUserSelected, valueSearch]);

  useEffect(() => {
    searchUser();
  }, [page]);

  useEffect(() => {
    userApi
      .getCount(groupSelected.id === 1 ? "" : groupSelected.id)
      .then((res: any) => {
        setCountTypeUser(res.results.object);
        switch (typeUserSelected.id) {
          case TypeUser.ADMIN:
            setTotalCountUser(countTypeUser.countAdmin);

            break;
          case TypeUser.BIZ_USER:
            setTotalCountUser(countTypeUser.countBizUser);
            break;
          case TypeUser.FREE_USER:
            setTotalCountUser(countTypeUser.countFreeUser);
            break;
          case TypeUser.PAID_USER:
            setTotalCountUser(countTypeUser.countPaidUser);
            break;
          case "ALL":
            if (groupSelected.id === 1)
              setTotalCountUser(countTypeUser.totalUser);
            else {
              setTotalCountUser(
                countTypeUser.countBizUser +
                countTypeUser.countFreeUser +
                countTypeUser.countPaidUser
              );
            }
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        console.log("err getCount User: ", err);
      });
  }, [groupSelected, listUser]);

  useEffect(() => {
    if (typeUserSelected.id === TypeUser.ADMIN) {
      setTypeUserSelected({ id: "ALL", name: "All" });
    }
  }, [groupSelected]);

  useEffect(() => {
    getListGroup();
  }, []);

  return (
    <>
      <div
        className={classNames("flex overflow-hidden")}
        style={{ height: "calc(100vh - 71px)" }}
      >
        <Spin
          spinning={loadingScreen}
          tip="Loading..."
          size="large"
          fullscreen
        />
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
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="group-list">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={classNames("overflow-y-auto")}
                  style={{ height: "calc(100% - 40px)" }}
                >
                  {listUserGroup.map((item, index) => {
                    const checkSelected =
                      groupSelected && groupSelected.id === item.id;
                    const isAll = item.name === "All";

                    if (isAll) {
                      return (
                        <div
                          className={classNames(
                            "flex items-center gap-1 py-2 mb-2 cursor-pointer"
                          )}
                          onClick={() => handleClickGroup(item)}
                          onDoubleClick={handleEditGroupName}
                        >
                          {isEditingGroupName &&
                            groupSelected.id === item.id ? (
                            <>
                              {checkSelected && (
                                <CheckOutlined
                                  className={classNames(
                                    "text-dayBreakBlue500 text-xl"
                                  )}
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
                                  className={classNames(
                                    "text-dayBreakBlue500 text-xl"
                                  )}
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
                    }

                    return (
                      <Draggable draggableId={`group-${index}`} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={classNames(
                              "flex items-center gap-1 py-2 mb-2 cursor-pointer"
                            )}
                            onClick={() => handleClickGroup(item)}
                            onDoubleClick={handleEditGroupName}
                          >
                            {isEditingGroupName &&
                              groupSelected.id === item.id ? (
                              <>
                                {checkSelected && (
                                  <CheckOutlined
                                    className={classNames(
                                      "text-dayBreakBlue500 text-xl"
                                    )}
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
                              <div className="flex justify-between w-full">
                                <div className="flex gap-1">
                                  {!isCreatingGroupName && checkSelected && (
                                    <CheckOutlined
                                      className={classNames(
                                        "text-dayBreakBlue500 text-xl"
                                      )}
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
                                </div>
                                {!isCreatingGroupName && checkSelected && (
                                  <div onClick={() => handleDeleteGroup(item)}>
                                    <img
                                      src={Images.trashred}
                                      className="w-5 h-5 cursor-pointer"
                                    />
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {isCreatingGroupName && (
                    <div
                      className={classNames(
                        "flex items-center gap-1 py-2 mb-2 cursor-pointer"
                      )}
                      onClick={() => { }}
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
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
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
            <div className="flex gap-4 text-base font-medium leading-6 whitespace-nowrap max-w-[1000px] w-[651px] max-md:flex-wrap my-4">
              <BaseInput
                placeholder="Search user"
                className="w-2/4"
                value={valueSearch}
                onChange={(value) => {
                  setValueSearch(value);
                }}
                iconLeft={
                  <SearchOutlined className="mr-3 text-2xl text-darkNight500" />
                }
              />
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
          <DragDropContext onDragEnd={onDragEnd}>
            <div className={classNames("flex flex-row gap-3 items-center")}>
              {[{ id: "ALL", name: "All" }, ...ListTypeUser].map(
                (item, index) => {
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
                    case "ALL":
                      if (groupSelected.id === 1)
                        count = countTypeUser.totalUser;
                      else {
                        count =
                          countTypeUser.countBizUser +
                          countTypeUser.countFreeUser +
                          countTypeUser.countPaidUser;
                      }
                      break;
                    default:
                      break;
                  }
                  if (item.id === TypeUser.ADMIN && groupSelected.id !== 1)
                    return null;

                  return (
                    <Droppable droppableId={item?.id}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          <CustomButton
                            className="text-base font-medium rounded-full"
                            style={{
                              backgroundColor:
                                typeUserSelected.id === item.id
                                  ? "black"
                                  : "white",
                              color:
                                typeUserSelected.id === item.id
                                  ? "white"
                                  : "black",
                            }}
                            onClick={() => handleClickTypeUser(item)}
                          >
                            {t(item.name)}
                            {" (" + count + ")"}
                          </CustomButton>
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  );
                }
              )}
            </div>

            <UserManageTable
              data={listUser}
              reload={reloading}
              onOpenJumpUp={handleOpenModalJumpUp}
              onDeleteUser={handleDeleteUser}
              onDeleteUsers={handleDeleteUsers}
              onChangeTypeUser={handleUpdateTypeUser}
              onChangeGroupUser={handleChangeGroupUser}
              pagination={{
                current: page,
                pageSize: limit,
                total: totalCountUser,
                onChange: (page: number, pageSize: number) => {
                  setPage(page);
                },
              }}
            />
          </DragDropContext>
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
        isOpen={openModalDeleteGroup}
        onClose={handleCloseModalDeleteGroup}
        onSubmit={() => handleDeleteGroupHasNumber(idGroupDelete)}
        title="Delete group"
      >
        <BaseText size={16}>
          {
            listUserGroup.find((item) => String(item.id) === idGroupDelete)
              ?.numberUser
          }
          명의 회원이 이동할 게시판을 선택하십시오.
        </BaseText>
        <div className="flex flex-row items-center gap-4 mt-1 mb-5">
          {listUserGroup
            .filter((item, index) => {
              return index !== 0 && String(item.id) !== idGroupDelete;
            })
            .map((item, index) => (
              <CustomButton
                key={index}
                className="text-base h-11 font-medium rounded-full px-4 py-2.5"
                style={getButtonStyle(item.id)}
                onClick={() => handleButtonClick(item.id)}
              >
                <BaseText color={getTextColor(item.id)} size={16}>
                  {item.name}
                </BaseText>
              </CustomButton>
            ))}
        </div>
      </BaseModal>

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

      {/* create user */}
      <BaseModal
        isOpen={openModalCreateUser}
        onClose={handleCloseModalCreateUser}
        onSubmit={handleCreateUser}
        title="Create a user"
        nameConfirm="적용"
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
            defaultValue={formDataCreateUser.userType || undefined}
            value={formDataCreateUser.userType}
            onChange={(value) => handleInputChange("userType", value)}
            placeholder="Select type user"
            options={(ListTypeUser || []).map((item) => ({
              value: item.id,
              label: t(item.name),
            }))}
            customizeStyleSelect={{ singleItemHeightLG: 50 }}
          />
          {formDataCreateUser?.userType !== TypeUser.ADMIN && (
            <BaseInputSelect
              title="Group"
              required
              defaultValue={formDataCreateUser.userGroup || undefined}
              value={formDataCreateUser.userGroup}
              onChange={(value) => handleInputChange("userGroup", value)}
              placeholder="Select a group"
              options={(listUserGroup || []).slice(1).map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              customizeStyleSelect={{ singleItemHeightLG: 50 }}
            />
          )}
          {formDataCreateUser?.userType === TypeUser.ADMIN && (
            <div className={classNames("flex justify-between")}>
              <BaseText bold locale size={14}>
                Management Team
              </BaseText>
              <div className={classNames("flex gap-4 items-center")}>
                <Switch
                  value={formDataCreateUser.checkedUser}
                  onChange={(value) => handleInputChange("checkedUser", value)}
                  className="bg-darkNight200"
                  autoFocus
                />
                <BaseText bold locale size={14}>
                  Operate
                </BaseText>
              </div>
            </div>
          )}

          <div>
            <div className="flex gap-1">
              <BaseText locale bold size={14} className="mb-2">
                Phone number
              </BaseText>
              <span className="text-red-500">*</span>
            </div>

            <div className="flex gap-3">
              <ReactFlagsSelect
                selected={selected}
                onSelect={(code) => {
                  setSelected(code);
                  const selectedCountry = ListCountries.find(
                    (country) => country.code === code
                  );
                  if (selectedCountry) {
                    setDialCode(selectedCountry.dial_code);
                  }
                }}
                customLabels={{
                  ...customLabels,
                }}
                // showSelectedLabel={false}
                showSecondarySelectedLabel={true}
                searchPlaceholder="Search..."
                searchable={true}
                className="w-full h-11 bg-darkNight50"
              />
              <BaseInput
                placeholder="Phone number"
                className="w-full border border-gray-300 rounded-md"
                styleInputContainer="w-full h-11"
                onChange={(value) => handleInputChange("phoneNumber", value)}
                value={formDataCreateUser.phoneNumber}
                type="number"
              />
            </div>
          </div>
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
            type={isShowPassword ? "text" : "password"}
            iconRight={
              <img
                src={isShowPassword ? Images.eyeCross : Images.eye}
                className={classNames("w-6 h-6 cursor-pointer")}
                onClick={() => setIsShowPassword(!isShowPassword)}
              />
            }
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
