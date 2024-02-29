import { useNavigate } from "react-router-dom";
import { classNames } from "../../utils/common";
import Images from "../../assets/gen";
import { BaseText } from "../../components";
import { useState } from "react";
import { InformationTab } from "./infomationTab";
import { HistoryPaymentTab } from "./historyPaymentTab";

const formDataCreateUser = {
  id: "123456",
  avatar: Images.avatarEmpty,
  fullName: "Lesungwwoo",
  email: "abcxyz1223.naver.abcxyz1",
  phone: "0123456789",
  address: "Hà Nội",
  birthday: "01/01/1990",
  type: "Biz",
  groupName: "Group A",
  countShop: 5,
  paymentInfo: "이채원/60/6개1달연장/서비스 + 1주일",
};

const listOption = [
  {
    title: "Information",
    value: "information",
  },
  {
    title: "Shop information",
    value: "shopInformation",
  },
  {
    title: "History Payment",
    value: "historyPayment",
  },
];

const UserDetail = () => {
  const navigate = useNavigate();
  const [optionSelected, setOptionSelected] = useState("information");

  const handleClickOption = (item: { title: string; value: string }) => {
    console.log(item);
    setOptionSelected(item.value);
  };
  return (
    <>
      <div
        className={classNames("flex overflow-hidden")}
        style={{ height: "calc(100vh - 71px)" }}
      >
        <div className={classNames("w-1/5 border-r border-darkNight100")}>
          <div
            className={classNames(
              "flex flex-col gap-2 border-b border-darkNight100 p-6"
            )}
          >
            <img
              src={formDataCreateUser.avatar || Images.avatarEmpty}
              className={classNames("w-11 h-11 rounded-full")}
              alt="Avatar"
            />

            <div className={classNames("flex flex-row items-center gap-3")}>
              <BaseText
                bold
                size={28}
                className={classNames("text-darkNight900")}
              >
                {formDataCreateUser.fullName}
              </BaseText>
              <img
                src={Images.icon18}
                className={classNames("w-6 h-6 rounded-full")}
                alt="Icon 18+"
              />
            </div>
            <BaseText size={16} className={classNames("text-darkNight900")}>
              {formDataCreateUser.email}
            </BaseText>
            <div className={classNames("flex flex-row items-center gap-1")}>
              <BaseText
                bold
                className={classNames(
                  "text-purple flex px-4 py-2 items-center bg-goldenPurple50"
                )}
              >
                {formDataCreateUser.type}
              </BaseText>
              <BaseText
                medium
                className={classNames(
                  "text-darkNight900 flex px-4 py-2 items-center bg-darkNight50"
                )}
              >
                {formDataCreateUser.groupName}
              </BaseText>
            </div>
          </div>
          {listOption.map((item: { title: string; value: string }, index) => {
            const checkSelected =
              optionSelected && optionSelected === item.value;
            return (
              <div
                className={classNames(
                  "flex items-center gap-1 px-6 py-3 mb-2 cursor-pointer border-l-2 ",
                  checkSelected
                    ? " bg-dayBreakBlue50 border-l-2 border-dayBreakBlue500"
                    : ""
                )}
                onClick={() => handleClickOption(item)}
              >
                <BaseText
                  medium
                  locale
                  size={16}
                  className={classNames(
                    checkSelected ? "text-dayBreakBlue500" : "text-darkNight500"
                  )}
                >
                  {item.title}
                </BaseText>
              </div>
            );
          })}
        </div>
        <div
          className={classNames("w-4/5 flex flex-col gap-6")}
          style={{ height: "calc(100vh - 71px)" }}
        >
          {optionSelected === "information" ? (
            <InformationTab dataUser={formDataCreateUser} />
          ) : null}
          {optionSelected === "shopInformation" ? (
            <div className={classNames("flex flex-col gap-6")}>
              <BaseText
                bold
                size={24}
                className={classNames("text-darkNight900")}
              >
                Shop information
              </BaseText>
            </div>
          ) : null}
          {optionSelected === "historyPayment" ? <HistoryPaymentTab /> : null}
        </div>
      </div>
    </>
  );
};

export default UserDetail;
