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
  const [countReservation, setCountReservation] = useState({
    total: 0,
    pending: 0,
    approve: 0,
    unsuccess: 0,
    complete: 0,
    reject: 0,
    cancel: 0,
  });

  useEffect(() => {
    const getCountReservation = async () => {
      try {
        let result: any = await reservationApi.getCountReservation();
        if (result.code === 200) {
          setCountReservation(result.results.object);
        }
      } catch (error) {}
    };
    getCountReservation();
    return () => {};
  }, []);

  const listButton = () => {
    // Mảng chứa thông tin cho mỗi nút
    const buttons = [
      {
        status: RESERVATION_STATUS.ALL,
        label: t("Total reservation details"),
        count: countReservation.total,
      },
      {
        status: RESERVATION_STATUS.COMPLETED,
        label: t("Payment details"),
        count: countReservation.complete,
      },
      {
        status: RESERVATION_STATUS.PENDING,
        label: t("Outstanding Payment History"),
        count: countReservation.pending,
      },
      {
        status: RESERVATION_STATUS.CANCELLED,
        label: t("Cancellation details"),
        count: countReservation.cancel,
      },
      {
        status: RESERVATION_STATUS.REJECTED,
        label: t("Store settlement details"),
        count: countReservation.reject,
      },
    ];

    return (
      <div className="flex flex-row gap-4 mt-1">
        {buttons.map((button) => (
          <CustomButton
            key={button.status}
            className="text-base h-11 font-medium rounded-full px-4 py-2.5"
            style={{
              backgroundColor:
                selectedButton === button.status ? "black" : "white",
              color: selectedButton === button.status ? "white" : "black",
            }}
            onClick={() => handleButtonClick(button.status)}
          >
            {button.label} ({button.count})
          </CustomButton>
        ))}
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
            countReservation={countReservation}
          />
        </BaseCard>
      </div>
    </div>
  );
};

export default ReservationDetails;
