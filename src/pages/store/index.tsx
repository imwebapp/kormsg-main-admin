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
import Images from "../../assets/gen";
import { Input, Select } from "antd";
import { storeApi } from "../../apis/storeApi";

const StorePage = () => {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState(STORE_STATUS.exposure);
  const [listCategory, setListCategory] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSorting, setSelectedSorting] = useState(SORTING.NONE);
  const data = {
    exposure: 84,
    underReview: 24,
    reviewRejected: 12,
    adExpired: 12,
    eventOngoing: 12,
  };
  const { t } = useTranslation();
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
        transformedData.unshift({ value: "all", label: "all" });
        setListCategory(transformedData);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getListCategory();
    return () => {};
  }, []);

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };
  const handleChangeCategory = (value: string) => {
    setSelectedCategory(value);
  };
  const handleChangeAdvertise = (value: string) => {
    setSelectedSorting(value);
  };
  const listButton = () => {
    return (
      <div className="flex flex-row gap-4 mt-1">
        <CustomButton
          className="text-base font-medium rounded-full px-4 py-2.5 px-4 py-2.5"
          style={{
            backgroundColor:
              selectedButton === STORE_STATUS.exposure ? "black" : "white",
            color: selectedButton === STORE_STATUS.exposure ? "white" : "black",
          }}
          onClick={() => handleButtonClick(STORE_STATUS.exposure)}
        >
          <BaseText
            color={selectedButton === STORE_STATUS.exposure ? "white" : "black"}
            size={16}
          >
            {t("exposure")}
            {"(" + data.exposure + ")"}
          </BaseText>
        </CustomButton>
        <CustomButton
          className="text-base font-medium rounded-full px-4 py-2.5"
          style={{
            backgroundColor:
              selectedButton === STORE_STATUS.underReview ? "black" : "white",
            color:
              selectedButton === STORE_STATUS.underReview ? "white" : "black",
          }}
          onClick={() => handleButtonClick(STORE_STATUS.underReview)}
        >
          <BaseText
            color={
              selectedButton === STORE_STATUS.underReview ? "white" : "black"
            }
            size={16}
          >
            {t("underReview")}
            {"(" + data.underReview + ")"}
          </BaseText>
        </CustomButton>
        <CustomButton
          className="text-base font-medium rounded-full px-4 py-2.5"
          style={{
            backgroundColor:
              selectedButton === STORE_STATUS.reviewRejected
                ? "black"
                : "white",
            color:
              selectedButton === STORE_STATUS.reviewRejected
                ? "white"
                : "black",
          }}
          onClick={() => handleButtonClick(STORE_STATUS.reviewRejected)}
        >
          <BaseText
            color={
              selectedButton === STORE_STATUS.reviewRejected ? "white" : "black"
            }
            size={16}
          >
            {t("reviewRejected")}
            {"(" + data.reviewRejected + ")"}
          </BaseText>
        </CustomButton>
        <CustomButton
          className="text-base font-medium rounded-full px-4 py-2.5"
          style={{
            backgroundColor:
              selectedButton === STORE_STATUS.adExpired ? "black" : "white",
            color:
              selectedButton === STORE_STATUS.adExpired ? "white" : "black",
          }}
          onClick={() => handleButtonClick(STORE_STATUS.adExpired)}
        >
          <BaseText
            color={
              selectedButton === STORE_STATUS.adExpired ? "white" : "black"
            }
            size={16}
          >
            {t("adExpired")}
            {"(" + data.adExpired + ")"}
          </BaseText>
        </CustomButton>
        <CustomButton
          className="text-base font-medium rounded-full px-4 py-2.5"
          style={{
            backgroundColor:
              selectedButton === STORE_STATUS.eventOngoing ? "black" : "white",
            color:
              selectedButton === STORE_STATUS.eventOngoing ? "white" : "black",
          }}
          onClick={() => handleButtonClick(STORE_STATUS.eventOngoing)}
        >
          <BaseText
            color={
              selectedButton === STORE_STATUS.eventOngoing ? "white" : "black"
            }
            size={16}
          >
            {t("eventOngoing")}
            {"(" + data.eventOngoing + ")"}
          </BaseText>
        </CustomButton>
      </div>
    );
  };
  return (
    <div className="p-6">
      <div className="flex gap-2.5 justify-between self-stretch py-2 text-base font-medium leading-6 max-md:flex-wrap items-center">
        {listButton()}
        <div className="flex gap-3 whitespace-nowrap">
          <Select
            suffixIcon={<CaretDownOutlined />}
            placeholder="Category"
            defaultValue="Category"
            style={{ width: 110 }}
            onChange={handleChangeCategory}
            options={listCategory}
          />
          <Select
            suffixIcon={<ArrowUpOutlined />}
            placeholder="Advertise"
            defaultValue="Advertise"
            style={{ width: 110 }}
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
        <div className="flex gap-4 text-base font-medium leading-6 whitespace-nowrap max-w-[651px] max-md:flex-wrap">
          <div className="flex flex-wrap flex-1 gap-2.5 gap-y-2.5 justify-between content-center px-4 py-2.5 rounded-xl border border-solid border-stone-300 text-neutral-900">
            <Select
              suffixIcon={<CaretDownOutlined />}
              bordered={false}
              placeholder="Category"
              defaultValue="Category"
              onChange={handleChangeCategory}
              options={[
                {
                  value: "ID",
                  label: "ID",
                },
                {
                  value: "nickname",
                  label: "nickname",
                },
                {
                  value: "gmail",
                  label: "gmail",
                },
                {
                  value: "title",
                  label: "title",
                },
                {
                  value: "phone number",
                  label: "phone number",
                },
              ]}
              className="flex-1"
            />
          </div>
          <div className="flex-1 justify-center items-start px-4 py-3 rounded-xl bg-neutral-100 text-zinc-400 max-md:pr-5">
            Keyword
          </div>
          <button className="justify-center px-5 py-3 font-bold text-white bg-blue-600 rounded-xl">
            Search
          </button>
        </div>
        <div className="flex justify-center items-start mt-5 p-3 text-base font-medium leading-6 rounded-xl bg-neutral-100">
          <img
            src={Images.search}
            alt="Search user"
            className="shrink-0 w-6 aspect-square self-center"
          />
          <Input variant="borderless" placeholder="Search User" />
        </div>
      </div>
      <StoreListTable
        typeStore={selectedButton}
        category={selectedCategory}
        typeSorting={selectedSorting}
      />
    </div>
  );
};

export default StorePage;
