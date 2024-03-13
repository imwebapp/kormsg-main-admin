import React, { useEffect, useState } from "react";
import { TableColumnsType } from "antd";
import BaseText from "../text";
import CustomButton from "../button";
import Images from "../../assets/gen";
import BaseTable from "../table";
import { useTranslation } from "react-i18next";
import { BaseInputSelect } from "../input/BaseInputSelect";
import { storeApi } from "../../apis/storeApi";
import moment from "moment";
import { ceilRemainingTime, mathRemainingTime } from "../../utils/common";

type StoreListTableProps = {
  className?: string; // for tailwindcss
};

export default function StoreListTable(props: StoreListTableProps) {
  const { className } = props;
  const { t } = useTranslation();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {};

  const storeStatus = (title: string, value: number) => {
    return (
      <div className="flex flex-row">
        <BaseText locale medium size={16}>
          {title}
        </BaseText>
        <BaseText medium size={16}>
          : {value}
        </BaseText>
      </div>
    );
  };
  const renderEventAction = (item: any, events: any) => {
    console.log("eneve", events);

    return (
      <div>
        {events && events.length === 0 && (
          <button className="flex w-30 pl-3 py-3  flex-col justify-center items-center gap-10 text-black rounded  underline">
            이벤트+
          </button>
        )}
        {item.events &&
          item.events.length > 0 &&
          item.events[0].state === "PENDING" && (
            <button
              className="flex w-30 pl-3 py-3  flex-col justify-center items-center gap-10 text-black rounded  underline"
              disabled={mathRemainingTime(item.expired_date) < 0}
            >
              이벤트+
            </button>
          )}
        {item.events &&
          item.events.length > 0 &&
          item.events[0].state !== "PENDING" && (
            <button className="flex w-30 pl-3 py-3  flex-col justify-center items-center gap-10  rounded  text-bold text-blue-700 underline">
              이벤트
            </button>
          )}
      </div>
    );
  };
  const [listStore, setListStore] = useState([]);

  useEffect(() => {
    // field all selected
    const fields =
      '["$all",{"courses":["$all",{"prices":["$all"]}]},{"user":["$all"]},{"category":["$all",{"thema":["$all"]}]},{"events":["$all"]}]';
    const filter = '{"state":{"$notIn":["REJECTED","EXPIRED"]}}';

    storeApi
      .getList({
        limit: 50,
        fields: fields,
        filter: filter,
        order: [["geolocation_api_type", "DESC"]],
      })
      .then((res: any) => {
        console.log("", res.results.objects.rows);
        setListStore(res.results.objects.rows);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, []);
  const columns: TableColumnsType<any> = [
    {
      title: t("No"),
      render: ({ index }) => (
        <div className="min-w-[40px]">
          <BaseText>{index}</BaseText>
        </div>
      ),
    },
    {
      title: t("Id"),
      dataIndex: ["user", "username"],
    },
    {
      title: t("Title"),
      dataIndex: "title",
      render: (title) => (
        <div className="min-w-[200px]">
          <BaseText>{title}</BaseText>
        </div>
      ),
    },
    {
      title: t("Category"),
      dataIndex: ["category", "thema", "name"],
      render: (category) => (
        <div className="min-w-[40px]">
          <BaseText>{category}</BaseText>
        </div>
      ),
    },
    {
      title: t("Start/End/Remaining Period"),
      render: (text, record) => (
        <div className="flex flex-col items-center">
          <BaseText locale size={16} medium>
            {`${moment(parseInt(record.start_date)).format(
              "YYYY-MM-DD"
            )} - ${moment(parseInt(record.expired_date)).format("YYYY-MM-DD")}`}
          </BaseText>
          <BaseText locale size={16} medium className="text-violet2 ">
            {mathRemainingTime(record.expired_date) >= 0
              ? ceilRemainingTime(record.expired_date) + " days"
              : "Expired"}
          </BaseText>
        </div>
      ),
    },
    {
      title: t("Event"),
      render: (text, record) => renderEventAction(record, record.events),
    },
    {
      title: t("Store"),
      render: ({}) => (
        <div className="min-w-[30px] cursor-pointer">
          <img src={Images.eye} className="w-6 h-6" />
        </div>
      ),
    },
    {
      title: t("Management"),
      render: ({}) => (
        <div className="flex flex-row items-center w-[50px] gap-2">
          <img src={Images.edit2} className="w-6 h-6 cursor-pointer" />
          <img src={Images.copy} className="w-6 h-6 cursor-pointer" />
          <img src={Images.trash} className="w-6 h-6 cursor-pointer" />
        </div>
      ),
    },
  ];

  return (
    <BaseTable
      onSelectChange={() => {}}
      className={className}
      pagination={{ pageSize: 10 }}
      columns={columns}
      data={listStore}
    />
  );
}
