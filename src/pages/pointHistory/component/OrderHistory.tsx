import { useTranslation } from "react-i18next";
import { BaseTable, BaseText } from "../../../components";
import { ArrowUpOutlined } from "@ant-design/icons";
import { Input, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { pointHistoryApi } from "../../../apis/pointHistoryApi";
import { POINT_ACTION, POINT_ACTION_KR } from "../../../utils/constants";
import { BaseInputSelect } from "../../../components/input/BaseInputSelect";
import dayjs from "dayjs";
type SortingType = keyof typeof POINT_ACTION_KR;
export default function OrderHistory() {
  const { t } = useTranslation();
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSorting, setSelectedSorting] = useState<SortingType>("ALL");
  const [valueKeywordFilter, setValueKeywordFilter] = useState("");

  const handleChangeTypeReceive = (value: SortingType) => {
    setSelectedSorting(value);
  };
  const handleChangeTextKeyword = (e: any) => {
    setValueKeywordFilter(e.target.value);
  };
  const getListOrderHistory = async () => {
    try {
      const params = {
        fields: JSON.stringify(["$all", { user: ["$all"] }]),
        filter: JSON.stringify({
          $and: [
            {
              $or: {
                "$user.username$": { $iLike: `%${valueKeywordFilter}%` },
                "$user.phone$": { $iLike: `%${valueKeywordFilter}%` },
              },
            },
          ],
        }),
      };
      if (
        selectedSorting !== POINT_ACTION["ALL"] &&
        selectedSorting !== POINT_ACTION_KR["ALL"]
      ) {
        params.filter = JSON.stringify({
          ...JSON.parse(params.filter),
          action: selectedSorting,
        });
      }

      let result: any = await pointHistoryApi.getListReceivePoint(params);
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
      dataIndex: ["user", "username"],
      width: "20%",
    },
    {
      title: t("연락처"),
      dataIndex: ["user", "phone"],
    },
    {
      title: t("포인트 종류"),
      dataIndex: ["action"],
      render: (text: SortingType) => <div>{POINT_ACTION_KR[text]}</div>,
    },
    {
      title: t("차감포인트"),
      dataIndex: ["point"],
      render: (text) => (
        <BaseText bold>
          {parseFloat(text).toLocaleString("en-US") + "P"}
        </BaseText>
      ),
    },
    {
      title: t("차감포인트"),
      dataIndex: ["user", "point"],
      render: (text) => (
        <BaseText bold>
          {parseFloat(text).toLocaleString("en-US") + "P"}
        </BaseText>
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
  useEffect(() => {
    getListOrderHistory();
  }, [valueKeywordFilter, selectedSorting]);
  return (
    <div className="p-4 py-0">
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
      </div>
      {bodyTable()}
    </div>
  );
}
