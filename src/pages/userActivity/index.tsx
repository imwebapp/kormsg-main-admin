import { useLocation, useNavigate } from "react-router-dom";
import { classNames } from "../../utils/common";
import { BaseText, CustomButton } from "../../components";
import { useEffect, useState } from "react";
import {
  INIT_TAB_USER_DETAIL,
  ListTypeUserActivity,
  TypeUserActivity,
} from "../../utils/constants";
import { BaseInput } from "../../components/input/BaseInput";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { CommunityPost } from "./communityPost";
import { PointDetail } from "./pointDetail";
import { Comment } from "./comment";
import UserChat from "./userChat";
import { userApi } from "../../apis/userApi";

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
  const [countUserActivity, setCountUserActivity] = useState<any>({
    countChat: 0,
    countPointHistory: 0,
    countPost: 0,
    countReservation: 0,
    countReview: 0,
  });
  console.log("formDataCreateUserXX", showModalEdit);

  const [typeUserSelected, setTypeUserSelected] = useState<ITypeUser>(
    ListTypeUserActivity[0]
  );
  const handleClickTypeUser = (item: any) => {
    setTypeUserSelected(item);
  };
  const getCountUserActivity = async () => {
    try {
      let result: any = await userApi.getCountUserActivity(
        formDataCreateUser?.id
      );
      setCountUserActivity(result);
    } catch (error) {}
  };
  useEffect(() => {
    getCountUserActivity();
  }, []);
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
              switch (item.id) {
                case TypeUserActivity.COMMUNITY_POST:
                  count = countUserActivity.countPost;
                  break;
                case TypeUserActivity.COMMENT:
                  count = countUserActivity.countReview;
                  break;
                case TypeUserActivity.RESERVATION:
                  count = countUserActivity.countReservation;
                  break;
                case TypeUserActivity.POINT_DETAIL:
                  count = countUserActivity.countPointHistory;
                  break;
                case TypeUserActivity.CHAT:
                  count = countUserActivity.countChat;
                  break;
                default:
                  break;
              }

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
            <UserChat dataUser={formDataCreateUser} />
          )}
        </div>
      </div>
    </>
  );
};

export default UserActivity;
