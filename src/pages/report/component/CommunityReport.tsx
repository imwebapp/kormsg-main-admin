import { useTranslation } from "react-i18next";
import { BaseText, CustomButton } from "../../../components";
import { classNames } from "../../../utils/common";
import { useState } from "react";
import { REPORT } from "../../../utils/constants";

export default function CommunityReport() {
  const { t } = useTranslation();
  const [selectedButton, setSelectedButton] = useState(REPORT.REPORT_LIST);

  const getButtonStyle = (buttonKey: any) => {
    const isSelected = buttonKey === selectedButton;
    return {
      backgroundColor: isSelected ? "black" : "white",
      color: isSelected ? "white" : "black",
    };
  };
  const getTextColor = (buttonStatus: any) => {
    return buttonStatus === selectedButton ? "white" : "black";
  };
  const listButton = () => {
    const buttonData = [
      {
        status: REPORT.REPORT_LIST,
        label: t("Report list"),
        count: 24,
      },
      {
        status: REPORT.AUTO_DELETED_LIST,
        label: t("Auto-deleted list"),
        count: 32,
      },
    ];

    const handleButtonClick = (buttonName: REPORT) => {
      setSelectedButton(buttonName);
    };

    return (
      <div className="flex flex-row gap-4 ">
        {buttonData.map(({ status, label, count }) => (
          <CustomButton
            key={status}
            className="text-base h-11 font-medium rounded-full px-4"
            style={getButtonStyle(status)}
            onClick={() => handleButtonClick(status)}
          >
            <BaseText color={getTextColor(status)} size={16}>
              {label} ({count})
            </BaseText>
          </CustomButton>
        ))}
      </div>
    );
  };

  const headerTable = () => {
    return (
      <div className="flex flex-row justify-between">
        {listButton()}
        <div className="flex bg-blue-50 h-11 flex-row items-center gap-x-3 border border-blue-500 rounded-full">
          <BaseText locale medium size={16} className="text-blue-500 ml-3">
            Set automatic deletion count
          </BaseText>
          <div className="w-11 h-11 rounded-full bg-blue-500 flex justify-center items-center ">
            <BaseText bold className="text-white" size={18}>
              3
            </BaseText>
          </div>
        </div>
      </div>
    );
  };
  return <div className="p-4 py-0">{headerTable()}</div>;
}
