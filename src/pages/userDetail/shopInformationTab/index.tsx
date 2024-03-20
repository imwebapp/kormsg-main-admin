import { useNavigate } from "react-router-dom";
import { User, classNames } from "../../../utils/common";
import { BaseText } from "../../../components";
import { useEffect, useState } from "react";
import { ItemShop } from "./components";
import { useTranslation } from "react-i18next";
import { shopApi } from "../../../apis/shopApi";

const ListTabBar = [
  {
    title: "Announcement Store",
    value: "APPROVED",
    data: [],
    count: 0,
  },
  {
    title: "Store under review",
    value: "PENDING",
    data: [],
    count: 0,
  },
  {
    title: "Stores that refuse review",
    value: "REJECTED",
    data: [],
    count: 0,
  },
  {
    title: "Expired store",
    value: "EXPIRED",
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
  console.log("dataUser ShopInformationTab", dataUser);
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
      case "APPROVED":
        return dataUser.current_active_post;
      case "PENDING":
        return dataUser.current_pending_post;
      case "REJECTED":
        return dataUser.current_rejected_post;
      case "EXPIRED":
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
    let type = tabSelected.value;
    switch (tabSelected.value) {
      case "APPROVED":
        type = "APPROVED";
        break;
      case "PENDING":
        type = "PENDING";
        break;
      case "REJECTED":
        type = "REJECTED";
        break;
      case "EXPIRED":
        type = "EXPIRED";
        break;
      case "Recommended store":
        type = "APPROVED";
        break;
      case "During the event":
        type = "APPROVED";
        break;
      default:
        type = "APPROVED";
        break;
    }

    shopApi
      .getList({
        fields: JSON.stringify([
          "$all",
          { user: ["$all"] },
          { category: ["$all", { thema: ["$all"] }] },
          { events: ["$all"] },
        ]),
        filter: JSON.stringify({
          user_id: `${dataUser.id}`,
          $or: [
            { denied_shop: { $ne: null } },
            { state: { $in: [`${type}`] } },
          ],
        }),
        limit: 50,
        page: 1
      }
    ).then((res: any) => {
      setTabSelected((
        {
          ...tabSelected,
          data: res.results.objects.rows,
        });
      })
      .catch((err) => {
        console.log("err getList SHOP API", err);
      });
  }, [tabSelected.value]);

  return (
    <>
      <div className="flex w-full">
        {ListTabBar.map((item, index) => {
          return (
            <div
              onClick={() => setTabSelected(item)}
              key={index}
              className={
                "flex w-1/6 items-center justify-center pt-6 cursor-pointer border-b"
              }
            >
              <div className="flex flex-col gap-4 ">
                <div className="flex items-center justify-center gap-2 ">
                  <BaseText
                    locale
                    size={16}
                    bold
                    color={classNames(
                      tabSelected.value !== item.value
                        ? "text-darkNight500"
                        : ""
                    )}
                  >
                    {t(item.title)}
                  </BaseText>
                  <BaseText
                    bold
                    className="px-1 text-white bg-darkNight900 rounded-[4px]"
                  >
                    {checkCount(item.value)}
                  </BaseText>
                </div>
                {tabSelected.value === item.value ? (
                  <div className="w-full h-1 bg-dayBreakBlue500 rounded-t-xl" />
                ) : (
                  <div className="w-full h-1" />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="max-h-full overflow-y-auto">
        <div className="grid grid-cols-3 gap-4 p-6">
          {(tabSelected.data || []).map((item: any, index) => (
            <ItemShop
              key={index}
              id={item.id}
              avatar={
                item.images.length > 0
                  ? item.images[0]
                  : "https://via.placeholder.com/300"
              }
              name={item.title}
              timeOpening={item.opening_hours}
              hashtag={[]}
              onClick={(id) => console.log(id)}
              className=""
            />
          ))}
        </div>
      </div>
    </>
  );
};
