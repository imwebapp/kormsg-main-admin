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
import { Input, Select } from "antd";
import { storeApi } from "../../apis/storeApi";
import { BaseModal } from "../../components/modal/BaseModal";

const StorePage = () => {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState(STORE_STATUS.exposure);
  const [countStore, setCountStore] = useState({
    countShopPending: 0,
    countShopActive: 0,
    countShopReject: 0,
    countShopExpired: 0,
    countShopOnEvent: 0,
  });
  const [listCategory, setListCategory] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSorting, setSelectedSorting] = useState(SORTING.NONE);
  const [selectedFilterUser, setSelectedFilterUser] = useState("ID");
  const [valueKeywordFilter, setValueKeywordFilter] = useState("");
  const [filter, setFilter] = useState<any>();
  const data = {
    exposure: 84,
    underReview: 24,
    reviewRejected: 12,
    adExpired: 12,
    eventOngoing: 23,
  };
  const { t } = useTranslation();
  const getCountStore = async () => {
    try {
      let resultCount: any = await storeApi.getCountStore();
      console.log();
      if (resultCount.code === 200) {
        setCountStore(resultCount.results.object);
      }
    } catch (error) {}
  };
  const getListCategory = async () => {
    try {
      let result: any = await storeApi.getListCategory({
        limit: 50,
        fields: '["name"]',
      });
      console.log("result", result);
      if (result.code === 200) {
        const transformedData = result?.results?.objects.rows.map(
          (item: { id: any; name: any }) => ({
            value: item.id,
            label: item.name,
          })
        );
        // add item to first array
        transformedData.unshift({ value: "all", label: t("All") });
        setListCategory(transformedData);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getListCategory();
    getCountStore();
    return () => {};
  }, []);

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };
  const handleChangeCategory = (value: string) => {
    setSelectedCategory(value);
  };
  const handleChangeFilter = (value: string) => {
    setSelectedFilterUser(value);
  };
  const handleChangeAdvertise = (value: string) => {
    setSelectedSorting(value);
  };
  const handleChangeTextKeyword = (e: any) => {
    setValueKeywordFilter(e.target.value);
  };
  const handleSearch = () => {
    const newFilter = { type: selectedFilterUser, value: valueKeywordFilter };
    setFilter(newFilter);
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
              placeholder={t("All")}
              defaultValue={t("All")}
              style={{ width: 110 }}
              onChange={handleChangeCategory}
              options={listCategory}
            />
            <Select
              suffixIcon={<ArrowUpOutlined />}
              placeholder="None"
              defaultValue="None"
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
                  className="shrink-0 w-6 aspect-square"
                />
              }
            >
              {t("Add")}
            </CustomButton>
          </div>
        </div>
        <div>
          <div className="flex gap-4 text-base font-medium leading-6 whitespace-nowrap max-w-[651px] max-md:flex-wrap my-4">
            <div className="flex flex-wrap flex-1 gap-2.5 gap-y-2.5 justify-between content-center px-4 py-2.5 rounded-xl border border-solid border-stone-300 text-neutral-900">
              <Select
                suffixIcon={<CaretDownOutlined />}
                bordered={false}
                placeholder="ID"
                defaultValue="ID"
                onChange={handleChangeFilter}
                options={[
                  {
                    value: "username",
                    label: "ID",
                  },
                  {
                    value: "nickname",
                    label: "nickname",
                  },
                  {
                    value: "email",
                    label: "gmail",
                  },
                  {
                    value: "title",
                    label: "title",
                  },
                  {
                    value: "contact_phone",
                    label: "Phone number",
                  },
                ]}
                className="flex-1"
              />
            </div>
            <Input
              className="flex-1 justify-center items-start px-4 py-3 rounded-xl bg-neutral-100 text-zinc-400 max-md:pr-5"
              placeholder="Keyword"
              onChange={handleChangeTextKeyword}
              value={valueKeywordFilter}
            />
            <CustomButton
              className=" justify-center self-center px-5 py-3 font-bold text-white bg-blue-600 rounded-xl h-full"
              onClick={handleSearch}
            >
              {t("Search")}
            </CustomButton>
          </div>
        </div>
        <StoreListTable
          category={selectedCategory}
          typeStore={selectedButton}
          typeSorting={selectedSorting}
          filter={filter}
        />
      </div>
      <BaseModal
        isOpen={true}
        onSubmit={() => {
          console.log("submit");
        }}
      >
        <div>1233</div>
      </BaseModal>
    </>
  );
};

export default StorePage;
