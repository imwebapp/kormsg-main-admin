import { useState } from "react";
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
} from "@ant-design/icons";
import { BaseModal } from "../../components/modal/BaseModal";
import { classNames } from "../../utils/common";
import UserManageTable from "../../components/userManageTable";
import { useNavigate } from "react-router-dom";
import { Url } from "../../routers/paths";

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

const TypeUser = [
  {
    id: "normal",
    name: "Normal User",
  },
  {
    id: "admin",
    name: "Admin",
  },
  {
    id: "biz",
    name: "Biz User",
  },
];
type IGroups = {
  id: number;
  name: string;
  count: number;
};
const UserManage = () => {
  const navigate = useNavigate();

  const [groupSelected, setGroupSelected] = useState<IGroups>(listUserGroup[0]);
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

  const handleClickGroup = (group: IGroups) => {
    if (groupSelected && groupSelected.id === group.id) {
      setGroupSelected(listUserGroup[0]);
    } else {
      setGroupSelected(group);
    }
  };

  //create group
  const handleOpenModalCreateGroup = () => {
    setOpenModalCreateGroup(true);
  };

  const handleCloseModalCreateGroup = () => {
    setOpenModalCreateGroup(false);
  };

  const handleCreateGroup = () => {
    console.log("create group:", valueInputCreateGroup);
    setOpenModalCreateGroup(false);
    setValueInputCreateGroup("");
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
              onClick={handleOpenModalCreateGroup}
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
                >
                  {checkSelected && (
                    <CheckOutlined
                      className={classNames("text-dayBreakBlue500 text-xl")}
                    />
                  )}
                  <BaseText
                    medium
                    locale
                    size={14}
                    className={classNames(
                      checkSelected ? "text-dayBreakBlue500" : "pl-6"
                    )}
                  >
                    {item.name}
                  </BaseText>
                  <span
                    className={classNames(
                      "",
                      checkSelected
                        ? "text-dayBreakBlue500 font-medium"
                        : "font-medium"
                    )}
                  >
                    ({item.count})
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className={classNames("w-5/6 p-6 flex flex-col gap-6  overflow-auto")}
        >
          <BaseText
            bold
            locale
            size={24}
            className="w-full leading-none text-darkNight900"
          >
            {groupSelected.name}
          </BaseText>
          <div
            className={classNames("flex flex-row justify-between items-center")}
          >
            <BaseInput
              placeholder="Search user"
              className="w-2/4"
              value={valueSearch}
              onChange={(value) => { setValueSearch(value) }}
              iconLeft={<SearchOutlined className="mr-3 text-2xl text-darkNight500" />}
            />
            <div className={classNames("flex gap-4")}>
              <CustomButton
                locale
                medium
                icon={<TeamOutlined className="text-2xl" />}
                className={" px-4 py-6"}
                onClick={() => { }}
              >
                Create users bulk
              </CustomButton>
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
          <UserManageTable />
        </div>
      </div>
      <BaseModal
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
            options={(TypeUser || []).map((item) => ({
              value: item.id,
              label: item.name,
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
