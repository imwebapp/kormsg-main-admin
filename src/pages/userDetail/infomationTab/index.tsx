
import { useNavigate } from "react-router-dom";
import { User, checkAccountType, classNames } from "../../../utils/common";
import { BaseText, CustomButton } from "../../../components";
import Images from "../../../assets/gen";
import { BaseModal } from "../../../components/modal/BaseModal";
import { BaseInput } from "../../../components/input/BaseInput";
import { BaseInputSelect } from "../../../components/input/BaseInputSelect";
import { useEffect, useState } from "react";
import { Switch, App } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { groupApi } from "../../../apis/groupApi";
import { userApi } from "../../../apis/userApi";
import md5 from "md5";
import { ListTypeUser } from "../../../utils/constants";
import { Url } from "../../../routers/paths";
import { useTranslation } from "react-i18next";
const listUserGroup = [
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

interface IProps {
  dataUser: User;
  showModalEdit?: boolean;
  onShowHistoryPayment?: () => void;
}

export const InformationTab = (props: IProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { message } = App.useApp();
  const [dataUser, setDataUser] = useState<User>(props?.dataUser);
  const [listUserGroup, setListUserGroup] = useState<any[]>([]);
  const [openModalEditInfo, setOpenModalEditInfo] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formDataEditInfo, setFormDataEditInfo] = useState({
    account_type: dataUser?.account_type || "",
    group_id: dataUser?.group_id || "",
    nickname: dataUser?.nickname,
    username: dataUser?.username,
    post_limit: dataUser?.post_limit || 0,
  });
  const [memoValue, setMemoValue] = useState("");
  const [changePasswordValue, setChangePasswordValue] = useState('');
  const handleInputChange = (name: string, value: any) => {
    setFormDataEditInfo({ ...formDataEditInfo, [name]: value });
  };

  //edit info
  const handleOpenModalEditInfo = () => {
    setOpenModalEditInfo(true);
  };

  const handleCloseModalEditInfo = () => {
    setOpenModalEditInfo(false);
    setFormDataEditInfo({
      account_type: dataUser?.account_type || "",
      group_id: dataUser?.group_id || "",
      nickname: dataUser?.nickname || "",
      username: dataUser?.username || "",
      post_limit: dataUser?.post_limit || 0,
    });
  };

  const handleEditInfo = () => {
    if (isFormDataValid()) {
      userApi.updateUser(dataUser.id, formDataEditInfo).then((res: any) => {
        setDataUser(res.results.object);
        message.success("Edit user successfully");
      }).catch((err) => {
        console.log("err update user: ", err);
        message.error("Edit user failed");
      });
    } else {
      console.log("FormData is not valid. Please fill all fields.");
    }
    setOpenModalEditInfo(false);
  };

  const [openModalChangePassword, setOpenModalChangePassword] = useState(false);

  //change password
  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleOpenModalChangePassword = () => {
    // if (openModalEditInfo) {
    //   handleCloseModalEditInfo();
    // }
    setOpenModalChangePassword(true);
  };

  const handleCloseModalChangePassword = () => {
    setOpenModalChangePassword(false);
    setChangePasswordValue('');
  };

  const handleChangePassword = () => {
    if (changePasswordValue) {
      const trimPassword = changePasswordValue.trim();
      const passwordValueConverted = md5(trimPassword);
      userApi.updateUser(dataUser.id, {
        password: passwordValueConverted,
      }).then((res: any) => {
        setDataUser(res.results.object);
        message.success("Update password successfully");
      }).catch((err) => {
        console.log("err update password user: ", err);
        message.error("Update password failed");
      });
    }
    setChangePasswordValue('');
    setOpenModalChangePassword(false);
  };

  //update Memo
  const handleUpdateMemo = () => {
    if (memoValue.trim() === "") {
      return;
    }
    const dataUpdate = {
      user_id: dataUser.id,
      content: memoValue.trim(),
    };
    userApi.updateUserPaymentHistory(dataUpdate).then((res: any) => {
      message.success("Update memo successfully");
    }
    ).catch((err) => {
      console.log("err update memo: ", err);
      message.error("Update memo failed");
    });

  };

  const isFormDataValid = () => {
    for (const key in formDataEditInfo) {
      if (
        key !== "memo" && key !== "post_limit" &&
        !formDataEditInfo[key as keyof typeof formDataEditInfo]
      ) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    groupApi.getList({
      limit: 50, fields: '["$all"]'
    }).then((res: any) => {
      setListUserGroup(res.results?.objects?.rows);
    })
      .catch((err) => {
        console.log("err getList Group: ", err);
      })
      .finally(() => {
        props?.showModalEdit && handleOpenModalEditInfo();
      });

    //get list payment history
    userApi
      .getListPaymentHistory({
        fields: JSON.stringify([
          "$all",
        ]),
        filter: JSON.stringify({
          user_id: `${dataUser.id}`,
        }),
        limit: 50,
        page: 1,
      })
      .then((res: any) => {
        setMemoValue(res.results?.objects?.rows[0]?.content || "");
      })
      .catch((err) => {
        console.log("err getList PaymentHistory API", err);
      });

    //get user 
    userApi.getUser(props?.dataUser?.id, {
      fields: JSON.stringify([
        "$all",
      ]),
    }).then((res: any) => {
      setDataUser(res?.results?.object);
      setFormDataEditInfo({
        account_type: res?.results?.object?.account_type,
        group_id: res?.results?.object?.group_id,
        nickname: res?.results?.object?.nickname,
        username: res?.results?.object?.username,
        post_limit: res?.results?.object?.post_limit,
      });
    }).catch((err) => {
      console.log("err get user: ", err);
    });
  }, []);

  return (
    <>
      <div className={classNames('flex item-center py-11 px-2 justify-center h-full')}>
        <div className={classNames('flex flex-col gap-7 p-8 border border-darkNight100 h-fit rounded-lg w-1/2')}>
          <div>
            <div className={classNames('flex justify-between py-[20px] border-b border-darkNight100')}>
              <BaseText locale bold className={classNames('text-darkNight900')}>
                User name
              </BaseText>
              <BaseText medium className={classNames('text-darkNight900')}>
                {dataUser?.nickname}
              </BaseText>
            </div>
            <div className={classNames('flex justify-between py-[20px] border-b border-darkNight100')}>
              <BaseText locale bold className={classNames('text-darkNight900')}>
                ID Account
              </BaseText>
              <BaseText medium className={classNames('text-darkNight900')}>
                {dataUser?.username}
              </BaseText>
            </div>
            <div className={classNames('flex justify-between py-[20px] border-b border-darkNight100')}>
              <BaseText locale bold className={classNames('text-darkNight900')}>
                User Type
              </BaseText>
              <BaseText medium className={classNames('text-darkNight900')}>
                {checkAccountType(dataUser?.account_type).type}
              </BaseText>
            </div>
            <div className={classNames('flex justify-between py-[20px] border-b border-darkNight100')}>
              <BaseText locale bold className={classNames('text-darkNight900')}>
                Shop registration
              </BaseText>
              <BaseText medium className={classNames('text-darkNight900')}>
                {dataUser?.current_active_post}
              </BaseText>
            </div>
            <div className={classNames('flex justify-between py-[20px] border-b border-darkNight100')}>
              <BaseText locale bold className={classNames('text-darkNight900')}>
                Payment information
              </BaseText>
              <BaseText medium className={classNames('text-darkNight900')}>
                {memoValue}
              </BaseText>
            </div>
          </div>
          <div className={classNames('flex flex-col gap-3')}>
            <CustomButton
              locale
              bold
              onClick={handleOpenModalChangePassword}
              icon={<img src={Images.padlock} className={classNames('w-6 h-6')} />}
              className="py-6 text-dayBreakBlue500 border-dayBreakBlue500"
              children="Change password"
            />
            <CustomButton
              locale
              bold
              onClick={handleOpenModalEditInfo}
              icon={<img src={Images.editPencil} className={classNames('w-6 h-6')} />}
              // className="py-6 border-none text-dayBreakBlue500 bg-dayBreakBlue50 hover:bg-dayBreakBlue500 hover:text-white"
              className="py-6 border-none text-dayBreakBlue500 bg-dayBreakBlue50"
              children="Edit information"
            />
          </div>
        </div>
      </div>
      <BaseModal
        isOpen={openModalEditInfo}
        onClose={handleCloseModalEditInfo}
        onSubmit={handleEditInfo}
        title="Edit Information"
        disableSubmitBtn={!isFormDataValid()}
      >
        <div className={classNames(" flex flex-col gap-5")}>
          <BaseInputSelect
            title="User Type"
            required
            defaultValue={formDataEditInfo?.account_type}
            value={formDataEditInfo?.account_type}
            onChange={(value) => handleInputChange("account_type", value)}
            placeholder="Select"
            options={(ListTypeUser || []).slice(0, 3).map((item) => ({
              value: item.id,
              label: t(item.name),
            }))}
            disabled={formDataEditInfo?.account_type === 'ADMIN'}
          />
          <BaseInputSelect
            title="Group"
            required
            defaultValue={formDataEditInfo?.group_id}
            value={formDataEditInfo?.group_id}
            onChange={(value) => handleInputChange("group_id", value)}
            placeholder="Select a group"
            options={(listUserGroup || []).map((item) => ({
              value: item.id,
              label: item.name,
            }))}
            disabled={formDataEditInfo?.account_type === 'ADMIN'}
          />
          <BaseInput
            title="Nickname"
            required
            value={formDataEditInfo.nickname}
            onChange={(value) => handleInputChange("nickname", value)}
            placeholder="Nickname"
          />
          <BaseInput
            title="ID account"
            required
            value={formDataEditInfo.username}
            onChange={(value) => handleInputChange("username", value)}
            placeholder="Id account"
            disabled
          />
          <CustomButton
            locale
            bold
            onClick={handleOpenModalChangePassword}
            icon={<img src={Images.padlock} className={classNames('w-6 h-6')} />}
            className="py-6 text-dayBreakBlue500 border-dayBreakBlue500"
            children="Change password"
          />
          <div>
            <div className="flex justify-between mb-4">
              <BaseText locale bold className={classNames('text-darkNight900')}>
                Number of stores that can be registered
              </BaseText>
              <Switch
                value={isChecked}
                onChange={(value) => setIsChecked(value)}
                className="bg-darkNight200"
                autoFocus
              />
            </div>


            <div className="flex justify-between w-full px-2 py-3 rounded-lg bg-darkNight50">
              <img src={Images.minusCircle}
                onClick={isChecked ? () => setFormDataEditInfo({ ...formDataEditInfo, post_limit: formDataEditInfo.post_limit === 0 ? 0 : formDataEditInfo.post_limit - 1 }) : () => { }}
                className="w-6 h-6 cursor-pointer"
              />
              <BaseText locale medium size={18} className={classNames('text-darkNight900')}>
                {formDataEditInfo.post_limit}
              </BaseText>
              <img src={Images.plusCircle}
                onClick={isChecked ? () => setFormDataEditInfo({ ...formDataEditInfo, post_limit: formDataEditInfo.post_limit + 1 }) : () => { }}
                className="w-6 h-6 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <BaseText locale bold className={classNames('text-darkNight900')}>
                Memo
              </BaseText>
              <div className="flex items-center justify-center gap-1 border-b cursor-pointer border-dayBreakBlue500" onClick={props?.onShowHistoryPayment}>
                <EyeOutlined
                  className="justify-center w-5 h-5 text-dayBreakBlue500"
                />
                <BaseText locale bold className={'text-dayBreakBlue500'}>
                  View
                </BaseText>
              </div>
            </div>
            <div className="flex gap-2">
              <BaseInput
                required
                value={memoValue}
                onChange={(value) => setMemoValue(value)}
                placeholder="Payment information"
                className="w-full"
              />
              <CustomButton
                locale
                bold
                onClick={handleUpdateMemo}
                className="py-6 border-none text-dayBreakBlue500 bg-dayBreakBlue50 hover:bg-dayBreakBlue500 hover:text-white"
                children="Save"
              />
            </div>
          </div>
        </div>
      </BaseModal>

      <BaseModal
        isOpen={openModalChangePassword}
        onClose={handleCloseModalChangePassword}
        onSubmit={handleChangePassword}
        title="Change password"
        disableSubmitBtn={!changePasswordValue}
      >
        <div className={classNames("flex flex-col gap-5")}>
          <BaseInput
            title="Enter New Password"
            required
            value={changePasswordValue}
            onChange={(value) => setChangePasswordValue(value)}
            placeholder="Enter New Password"
            type={isShowPassword ? "text" : "password"}
            iconRight={
              <img
                src={isShowPassword ? Images.eyeCross : Images.eye}
                className={classNames("w-6 h-6 cursor-pointer")}
                onClick={() => setIsShowPassword(!isShowPassword)}
              />
            }
          />
        </div>
      </BaseModal>
    </>
  )
};