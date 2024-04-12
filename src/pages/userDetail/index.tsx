import { useLocation, useNavigate } from "react-router-dom";
import { checkAccountType, classNames } from "../../utils/common";
import Images from "../../assets/gen";
import { BaseText } from "../../components";
import { useState } from "react";
import { InformationTab } from "./infomationTab";
import { HistoryPaymentTab } from "./historyPaymentTab";
import { ShopInformationTab } from "./shopInformationTab";
import { INIT_TAB_USER_DETAIL, listOptionUserDetail } from "../../utils/constants";


interface Iprops {
  route?: any;
  navigation?: any;
}

const UserDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formDataCreateUser = location?.state?.data;
  const initTab = location?.state?.initTab || INIT_TAB_USER_DETAIL.INFORMATION;
  const isShowModalEdit = location?.state?.showModalEdit || false;
  const [optionSelected, setOptionSelected] = useState(initTab);
  const [showModalEdit, setShowModalEdit] = useState(isShowModalEdit);

  console.log("formDataCreateUserXX", showModalEdit);
  const checkGroup = (group: string) => {
    if (group === null || group === undefined || group === "") {
      return "All";
    } else {
      return group;
    }
  };

  const handleClickOption = (item: { title: string; value: string }) => {
    if (item.value === optionSelected) {
      return;
    }
    else {
      setShowModalEdit(false);
      setOptionSelected(item.value);
    }

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
              src={formDataCreateUser?.avatar || Images.avatarEmpty}
              className={classNames("w-11 h-11 rounded-full")}
              alt="Avatar"
            />

            <div className={classNames("flex flex-row items-center gap-3")}>
              <BaseText
                bold
                size={28}
                className={classNames("text-darkNight900")}
              >
                {formDataCreateUser?.nickname}
              </BaseText>
              <img
                src={Images.icon18}
                className={classNames("w-6 h-6 rounded-full")}
                alt="Icon 18+"
              />
            </div>
            <BaseText size={16} className={classNames("text-darkNight900")}>
              {formDataCreateUser?.username}
            </BaseText>
            <div className={classNames("flex flex-row items-center gap-1")}>
              <BaseText
                bold
                className={checkAccountType(formDataCreateUser?.account_type).CustomStyle}
              >
                {checkAccountType(formDataCreateUser?.account_type).type}
              </BaseText>
              <BaseText
                medium
                className={classNames(
                  "text-darkNight900 flex px-4 py-2 items-center bg-darkNight50 rounded-md"
                )}
              >
                {checkGroup(formDataCreateUser?.group)}
              </BaseText>
            </div>
          </div>
          {listOptionUserDetail.map((item: { title: string; value: string }, index) => {
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
          className={classNames("w-4/5 flex flex-col")}
          style={{ height: "calc(100vh - 71px)" }}
        >
          {optionSelected === "information" ? (
            <InformationTab dataUser={formDataCreateUser} showModalEdit={showModalEdit} onShowHistoryPayment={() => setOptionSelected(INIT_TAB_USER_DETAIL.HISTORY_PAYMENT)} />
          ) : null}
          {optionSelected === "shopInformation" ? (
            <ShopInformationTab dataUser={formDataCreateUser} />
          ) : null}
          {optionSelected === "historyPayment" ? <HistoryPaymentTab dataUser={formDataCreateUser} /> : null}
        </div>
      </div>
    </>
  );
};

export default UserDetail;
