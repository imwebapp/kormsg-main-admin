
import { useNavigate } from "react-router-dom";
import { User, classNames } from "../../../utils/common";
import { BaseText } from "../../../components";
import { useEffect, useState } from "react";
import { ItemShop } from "./components";
import { useTranslation } from "react-i18next";

const ListTabBar = [
  {
    title: "Announcement Store",
    value: "Announcement Store",
    data: [],
    count: 0,
  },
  {
    title: "Store under review",
    value: "Store under review",
    data: [],
    count: 0,
  },
  {
    title: "Stores that refuse review",
    value: "Stores that refuse review",
    data: [],
    count: 0,
  },
  {
    title: "Expired store",
    value: "Expired store",
    data: [],
    count: 0,

  },
  {
    title: "Recommended store",
    value: "Recommended store",
    data: [],
    count: 0,
  },
  {
    title: "During the event",
    value: "During the event",
    data: [],
    count: 0,
  },
];

interface IProps {
  dataUser: User;
}

export const ShopInformationTab = (props: IProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { dataUser } = props;
  console.log('dataUser ShopInformationTab', dataUser);
  const [tabSelected, setTabSelected] = useState<{
    title: string;
    value: string;
    data: {
      id: string;
      avatar: string;
      name: string;
      timeStart: string;
      timeEnd: string;
      hashtag: string[];
    }[];
    count: number;
  }>(ListTabBar[0]);
  const checkCount = (type: string) => {
    switch (type) {
      case "Announcement Store":
        return dataUser.current_active_post;
      case "Store under review":
        return dataUser.current_pending_post;
      case "Stores that refuse review":
        return dataUser.current_rejected_post;
      case "Expired store":
        return dataUser.current_expired_post;
      case "Recommended store":
        return dataUser.current_recommendation_post;
      case "During the event":
        return dataUser.current_active_post;
      default:
        return 0;
    }
  };

  useEffect(() => {

  }, [])

  return (
    <>
      <div className="flex w-full">
        {ListTabBar.map((item, index) => {
          return (
            <div onClick={() => setTabSelected(item)} key={index} className={"flex w-1/6 items-center justify-center pt-6 cursor-pointer border-b"}>
              <div className="flex flex-col gap-4 ">
                <div className="flex items-center justify-center gap-2 ">
                  <BaseText locale size={16} bold color={classNames(tabSelected.value !== item.value ? "text-darkNight500" : "")}>{t(item.title)}</BaseText>
                  <BaseText bold className="px-1 text-white bg-darkNight900 rounded-[4px]">{checkCount(item.value)}</BaseText>
                </div>
                {tabSelected.value === item.value ? <div className="w-full h-1 bg-dayBreakBlue500 rounded-t-xl" /> : <div className="w-full h-1" />}
              </div>
            </div>
          )
        })}
      </div>
      <div className="max-h-full overflow-y-auto">
        <div className="grid grid-cols-3 gap-4 p-6">
          {
            tabSelected.data.map((item, index) => (
              <ItemShop key={index} {...item} onClick={(id) => console.log(id)} className="" />
            ))
          }
        </div>
      </div>
    </>
  )
};