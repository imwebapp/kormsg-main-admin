import React, { useEffect, useState } from "react";
import { Table, TableColumnsType, TablePaginationConfig } from "antd";
import BaseText from "../text";
import CustomButton from "../button";
import Images from "../../assets/gen";
import BaseTable from "../table";
import { useTranslation } from "react-i18next";
import { reservationApi } from "../../apis/reservationApi";
import { RESERVATION_STATUS } from "../../utils/constants";
import moment from "moment";
type DashboardReservationProps = {
  isViewAll: boolean;
  className?: string; // for tailwindcss
  selectedButton?: string;
  dateTimeSelect?: any;
};

export default function DashboardReservation(props: DashboardReservationProps) {
  const { className, isViewAll, selectedButton, dateTimeSelect } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [listReservation, setListReservation] = useState<any>();

  const { t } = useTranslation();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {};
  useEffect(() => {
    // field all selected
    const fields =
      '["$all",{"user":["$all"]},{"seller":["$all"]},{"shop":["$all"]}]';
    // STATUS SELECT
    const type =
      selectedButton === RESERVATION_STATUS.ALL
        ? {}
        : { state: selectedButton };
    // TIMESTAMP SELECT RANGE
    const startTimestamp = moment(dateTimeSelect[0]).valueOf();
    const endTimestamp = moment(dateTimeSelect[1]).valueOf();

    const date = startTimestamp
      ? { date: { $gte: startTimestamp, $lte: endTimestamp } }
      : {};
    // filter getlist reservation
    const filter = JSON.stringify({ ...type, ...date });

    reservationApi
      .getList({
        limit: 50,
        fields: fields,
        filter: filter,
        order: [["updated_at", "DESC"]],
      })
      .then((res: any) => {
        setListReservation(res.results.objects.rows);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, [selectedButton, dateTimeSelect]);
  const renderPaymentStatus = (paymentMethod: string) => {
    let text = "";
    let backgroundColor = "";

    switch (paymentMethod) {
      case "MEET_AND_TRANSFER":
        text = "결제완료";
        backgroundColor = "#52C41A";
        break;
      case "MEET_AND_CASH":
        text = "미결제";
        backgroundColor = "#FA541C";
        break;
      default:
        text = "환불완료";
        backgroundColor = "#0866FF";
    }

    return (
      <div
        className="w-20 p-2 rounded-lg bg-green-300 flex items-center justify-center"
        style={{
          backgroundColor: backgroundColor,
        }}
      >
        <span className="text-center text-white">{text}</span>
      </div>
    );
  };

  const renderReservationStatus = (state: string) => {
    let styles = {
      backgroundColor: "",
      color: "",
    };
    let text = "";

    switch (state) {
      case "COMPLETED":
      case "APPROVED":
        styles.backgroundColor = "#F6FFED";
        styles.color = "#52C41A";
        text = "확정";
        break;
      case "REJECTED":
        styles.backgroundColor = "#FFF2E8";
        styles.color = "#FA541C";
        text = "대기중";
        break;
      case "CANCELLED":
        styles.backgroundColor = "#FFF1F0";
        styles.color = "#F5222D";
        text = "대기";
        break;
      default:
        styles.backgroundColor = "#FFF";
        styles.color = "#000";
        text = "대기";
    }

    return (
      <div
        className="w-20 p-2 rounded-lg bg-green-300 flex items-center justify-center"
        style={{
          backgroundColor: styles.backgroundColor,
          color: styles.color,
        }}
      >
        <span className="text-center font-bold">{text}</span>
      </div>
    );
  };
  const formatDateTime = (timestampString: string, type: string) => {
    const timestamp = parseInt(timestampString, 10);

    if (isNaN(timestamp)) {
      return "Invalid timestamp";
    }

    // Tạo đối tượng Date từ timestamp
    const date = new Date(timestamp);

    // Lấy các thành phần của ngày giờ
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Trả về chuỗi ngày giờ định dạng
    return type === "day" ? `${year}/${month}/${day}` : `${hours}:${minutes}`;
  };
  const renderServiceType = (prices: any) => {
    const courseTitle = prices[0]?.course?.title ?? "";
    const runningTime = prices[0]?.course?.running_time ?? "";
    const unit = prices[0]?.course?.unit ?? "";
    const name = prices[0]?.name ?? "";
    const priceValue = prices[0]?.price ?? "";

    return `${courseTitle} ${runningTime} ${unit} ${name} ${priceValue}`;
  };
  const renderPaymentAmount = (paymentAmount: any) => {
    if (paymentAmount && paymentAmount.length > 0) {
      const discount = paymentAmount[0]?.discount;
      return discount ? (
        <span className="text-center font-bold">{discount}</span>
      ) : null;
    }
    return null;
  };
  const columns: TableColumnsType<any> = [
    {
      title: t("Reservation ID"),
      dataIndex: ["user", "email"],
    },
    {
      title: t("User contact information"),
      dataIndex: "contact",
    },
    {
      title: t("Reservation date"),
      dataIndex: "date",
      render: (date) => formatDateTime(date, "day"),
    },
    {
      title: t("Reservation time"),
      dataIndex: "date",
      render: (date) => formatDateTime(date, "hour"),
    },
    {
      title: t("Service type"),
      dataIndex: ["prices"],
      render: (string) => renderServiceType(string),
    },
    {
      title: t("Reservation Status"),
      dataIndex: "state",
      render: (state) => renderReservationStatus(state),
    },
    {
      title: t("Payment status"),
      dataIndex: "paymentMethod",
      render: (status) => renderPaymentStatus(status),
    },
    {
      title: t("Payment amount (₩)"),
      dataIndex: "prices",
      render: (text) => renderPaymentAmount(text),
    },
    {
      title: t("Note"),
      dataIndex: "memo",
    },
    {
      title: t("Number of reservation cancellations"),
      dataIndex: "numberCancel",
      render: (text) => (
        <span className="text-center text-red-500">{text}</span>
      ),
      width: "5%",
    },
    {
      title: t("Number of successful reservations"),
      dataIndex: "numberSuccess",
      width: "5%",
    },
  ];

  return (
    <>
      <div className="flex flex-row justify-between items-center"></div>
      <BaseTable
        className={className}
        pagination={!!isViewAll ? { pageSize: 10 } : false}
        columns={columns}
        data={listReservation}
        // data={data}
      />
    </>
  );
}
