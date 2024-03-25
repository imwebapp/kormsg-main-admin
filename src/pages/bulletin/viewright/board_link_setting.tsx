import { Switch } from "antd";
import { BaseText, CustomButton } from "../../../components";
import Images from "../../../assets/gen";
import { BaseInput } from "../../../components/input/BaseInput";
import { useState } from "react";
import { BOARD, BOARD_TEXT } from "../../../utils/constants";
import { classNames } from "../../../utils/common";
import { BaseInputSelect } from "../../../components/input/BaseInputSelect";
import { BaseModal } from "../../../components/modal/BaseModal";
import ThemaTable from "./thema_table";

export default function BulletinSetting() {
  const [isShowBoardType, setShowBoardType] = useState(true);
  const [openModalThema, setOpenModalThema] = useState(false);
  const [boardTypeSelected, setBoardTypeSelected] = useState<string>("");
  return (
    <div className="flex flex-col">
      <BaseText locale bold size={16} className="mb-4">
        Things
      </BaseText>
      <BaseText locale medium className="mb-4">
        Adult certification
      </BaseText>
      <div className="flex flex-row justify-between">
        <BaseText locale medium className="mb-4">
          Adult verification status
        </BaseText>
        <Switch defaultChecked />
      </div>
      <div className="h-[1px] bg-darkNight100"></div>
      <div className="flex flex-row justify-between mt-4">
        <BaseText locale medium className="mb-4">
          Whether profile features are exposed?
        </BaseText>
        <Switch defaultChecked />
      </div>
      <div className="h-[1px] bg-darkNight100"></div>
      <BaseText locale medium className="mt-4">
        SREEN
      </BaseText>
      <div className="flex flex-row justify-between items-center mt-4">
        <BaseText locale medium>
          Image
        </BaseText>
        <div className="flex flex-row bg-dayBreakBlue50 justify-between items-center rounded-md p-2 cursor-pointer">
          <img src={Images.upload} className="w-5 h-5 mr-2" />
          <BaseText locale bold className="text-dayBreakBlue500">
            Upload
          </BaseText>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center mt-[10px]">
        <img
          src="https://vcdn1-ngoisao.vnecdn.net/2020/12/02/Ngoc-Trinh-4-8143-1606887703.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=KpBRxgyI6gGuvV-8RpwSNg"
          alt=""
          className="w-[100px] h-[100px] object-cover rounded-xl"
        />
      </div>
      <div className="flex flex-row justify-between items-center mt-4">
        <BaseText locale medium>
          Board Name
        </BaseText>
        <BaseInput
          styleInputContainer="h-9"
          onChange={() => {}}
          value=""
          placeholder="Typing...."
          className="w-[170px]"
        />
      </div>
      <div className="flex flex-row justify-between items-center mt-4">
        <BaseText locale medium>
          Board Type
        </BaseText>
        <img
          onClick={() => setShowBoardType(!isShowBoardType)}
          src={isShowBoardType ? Images.chevronUpTiny : Images.chevronDownTiny}
          width={24}
          className="cursor-pointer"
        />
      </div>
      {isShowBoardType && (
        <div className="flex flex-wrap gap-[10px] mt-4">
          {Object.keys(BOARD).map((item, index) => {
            return (
              <div
                onClick={() => setBoardTypeSelected(item)}
                key={index}
                className={classNames(
                  "w-20 h-20  rounded-xl flex justify-center items-center flex-col cursor-pointer",
                  boardTypeSelected === item
                    ? "bg-dayBreakBlue50"
                    : "bg-darkNight50"
                )}
              >
                <img
                  src={
                    boardTypeSelected === item ? Images.board2 : Images.board
                  }
                  className="w-6 h-6 mb-1"
                />
                <BaseText
                  locale
                  medium
                  size={10}
                  className={classNames(
                    boardTypeSelected === item
                      ? "text-dayBreakBlue500"
                      : "text-darkNight500",
                    "text-center"
                  )}
                >
                  {BOARD_TEXT[item]}
                </BaseText>
              </div>
            );
          })}
        </div>
      )}
      <div className="flex flex-row justify-between items-center mt-4">
        <BaseText locale medium className="flex-1 mr-3">
          Thema
        </BaseText>
        <BaseInputSelect
          multiple
          className="!min-w-[100px]"
          onChange={() => {}}
          required={true}
          allowClear={false}
          size="middle"
          textInputSize={12}
          value="1"
          options={[
            {
              value: "1",
              label: "1",
            },
            {
              value: "2",
              label: "2",
            },
            {
              value: "3",
              label: "3",
            },
            {
              value: "4",
              label: "4",
            },
            {
              value: "5",
              label: "5",
            },
          ]}
        />
        <img
          onClick={() => setOpenModalThema(true)}
          src={Images.setting3}
          className="w-[36px] ml-3 cursor-pointer"
        />
      </div>
      <div className="flex flex-row justify-between items-center mt-4">
        <BaseText locale medium>
          Map Brand
        </BaseText>
        <BaseInputSelect
          onChange={() => {}}
          required={true}
          allowClear={false}
          size="middle"
          textInputSize={12}
          value="Naver Map"
          options={[
            {
              value: "Naver Map",
              label: "Naver Map",
            },
            {
              value: "Google Map",
              label: "Google Map",
            },
          ]}
        />
      </div>
      <div className="h-[1px] bg-darkNight100 my-4"></div>
      <BaseText locale medium>
        Setting permissions
      </BaseText>
      <div className="flex flex-row justify-between items-center mt-4">
        <BaseText locale medium>
          View
        </BaseText>
        <BaseInputSelect
          onChange={() => {}}
          required={true}
          allowClear={false}
          size="middle"
          textInputSize={12}
          value="Naver Map"
          options={[
            {
              value: "Naver Map",
              label: "Naver Map",
            },
            {
              value: "Google Map",
              label: "Google Map",
            },
          ]}
        />
      </div>
      <div className="h-[1px] bg-darkNight100 my-4"></div>
      <BaseText locale medium>
        Setting permissions
      </BaseText>
      <div className="flex flex-row justify-between items-center mt-4">
        <BaseText locale medium className="flex-1">
          Writing
        </BaseText>
        <BaseInputSelect
          onChange={() => {}}
          required={true}
          allowClear={false}
          size="middle"
          textInputSize={12}
          value="모든 사용자"
          options={[
            {
              value: "모든 사용자",
              label: "모든 사용자",
            },
            {
              value: "로그인 사용자",
              label: "로그인 사용자",
            },
            {
              value: "회원그룹 선택",
              label: "회원그룹 선택",
            },
          ]}
        />
        <BaseInputSelect
          className="ml-3"
          onChange={() => {}}
          required={true}
          allowClear={false}
          size="middle"
          textInputSize={12}
          value="1"
          options={[
            {
              value: "1",
              label: <img src={Images.android} className="w-5" />,
            },
            {
              value: "2",
              label: <img src={Images.iphone} className="w-5" />,
            },
          ]}
        />
      </div>
      <div className="flex flex-row justify-between mt-4">
        <BaseText locale medium className="">
          Whether to be reviewed by administrator when uploading writing
        </BaseText>
        <Switch defaultChecked />
      </div>
      <div className="h-[1px] bg-darkNight100 my-4"></div>
      <div className="flex flex-row justify-between items-center">
        <BaseText locale medium>
          Comments
        </BaseText>
        <BaseInputSelect
          onChange={() => {}}
          required={true}
          allowClear={false}
          size="middle"
          textInputSize={12}
          value="모든 사용자"
          options={[
            {
              value: "모든 사용자",
              label: "모든 사용자",
            },
            {
              value: "로그인 사용자",
              label: "로그인 사용자",
            },
            {
              value: "회원그룹 선택",
              label: "회원그룹 선택",
            },
          ]}
        />
      </div>
      <div className="h-[1px] bg-darkNight100 my-4"></div>
      <div className="flex flex-row justify-between items-center">
        <BaseText locale medium>
          Member ID exposure method
        </BaseText>
        <BaseInputSelect
          onChange={() => {}}
          required={true}
          allowClear={false}
          size="middle"
          textInputSize={12}
          value="닉네임"
          options={[
            {
              value: "닉네임",
              label: "닉네임",
            },
            {
              value: "닉네임(일부*로 표시)",
              label: "닉네임(일부*로 표시)",
            },
            {
              value: "ID",
              label: "ID",
            },
            {
              value: "ID(일부*로 표시)",
              label: "ID(일부*로 표시)",
            },
          ]}
        />
      </div>
      <div className="h-[1px] bg-darkNight100 my-4"></div>
      <div className="flex flex-row justify-between">
        <BaseText locale medium className="">
          Product reviews
        </BaseText>
        <Switch defaultChecked />
      </div>
      <div className="flex flex-row justify-between items-center mt-4">
        <BaseText locale medium>
          Who can?
        </BaseText>
        <BaseInputSelect
          onChange={() => {}}
          required={true}
          allowClear={false}
          size="middle"
          textInputSize={12}
          value="모든 사용자"
          options={[
            {
              value: "모든 사용자",
              label: "모든 사용자",
            },
            {
              value: "로그인 사용자",
              label: "로그인 사용자",
            },
            {
              value: "회원그룹 선택",
              label: "회원그룹 선택",
            },
          ]}
        />
      </div>
      <div className="flex flex-row justify-between items-center mt-4">
        <BaseText locale medium>
          Tags
        </BaseText>
      </div>
      <div className="flex flex-wrap gap-3">
        {["Thaimassage", "Thaimassage home", "Thaimassage home", "home"].map(
          (item, index) => {
            return (
              <div
                key={index}
                className="px-3 py-2 bg-darkNight50 rounded-full"
              >
                <BaseText size={12} medium>
                  {item}
                </BaseText>
              </div>
            );
          }
        )}
      </div>
      <CustomButton
        className="mt-5 bg-dustRed50 border-none"
        classNameTitle="text-dustRed500"
        medium
        locale
      >
        Delete Main
      </CustomButton>

      <BaseModal
        isOpen={openModalThema}
        onClose={() => {
          setOpenModalThema(false);
        }}
        title="Thema Management"
        isHideAction
        children={<ThemaTable />}
      ></BaseModal>
    </div>
  );
}
