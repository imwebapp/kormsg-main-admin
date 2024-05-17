import { useTranslation } from "react-i18next";
import { BaseTable, BaseText, CustomButton } from "../../../components";
import { ArrowUpOutlined } from "@ant-design/icons";
import { Input, TableColumnsType, notification } from "antd";
import { useEffect, useState } from "react";
import { pointHistoryApi } from "../../../apis/pointHistoryApi";
import { POINT_ACTION_KR, POINT_PRODUCT } from "../../../utils/constants";
import { BaseInputSelect } from "../../../components/input/BaseInputSelect";
import dayjs from "dayjs";
import Images from "../../../assets/gen";
type SortingType = keyof typeof POINT_ACTION_KR;
export default function OrderHistory() {
  const { t } = useTranslation();
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSorting, setSelectedSorting] = useState<SortingType>("ALL");
  const [valueKeywordFilter, setValueKeywordFilter] = useState("");
  const [selectedButton, setSelectedButton] = useState(POINT_PRODUCT.ALL);

  const approveOrderHistory = async (id: string) => {
    try {
      let result: any = await pointHistoryApi.approveOrderHistory(id);
      if (result.code === 200) {
        notification.success({
          message: "Approve Order Success",
        });
        getListOrderHistory();
      }
    } catch (error) {}
  };
  const rejectOrderHistory = async (id: string) => {
    try {
      let result: any = await pointHistoryApi.rejectOrderHistory(id);
      if (result.code === 200) {
        notification.success({
          message: "Reject Order Success",
        });
        getListOrderHistory();
      }
    } catch (error) {}
  };
  const handleChangeTypeReceive = (value: SortingType) => {
    setSelectedSorting(value);
  };
  const handleChangeTextKeyword = (e: any) => {
    setValueKeywordFilter(e.target.value);
  };
  const getListOrderHistory = async () => {
    try {
      const params = {
        fields: JSON.stringify(["$all"]),
        filter: JSON.stringify({
          $or: [
            { user_name: { $iLike: `%${valueKeywordFilter}%` } },
            { user_phone: { $iLike: `%${valueKeywordFilter}%` } },
            { product: { name: { $iLike: `%${valueKeywordFilter}%` } } },
          ],
        }),
      };
      let result: any = await pointHistoryApi.getListOrderHistory(params);
      if (result.code === 200) {
        setData(result.results.objects.rows);
      }
    } catch (error) {}
  };
  let columns: TableColumnsType<any> = [
    {
      title: t("No"),
      render: (text, record, index) => (
        <div className="min-w-[40px]">
          <BaseText>{(currentPage - 1) * 50 + index + 1}</BaseText>
        </div>
      ),
      width: "10%",
    },
    {
      title: t("날짜"),
      dataIndex: ["updated_at"],
      render: (text) => <div>{dayjs(text).format("YYYY/MM/DD")}</div>,
      width: "10%",
    },
    {
      title: t("아이디"),
      dataIndex: ["user_name"],
      width: "10%",
    },
    {
      title: t("보유포인트"),
      dataIndex: ["user_point"],
      render: (text) => (
        <BaseText bold>
          {parseFloat(text).toLocaleString("en-US") + "P"}
        </BaseText>
      ),
    },
    {
      title: t("차감포인트"),
      dataIndex: ["product", "point"],
      render: (text) => (
        <BaseText bold>
          {"-" + parseFloat(text).toLocaleString("en-US") + "P"}
        </BaseText>
      ),
    },
    {
      title: t("신청상품"),
      dataIndex: ["product", "name"],
    },
    {
      title: t("전화번호"),
      dataIndex: ["user_phone"],
    },
    {
      title: t("승인버튼"),
      render: (text, record) => (
        <div className="flex gap-2 justify-center px-3 py-2.5 text-xs font-bold leading-5 text-center text-white whitespace-nowrap">
          {!record.pending && record.sent === false && (
            <button
              className="justify-center px-2 py-1.5 bg-blue-600 rounded-lg"
              onClick={() => {
                approveOrderHistory(record.id);
              }}
            >
              Approve
            </button>
          )}

          {!!record.pending && (
            <button className="justify-center px-2 py-1.5 bg-blue-600 rounded-lg">
              보냈음
            </button>
          )}
          {!record.sent && record.pending === false && (
            <button
              className="justify-center px-2 py-1.5 bg-red-600 rounded-lg"
              onClick={() => {
                rejectOrderHistory(record.id);
              }}
            >
              Reject
            </button>
          )}
          {!!record.sent && (
            <button className="justify-center px-2 py-1.5 bg-red-600 rounded-lg">
              대기
            </button>
          )}
        </div>
      ),
    },
  ];
  const bodyTable = () => {
    return (
      <BaseTable
        maxContent
        sticky={{ offsetHeader: 0 }}
        pagination={{
          pageSize: 50,
        }}
        className="w-full"
        columns={columns}
        data={data}
      />
    );
  };
  const downloadExcel = async () => {
    try {
      const params = {
        fields: JSON.stringify(["$all"]),
        filter: JSON.stringify({
          $or: [
            { user_name: { $iLike: `%${valueKeywordFilter}%` } },
            { user_phone: { $iLike: `%${valueKeywordFilter}%` } },
            { product: { name: { $iLike: `%${valueKeywordFilter}%` } } },
          ],
        }),
        limit: 99999,
        order: JSON.stringify([["created_at", "DESC"]]),
      };
      let result: any = await pointHistoryApi.downloadExcel(params);
      window.open(result.results?.object?.url, "_blank");
    } catch (error) {}
  };
  const getTextColor = (buttonStatus: any) => {
    return buttonStatus === selectedButton ? "white" : "black";
  };
  const listButton = () => {
    const buttonData = [
      {
        status: POINT_PRODUCT.ALL,
        label: t("ALL"),
        count: 0,
      },
      {
        status: POINT_PRODUCT.NOT_APPROVE,
        label: t("미승인"),
        count: 0,
      },
    ];
    const handleButtonClick = (buttonName: POINT_PRODUCT) => {
      setSelectedButton(buttonName);
    };
    const getButtonStyle = (buttonKey: any) => {
      const isSelected = buttonKey === selectedButton;
      return {
        backgroundColor: isSelected ? "black" : "white",
        color: isSelected ? "white" : "black",
      };
    };
    return (
      <div className="flex flex-row gap-4 ">
        {buttonData.map(({ status, label, count }) => (
          <CustomButton
            key={status}
            className="px-4 text-base font-medium rounded-full h-11"
            style={getButtonStyle(status)}
            onClick={() => handleButtonClick(status)}
          >
            <BaseText color={getTextColor(status)} size={16}>
              {label} ({count})
            </BaseText>
          </CustomButton>
        ))}
      </div>
    );
  };
  useEffect(() => {
    getListOrderHistory();
  }, [valueKeywordFilter, selectedSorting]);
  return (
    <div className="p-4 py-0">
      {listButton()}
      <div className="flex gap-2.5 justify-between self-stretch py-2 text-base font-medium max-md:flex-wrap items-center">
        <div className="flex gap-4 text-base font-medium max-w-[651px] max-md:flex-wrap w-full my-4">
          <Input
            className="items-start justify-center flex-1 px-4 py-3 rounded-xl bg-neutral-100 max-md:pr-5"
            placeholder="Keyword"
            onChange={handleChangeTextKeyword}
            value={valueKeywordFilter}
          />
          <BaseInputSelect
            suffixIcon={<ArrowUpOutlined />}
            allowClear={false}
            placeholder={t("Type Product")}
            style={{ width: 160 }}
            onChange={handleChangeTypeReceive}
            options={Object.entries(POINT_ACTION_KR).map(([key, value]) => {
              return {
                value: key,
                label: value,
              };
            })}
            value={selectedSorting}
            defaultValue={selectedSorting}
            customizeStyleSelect={{ singleItemHeightLG: 50 }}
          />
        </div>
        <div
          className="flex gap-2 justify-center px-4 py-2.5 rounded-xl border-2 border-gray-200 border-solid cursor-pointer"
          onClick={() => {
            downloadExcel();
          }}
        >
          <img
            src={Images.download}
            alt="Excel download"
            className="shrink-0 w-6 h-6 aspect-square"
          />
          <span>Download Excel</span>
        </div>
      </div>
      {bodyTable()}
    </div>
  );
}
