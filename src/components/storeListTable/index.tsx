import React, { useEffect, useState } from "react";
import { TableColumnsType, notification } from "antd";
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
  const [listStore, setListStore] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {};
  const renderEventAction = (item: any, events: any) => {
    return (
      <div>
        {events && events.length === 0 && (
          <button
            className="flex w-30 pl-3 py-3  flex-col justify-center items-center gap-10 text-black rounded  underline cursor-pointer"
            onClick={() => {
              console.log("items", item);
            }}
          >
            이벤트+
          </button>
        )}
        {item.events &&
          item.events.length > 0 &&
          item.events[0].state === "PENDING" && (
            <button
              className="flex w-30 pl-3 py-3  flex-col justify-center items-center gap-10 text-black rounded  underline cursor-not-allowed"
              disabled={mathRemainingTime(item.expired_date) < 0}
            >
              PENDING
            </button>
          )}
        {item.events &&
          item.events.length > 0 &&
          item.events[0].state !== "PENDING" && (
            <button
              className="flex w-30 pl-3 py-3  flex-col justify-center items-center gap-10  rounded  text-bold text-blue-700 underline"
              onClick={() => {
                console.log("click view events");
              }}
            >
              이벤트
            </button>
          )}
      </div>
    );
  };
  const handleClick = () => {
    console.log("Div đã được click");
  };
  const handlePageChange = (page: any) => {
    console.log("Trang hiện tại:", page);
    setCurrentPage(page);
  };
  const cloneStore = async (id: string) => {
    try {
      await storeApi.cloneStore(id);
      notification.success({
        message: "Clone Store Success",
      });
      getListStore();
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error.message,
      });
    }
  };
  const deleteStore = async (id: string) => {
    try {
      await storeApi.deleteStore(id);
      notification.success({
        message: "Delete Success",
      });
      getListStore();
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error.message,
      });
    }
  };
  const getListStore = () => {
    // field all selected
    const fields =
      '["$all",{"courses":["$all",{"prices":["$all"]}]},{"user":["$all"]},{"category":["$all",{"thema":["$all"]}]},{"events":["$all"]}]';
    const filter = '{"state":{"$notIn":["REJECTED","EXPIRED"]}}';

    storeApi
      .getList({
        limit: 300,
        fields: fields,
        filter: filter,
        order: [["geolocation_api_type", "DESC"]],
      })
      .then((res: any) => {
        setListStore(res.results.objects.rows);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
  useEffect(() => {
    getListStore();
  }, []);
  const columns: TableColumnsType<any> = [
    {
      title: t("No"),
      render: (text, record, index) => (
        <div className="min-w-[40px]">
          <BaseText>{(currentPage - 1) * 10 + index + 1}</BaseText>
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
          <BaseText size={16} medium>
            {`${moment(parseInt(record.start_date)).format(
              "YYYY-MM-DD"
            )} ~ ${moment(parseInt(record.expired_date)).format("YYYY-MM-DD")}`}
          </BaseText>
          <BaseText size={16} medium className="text-violet2 ">
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
        <div
          className="min-w-[30px] cursor-pointer"
          onClick={() => handleClick()}
        >
          <img src={Images.eye} className="w-6 h-6" />
        </div>
      ),
    },
    {
      title: t("Management"),
      render: (text, record) => (
        <div className="flex flex-row items-center w-[50px] gap-2">
          <img src={Images.edit2} className="w-6 h-6 cursor-pointer" />
          <img
            src={Images.copy}
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              cloneStore(record.id);
            }}
          />
          <img
            src={Images.trash}
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              deleteStore(record.id);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <BaseTable
      // onSelectChange={() => {}}
      className={className}
      pagination={{
        pageSize: 10,
        onChange: handlePageChange,
      }}
      columns={columns}
      data={listStore}
    />
  );
}
