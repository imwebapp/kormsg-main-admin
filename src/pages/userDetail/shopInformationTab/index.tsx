import { useNavigate } from "react-router-dom";
import { User, classNames } from "../../../utils/common";
import { BaseText, CustomButton } from "../../../components";
import { useEffect, useState } from "react";
import { ItemShop } from "./components";
import { useTranslation } from "react-i18next";
import { shopApi } from "../../../apis/shopApi";
import { CloseOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { BaseModal2 } from "../../../components/modal/BaseModal2";
import dayjs from "dayjs";
import { BaseInput } from "../../../components/input/BaseInput";
import { App, DatePicker, Popconfirm, Popover, Spin } from "antd";
import { BaseInputSelect } from "../../../components/input/BaseInputSelect";
import { userApi } from "../../../apis/userApi";
import { BASE_URL_LINK_SHOP } from "../../../utils/constants";

const ListTabBar = [
  {
    title: "Announcement",
    value: "APPROVED",
    data: [],
    count: 0,
  },
  {
    title: "Expiration",
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
const { RangePicker } = DatePicker;
const dateFormat = "YYYY.MM.DD";

interface IProps {
  dataUser: User;
}

export const ShopInformationTab = (props: IProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { message } = App.useApp();
  const [dataUser, setDataUser] = useState<User>(props.dataUser);
  console.log("dataUser ShopInformationTab", dataUser);

  const [loadingScreen, setLoadingScreen] = useState(false);

  const [listShopSelected, setListShopSelected] = useState<any[]>([]);
  const [tabSelected, setTabSelected] = useState<{
    title: string;
    value: string;
    data: {
      id: string;
      avatar?: string;
      name: string;
      timeStart?: string;
      timeEnd?: string;
      tag_ids: string[];
      shop_tags: any[];
    }[];
    count: number;
  }>(ListTabBar[0]);
  const [openModalCreateEvent, setOpenModalCreateEvent] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [rangeValue, setRangeValue] = useState<any>(null);
  const [valueAddDay, setValueAddDay] = useState<number>();
  const [valueMinusDay, setValueMinusDay] = useState<number>();

  const [formDataAddEvent, setFormDataAddEvent] = useState<any>({
    shop_id: "",
    description: "",
    start_time: "",
    end_time: "",
    images: [],
  });

  const checkCount = (type: string) => {
    switch (type) {
      case "APPROVED":
        return dataUser.current_active_post;
      case "EXPIRED":
        return dataUser.current_expired_post;
      case "Recommended store":
        return dataUser.current_recommendation_post;
      case "During the event":
        return dataUser.current_on_event_shop;
      default:
        return 0;
    }
  };

  const handleRangeChange = (value: any, dateString?: [string, string]) => {
    if (dateString && dateString[0] !== "" && dateString[1] !== "") {
      const startDate = dayjs(dateString[0], "YYYY.MM.DD");
      const endDate = dayjs(dateString[1], "YYYY.MM.DD");
      setRangeValue([startDate, endDate]);
    }
  };

  const handleShopSelected = (selectedItems: { id: string; checked: boolean }) => {
    if (selectedItems.checked) {
      !(listShopSelected.find((item) => item === selectedItems.id)) && setListShopSelected([...listShopSelected, selectedItems.id]);
    } else {
      setListShopSelected(listShopSelected.filter((item) => item !== selectedItems.id));
    }
  };
  const handleClickShop = (id: string | number) => {
    console.log("id Shop: ", id);
    // const url = `${BASE_URL_LINK_SHOP}/${id}`;
    // window.open(url, "_blank");
  };

  const handleMinusDay = async () => {
    if (valueMinusDay && valueMinusDay > 0) {
      try {
        setLoadingScreen(true);
        const listIdUpdate = JSON.stringify(listShopSelected);
        const dataUpdate = {
          days: valueMinusDay,
        };
        const resUpdateDate: any = await shopApi.updateForceExpiredMultiple(listIdUpdate, dataUpdate)
        if (resUpdateDate.code === 200) {
          setLoadingScreen(false);
          _getListShop()
          _getUser();
          setValueMinusDay(undefined);
          setListShopSelected([]);
          message.success("Update success");

        }
      }
      catch (error) {
        setLoadingScreen(false);
        console.log("error update minus time", error);
        message.error("Update failed");
      }
    }
  };

  const handleAddDay = async () => {
    if (valueAddDay && valueAddDay > 0) {
      try {
        setLoadingScreen(true);
        const listIdUpdate = JSON.stringify(listShopSelected);
        const dataUpdate = {
          days: valueAddDay,
        };
        const resUpdateDate: any = await shopApi.updateExpirationDateMultiple(listIdUpdate, dataUpdate)
        if (resUpdateDate.code === 200) {
          setLoadingScreen(false);
          _getListShop()
          _getUser();
          setValueAddDay(undefined);
          setListShopSelected([]);
          message.success("Update success");
        }
      }
      catch (error) {
        setLoadingScreen(false);
        console.log("error update add time", error);
        message.error("Update failed");
      }
    }
  };


  const _createEvent = async () => {
    try {
      const timeStampStart = dayjs(rangeValue[0]).valueOf();
      const timeStampEnd = dayjs(rangeValue[1]).valueOf();
    } catch (error) {
      console.log("error", error);
    }
  };

  const _editEvent = async () => {
    try {
      const timeStampStart = dayjs(rangeValue[0]).valueOf();
      const timeStampEnd = dayjs(rangeValue[1]).valueOf();
    } catch (error: any) {
    }
  };

  const _getUser = () => {
    userApi.getUser(dataUser.id, {
      fields: JSON.stringify(["$all"]),
      filter: JSON.stringify({}),
    })
      .then((res: any) => {
        setDataUser({
          ...dataUser,
          current_active_post: res?.results?.object?.current_active_post,
          current_expired_post: res?.results?.object?.current_expired_post,
          current_recommendation_post: res?.results?.object?.current_recommendation_post,
          current_on_event_shop: res?.results?.object?.current_on_event_shop,
        })
      })
      .catch((err) => {
        console.log("err get User ", err);
      });
  };

  const _getListShop = () => {
    let convertFields: any = [
      "$all",
      { user: ["$all"] },
      { category: ["$all", { thema: ["$all"] }] },
      { events: ["$all"] },
      { shop_tags: ["$all"] },
    ];

    const convertFieldsDuringTheEvent: any = [
      "$all", { events: ["$all", { "$filter": {} }] },
      { shop_tags: ["$all"] },
    ];

    const convertFilter: any = {
      user_id: `${dataUser.id}`,
    };
    switch (tabSelected.value) {
      case "APPROVED":
        convertFilter['$or'] = [
          { denied_shop: { $ne: null } },
          { state: { $in: ['APPROVED'] } },
        ];
        break;
      case "EXPIRED":
        convertFilter['$or'] = [
          { denied_shop: { $ne: null } },
          { state: { $in: ['EXPIRED'] } },
        ];
        break;
      case "Recommended store":
        convertFilter['is_random_20_shop'] = true;
        convertFilter['state'] = { $in: ['APPROVED'] };
        break;
      case "During the event":
        convertFields = convertFieldsDuringTheEvent;
        convertFilter['state'] = { $not: ['EXPIRED'] };
        break;
      default:
        convertFilter['$or'] = [
          { denied_shop: { $ne: null } },
          { state: { $in: ['APPROVED'] } },
        ];
        break;
    }

    setLoadingScreen(true);
    shopApi
      .getList({
        fields: JSON.stringify(convertFields),
        filter: JSON.stringify(convertFilter),
        limit: 50,
        page: 1,
      })
      .then((res: any) => {
        setLoadingScreen(false);
        setTabSelected({
          ...tabSelected,
          data: res.results.objects.rows
        });
      })
      .catch((err) => {
        setLoadingScreen(false);
        console.log("err getList SHOP API", err);
      });
  }

  useEffect(() => {
    _getListShop()
    setListShopSelected([]);
  }, [tabSelected.value]);

  useEffect(() => {
    _getUser()
  }, []);

  return (
    <>
      <Spin spinning={loadingScreen} tip="Loading..." size="large" className="relative">
        <div className="flex w-full">
          {ListTabBar.map((item, index) => {
            return (
              <div
                onClick={() => setTabSelected(item)}
                key={index}
                className={
                  "flex w-1/4 items-center justify-center pt-6 cursor-pointer border-b"
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
                  {tabSelected?.value === item.value ? (
                    <div className="w-full h-1 bg-dayBreakBlue500 rounded-t-xl" />
                  ) : (
                    <div className="w-full h-1" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Spin>
      <div className="max-h-full overflow-y-auto">
        <div className="grid grid-cols-3 gap-4 p-6 ">
          {(tabSelected?.data || []).map((item: any, index) => (
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
              hashtag={(item?.shop_tags || []).map((item: any) => `#${item.name}`)}
              item={item}
              onClick={(id) => handleClickShop(id)}
              className=""
              onShopSelected={handleShopSelected}
              isUnCheck={listShopSelected.length === 0}
            />
          ))}
        </div>
        {listShopSelected.length > 0 && <div className="fixed bottom-6 right-6 left-1/4">
          <div className="flex gap-6 px-6 py-4 bg-white rounded-lg shadow-xl">
            <div className="flex justify-center gap-2 px-3 py-3 rounded-full bg-darkNight50">
              <CloseOutlined className="text-xl text-black cursor-pointer" />
              <BaseText bold size={16} >{t('선택됨')} <span className="text-primary">{listShopSelected.length}</span></BaseText>
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
                          <BaseText locale bold>일</BaseText>
                        }
                        type="number"
                        value={valueMinusDay}
                        onChange={(value) => { setValueMinusDay(value) }}
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
                          <BaseText locale bold>일</BaseText>
                        }
                        type="number"
                        value={valueAddDay}
                        onChange={(value) => { setValueAddDay(value) }}
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
              <BaseText locale size={16} bold className="text-center">기간을 입력해주세요</BaseText>
            </div>
          </div>
        </div>}
        <div className="fixed px-6 py-3 rounded-full shadow-xl cursor-pointer bg-dayBreakBlue500 right-8 bottom-10" onClick={() => setOpenModalCreateEvent(true)}>
          <BaseText locale bold size={16} color="text-white">이벤트+</BaseText>
        </div>
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
          setFormDataAddEvent({
            shop_id: "",
            description: "",
            start_time: "",
            end_time: "",
            images: [],
          });
          setRangeValue(null);
          setOpenModalCreateEvent(false);
        }}
      >
        <BaseInputSelect
          title="Store"
          defaultValue={formDataAddEvent.shop_id || undefined}
          value={formDataAddEvent.shop_id || undefined}
          onChange={() => { }}
          placeholder="Select"
          options={(tabSelected?.data || []).map((item: any) => ({
            value: item.id,
            label: t(item.title),
          }))}
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
          value={formDataAddEvent.description}
          onChange={(value) => {
            setFormDataAddEvent({ ...formDataAddEvent, description: value });
          }}
          required
        />
      </BaseModal2>
    </>
  );
};
