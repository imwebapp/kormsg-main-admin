import { useLocation, useNavigate } from "react-router-dom";
import { checkAccountType, classNames } from "../../utils/common";
import Images from "../../assets/gen";
import { BaseText, CustomButton } from "../../components";
import { useState } from "react";
import {
  INIT_TAB_USER_DETAIL,
  ListTypeUserActivity,
  TypeUserActivity,
  listOptionUserDetail,
} from "../../utils/constants";
import { BaseInput } from "../../components/input/BaseInput";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { CommunityPost } from "./communityPost";
import { PointDetail } from "./pointDetail";
import { Comment } from "./comment";
import UserChat from "./userChat";

interface IProps {
  route?: any;
  navigation?: any;
}

type ITypeUser = {
  id: string;
  name: string;
};

const UserActivity = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const formDataCreateUser = location?.state?.data;
  const initTab = location?.state?.initTab || INIT_TAB_USER_DETAIL.INFORMATION;
  const isShowModalEdit = location?.state?.showModalEdit || false;
  const [optionSelected, setOptionSelected] = useState(initTab);
  const [showModalEdit, setShowModalEdit] = useState(isShowModalEdit);

  console.log("formDataCreateUserXX", showModalEdit);

  const [typeUserSelected, setTypeUserSelected] = useState<ITypeUser>(
    ListTypeUserActivity[0]
  );
  const handleClickTypeUser = (item: any) => {
    setTypeUserSelected(item);
  };

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
    } else {
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
        <div
          className={classNames("w-full p-6 flex flex-col gap-6 overflow-auto")}
        >
          <div className={classNames("flex flex-row gap-3 items-center")}>
            {ListTypeUserActivity.map((item, index) => {
              let count = 0;
              // switch (item.id) {
              //   case TypeUser.ADMIN:
              //     count = countTypeUser.countAdmin;
              //     break;
              //   case TypeUser.BIZ_USER:
              //     count = countTypeUser.countBizUser;
              //     break;
              //   case TypeUser.FREE_USER:
              //     count = countTypeUser.countFreeUser;
              //     break;
              //   case TypeUser.PAID_USER:
              //     count = countTypeUser.countPaidUser;
              //     break;
              //   case "ALL":
              //     if (groupSelected.id === 1)
              //       count = countTypeUser.totalUser;
              //     else {
              //       count = countTypeUser.countBizUser + countTypeUser.countFreeUser + countTypeUser.countPaidUser;
              //     }
              //     break;
              //   default:
              //     break;
              // }
              // if (item.id === TypeUser.ADMIN && groupSelected.id !== 1) return null;

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
                  {" (" + count + ")"}
                </CustomButton>
              );
            })}
          </div>
          {typeUserSelected.id === TypeUserActivity.COMMUNITY_POST ? (
            <CommunityPost dataUser={formDataCreateUser} />
          ) : typeUserSelected.id === TypeUserActivity.COMMENT ? (
            <Comment dataUser={formDataCreateUser} />
          ) : typeUserSelected.id === TypeUserActivity.RESERVATION ? (
            <BaseText size={20} bold>
              RESERVATION
            </BaseText>
          ) : typeUserSelected.id === TypeUserActivity.POINT_DETAIL ? (
            <PointDetail dataUser={formDataCreateUser} />
          ) : (
            <UserChat />
          )}
        </div>
      </div>
    </>
  );
};

export default UserActivity;
