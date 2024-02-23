import BaseBarChart from "../../components/barchart";
import BasePieChart from "../../components/piechart";
import BaseCard from "../../components/baseCard";
import CardStatistic from "../../components/cardStatistic";
import Images from "../../assets/gen";
import { useMemo } from "react";
import { BaseText, CustomTimePicker } from "../../components";
import { Radio, Table } from "antd";

const ReservationDetails = () => {
  const dataSource = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
  ];

  const columns = [
    {
      title: "예약 ID ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "이용자 연락처",
      dataIndex: "이용자 연락처",
      key: "이용자 연락처",
    },
    {
      title: "예약 날짜",
      dataIndex: "예약 날짜",
      key: "예약 날짜",
    },
    {
      title: "예약 시간",
      dataIndex: "예약 시간",
      key: "예약 시간",
    },
    {
      title: "서비스 유형",
      dataIndex: "서비스 유형",
      key: "서비스 유형",
    },
    {
      title: "예약 상태",
      dataIndex: "예약 상태",
      key: "예약 상태",
    },
    {
      title: "결제 상태",
      dataIndex: "결제 상태",
      key: "결제 상태",
    },
    {
      title: "결제 금액 (₩)",
      dataIndex: "결제 금액 (₩)",
      key: "결제 금액 (₩)",
    },
    {
      title: "비고",
      dataIndex: "비고",
      key: "비고",
    },
    {
      title: "예약취소 횟수",
      dataIndex: "예약취소 횟수",
      key: "예약취소 횟수",
    },
    {
      title: "예약성공 횟수",
      dataIndex: "예약성공 횟수",
      key: "예약성공 횟수",
    },
  ];
  return (
    <div className="p-6">
      <div className="mt-4 w-full">
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </div>
  );
};

export default ReservationDetails;
