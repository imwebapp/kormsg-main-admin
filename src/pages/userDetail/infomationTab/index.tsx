
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/common";
import { BaseText, CustomButton } from "../../../components";
import Images from "../../../assets/gen";
import { BaseModal } from "../../../components/modal/BaseModal";
import { BaseInput } from "../../../components/input/BaseInput";
import { BaseInputSelect } from "../../../components/input/BaseInputSelect";
import { useState } from "react";
import { Switch } from "antd";
import { EyeOutlined } from "@ant-design/icons";
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

interface Iprops {
  dataUser: {
    id: string,
    avatar: string,
    fullName: string,
    email: string,
    phone: string,
    address: string,
    birthday: string,
    type: string,
    groupName: string,
    countShop: number,
    paymentInfo: string
  };
}

export const InformationTab = (prop: Iprops) => {
  const { dataUser } = prop;
  const navigate = useNavigate();
  const [openModalEditInfo, setOpenModalEditInfo] = useState(false);
  const [showMemo, setShowMemo] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formDataEditInfo, setFormDataEditInfo] = useState({
    userGroup: "",
    nickname: "",
    userId: "",
    countShop: 0,
    memo: "",
  });
  const handleInputChange = (name: string, value: any) => {
    setFormDataEditInfo({ ...formDataEditInfo, [name]: value });
  };

  //edit info
  const handleOpenModalEditInfo = () => {
    setOpenModalEditInfo(true);
  };

  const handleCloseModalEditInfo = () => {
    setOpenModalEditInfo(false);
  };

  const isFormDataValid = () => {
    for (const key in formDataEditInfo) {
      if (
        !formDataEditInfo[key as keyof typeof formDataEditInfo]
      ) {
        return false;
      }
    }
    return true;
  };

  const handleEditInfo = () => {
    if (isFormDataValid()) {
      console.log("FormData is valid. Submitting...", formDataEditInfo);
      setOpenModalEditInfo(false);
      setFormDataEditInfo({
        userGroup: "",
        nickname: "",
        userId: "",
        countShop: 0,
        memo: "",
      });
    } else {
      console.log("FormData is not valid. Please fill all fields.");
    }
  };

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
                {dataUser.fullName}
              </BaseText>
            </div>
            <div className={classNames('flex justify-between py-[20px] border-b border-darkNight100')}>
              <BaseText locale bold className={classNames('text-darkNight900')}>
                ID Account
              </BaseText>
              <BaseText medium className={classNames('text-darkNight900')}>
                {dataUser.email}
              </BaseText>
            </div>
            <div className={classNames('flex justify-between py-[20px] border-b border-darkNight100')}>
              <BaseText locale bold className={classNames('text-darkNight900')}>
                User Type
              </BaseText>
              <BaseText medium className={classNames('text-darkNight900')}>
                {dataUser.type}
              </BaseText>
            </div>
            <div className={classNames('flex justify-between py-[20px] border-b border-darkNight100')}>
              <BaseText locale bold className={classNames('text-darkNight900')}>
                Shop registration
              </BaseText>
              <BaseText medium className={classNames('text-darkNight900')}>
                {dataUser.countShop}
              </BaseText>
            </div>
            <div className={classNames('flex justify-between py-[20px] border-b border-darkNight100')}>
              <BaseText locale bold className={classNames('text-darkNight900')}>
                Payment information
              </BaseText>
              <BaseText medium className={classNames('text-darkNight900')}>
                {dataUser.paymentInfo}
              </BaseText>
            </div>
          </div>
          <div className={classNames('flex flex-col gap-3')}>
            <CustomButton
              locale
              bold
              onClick={() => console.log('Change password')}
              icon={<img src={Images.padlock} className={classNames('w-6 h-6')} />}
              className="text-dayBreakBlue500 border-dayBreakBlue500"
              children="Change password"
            />
            <CustomButton
              locale
              bold
              onClick={handleOpenModalEditInfo}
              icon={<img src={Images.editPencil} className={classNames('w-6 h-6')} />}
              className="border-none text-dayBreakBlue500 bg-dayBreakBlue50 hover:bg-dayBreakBlue500 hover:text-white"
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
            title="Group"
            required
            value={formDataEditInfo.userGroup}
            onChange={(value) => handleInputChange("userGroup", value)}
            placeholder="Select a group"
            options={(listUserGroup || []).map((item) => ({
              value: item.id,
              label: item.name,
            }))}
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
            value={formDataEditInfo.userId}
            onChange={(value) => handleInputChange("userId", value)}
            placeholder="Id account"
          />
          <CustomButton
            locale
            bold
            onClick={() => console.log('Change password')}
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
                onClick={isChecked ? () => setFormDataEditInfo({ ...formDataEditInfo, countShop: formDataEditInfo.countShop === 0 ? 0 : formDataEditInfo.countShop - 1 }) : () => { }}
                className="w-6 h-6 cursor-pointer"
              />
              <BaseText locale medium size={18} className={classNames('text-darkNight900')}>
                {formDataEditInfo.countShop}
              </BaseText>
              <img src={Images.plusCircle}
                onClick={isChecked ? () => setFormDataEditInfo({ ...formDataEditInfo, countShop: formDataEditInfo.countShop + 1 }) : () => { }}
                className="w-6 h-6 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <BaseText locale bold className={classNames('text-darkNight900')}>
                Memo
              </BaseText>
              <div className="flex items-center justify-center gap-1 border-b cursor-pointer border-dayBreakBlue500" onClick={() => setShowMemo(!showMemo)}>
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
                value={formDataEditInfo.memo}
                onChange={(value) => handleInputChange("memo", value)}
                placeholder="Id account"
                className="w-full"
                type={showMemo ? "text" : "password"}
              />
              <CustomButton
                locale
                bold
                onClick={() => console.log('save')}
                className="py-6 border-none text-dayBreakBlue500 bg-dayBreakBlue50 hover:bg-dayBreakBlue500 hover:text-white"
                children="Save"
              />
            </div>
          </div>
        </div>
      </BaseModal>
    </>
  )
};