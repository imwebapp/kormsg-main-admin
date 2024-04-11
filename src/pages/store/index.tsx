import { useNavigate } from "react-router-dom";
import { BaseText, CustomButton, StoreListTable } from "../../components";
import { Url } from "../../routers/paths";
import { useEffect, useState } from "react";
import { SORTING, STORE_STATUS } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import {
  PlusOutlined,
  ArrowUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { DatePicker, GetProps, Input, Select, notification } from "antd";
import { storeApi } from "../../apis/storeApi";
import { BaseInput } from "../../components/input/BaseInput";
import { BaseModal2 } from "../../components/modal/BaseModal2";
import dayjs from "dayjs";
import { eventApi } from "../../apis/eventApi";
import { ThemaInterface } from "../../entities";
import { ThemaApi } from "../../apis/themaApi";
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
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

  const { t } = useTranslation();

  const handleRangeChange = (value: any, dateString?: [string, string]) => {
    if (dateString && dateString[0] !== "" && dateString[1] !== "") {
      const startDate = dayjs(dateString[0], "YYYY.MM.DD");
      const endDate = dayjs(dateString[1], "YYYY.MM.DD");
      setRangeValue([startDate, endDate]);
    }
  };

  const getCountStore = async () => {
    try {
      let resultCount: any = await storeApi.getCountStore();
      if (resultCount.code === 200) {
        setCountStore(resultCount.results.object);
      }
    } catch (error) {}
  };
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
  const resetModal = () => {
    setDescriptionEvent("");
    setRangeValue(null);
  };
  const refreshTable = () => {
    setIsUpdateSuccess(isUpdateSuccess + 1);
    getCountStore();
  };
  useEffect(() => {
    getListThema();
    getCountStore();
    return () => {};
  }, []);

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };
  const handleChangeThema = (value: string) => {
    setSelectedThema(value);
  };
  const handleChangeAdvertise = (value: string) => {
    setSelectedSorting(value);
  };
  const handleChangeTextKeyword = (e: any) => {
    setValueKeywordFilter(e.target.value);
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
      <div className="flex flex-row gap-4 mt-1">
        {buttonData.map(({ status, label, count }) => (
          <CustomButton
            key={status}
            className="text-base font-medium rounded-full px-4 py-2.5"
            style={getButtonStyle(status)}
            onClick={() => handleButtonClick(status)}
          >
            <BaseText color={getTextColor(status)} size={16}>
              {label} ({count})
            </BaseText>
          </CustomButton>
        ))}
      </div>
    );
  };
  return (
    <>
      <div className="p-6">
        <div className="flex gap-2.5 justify-between self-stretch py-2 text-base font-medium leading-6 max-md:flex-wrap items-center">
          {listButton()}
          <div className="flex gap-3 whitespace-nowrap">
            <Select
              suffixIcon={<CaretDownOutlined />}
              placeholder={t("Thema")}
              defaultValue={t("Thema")}
              style={{ width: 110 }}
              onChange={handleChangeThema}
              options={themas}
            />
            <Select
              suffixIcon={<ArrowUpOutlined />}
              placeholder="Advertise"
              defaultValue="Advertise"
              style={{ width: 120 }}
              onChange={handleChangeAdvertise}
              options={[
                {
                  value: SORTING.NONE,
                  label: "none",
                },
                {
                  value: SORTING.DESC,
                  label: "descending",
                },
                {
                  value: SORTING.ASC,
                  label: "ascending",
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
        <div>
          <div className="flex gap-4 text-base font-medium leading-6 whitespace-nowrap max-w-[651px] max-md:flex-wrap my-4">
            <Input
              className="items-start justify-center flex-1 px-4 py-3 rounded-xl bg-neutral-100 max-md:pr-5"
              placeholder="Keyword"
              onChange={handleChangeTextKeyword}
              value={valueKeywordFilter}
            />
          </div>
        </div>
        <StoreListTable
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
        />
      </div>
      <BaseModal2
        isOpen={openModalCreateEvent}
        onSubmit={() => {
          setOpenModalCreateEvent(false);
          if (isEdit) {
            _editEvent();
          } else {
            _createEvent();
          }
        }}
        title="이벤트+"
        onClose={() => {
          setDescriptionEvent("");
          setRangeValue(null);
          setOpenModalCreateEvent(!openModalCreateEvent);
        }}
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
      </BaseModal2>
    </>
  );
};

export default StorePage;
