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
import { formatDateTime } from "../../utils/common";
type DashboardReservationProps = {
  isViewAll: boolean;
  className?: string; // for tailwindcss
  selectedButton?: string;
  dateTimeSelect?: any;
  valueSearch?: string;
  countReservation?: any;
};

export default function DashboardReservation(props: DashboardReservationProps) {
  const {
    className,
    isViewAll,
    selectedButton,
    dateTimeSelect,
    valueSearch,
    countReservation,
  } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [listReservation, setListReservation] = useState<any>();
  const { t } = useTranslation();
  const limit = 50;

  const [currentPage, setCurrentPage] = useState(1);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {};
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
  const handleClick = (id: string) => {
    const url = `${process.env.BASE_URL_LINK_SHOP}/${id}`;
    window.open(url, "_blank");
  };
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
    // Tạo mảng điều kiện "$or"
    const orCondition: any = {};
    if (valueSearch !== "") {
      orCondition["$or"] = [
        { contact: { $iLike: `%${valueSearch}%` } },
        { "$user.nickname$": { $iLike: `%${valueSearch}%` } },
        { "$user.username$": { $iLike: `%${valueSearch}%` } },
        { "$user.email$": { $iLike: `%${valueSearch}%` } },
        { "$seller.nickname$": { $iLike: `%${valueSearch}%` } },
        { "$shop.title$": { $iLike: `%${valueSearch}%` } },
      ];
    }
    const date = startTimestamp
      ? { date: { $gte: startTimestamp, $lte: endTimestamp } }
      : {};
    // filter getlist reservation
    const filter = JSON.stringify({ ...type, ...date, ...orCondition });

    reservationApi
      .getList({
        limit: limit,
        page: currentPage,
        fields: fields,
        filter: filter,
        order: JSON.stringify([["updated_at", "DESC"]]),
      })
      .then((res: any) => {
        setListReservation(res.results.objects.rows);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, [selectedButton, dateTimeSelect, valueSearch, currentPage]);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedButton]);
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
      case "PENDING":
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
      const discount = paymentAmount[0]?.discount
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      return discount ? (
        <span className="text-center font-bold">{discount}</span>
      ) : null;
    }
    return null;
  };
  let columns: TableColumnsType<any> = [
    {
      title: t("Reservation ID"),
      dataIndex: ["user", "email"],
    },
    {
      title: t("Shop information"),
      dataIndex: ["shop", "title"],
      render: (text, record) => (
        <div
          className="min-w-[30px] cursor-pointer"
          onClick={() => handleClick(record.shop.id)}
        >
          {text}
        </div>
      ),
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
  if (selectedButton === RESERVATION_STATUS.REJECTED) {
    const additionalColumns: TableColumnsType<any> = [
      {
        title: t("날짜"),
        dataIndex: ["user", "username"],
        width: "10%",
        render: (text, record) => (
          <div className="min-w-[30px] cursor-pointer">2024-03-15</div>
        ),
      },
      {
        title: t("ID"),
        dataIndex: ["id"],

        render: (text, record) => (
          <div className="min-w-[30px] cursor-pointer">213123@naver.com</div>
        ),
      },
      {
        title: t("매장명"),
        render: (text, record) => (
          <div className="min-w-[30px] cursor-pointer">Happysore</div>
        ),
      },
      {
        title: t("매장계좌번호"),
        render: (text, record) => (
          <div className="min-w-[30px] cursor-pointer">010-1234-1234</div>
        ),
      },
      {
        title: t(" 매장 연락처"),
        render: (text, record) => (
          <div className="min-w-[30px] cursor-pointer">010-1234-1234</div>
        ),
      },
      {
        title: t("총 예약 건수"),
        dataIndex: ["user", "nickname"],
        render: (text, record) => (
          <div className="min-w-[30px] cursor-pointer">12</div>
        ),
      },
      {
        title: t("총 매출액 (₩)"),
        render: (text, record) => (
          <div className="min-w-[30px] cursor-pointer">1,500,000</div>
        ),
      },
      {
        title: t("예약 취소 건"),
        render: (text, record) => (
          <div className="min-w-[30px] cursor-pointer">12</div>
        ),
      },
      {
        title: t("수순매출액 (₩)"),
        render: (text, record) => (
          <div className="min-w-[30px] cursor-pointer">1,500,000</div>
        ),
      },
      {
        title: t("관리자 수수료 (₩)"),
        render: (text, record) => (
          <div className="min-w-[30px] cursor-pointer">1,500,000</div>
        ),
      },
      {
        title: t("매장 수령액 (₩)"),
        render: (text, record) => (
          <div className="min-w-[30px] cursor-pointer">1,500,000</div>
        ),
      },
      {
        title: t("정산 여부"),
        dataIndex: "state",
        render: (state) => renderReservationStatus(state),
      },
      {
        title: t("비고"),
        render: (text, record) => (
          <div className="min-w-[30px] cursor-pointer">
            취소 사유: 개인 사정
          </div>
        ),
      },
    ];
    columns = additionalColumns;
  }
  const getCountTotal = () => {
    switch (selectedButton) {
      case RESERVATION_STATUS.ALL:
        return countReservation.total;
      case RESERVATION_STATUS.COMPLETED:
        return countReservation.complete;
      case RESERVATION_STATUS.REJECTED:
        return countReservation.reject;
      case RESERVATION_STATUS.CANCELLED:
        return countReservation.cancel;
      case RESERVATION_STATUS.APPROVED:
        return countReservation.approve;
      default:
        return 50;
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center"></div>
      <BaseTable
        className={className}
        columns={columns}
        data={listReservation}
        pagination={{
          current: currentPage,
          pageSize: limit,
          total: getCountTotal(),
          onChange: handlePageChange,
        }}
      />
    </>
  );
}
