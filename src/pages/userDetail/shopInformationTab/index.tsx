
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/common";
import { BaseText } from "../../../components";
import { useState } from "react";
import { ItemShop } from "./components";
import { useTranslation } from "react-i18next";

const ListTabBar = [
  {
    title: "Announcement Store",
    value: "Announcement Store",
    data: [
      {
        id: "11",
        avatar: "https://via.placeholder.com/150",
        name: "Shop Name11 Shop Time111 Shop Time111  Shop Time111  Shop Time111 ",
        timeStart: "12:00 PM",
        timeEnd: "04:00 AM",
        hashtag: ["#hashtag1", "#hashtag2", "#hashtag3"],
      },
      {
        id: "12",
        avatar: "https://via.placeholder.com/150",
        name: "Shop Name12",
        timeStart: "12:00 PM",
        timeEnd: "04:00 AM",
        hashtag: ["#hashtag1", "#hashtag2", "#hashtag3"],
      },
      {
        id: "13",
        avatar: "https://via.placeholder.com/150",
        name: "Shop Name13",
        timeStart: "12:00 PM",
        timeEnd: "04:00 AM",
        hashtag: ["#hashtag1", "#hashtag2", "#hashtag3"],
      },
      {
        id: "14",
        avatar: "https://via.placeholder.com/150",
        name: "Shop Name14",
        timeStart: "12:00 PM",
        timeEnd: "04:00 AM",
        hashtag: ["#hashtag1", "#hashtag2", "#hashtag3"],
      },
      {
        id: "15",
        avatar: "https://via.placeholder.com/150",
        name: "Shop Name15",
        timeStart: "12:00 PM",
        timeEnd: "04:00 AM",
        hashtag: ["#hashtag1", "#hashtag2", "#hashtag3"],
      },
    ],
  },
  {
    title: "Store under review",
    value: "Store under review",
    data: [
      {
        id: "11",
        avatar: "https://via.placeholder.com/150",
        name: "Shop Name11",
        timeStart: "12:00 PM",
        timeEnd: "04:00 AM",
        hashtag: ["#hashtag1", "#hashtag2", "#hashtag3"],
      },
      {
        id: "12",
        avatar: "https://via.placeholder.com/150",
        name: "Shop Name12",
        timeStart: "12:00 PM",
        timeEnd: "04:00 AM",
        hashtag: ["#hashtag1", "#hashtag2", "#hashtag3"],
      },
      {
        id: "13",
        avatar: "https://via.placeholder.com/150",
        name: "Shop Name13",
        timeStart: "12:00 PM",
        timeEnd: "04:00 AM",
        hashtag: ["#hashtag1", "#hashtag2", "#hashtag3"],
      },
    ],
  },
  {
    title: "Stores that refuse review",
    value: "Stores that refuse review",
    data: [
      {
        id: "11",
        avatar: "https://via.placeholder.com/150",
        name: "Shop Name11",
        timeStart: "12:00 PM",
        timeEnd: "04:00 AM",
        hashtag: ["#hashtag1", "#hashtag2", "#hashtag3"],
      },
      {
        id: "12",
        avatar: "https://via.placeholder.com/150",
        name: "Shop Name12",
        timeStart: "12:00 PM",
        timeEnd: "04:00 AM",
        hashtag: ["#hashtag1", "#hashtag2", "#hashtag3"],
      },
      {
        id: "13",
        avatar: "https://via.placeholder.com/150",
        name: "Shop Name13",
        timeStart: "12:00 PM",
        timeEnd: "04:00 AM",
        hashtag: ["#hashtag1", "#hashtag2", "#hashtag3"],
      },
      {
        id: "14",
        avatar: "https://via.placeholder.com/150",
        name: "Shop Name14",
        timeStart: "12:00 PM",
        timeEnd: "04:00 AM",
        hashtag: ["#hashtag1", "#hashtag2", "#hashtag3"],
      },
    ],
  },
  {
    title: "Expired store",
    value: "Expired store",
    data: [
      {
        id: "11",
        avatar: "https://via.placeholder.com/150",
        name: "Shop Name11",
        timeStart: "12:00 PM",
        timeEnd: "04:00 AM",
        hashtag: ["#hashtag1", "#hashtag2", "#hashtag3"],
      },
      {
        id: "12",
        avatar: "https://via.placeholder.com/150",
        name: "Shop Name12",
        timeStart: "12:00 PM",
        timeEnd: "04:00 AM",
        hashtag: ["#hashtag1", "#hashtag2", "#hashtag3"],
      },
      {
        id: "13",
        avatar: "https://via.placeholder.com/150",
        name: "Shop Name13",
        timeStart: "12:00 PM",
        timeEnd: "04:00 AM",
        hashtag: ["#hashtag1", "#hashtag2", "#hashtag3"],
      },
      {
        id: "14",
        avatar: "https://via.placeholder.com/150",
        name: "Shop Name14",
        timeStart: "12:00 PM",
        timeEnd: "04:00 AM",
        hashtag: ["#hashtag1", "#hashtag2", "#hashtag3"],
      },
      {
        id: "15",
        avatar: "https://via.placeholder.com/150",
        name: "Shop Name15",
        timeStart: "12:00 PM",
        timeEnd: "04:00 AM",
        hashtag: ["#hashtag1", "#hashtag2", "#hashtag3"],
      },
    ],
  },
  {
    title: "Recommended store",
    value: "Recommended store",
    data: [
      {
        id: "11",
        avatar: "https://via.placeholder.com/150",
        name: "Shop Name11",
        timeStart: "12:00 PM",
        timeEnd: "04:00 AM",
        hashtag: ["#hashtag1", "#hashtag2", "#hashtag3"],
      },
      {
        id: "12",
        avatar: "https://via.placeholder.com/150",
        name: "Shop Name12",
        timeStart: "12:00 PM",
        timeEnd: "04:00 AM",
        hashtag: ["#hashtag1", "#hashtag2", "#hashtag3"],
      },
      {
        id: "13",
        avatar: "https://via.placeholder.com/150",
        name: "Shop Name13",
        timeStart: "12:00 PM",
        timeEnd: "04:00 AM",
        hashtag: ["#hashtag1", "#hashtag2", "#hashtag3"],
      },
      {
        id: "14",
        avatar: "https://via.placeholder.com/150",
        name: "Shop Name14",
        timeStart: "12:00 PM",
        timeEnd: "04:00 AM",
        hashtag: ["#hashtag1", "#hashtag2", "#hashtag3"],
      },
      {
        id: "15",
        avatar: "https://via.placeholder.com/150",
        name: "Shop Name15",
        timeStart: "12:00 PM",
        timeEnd: "04:00 AM",
        hashtag: ["#hashtag1", "#hashtag2", "#hashtag3"],
      },
    ],
  },
  {
    title: "During the event",
    value: "During the event",
    data: [
      {
        id: "11",
        avatar: "https://via.placeholder.com/150",
        name: "Shop Name11",
        timeStart: "12:00 PM",
        timeEnd: "04:00 AM",
        hashtag: ["#hashtag1", "#hashtag2", "#hashtag3"],
      },
      {
        id: "12",
        avatar: "https://via.placeholder.com/150",
        name: "Shop Name12",
        timeStart: "12:00 PM",
        timeEnd: "04:00 AM",
        hashtag: ["#hashtag1", "#hashtag2", "#hashtag3"],
      },
      {
        id: "13",
        avatar: "https://via.placeholder.com/150",
        name: "Shop Name13",
        timeStart: "12:00 PM",
        timeEnd: "04:00 AM",
        hashtag: ["#hashtag1", "#hashtag2", "#hashtag3"],
      },
      {
        id: "14",
        avatar: "https://via.placeholder.com/150",
        name: "Shop Name14",
        timeStart: "12:00 PM",
        timeEnd: "04:00 AM",
        hashtag: ["#hashtag1", "#hashtag2", "#hashtag3"],
      },
      {
        id: "15",
        avatar: "https://via.placeholder.com/150",
        name: "Shop Name15",
        timeStart: "12:00 PM",
        timeEnd: "04:00 AM",
        hashtag: ["#hashtag1", "#hashtag2", "#hashtag3"],
      },
    ],
  },
];

export const ShopInformationTab = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
  }>(ListTabBar[0]);

  return (
    <>
      <div className="flex w-full">
        {ListTabBar.map((item, index) => (
          <div onClick={() => setTabSelected(item)} key={index} className={"flex w-1/6 items-center justify-center pt-6 cursor-pointer border-b"}>
            <div className="flex flex-col gap-4 ">
              <div className="flex items-center justify-center gap-2 ">
                <BaseText locale size={20} bold color={classNames(tabSelected.value !== item.value ? "text-darkNight500" : "")}>{t(item.title)}</BaseText>
                <BaseText bold className="px-1 text-white bg-darkNight900 rounded-[4px]">5</BaseText>
              </div>
              {tabSelected.value === item.value ? <div className="w-full h-1 bg-dayBreakBlue500 rounded-t-xl" /> : <div className="w-full h-1" />}
            </div>
          </div>
        ))}
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