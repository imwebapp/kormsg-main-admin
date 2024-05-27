import React, { useEffect, useRef, useState } from "react";
import { Popover, TableColumnsType, message, notification } from "antd";
import BaseText from "../text";
import Images from "../../assets/gen";
import { useTranslation } from "react-i18next";
import { storeApi } from "../../apis/storeApi";
import moment from "moment";
import { ceilRemainingTime, mathRemainingTime } from "../../utils/common";
import {
  BASE_URL_LINK_SHOP,
  SORTING,
  STORE_STATUS,
} from "../../utils/constants";
import { PlusOutlined, MinusOutlined, CloseOutlined } from "@ant-design/icons";
import { BaseModal2 } from "../modal/BaseModal2";
import { Url } from "../../routers/paths";
import { useNavigate } from "react-router-dom";
import { BaseInput } from "../input/BaseInput";
import { userApi } from "../../apis/userApi";
import NaverMapComponent from "./components/NaverMap";
import { BaseTableDnD } from "../table/BaseTableDnD";
import CustomButton from "../button";
import { shopApi } from "../../apis/shopApi";
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
  const [listStore, setListStore] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const [isShowModalMap, setIsShowModalMap] = useState(false);
  const [isShowImages, setIsShowImages] = useState(false);
  const [isShowInfo, setIsShowInfo] = useState(false);
  const [isShowReasonDenied, setIsShowReasonDenied] = useState(false);
  const [memoValue, setMemoValue] = useState("");
  const [listRowSelected, setListRowSelected] = useState<string[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setListRowSelected(newSelectedRowKeys as string[]);
  };

  const [positionStore, setPositionStore] = useState({
    lat: 0,
    long: 0,
  });
  const [isShowDataHistory, setIsShowDataHistory] = useState(false);
  const nameGroup = useRef("");
  const idStore = useRef("");
  const userId = useRef("");
  const limit = 50;
  const [dataHistory, setDataHistory] = useState<any[]>([]);
  const [deniedMessagse, setDeniedMessagse] = useState("");
  const [valueAddDay, setValueAddDay] = useState<number>();
  const [valueMinusDay, setValueMinusDay] = useState<number>();
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
        state: "APPROVED",
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
    if (typeStore === STORE_STATUS.eventOngoing) {
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
          setMemoValue(res.results?.objects?.rows[0]?.content || "");
        })
        .catch((err) => {
          console.log("err getList PaymentHistory API", err);
        });
    } catch (error) {}
  };
  //update Memo
  const handleUpdateMemo = () => {
    if (memoValue.trim() === "") {
      return;
    }

    const dataUpdate = {
      user_id: userId.current,
      content: memoValue.trim(),
    };
    userApi
      .updateUserPaymentHistory(dataUpdate)
      .then((res: any) => {
        message.success("Update memo successfully");
      })
      .catch((err) => {
        console.log("err update memo: ", err);
        message.error("Update memo failed");
      });
  };
  const handleMinusDay = async () => {
    if (valueMinusDay && valueMinusDay > 0) {
      try {
        const listIdUpdate = JSON.stringify(listRowSelected);
        const dataUpdate = {
          days: valueMinusDay,
        };
        const resUpdateDate: any = await shopApi.updateForceExpiredMultiple(
          listIdUpdate,
          dataUpdate
        );
        if (resUpdateDate.code === 200) {
          getListStore();
          setValueMinusDay(undefined);
          setListRowSelected([]);
          message.success("Update success");
        }
      } catch (error) {
        console.log("error update minus time", error);
        message.error("Update failed");
      }
    }
  };
  const handleAddDay = async () => {
    if (valueAddDay && valueAddDay > 0) {
      try {
        const listIdUpdate = JSON.stringify(listRowSelected);
        const dataUpdate = {
          days: valueAddDay,
        };
        const resUpdateDate: any = await shopApi.updateExpirationDateMultiple(
          listIdUpdate,
          dataUpdate
        );
        if (resUpdateDate.code === 200) {
          getListStore();
          setValueAddDay(undefined);
          setListRowSelected([]);
          message.success("Update success");
        }
      } catch (error) {
        console.log("error update add time", error);
        message.error("Update failed");
      }
    }
  };

  useEffect(() => {
    getListStore();
    setListRowSelected([]);
  }, [typeStore, typeSorting, thema, isUpdate, valueSearch, currentPage]);
  useEffect(() => {
    setCurrentPage(1);
    setListRowSelected([]);
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
      width: "25%",
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
          <img src={Images.eye} className="w-6 h-6" alt="icon-eye" />
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
                idStore.current = record.id;
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
                userId.current = record?.user_id;
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
              className="cursor-pointer w-7 h-7"
              onClick={() => {
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
      <BaseTableDnD
        onSelectChange={onSelectChange}
        selectedKeys={listRowSelected}
        className={className}
        columns={dynamicColumns}
        data={listStore?.map((item: any) => ({ ...item, key: item.id }))}
        pagination={{
          current: currentPage,
          pageSize: limit,
          total: getCountTotal(),
          onChange: handlePageChange,
        }}
      />
      {listRowSelected.length > 0 && (
        <div className="fixed bottom-6 right-1/4 left-1/4">
          <div className="flex gap-6 px-6 py-4 bg-white rounded-lg shadow-xl">
            <div className="flex justify-center gap-2 px-3 py-3 rounded-full bg-darkNight50">
              <CloseOutlined className="text-xl text-black cursor-pointer" />
              <BaseText bold size={16}>
                {t("선택됨")}{" "}
                <span className="text-primary">{listRowSelected.length}</span>
              </BaseText>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="flex justify-center border rounded-full border-darkNight100">
                <Popover
                  placement="topRight"
                  trigger="click"
                  content={
                    <div>
                      <BaseInput
                        placeholder="00"
                        iconRight={
                          <BaseText locale bold>
                            일
                          </BaseText>
                        }
                        type="number"
                        value={valueMinusDay}
                        onChange={(value) => {
                          setValueMinusDay(value);
                        }}
                      />
                      <CustomButton
                        className="flex justify-center w-full mt-4"
                        primary
                        onClick={handleMinusDay}
                        disabled={!valueMinusDay}
                        locale
                      >
                        적용
                      </CustomButton>
                    </div>
                  }
                >
                  <MinusOutlined className="px-4 py-3 text-2xl border-r cursor-pointer text-primary border-darkNight100" />
                </Popover>

                <Popover
                  placement="topLeft"
                  trigger="click"
                  content={
                    <div>
                      <BaseInput
                        placeholder="00"
                        iconRight={
                          <BaseText locale bold>
                            일
                          </BaseText>
                        }
                        type="number"
                        value={valueAddDay}
                        onChange={(value) => {
                          setValueAddDay(value);
                        }}
                      />
                      <CustomButton
                        className="flex justify-center w-full mt-4"
                        primary
                        locale
                        onClick={handleAddDay}
                        disabled={!valueAddDay}
                      >
                        적용
                      </CustomButton>
                    </div>
                  }
                >
                  <PlusOutlined className="px-4 text-2xl cursor-pointer text-primary" />
                </Popover>
              </div>
              <BaseText locale size={16} bold className="text-center">
                기간을 입력해주세요
              </BaseText>
            </div>
          </div>
        </div>
      )}
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
          src={`${BASE_URL_LINK_SHOP}/${idStore.current}`}
          className="w-full h-[950px] pointer-events-none"
        />
      </BaseModal2>
      <BaseModal2
        isOpen={isShowInfo}
        onClose={() => {
          setIsShowInfo(false);
        }}
        onSubmit={handleUpdateMemo}
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
        <div className="flex gap-2 text-base leading-6 max-md:flex-wrap">
          <BaseInput
            value={memoValue}
            onChange={(value) => setMemoValue(value)}
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
            className="flex flex-col py-2 border-b border-black"
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
