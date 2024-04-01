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
import { SORTING, STORE_STATUS } from "../../utils/constants";

type StoreListTableProps = {
  className?: string; // for tailwindcss
  typeStore?: string;
  thema?: string;
  typeSorting?: string;
  filter?: { type: string; value: any };
  onItemStoreClick?: (item: any) => void;
  isUpdate?: Number;
};
export default function StoreListTable(props: StoreListTableProps) {
  const {
    className,
    typeStore,
    thema,
    typeSorting,
    filter,
    onItemStoreClick,
    isUpdate,
  } = props;
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
              handleItemClick(item);
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
                handleItemClick(item);
              }}
            >
              이벤트
            </button>
          )}
      </div>
    );
  };
  const handleItemClick = (itemId: string) => {
    if (onItemStoreClick) {
      onItemStoreClick(itemId);
    }
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
  function generateOrder(sorting: string | undefined) {
    switch (sorting) {
      case SORTING.NONE:
        return [["geolocation_api_type", "DESC"]];
      case SORTING.DESC:
        return [["expired_date", "DESC"]];
      case SORTING.ASC:
        return [["expired_date", "ASC"]];
      default:
        return [["geolocation_api_type", "DESC"]];
    }
  }
  function generateFilter(status?: string) {
    let filterString = "";

    // Thêm điều kiện trạng thái
    switch (status) {
      case STORE_STATUS.exposure:
        filterString += `"state":{"$notIn":["REJECTED","EXPIRED"]}`;
        break;
      case STORE_STATUS.underReview:
        filterString += `"state":"PENDING"`;
        break;
      case STORE_STATUS.reviewRejected:
        filterString += `{"$or":[{"denied_shop":{"$ne":null}},{"state":{"$in":["REJECTED"]}}]}`;
        break;
      case STORE_STATUS.adExpired:
        filterString += `"state":{"$in":["EXPIRED"]}`;
        break;
      case STORE_STATUS.eventOngoing:
        filterString += ``;
        break;
      default:
        break;
    }
    if (
      filter &&
      (filter.type === "contact_phone" || filter.type === "title") &&
      filter.value !== ""
    ) {
      if (filterString !== "") {
        filterString += ", ";
      }
      filterString += `"${filter.type}":{"$iLike":"%${filter.value}%"}`;
    }

    return `{${filterString}}`;
  }
  const generateFields = () => {
    console.log("filter", filter);
    if (typeStore == STORE_STATUS.eventOngoing) {
      // default event on going
      return '["$all",{"events":["$all",{"$filter":{}}]}]';
    }
    let filterString = "";
    if (
      filter && // check exist filter
      filter.type !== "contact_phone" && // check not phone user
      filter.type !== "title" && // check not title user
      filter.value !== "" // check empty value
    ) {
      filterString = `,{"$filter":{"${filter.type}":{"$iLike":"%${filter.value}%"}}}`;
    }

    // Thêm điều kiện category nếu có
    let filterThema = "";
    if (thema && thema !== "" && thema !== t("All")) {
      filterThema += `,{"$filter":{"thema_id":"${thema}"}}`;
    }
    let fields = `["$all",{"courses":["$all",{"prices":["$all"]}]},{"user":["$all"${filterString}]},{"category":["$all",{"thema":["$all"]}${filterThema}]},{"events":["$all"]}]`;
    console.log("fields", fields);

    return fields;
  };

  const getListStore = () => {
    console.log("log log");

    // field all selected
    const fieldsCustom = generateFields();
    const filterCustom = generateFilter(typeStore);
    const orderCustom = JSON.stringify(generateOrder(typeSorting));
    storeApi
      .getList({
        limit: 50,
        fields: fieldsCustom,
        filter: filterCustom,
        order: orderCustom,
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

  useEffect(() => {
    getListStore();
  }, [typeStore, typeSorting, filter, thema, isUpdate]);
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
      title: t("Thema"),
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
