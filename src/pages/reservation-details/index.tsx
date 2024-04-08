import BaseCard from "../../components/baseCard";
import {
  CustomButton,
  CustomTimePicker,
  DashboardReservation,
} from "../../components";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RESERVATION_STATUS } from "../../utils/constants";
import { BaseInput } from "../../components/input/BaseInput";
import { SearchOutlined } from "@ant-design/icons";
import { reservationApi } from "../../apis/reservationApi";
const ReservationDetails = () => {
  const [selectedButton, setSelectedButton] = useState(RESERVATION_STATUS.ALL);
  const [dateTimeSelect, setDateTimeSelect] = useState(["", ""]);
  const { t } = useTranslation();
  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };
  const [valueSearch, setValueSearch] = useState("");
  const [data, setData] = useState({
    total: 0,
    pending: 0,
    approve: 0,
    unsuccess: 0,
    complete: 0,
  });

  useEffect(() => {
    const getCountReservation = async () => {
      try {
        let result: any = await reservationApi.getCountReservation();
        if (result.code === 200) {
          setData(result.results.object);
        }
      } catch (error) {}
    };
    getCountReservation();
    return () => {};
  }, []);

  const listButton = () => {
    return (
      <div className="flex flex-row gap-4 mt-1">
        <CustomButton
          className="text-base font-medium rounded-full"
          style={{
            backgroundColor:
              selectedButton === RESERVATION_STATUS.ALL ? "black" : "white",
            color:
              selectedButton === RESERVATION_STATUS.ALL ? "white" : "black",
          }}
          onClick={() => handleButtonClick(RESERVATION_STATUS.ALL)}
        >
          {t("Total reservation details")}
          {"(" + data.total + ")"}
        </CustomButton>
        <CustomButton
          className="text-base font-medium rounded-full"
          style={{
            backgroundColor:
              selectedButton === RESERVATION_STATUS.COMPLETED
                ? "black"
                : "white",
            color:
              selectedButton === RESERVATION_STATUS.COMPLETED
                ? "white"
                : "black",
          }}
          onClick={() => handleButtonClick(RESERVATION_STATUS.COMPLETED)}
        >
          {t("Payment details")}
          {"(" + data.complete + ")"}
        </CustomButton>
        <CustomButton
          className="text-base font-medium rounded-full"
          style={{
            backgroundColor:
              selectedButton === RESERVATION_STATUS.PENDING ? "black" : "white",
            color:
              selectedButton === RESERVATION_STATUS.PENDING ? "white" : "black",
          }}
          onClick={() => handleButtonClick(RESERVATION_STATUS.PENDING)}
        >
          {t("Outstanding Payment History")}
          {"(" + data.pending + ")"}
        </CustomButton>
        <CustomButton
          className="text-base font-medium rounded-full"
          style={{
            backgroundColor:
              selectedButton === RESERVATION_STATUS.CANCELLED
                ? "black"
                : "white",
            color:
              selectedButton === RESERVATION_STATUS.CANCELLED
                ? "white"
                : "black",
          }}
          onClick={() => handleButtonClick(RESERVATION_STATUS.CANCELLED)}
        >
          {t("Cancellation details")}
          {"(" + data.unsuccess + ")"}
        </CustomButton>
        <CustomButton
          className="text-base font-medium rounded-full"
          style={{
            backgroundColor:
              selectedButton === RESERVATION_STATUS.REJECTED
                ? "black"
                : "white",
            color:
              selectedButton === RESERVATION_STATUS.REJECTED
                ? "white"
                : "black",
          }}
          onClick={() => handleButtonClick(RESERVATION_STATUS.REJECTED)}
        >
          {t("Store settlement details")}
          {"(" + data.approve + ")"}
        </CustomButton>
      </div>
    );
  };
  return (
    <div className="p-6">
      <div className="flex flex-row justify-between item-center">
        {listButton()}

        <CustomTimePicker
          range
          onDataChange={({ value, dateString }) => {
            if (dateString) {
              setDateTimeSelect(dateString);
            }
          }}
        />
      </div>
      <div className="flex my-5">
        <BaseInput
          placeholder="Search user"
          className="w-2/4"
          value={valueSearch}
          onChange={(value) => {
            setValueSearch(value);
          }}
          iconLeft={
            <SearchOutlined className="mr-3 text-2xl text-darkNight500" />
          }
        />
      </div>
      <div className="flex flex-row gap-4 mt-4">
        <BaseCard className="flex-1 w-full">
          <DashboardReservation
            isViewAll={true}
            selectedButton={selectedButton}
            dateTimeSelect={dateTimeSelect}
            valueSearch={valueSearch}
          />
        </BaseCard>
      </div>
    </div>
  );
};

export default ReservationDetails;
