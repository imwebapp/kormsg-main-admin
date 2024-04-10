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
import dayjs from "dayjs";
import { BaseModal2 } from "../modal/BaseModal2";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { Url } from "../../routers/paths";
import { useNavigate } from "react-router-dom";
type StoreListTableProps = {
  className?: string; // for tailwindcss
  typeStore?: string;
  thema?: string;
  typeSorting?: string;
  filter?: { type: string; value: any };
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
    filter,
    onItemStoreClick,
    onRefresh,
    isUpdate,
  } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [listStore, setListStore] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isShowModalMap, setIsShowModalMap] = useState(false);
  const [isShowImages, setIsShowImages] = useState(false);
  const [listImageShop, setListImageShop] = useState([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => { };
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
    } catch (error) { }
  };
  const rejectPendingShop = async (id: string) => {
    try {
      const params = {
        state: "REJECTED",
        denied_message: null,
      };
      let result: any = await storeApi.rejectStore(params, id);
      console.log("tum lum", result);

      if (result.code === 200) {
        notification.success({
          message: "Reject Store Success",
        });
        if (onRefresh) {
          onRefresh();
        }
      }
    } catch (error) { }
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
  const generateMap = (latitude: any, longitude: any) => {
    if (!naver.maps) window.location.reload();
    const mapElement = document.getElementById("map");
    if (mapElement && mapElement.innerHTML !== "") {
      mapElement.innerHTML = ""; // Xóa nội dung của thẻ div
    }
    const map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(latitude, longitude),
      zoom: 18,
    });
    new naver.maps.Marker({
      position: new naver.maps.LatLng(latitude, longitude),
      map,
      icon: {
        content: `<div style="position: relative">
          <img src="${Images.mapPin}" style="width : 40px; height: 47px" alt="">
          <img src="${Images.discount1}" style="position: absolute; width : 30px; height: 30px; top: 5px; left : 5px; border-radius: 30px" />
        </div>`,
        size: new naver.maps.Size(30, 35),
      },
    });
  };
  let dynamicColumns: TableColumnsType<any> = [
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
      render: ({ }) => (
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
          <img src={Images.edit2} className="w-6 h-6 cursor-pointer"
            onClick={() => {
              console.log("edit store", record);
              navigate(Url.newStore, { state: { dataEdit: record } })
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
                setListImageShop(record.images);
              }}
            />
            <img
              src={Images.mapPoint}
              className="w-6 h-6 cursor-pointer"
              onClick={() => {
                setIsShowModalMap(true);
                generateMap(record.latitude, record.longitude);
              }}
            />
            <img
              src={Images.information}
              className="w-6 h-6 cursor-pointer"
              onClick={() => {
                console.log(record);
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
                rejectPendingShop(record.id);
              }}
            >
              Reject
            </button>
            <img src={Images.edit2} alt="" className="w-7 h-7 cursor-pointer" />
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
          pageSize: 10,
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
          <div id="map" />
        </div>
      </BaseModal2>
      <BaseModal2
        isOpen={isShowImages}
        isHideAction={true}
        onClose={() => {
          // setIsShowModalMap(false);
          setIsShowImages(false);
        }}
      >
        <Slide>
          {listImageShop.map((image, index) => (
            <div key={index} className="each-slide-effect">
              <img src={image} alt={`mô_tả_hình_ảnh_${index}`} />
            </div>
          ))}
        </Slide>
      </BaseModal2>
    </>
  );
}
