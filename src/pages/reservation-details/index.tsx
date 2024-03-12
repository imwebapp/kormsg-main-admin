import BaseCard from "../../components/baseCard";
import {
  CustomButton,
  CustomTimePicker,
  DashboardReservation,
} from "../../components";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RESERVATION_STATUS } from "../../utils/constants";

const ReservationDetails = () => {
  const data = {
    Totalreservationdetails: 84,
    PaymentDetails: 24,
    OutstandingPaymentHistory: 24,
    CancellationDetails: 32,
    StoreSettlementDetails: 69,
  };
  const [selectedButton, setSelectedButton] = useState(RESERVATION_STATUS.ALL);
  const [dateTimeSelect, setDateTimeSelect] = useState(["", ""]);
  const { t } = useTranslation();
  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  const listButton = () => {
    return (
      <div className="flex flex-row gap-4 mt-1">
        <CustomButton
          className="rounded-full font-medium text-base"
          style={{
            backgroundColor:
              selectedButton === RESERVATION_STATUS.ALL ? "black" : "white",
            color:
              selectedButton === RESERVATION_STATUS.ALL ? "white" : "black",
          }}
          onClick={() => handleButtonClick(RESERVATION_STATUS.ALL)}
        >
          {t("Total reservation details")}
          {"(" + data.Totalreservationdetails + ")"}
        </CustomButton>
        <CustomButton
          className="rounded-full font-medium text-base"
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
          {"(" + data.PaymentDetails + ")"}
        </CustomButton>
        <CustomButton
          className="rounded-full font-medium text-base"
          style={{
            backgroundColor:
              selectedButton === RESERVATION_STATUS.PENDING ? "black" : "white",
            color:
              selectedButton === RESERVATION_STATUS.PENDING ? "white" : "black",
          }}
          onClick={() => handleButtonClick(RESERVATION_STATUS.PENDING)}
        >
          {t("Outstanding Payment History")}
          {"(" + data.OutstandingPaymentHistory + ")"}
        </CustomButton>
        <CustomButton
          className="rounded-full font-medium text-base"
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
          {"(" + data.CancellationDetails + ")"}
        </CustomButton>
        <CustomButton
          className="rounded-full font-medium text-base"
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
          {"(" + data.StoreSettlementDetails + ")"}
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
      <div className="flex flex-row gap-4 mt-4">
        <BaseCard className="flex-1 w-full">
          <DashboardReservation
            isViewAll={true}
            selectedButton={selectedButton}
            dateTimeSelect={dateTimeSelect}
          />
        </BaseCard>
      </div>
    </div>
  );
};

export default ReservationDetails;
