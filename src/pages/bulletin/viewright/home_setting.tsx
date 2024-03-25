import { Switch } from "antd";
import { BaseText, CustomButton } from "../../../components";
import Images from "../../../assets/gen";
import { BaseInput } from "../../../components/input/BaseInput";
import { useState } from "react";
import { BOARD, BOARD_TEXT } from "../../../utils/constants";
import { classNames } from "../../../utils/common";
import { BaseInputSelect } from "../../../components/input/BaseInputSelect";

export default function HomeSetting() {
  const [isShowBoardType, setShowBoardType] = useState(true);
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
      <div className="flex flex-row justify-between mt-4">
        <BaseText locale bold className="mb-4">
          Banner
        </BaseText>
        <img src={Images.plus} className="w-6 h-6 cursor-pointer" />
      </div>
      <div className="flex flex-col">
        {[1, 2, 3, 4].map((item, index) => {
          return (
            <div key={index}>
              <div className="flex flex-row items-center justify-between">
                <BaseText medium>
                  <BaseText locale>Banner</BaseText> {index + 1}
                </BaseText>
                <div className="flex flex-row bg-dayBreakBlue50 justify-between items-center rounded-md p-2 cursor-pointer">
                  <img src={Images.upload} className="w-5 h-5 mr-2" />
                  <BaseText locale bold className="text-dayBreakBlue500">
                    Upload
                  </BaseText>
                </div>
              </div>
              <img
                src="https://cdn.diemnhangroup.com/seoulcenter/2022/12/eo-gai-dep-46.jpg"
                className="w-full h-[128px] mt-4 object-cover rounded-xl"
              />
              <div className="flex flex-row justify-between items-center mt-4">
                <BaseText locale medium>
                  Link to
                </BaseText>
                <BaseInput
                  styleInputContainer="h-9"
                  onChange={() => {}}
                  value=""
                  placeholder="Enter Link"
                  className="w-[170px]"
                />
              </div>
              <CustomButton
                className="my-4 bg-dustRed50 border-none w-full"
                classNameTitle="text-dustRed500"
                medium
                locale
              >
                Delete
              </CustomButton>
            </div>
          );
        })}
      </div>
      <div className="flex flex-row justify-between mt-4">
        <BaseText locale bold className="mb-4">
          NAVIGATION BAR
        </BaseText>
        <img src={Images.plus} className="w-6 h-6 cursor-pointer" />
      </div>
      <div>
        {[1, 2, 3, 4].map((item, index) => {
          return (
            <div key={index} className="flex flex-col">
              <div className="flex flex-row items-center">
                <BaseText medium className="w-[92px]">
                  <BaseText locale>Label</BaseText> {index + 1}
                </BaseText>
                <BaseInput
                  styleInputContainer="h-9"
                  onChange={() => {}}
                  value=""
                  placeholder="Enter Label"
                  className="flex-1 "
                />
              </div>
              <div className="flex flex-row mt-2">
                <div className="w-[92px]"></div>
                <BaseInputSelect
                  className="flex-1"
                  onChange={() => {}}
                  required={true}
                  allowClear={false}
                  size="middle"
                  textInputSize={12}
                  value="Home"
                  options={[
                    {
                      value: "Home",
                      label: "Home",
                    },
                    {
                      value: "Shop",
                      label: "Shop",
                    },
                    {
                      value: "Common",
                      label: "Common",
                    },
                    {
                      value: "Profile",
                      label: "Profile",
                    },
                  ]}
                />
              </div>
              <div className="flex flex-row mt-2">
                <div className="w-[92px]"></div>
                <div className="flex flex-row flex-1">
                  <div className="w-[86px] h-[86px] bg-darkNight50 rounded-xl flex flex-col justify-center items-center gap-1 cursor-pointer">
                    <img src={Images.upload} className="w-5 h-5" />
                    <BaseText size={12}>Inactive icon</BaseText>
                  </div>
                </div>
                <div className="flex flex-row flex-1 ml-2">
                  <div className="w-[86px] h-[86px] bg-darkNight50 rounded-xl flex flex-col justify-center items-center gap-1 cursor-pointer">
                    <img src={Images.upload} className="w-5 h-5" />
                    <BaseText size={12}>Active icon</BaseText>
                  </div>
                </div>
              </div>
              <CustomButton
                className="my-4 bg-dustRed50 border-none w-full"
                classNameTitle="text-dustRed500"
                medium
                locale
              >
                Delete
              </CustomButton>
            </div>
          );
        })}
      </div>
    </div>
  );
}
