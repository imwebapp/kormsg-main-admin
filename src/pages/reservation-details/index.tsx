import BaseCard from "../../components/baseCard";
import {
  CustomButton,
  CustomTimePicker,
  DashboardReservation,
} from "../../components";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getMethod } from "../../utils/request";


const ReservationDetails = () => {
  const data = {
    Totalreservationdetails: 84,
    PaymentDetails: 24,
    OutstandingPaymentHistory: 24,
    CancellationDetails: 32,
    StoreSettlementDetails: 69,
  };
  const [selectedButton, setSelectedButton] = useState("");
  const { t } = useTranslation();
  const [listReservation, setListReservation] = useState<any>();
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
              selectedButton === "Totalreservationdetails" ? "black" : "white",
            color:
              selectedButton === "Totalreservationdetails" ? "white" : "black",
          }}
          onClick={() => handleButtonClick("Totalreservationdetails")}
        >
          {t("Total reservation details")}
          {"(" + data.Totalreservationdetails + ")"}
        </CustomButton>
        <CustomButton
          className="rounded-full font-medium text-base"
          style={{
            backgroundColor:
              selectedButton === "PaymentDetails" ? "black" : "white",
            color: selectedButton === "PaymentDetails" ? "white" : "black",
          }}
          onClick={() => handleButtonClick("PaymentDetails")}
        >
          {t("Payment details")}
          {"(" + data.PaymentDetails + ")"}
        </CustomButton>
        <CustomButton
          className="rounded-full font-medium text-base"
          style={{
            backgroundColor:
              selectedButton === "OutstandingPaymentHistory"
                ? "black"
                : "white",
            color:
              selectedButton === "OutstandingPaymentHistory"
                ? "white"
                : "black",
          }}
          onClick={() => handleButtonClick("OutstandingPaymentHistory")}
        >
          {t("Outstanding Payment History")}
          {"(" + data.OutstandingPaymentHistory + ")"}
        </CustomButton>
        <CustomButton
          className="rounded-full font-medium text-base"
          style={{
            backgroundColor:
              selectedButton === "CancellationDetails" ? "black" : "white",
            color: selectedButton === "CancellationDetails" ? "white" : "black",
          }}
          onClick={() => handleButtonClick("CancellationDetails")}
        >
          {t("Cancellation details")}
          {"(" + data.CancellationDetails + ")"}
        </CustomButton>
        <CustomButton
          className="rounded-full font-medium text-base"
          style={{
            backgroundColor:
              selectedButton === "StoreSettlementDetails" ? "black" : "white",
            color:
              selectedButton === "StoreSettlementDetails" ? "white" : "black",
          }}
          onClick={() => handleButtonClick("StoreSettlementDetails")}
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
        <CustomTimePicker range />
      </div>
      <div className="flex flex-row gap-4 mt-4">
        <BaseCard className="flex-1 w-full">
          <DashboardReservation isViewAll={true} />
        </BaseCard>
      </div>
    </div>
  );
};

export default ReservationDetails;
