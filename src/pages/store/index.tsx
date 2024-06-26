import { useNavigate } from "react-router-dom";
import { BaseText, CustomButton, StoreListTable } from "../../components";
import { Url } from "../../routers/paths";
import { useCallback, useEffect, useRef, useState } from "react";
import { SORTING, STORE_STATUS } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import {
  PlusOutlined,
  ArrowUpOutlined,
  CaretDownOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { DatePicker, Input, Select, message, notification } from "antd";

import { storeApi } from "../../apis/storeApi";
import { BaseInput } from "../../components/input/BaseInput";
import { BaseModal2 } from "../../components/modal/BaseModal2";
import dayjs from "dayjs";
import { eventApi } from "../../apis/eventApi";
import { ThemaInterface } from "../../entities";
import { ThemaApi } from "../../apis/themaApi";
import Images from "../../assets/gen";
import { showError } from "../../utils/showToast";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import BaseButton from "../../components/baseButton";
import _ from "lodash";

const { RangePicker } = DatePicker;
const StorePage = () => {
  // format date
  const dateFormat = "YYYY.MM.DD";

  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState(STORE_STATUS.exposure);
  const [countStore, setCountStore] = useState({
    countShopPending: 0,
    countShopActive: 0,
    countShopReject: 0,
    countShopExpired: 0,
    countShopOnEvent: 0,
  });
  const [selectedThema, setSelectedThema] = useState("");
  const [selectedSorting, setSelectedSorting] = useState(SORTING.NONE);
  const [valueKeywordFilter, setValueKeywordFilter] = useState("");
  const [openModalCreateEvent, setOpenModalCreateEvent] = useState(false);
  const [itemSelectShop, setItemSelectShop] = useState<any>({});
  const [rangeValue, setRangeValue] = useState<any>(null);
  const [descriptionEvent, setDescriptionEvent] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(0);
  const [themas, setThemas] = useState<any>([]);
  const fileExcelRef = useRef<any>(null);
  const { t } = useTranslation();
  const storeListRef = useRef<any>(null);

  const handleRangeChange = (value: any, dateString?: [string, string]) => {
    if (dateString && dateString[0] !== "" && dateString[1] !== "") {
      const startDate = dayjs(dateString[0], "YYYY.MM.DD");
      const endDate = dayjs(dateString[1], "YYYY.MM.DD");
      setRangeValue([startDate, endDate]);
    }
  };

  const getCountStore = useCallback(
    _.debounce(async (valueSearch?: string) => {
      try {
        let params = {
          search_value: valueSearch,
          thema_id: selectedThema !== t("All") ? selectedThema : undefined,
        };
        let resultCount: any = await storeApi.getCountStore(params);
        if (resultCount.code === 200) {
          setCountStore(resultCount.results.object);
        }
      } catch (error) {}
    }, 500),
    [selectedThema]
  );

  const getListThema = async () => {
    try {
      const data: Array<ThemaInterface> = await ThemaApi.getList();
      const transformedData = data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      // // add item to first array
      transformedData.unshift({ value: t("All"), label: t("All") });

      setThemas(transformedData);
    } catch (error) {
      return [];
    }
  };
  const _createEvent = async () => {
    try {
      const timeStampStart = dayjs(rangeValue[0]).valueOf();
      const timeStampEnd = dayjs(rangeValue[1]).valueOf();
      const params = {
        description: descriptionEvent,
        shop_id: itemSelectShop.id,
        start_time: timeStampStart,
        end_time: timeStampEnd,
        images: [],
      };
      let result: any = await eventApi.createEvent(params);
      if (result.code === 200) {
        resetModal();
      }
      refreshTable();
    } catch (error) {
      refreshTable();
    }
  };
  const deleteEvent = async () => {
    try {
      let result: any = await eventApi.deleteEvent(itemSelectShop.events[0].id);
      if (result.code === 200) {
        resetModal();
        message.success("Delete Event Success");
        setOpenModalCreateEvent(!openModalCreateEvent);
      }
      refreshTable();
    } catch (error) {
      refreshTable();
    }
  };
  const _editEvent = async () => {
    try {
      const timeStampStart = dayjs(rangeValue[0]).valueOf();
      const timeStampEnd = dayjs(rangeValue[1]).valueOf();
      const params = {
        description: descriptionEvent,
        shop_id: itemSelectShop.id,
        start_time: timeStampStart,
        end_time: timeStampEnd,
        images: [],
      };
      let result: any = await eventApi.editEvent(
        params,
        itemSelectShop.events[0].id
      );
      if (result.code === 200) {
        resetModal();
        refreshTable();
      }
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error.message,
      });
      refreshTable();
    }
  };
  
  const onDragEnd = (result: any) => {
    console.log("result onDragEnd", result);
    if (!result.destination) {
      return;
    }

    if (result.destination.droppableId === result.source.droppableId) return;
    handleUpdateStore(result.draggableId, result.destination.droppableId);
  };
  const handleUpdateStore = async (id: string, type: string) => {
    try {
      const params: any = {}; // Giá trị mặc định

      switch (type) {
        case STORE_STATUS.exposure:
          params.state = "APPROVED";
          break;
        case STORE_STATUS.underReview:
          params.state = "PENDING";
          break;
        case STORE_STATUS.reviewRejected:
          params.state = "REJECTED";
          break;
        case STORE_STATUS.adExpired:
          params.state = { $in: ["EXPIRED"] };
          break;
        case STORE_STATUS.eventOngoing:
          // Không cần thay đổi params
          break;
        default:
          break;
      }

      const res: any = await storeApi.updateStore(params, id);
      if (res.code === 200) {
        refreshTable();
      }
    } catch (error: any) {
      showError(error);
    }
  };
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target.files?.[0];
      if (file) {
        const response: any = await storeApi.uploadExcel(file);
        if (response.code === 200) {
          notification.success({
            message: "Upload Excell Success",
          });
        }
      }
    } catch (error) {
      showError(error);
    }
  };

  const resetModal = () => {
    setDescriptionEvent("");
    setRangeValue(null);
  };

  const refreshTable = () => {
    setIsUpdateSuccess(isUpdateSuccess + 1);
    getCountStore(valueKeywordFilter);
  };

  useEffect(() => {
    getListThema();
  }, []);

  useEffect(() => {
    getCountStore(valueKeywordFilter);
  }, [valueKeywordFilter, getCountStore, selectedThema, selectedButton]);

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };
  const handleChangeThema = (value: string) => {
    setSelectedThema(value);
  };
  const handleChangeAdvertise = (value: string) => {
    setSelectedSorting(value);
  };
  // const handleChangeTextKeyword = (e: any) => {
  //   setValueKeywordFilter(e.target.value);
  // };
  const handleChangeTextKeyword = (value: string) => {
    setValueKeywordFilter(value);
  };

  const getButtonStyle = (buttonKey: any) => {
    const isSelected = buttonKey === selectedButton;
    return {
      backgroundColor: isSelected ? "black" : "white",
      color: isSelected ? "white" : "black",
    };
  };
  const getTextColor = (buttonStatus: any) => {
    return buttonStatus === selectedButton ? "white" : "black";
  };
  const listButton = () => {
    const buttonData = [
      {
        status: STORE_STATUS.exposure,
        label: t("exposure"),
        count: countStore.countShopActive,
      },
      {
        status: STORE_STATUS.underReview,
        label: t("underReview"),
        count: countStore.countShopPending,
      },
      {
        status: STORE_STATUS.reviewRejected,
        label: t("reviewRejected"),
        count: countStore.countShopReject,
      },
      {
        status: STORE_STATUS.adExpired,
        label: t("adExpired"),
        count: countStore.countShopExpired,
      },
      {
        status: STORE_STATUS.eventOngoing,
        label: t("eventOngoing"),
        count: countStore.countShopOnEvent,
      },
    ];

    return (
      <div className="flex flex-row items-center gap-4 mt-1 mb-5">
        {buttonData.map(({ status, label, count }) => {
          return (
            <Droppable droppableId={status}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <CustomButton
                    key={status}
                    className="text-base h-11 font-medium rounded-full px-4 py-2.5"
                    style={getButtonStyle(status)}
                    onClick={() => handleButtonClick(status)}
                  >
                    <BaseText color={getTextColor(status)} size={16}>
                      {label} ({count})
                    </BaseText>
                  </CustomButton>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    );
  };


  return (
    <>
      <div className="p-6">
        <div className="flex gap-2.5 justify-between self-stretch py-2 text-base font-medium leading-6 max-md:flex-wrap items-center">
          <div className="flex gap-4 text-base font-medium leading-6 whitespace-nowrap max-w-[651px] max-md:flex-wrap w-full my-4">
            {/* <Input
              className="items-start justify-center flex-1 px-4 py-3 rounded-xl bg-neutral-100 max-md:pr-5"
              placeholder="Keyword"
              onChange={handleChangeTextKeyword}
              value={valueKeywordFilter}
            /> */}
            <BaseInput
              placeholder="Keyword"
              className="w-full"
              value={valueKeywordFilter}
              onChange={(value) => {
                handleChangeTextKeyword(value);
              }}
              iconLeft={
                <SearchOutlined className="mr-3 text-2xl text-darkNight500" />
              }
            />
          </div>
          <div className="flex gap-3 whitespace-nowrap">
            <Select
              suffixIcon={<CaretDownOutlined />}
              placeholder={t("Thema")}
              style={{ width: 110 }}
              onChange={handleChangeThema}
              options={themas}
            />
            <Select
              suffixIcon={<ArrowUpOutlined />}
              placeholder={t("Advertise")}
              style={{ width: 120 }}
              onChange={handleChangeAdvertise}
              options={[
                {
                  value: SORTING.NONE,
                  label: t("None"),
                },
                {
                  value: SORTING.DESC,
                  label: t("Descending"),
                },
                {
                  value: SORTING.ASC,
                  label: t("Ascending"),
                },
              ]}
            />
            <CustomButton
              className="flex items-start px-4 py-2.5 text-base font-medium leading-6 text-blue-600 whitespace-nowrap rounded border border-blue-600 border-solid"
              icon={
                <PlusOutlined
                  alt="Add icon"
                  className="w-6 shrink-0 aspect-square"
                />
              }
              onClick={() => navigate(Url.newStore)}
            >
              {t("Add")}
            </CustomButton>
          </div>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex justify-between">
            {listButton()}
            <div className="flex gap-3 text-base font-medium leading-6 align-middle h-11 text-neutral-900 align-center">
              <div
                className="flex gap-2 justify-center px-4 py-2.5 rounded-xl border-2 border-gray-200 border-solid cursor-pointer"
                onClick={() => {
                  storeListRef.current?.downloadExcel();
                }}
              >
                <img
                  src={Images.download}
                  alt="Excel download"
                  className="w-6 h-6 shrink-0 aspect-square"
                />
                <span>Download Excel</span>
              </div>
              <div
                className="flex gap-2 justify-center px-4 py-2.5 rounded-xl border-2 border-gray-200 border-solid cursor-pointer"
                onClick={() => {
                  fileExcelRef?.current?.click();
                }}
              >
                <img
                  src={Images.uploadExcel}
                  alt="Excel upload"
                  className="w-6 h-6 shrink-0 aspect-square"
                />
                <span>Upload Excel</span>
                <input
                  ref={fileExcelRef}
                  onChange={handleFileChange}
                  id="fileExcel"
                  type="file"
                  className="hidden"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
              </div>
            </div>
          </div>

          <StoreListTable
            ref={storeListRef}
            thema={selectedThema}
            typeStore={selectedButton}
            typeSorting={selectedSorting}
            valueSearch={valueKeywordFilter}
            onItemStoreClick={(item) => {
              if (
                item.events &&
                item.events.length > 0 &&
                item.events[0].state !== "PENDING"
              ) {
                setIsEdit(true);
                const startDate = dayjs(new Date(+item.events[0].start_time));
                const endDate = dayjs(new Date(+item.events[0].end_time));
                setRangeValue([startDate, endDate]);
                setDescriptionEvent(item.events[0].description);
              } else {
                setIsEdit(false);
              }
              setItemSelectShop(item);
              setOpenModalCreateEvent(true);
            }}
            isUpdate={isUpdateSuccess}
            onRefresh={() => {
              refreshTable();
            }}
            countStore={countStore}
          />
        </DragDropContext>
      </div>
      <BaseModal2
        isOpen={!!openModalCreateEvent}
        title="이벤트+"
        onClose={() => {
          setDescriptionEvent("");
          setRangeValue(null);
          setOpenModalCreateEvent(!openModalCreateEvent);
        }}
        isHideAction
      >
        <BaseInput
          title="Store"
          value={itemSelectShop.title}
          disabled
          styleInputContainer="border border-black border-solid"
        />
        <div className="flex flex-col my-4">
          <BaseText locale bold size={14}>
            행사 기간
          </BaseText>
          <RangePicker
            defaultValue={undefined}
            allowEmpty={[false, false]}
            format={dateFormat}
            onChange={handleRangeChange}
            placeholder={["YYYY.MM.DD", "YYYY.MM.DD"]}
            className="w-full mt-1"
            value={rangeValue}
          />
        </div>

        <BaseInput
          title="행사 설명"
          placeholder="예시) 오후 할인 1만원"
          value={descriptionEvent}
          onChange={(value) => {
            setDescriptionEvent(value);
          }}
          required
          styleInputContainer="border border-black border-solid "
        />
        <div className="flex gap-4 px-6 py-4 border-t border-darkNight100 sm:px-6">
          <BaseButton
            type="default"
            onClick={() => {
              setOpenModalCreateEvent(!openModalCreateEvent);
            }}
          >
            {"Cancel"}
          </BaseButton>
          {isEdit && (
            <BaseButton
              onClick={() => {
                deleteEvent();
              }}
              className="text-sm font-medium text-white bg-red-700 rounded-lg focus:outline-none hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              {"Delete"}
            </BaseButton>
          )}
          <BaseButton
            onClick={() => {
              setOpenModalCreateEvent(false);
              if (isEdit) {
                _editEvent();
              } else {
                _createEvent();
              }
            }}
          >
            {"Confirm"}
          </BaseButton>
        </div>
      </BaseModal2>
    </>
  );
};

export default StorePage;
