import React, { useEffect, useRef, useState } from "react";
import { TableColumnsType, notification } from "antd";
import BaseText from "../text";
import Images from "../../assets/gen";
import BaseTable from "../table";
import { useTranslation } from "react-i18next";
import { storeApi } from "../../apis/storeApi";
import moment from "moment";
import { ceilRemainingTime, mathRemainingTime } from "../../utils/common";
import {
  BASE_URL_LINK_SHOP,
  SORTING,
  STORE_STATUS,
} from "../../utils/constants";
import dayjs from "dayjs";
import { BaseModal2 } from "../modal/BaseModal2";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { Url } from "../../routers/paths";
import { useNavigate } from "react-router-dom";
import { BaseInput } from "../input/BaseInput";
import { userApi } from "../../apis/userApi";
import NaverMapComponent from "./components/NaverMap";
type StoreListTableProps = {
  className?: string; // for tailwindcss
  typeStore?: string;
  thema?: string;
  typeSorting?: string;
  valueSearch?: string;
  countStore?: any;
  onItemStoreClick?: (item: any) => void;
  isUpdate?: Number;
  onRefresh?: () => void;
};
export default function StoreListTable(props: StoreListTableProps) {
  const {
    className,
    typeStore,
    thema,
    typeSorting,
    onItemStoreClick,
    onRefresh,
    isUpdate,
    valueSearch,
    countStore,
  } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [listStore, setListStore] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isShowModalMap, setIsShowModalMap] = useState(false);
  const [isShowImages, setIsShowImages] = useState(false);
  const [isShowInfo, setIsShowInfo] = useState(false);
  const [isShowReasonDenied, setIsShowReasonDenied] = useState(false);
  // const [listImageShop, setListImageShop] = useState([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {};
  const [positionStore, setPositionStore] = useState({
    lat: 0,
    long: 0,
  });
  const [isShowDataHistory, setIsShowDataHistory] = useState(false);
  const nameGroup = useRef("");
  const idStore = useRef("");
  const limit = 50;
  const [dataHistory, setDataHistory] = useState<any[]>([]);
  const [deniedMessagse, setDeniedMessagse] = useState("");
  const renderEventAction = (item: any, events: any) => {
    return (
      <div>
        {events && events.length === 0 && (
          <button
            className="flex flex-col items-center justify-center gap-10 py-3 pl-3 text-black underline rounded cursor-pointer w-30"
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
              className="flex flex-col items-center justify-center gap-10 py-3 pl-3 text-black underline rounded cursor-not-allowed w-30"
              disabled={mathRemainingTime(item.expired_date) < 0}
            >
              PENDING
            </button>
          )}
        {item.events &&
          item.events.length > 0 &&
          item.events[0].state !== "PENDING" && (
            <button
              className="flex flex-col items-center justify-center gap-10 py-3 pl-3 text-blue-700 underline rounded w-30 text-bold"
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
  const handleClick = (id: string) => {
    const url = `${BASE_URL_LINK_SHOP}/${id}`;
    window.open(url, "_blank");
  };
  const handlePageChange = (page: any) => {
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

  const approvePendingShop = async (id: string) => {
    try {
      const params = {
        expired_date: dayjs().add(1, "month").valueOf(),
        state: "APPROVED",
        geolocation_api_type: "NAVER",
      };
      let result: any = await storeApi.approveStore(params, [id]);
      if (result.code === 200) {
        notification.success({
          message: "Approve Store Success",
        });
        if (onRefresh) {
          onRefresh();
        }
      }
    } catch (error) {}
  };
  const rejectPendingShop = async (id: string, denied_message: string | "") => {
    try {
      const params = {
        state: "REJECTED",
        denied_message: denied_message,
      };
      let result: any = await storeApi.rejectStore(params, id);

      if (result.code === 200) {
        notification.success({
          message: "Reject Store Success",
        });
        if (onRefresh) {
          onRefresh();
        }
      }
    } catch (error) {}
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
        filterString += `"state":"REJECTED"`;
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
    // if (
    //   filter &&
    //   (filter.type === "contact_phone" || filter.type === "title") &&
    //   filter.value !== ""
    // ) {
    //   if (filterString !== "") {
    //     filterString += ", ";
    //   }
    //   filterString += `"${filter.type}":{"$iLike":"%${filter.value}%"}`;
    // }

    return `{${filterString}}`;
  }
  const generateFields = () => {
    if (typeStore == STORE_STATUS.eventOngoing) {
      // default event on going
      return '["$all",{"events":["$all",{"$filter":{}}]}]';
    }
    const convertFilter: any = {};
    if (valueSearch !== "") {
      convertFilter["$filter"] = {
        $or: [
          { username: { $ilike: `%${valueSearch}%` } },
          { nickname: { $ilike: `%${valueSearch}%` } },
          { email: { $ilike: `%${valueSearch}%` } },
        ],
      };
    }

    // {"user":["$all",${JSON.stringify(
    //   convertFilter
    // )}]}
    // Thêm điều kiện category nếu có
    let filterThema = "";
    if (thema && thema !== "" && thema !== t("All")) {
      filterThema += `,{"$filter":{"thema_id":"${thema}"}}`;
    }
    //{"user":["$all",{"new_group":["$all"]}]}
    let fields = `["$all",{"courses":["$all",{"prices":["$all"]}]},{"user":["$all",{"new_group":["name"]},${JSON.stringify(
      convertFilter
    )}]},{"category":["$all",{"thema":["$all"]}${filterThema}]},{"events":["$all"]}]`;

    return fields;
  };
  const getCountTotal = () => {
    switch (typeStore) {
      case STORE_STATUS.exposure:
        return countStore.countShopActive;
      case STORE_STATUS.underReview:
        return countStore.countShopPending;
      case STORE_STATUS.reviewRejected:
        return countStore.countShopReject;
      case STORE_STATUS.adExpired:
        return countStore.countShopExpired;
      case STORE_STATUS.eventOngoing:
        return countStore.countShopOnEvent;
      default:
        return 50;
    }
  };

  const getListStore = () => {
    // field all selected
    const fieldsCustom = generateFields();
    const filterCustom = generateFilter(typeStore);
    const orderCustom = JSON.stringify(generateOrder(typeSorting));
    storeApi
      .getList({
        limit: limit,
        page: currentPage,
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
  const getInfoPaymentHistory = (userId: string) => {
    try {
      userApi
        .getListPaymentHistory({
          fields: JSON.stringify(["$all"]),
          filter: JSON.stringify({
            user_id: `${userId}`,
          }),
          limit: 50,
          page: 1,
        })
        .then((res: any) => {
          setDataHistory(res.results?.objects?.rows);
        })
        .catch((err) => {
          console.log("err getList PaymentHistory API", err);
        });
    } catch (error) {}
  };

  useEffect(() => {
    getListStore();
  }, [typeStore, typeSorting, thema, isUpdate, valueSearch, currentPage]);
  useEffect(() => {
    setCurrentPage(1);
  }, [typeStore]);
  let dynamicColumns: TableColumnsType<any> = [
    {
      title: t("No"),
      render: (text, record, index) => (
        <div className="min-w-[40px]">
          <BaseText>{(currentPage - 1) * 50 + index + 1}</BaseText>
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
      render: (text, record) => (
        <div
          className="min-w-[30px] cursor-pointer"
          onClick={() => handleClick(record.id)}
        >
          <img src={Images.eye} className="w-6 h-6" />
        </div>
      ),
    },
    {
      title: t("Management"),
      render: (text, record) => (
        <div className="flex flex-row items-center w-[50px] gap-2">
          <img
            src={Images.edit2}
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              console.log("edit store", record);
              navigate(Url.newStore, { state: { dataEdit: record } });
            }}
          />
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

  // Kiểm tra giá trị của typeStore
  if (typeStore === STORE_STATUS.underReview) {
    const additionalColumns: TableColumnsType<any> = [
      {
        title: t("No"),
        render: (text: any, record: any, index: number) => (
          <div className="min-w-[40px]">
            <BaseText>{(currentPage - 1) * 10 + index + 1}</BaseText>
          </div>
        ),
      },
      {
        title: t("Id"),
        dataIndex: ["user", "username"],
        width: "10%",
      },
      {
        title: t("Nickname"),
        dataIndex: ["user", "nickname"],
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
        title: t("Category"),
        dataIndex: ["category", "name"],
      },
      {
        title: t("Geolocation"),
        dataIndex: ["geolocation_api_type"],
      },
      {
        title: t("Phone Contact"),
        dataIndex: ["contact_phone"],
      },
      {
        title: t("Address"),
        dataIndex: ["address"],
        width: "10%",
      },
      {
        title: t("Information"),
        width: "10%",
        render: (text, record) => (
          <div className="flex flex-row items-center w-[50px] gap-2">
            <img
              src={Images.icImage}
              className="w-6 h-6 cursor-pointer"
              onClick={() => {
                setIsShowImages(true);
                // setListImageShop(record.images);
              }}
            />
            <img
              src={Images.mapPoint}
              className="w-6 h-6 cursor-pointer"
              onClick={() => {
                setIsShowModalMap(true);
                setPositionStore({
                  lat: record.latitude,
                  long: record.longitude,
                });
              }}
            />
            <img
              src={Images.information}
              className="w-6 h-6 cursor-pointer"
              onClick={() => {
                setIsShowInfo(!isShowInfo);
                nameGroup.current = record?.user?.new_group?.name;
                getInfoPaymentHistory(record.user.id);
              }}
            />
          </div>
        ),
      },
      {
        title: t("Action"),
        render: (text, record) => (
          <div className="flex gap-2 justify-center px-3 py-2.5 text-xs font-bold leading-5 text-center text-white whitespace-nowrap">
            <button
              className="justify-center px-2 py-1.5 bg-blue-600 rounded-lg"
              onClick={() => {
                approvePendingShop(record.id);
              }}
            >
              Approve
            </button>
            <button
              className="justify-center px-2 py-1.5 bg-red-600 rounded-lg"
              onClick={() => {
                idStore.current = record.id;
                setIsShowReasonDenied(!isShowReasonDenied);
              }}
            >
              Reject
            </button>
            <img
              src={Images.edit2}
              alt=""
              className="w-7 h-7 cursor-pointer"
              onClick={() => {
                console.log("edit store", record);
                navigate(Url.newStore, { state: { dataEdit: record } });
              }}
            />
          </div>
        ),
      },
    ];
    dynamicColumns = additionalColumns;
  }

  return (
    <>
      <BaseTable
        // onSelectChange={() => {}}
        className={className}
        pagination={{
          current: currentPage,
          pageSize: limit,
          total: getCountTotal(),
          onChange: handlePageChange,
        }}
        columns={dynamicColumns}
        data={listStore}
      />
      <BaseModal2
        width={1000}
        isOpen={isShowModalMap}
        isHideAction={true}
        onClose={() => {
          setIsShowModalMap(false);
        }}
        title="Location"
      >
        <div
          style={{
            width: "962px",
            height: "700px",
            pointerEvents: "none",
          }}
        >
          <NaverMapComponent positionStore={positionStore} />
        </div>
      </BaseModal2>
      <BaseModal2
        isOpen={isShowImages}
        isHideAction={true}
        onClose={() => {
          setIsShowImages(false);
        }}
      >
        <iframe
          src="https://dev.kormsg.com/detail/650896d0-f883-11ee-a62d-0bb94bbfc28f"
          className="w-full h-[950px] pointer-events-none"
        />
      </BaseModal2>
      <BaseModal2
        isOpen={isShowInfo}
        onClose={() => {
          setIsShowInfo(false);
        }}
        title="More"
      >
        <BaseInput
          title="Group"
          value={nameGroup.current}
          disabled
          className="mb-2"
        />
        <BaseText locale bold>
          Memo
        </BaseText>
        <div className="mb-2">
          <BaseText>
            Depositor/Contact/Deposit date/Deposit amount/Exposure bulletin
            board/Start date and End date/Uniquene
          </BaseText>
        </div>
        <div className="flex gap-2 text-base leading-6  max-md:flex-wrap">
          <BaseInput
            value={dataHistory[0]?.content}
            disabled
            className="w-full"
          />
          <button
            className="justify-center px-5 py-3 font-bold text-blue-600 whitespace-nowrap bg-sky-100 rounded-xl"
            onClick={() => {
              setIsShowDataHistory(!isShowDataHistory);
            }}
          >
            View Detail
          </button>
        </div>
      </BaseModal2>
      <BaseModal2
        isOpen={isShowDataHistory}
        onClose={() => {
          setIsShowDataHistory(false);
        }}
      >
        {dataHistory.map((item) => (
          <div
            className="flex flex-col border-b border-black py-2"
            key={item.id}
          >
            <div style={{ flexDirection: "row", display: "flex" }}>
              <span className="font-[700] text-[#0078FF]">
                {moment(
                  new Date(parseInt(item.created_at_unix_timestamp))
                ).format("YYYY-MM-DD")}{" "}
                |{" "}
              </span>
              <span className="font-[700] ml-2.5">담당자 아이디</span>
              <span className="font-[700] text-[#0078FF]">:master</span>
            </div>
            <span>{item.content}</span>
          </div>
        ))}
      </BaseModal2>
      <BaseModal2
        isOpen={isShowReasonDenied}
        onClose={() => {
          setDeniedMessagse("");
          setIsShowReasonDenied(false);
        }}
        onSubmit={() => {
          rejectPendingShop(idStore.current, deniedMessagse);
        }}
      >
        <BaseInput
          title="Denied Message"
          onChange={(value) => {
            setDeniedMessagse(value);
          }}
          value={deniedMessagse}
        />
      </BaseModal2>
    </>
  );
}
