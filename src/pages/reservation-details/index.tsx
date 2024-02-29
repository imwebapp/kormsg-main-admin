import BaseCard from "../../components/baseCard";
import {
  CustomButton,
  CustomTimePicker,
  DashboardReservation,
} from "../../components";
import { useEffect, useState } from "react";
const ReservationDetails = () => {
  const data = {
    Totalreservationdetails: 84,
    PaymentDetails: 24,
    OutstandingPaymentHistory: 24,
    CancellationDetails: 32,
    StoreSettlementDetails: 69,
  };
  const [selectedButton, setSelectedButton] = useState("");

  const handleButtonClick = (buttonName: string) => {
    console.log("123", buttonName);

    setSelectedButton(buttonName);
  };
  useEffect(() => {
    console.log("selectedButton", selectedButton);
  }, [selectedButton]);
  const listButton = () => {
    return (
      <div className="flex flex-row gap-4 mt-1">
        <CustomButton
          className="rounded-full font-medium text-base items-center justify-center pb-8"
          style={{
            backgroundColor:
              selectedButton === "Totalreservationdetails" ? "black" : "white",
            color:
              selectedButton === "Totalreservationdetails" ? "white" : "black",
          }}
          onClick={() => handleButtonClick("Totalreservationdetails")}
        >
          총 예약내역 {"(" + data.Totalreservationdetails + ")"}
        </CustomButton>
        <CustomButton
          className="rounded-full font-medium text-base items-center justify-center pb-8"
          style={{
            backgroundColor:
              selectedButton === "PaymentDetails" ? "black" : "white",
            color: selectedButton === "PaymentDetails" ? "white" : "black",
          }}
          onClick={() => handleButtonClick("PaymentDetails")}
        >
          결제내역 {"(" + data.PaymentDetails + ")"}
        </CustomButton>
        <CustomButton
          className="rounded-full font-medium text-base items-center justify-center pb-8"
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
          미결제 내역 {"(" + data.OutstandingPaymentHistory + ")"}
        </CustomButton>
        <CustomButton
          className="rounded-full font-medium text-base items-center justify-center pb-8"
          style={{
            backgroundColor:
              selectedButton === "CancellationDetails" ? "black" : "white",
            color: selectedButton === "CancellationDetails" ? "white" : "black",
          }}
          onClick={() => handleButtonClick("CancellationDetails")}
        >
          취소내역 {"(" + data.CancellationDetails + ")"}
        </CustomButton>
        <CustomButton
          className="rounded-full font-medium text-base items-center justify-center pb-8"
          style={{
            backgroundColor:
              selectedButton === "StoreSettlementDetails" ? "black" : "white",
            color:
              selectedButton === "StoreSettlementDetails" ? "white" : "black",
          }}
          onClick={() => handleButtonClick("StoreSettlementDetails")}
        >
          매장 정산내역 {"(" + data.StoreSettlementDetails + ")"}
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
