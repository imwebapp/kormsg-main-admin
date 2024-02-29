import React, { useState } from "react";
import { Table, TableColumnsType, TablePaginationConfig } from "antd";
import BaseText from "../text";
import CustomButton from "../button";
import Images from "../../assets/gen";
import BaseTable from "../table";
import { useTranslation } from "react-i18next";

type DashboardReservationProps = {
  isViewAll: boolean;
  className?: string; // for tailwindcss
};

export default function DashboardReservation(props: DashboardReservationProps) {
  const { className, isViewAll } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { t } = useTranslation();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {};
  const data = [];
  for (let i = 0; i < 12; i++) {
    data.push({
      key: i,
      id: "213123@naver.com",
      phoneNumber: "010-1234-1234",
      reservationDate: "2024-03-15",
      reservationTime: "15:00",
      serviceType: "스파",
      reservationStatus: i,
      paymentStatus: i,
      paymentAmount: "50,000",
      note: "취소 사유: 개인 사정",
      numberCancel: 6,
      numberSuccess: 8,
    });
  }
  const columns: TableColumnsType<any> = [
    {
      title: t("예약 ID"),
      dataIndex: "id",
    },
    {
      title: t("이용자 연락처"),
      dataIndex: "phoneNumber",
    },
    {
      title: t("예약 날짜"),
      dataIndex: "reservationDate",
      // render: (text) => <img className="w-6 h-6" src={Images.android} />,
    },
    {
      title: t("예약 시간"),
      dataIndex: "reservationTime",
    },
    {
      title: t("서비스 유형"),
      dataIndex: "serviceType",
    },
    {
      title: t("예약 상태"),
      dataIndex: "reservationStatus",
      render: (text) => (
        <div
          className="w-20 p-2 rounded-lg bg-green-300 flex items-center justify-center"
          style={{
            backgroundColor: `${
              text % 3 === 0 ? "#F6FFED" : text % 3 == 2 ? "#FFF2E8" : "#FFF1F0"
            }`,
            color: `${
              text % 3 === 0 ? "#52C41A" : text % 3 == 2 ? "#FA541C" : "#F5222D"
            }`,
          }}
        >
          <span className="text-center font-bold">
            {text % 3 === 0 ? "확정" : text % 3 == 2 ? "대기중" : "대기"}
          </span>
        </div>
      ),
    },
    {
      title: t("결제 상태"),
      dataIndex: "paymentStatus",
      render: (text) => (
        <div
          className="w-20 p-2 rounded-lg bg-green-300 flex items-center justify-center"
          style={{
            backgroundColor: `${
              text % 3 === 0 ? "#52C41A" : text % 3 == 2 ? "#FA541C" : "#0866FF"
            }`,
          }}
        >
          <span className="text-center text-white">
            {text % 3 === 0
              ? "결제완료"
              : text % 3 == 2
              ? "미결제"
              : "환불완료"}
          </span>
        </div>
      ),
    },
    {
      title: t("결제 금액 (₩)"),
      dataIndex: "paymentAmount",
      render: (text) => <span className="text-center font-bold">{text}</span>,
    },
    {
      title: t("비고"),
      dataIndex: "note",
    },
    {
      title: t("예약취소 횟수"),
      dataIndex: "numberCancel",
      render: (text) => (
        <span className="text-center text-red-500">{text}</span>
      ),
    },
    {
      title: t("예약성공 횟수"),
      dataIndex: "numberSuccess",
    },
  ];

  return (
    <>
      <div className="flex flex-row justify-between items-center"></div>
      <BaseTable
        className={className}
        pagination={!!isViewAll ? { pageSize: 10 } : false}
        columns={columns}
        data={data}
      />
    </>
  );
}
