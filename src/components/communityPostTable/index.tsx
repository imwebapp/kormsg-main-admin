import React, { useRef, useState } from "react";
import { Spin, Table, TableColumnsType, TablePaginationConfig } from "antd";
import BaseText from "../text";
import Images from "../../assets/gen";
import BaseTable from "../table";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { BaseModal2 } from "../modal/BaseModal2";
import { postApi } from "../../apis/postApi";
import { showError, showSuccess } from "../../utils/showToast";
import { CloseOutlined } from "@ant-design/icons";

type CommunityPostProps = {
  data: any[];
  className?: string; // for tailwindcss
  pagination?: {};
  onRefresh?: (value: boolean) => void;
};

export default function CommunityPostTable(props: CommunityPostProps) {
  const { className, data, pagination, onRefresh } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { t } = useTranslation();
  const [listRowSelected, setListRowSelected] = useState<string[]>([]);
  const [openModalDeleteSingleCommunity, setOpenModalDeleteSingleCommunity] =
    useState(false);
  const [openModalDeleteMultiCommunity, setOpenModalDeleteMultiCommunity] =
    useState(false);
  const [loadingScreen, setLoadingScreen] = useState(false);

  const idCommunity = useRef("");

  const navigate = useNavigate();
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setListRowSelected(newSelectedRowKeys as string[]);
  };
  const handleDeleteCommunity = async (type: string) => {
    try {
      setLoadingScreen(true);
      if (type === "single") {
        let result: any = await postApi.deleteSingleCommunity(
          idCommunity.current
        );
        if (result.code === 200) {
          setLoadingScreen(false);
          showSuccess("Delete Community Success");
          if (onRefresh) onRefresh(true);
        }
      } else {
        let result: any = await postApi.deleteMultiCommunity(listRowSelected);
        if (result.code === 200) {
          setListRowSelected([]);
          setLoadingScreen(false);
          showSuccess("Delete Community Success");
          if (onRefresh) onRefresh(true);
        }
      }
    } catch (error) {
      setLoadingScreen(false);
      showError(error);
    }
  };

  const calculateTimeAgo = (timestamp: Date) => {
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const oneHourInMilliseconds = 60 * 60 * 1000;
    const oneMinuteInMilliseconds = 60 * 1000;

    const currentDate = new Date();
    const targetDate = new Date(timestamp);

    const currentDateMilliseconds = currentDate.getTime();
    const targetDateMilliseconds = targetDate.getTime();

    const differenceMilliseconds =
      currentDateMilliseconds - targetDateMilliseconds;

    if (differenceMilliseconds < oneHourInMilliseconds) {
      const differenceMinutes = Math.round(
        differenceMilliseconds / oneMinuteInMilliseconds
      );
      return `${differenceMinutes}${t("minute(s) ago")}`;
    } else if (differenceMilliseconds < oneDayInMilliseconds) {
      const differenceHours = Math.floor(
        differenceMilliseconds / oneHourInMilliseconds
      );
      return `${differenceHours}${t("hour(s) ago")}`;
    } else {
      const differenceDays = Math.floor(
        differenceMilliseconds / oneDayInMilliseconds
      );
      return `${differenceDays}${t("day(s) ago")}`;
    }
  };

  const columns: TableColumnsType<any> = [
    {
      title: t("No"),
      render: (text, record, index) => (
        <div className="min-w-[40px]">
          <BaseText>{index + 1}</BaseText>
        </div>
      ),
      width: 40,
    },
    {
      title: t("Image"),
      render: (record) => (
        <img
          src={record?.images[0] || "https://via.placeholder.com/150"}
          className="w-[150px] h-[100px] rounded-xl"
        />
      ),
      width: 150,
    },
    {
      title: t("Title"),
      dataIndex: "title",
    },
    {
      title: t("Writer"),
      render: (record) => (
        <div className="flex items-center gap-2">
          <img
            src={record?.user?.avatar || Images.avatarEmpty}
            className="rounded-full w-7 h-7"
          />
          <BaseText medium className="">
            {record?.user?.nickname}
          </BaseText>
        </div>
      ),
    },
    {
      title: t("Creation time"),
      render: (record) => (
        <BaseText medium className="">
          {calculateTimeAgo(record?.created_at || 0)}
        </BaseText>
      ),
    },
    {
      title: t("Views"),
      render: (record) => (
        <BaseText medium className="">
          {record?.view || 0}
        </BaseText>
      ),
    },
    {
      title: t("Suggestion"),
      render: (record) => (
        <BaseText medium className="text-polaGreen500">
          {record?.like || 0}
        </BaseText>
      ),
    },
    {
      title: t("The opposite"),
      render: (record) => (
        <BaseText medium className="text-red-500">
          {record?.dislike || 0}
        </BaseText>
      ),
    },
    {
      title: t("Management"),
      render: (text, record) => (
        <div className="flex flex-row items-center w-[50px] gap-2">
          <img
            src={Images.trash}
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              setOpenModalDeleteSingleCommunity(true);
              idCommunity.current = record.id;
            }}
          />
        </div>
      ),
      width: "10%",
    },
  ];

  return (
    <>
      <Spin spinning={loadingScreen} tip="Loading..." size="large" fullscreen />
      <BaseTable
        onSelectChange={onSelectChange}
        className={className}
        pagination={pagination || { pageSize: 10 }}
        columns={columns}
        data={data?.map((item: any) => ({ ...item, key: item.id }))}
      />
      {listRowSelected.length > 0 && (
        <div className="fixed bottom-6 right-1/4 left-1/4">
          <div className="flex gap-6 px-6 py-4 bg-white rounded-lg shadow-xl justify-between">
            <div className="flex justify-center gap-2 px-3 py-3 rounded-full bg-darkNight50">
              <CloseOutlined className="text-xl text-black cursor-pointer" />
              <BaseText bold size={16}>
                {t("선택됨")}{" "}
                <span className="text-primary">{listRowSelected.length}</span>
              </BaseText>
            </div>
            <div className="flex items-center justify-center gap-2">
              <button
                className="justify-center px-6 py-3 text-lg font-bold leading-7 text-white whitespace-nowrap bg-red-600 rounded-[100px] max-md:px-5"
                onClick={() => {
                  setOpenModalDeleteMultiCommunity(true);
                }}
              >
                {t("Delete")}
              </button>
            </div>
          </div>
        </div>
      )}
      <BaseModal2
        isOpen={!!openModalDeleteSingleCommunity}
        onClose={() => {
          setOpenModalDeleteSingleCommunity(false);
        }}
        title="Delete Comment"
        styleButtonConfirm={"bg-rose-500"}
        onSubmit={() => {
          handleDeleteCommunity("single");
          setOpenModalDeleteSingleCommunity(false);
        }}
      >
        <div className="pt-2">
          <BaseText bold locale className="mt-30 mb-5">
            Are you sure you want to delete this post?
          </BaseText>
        </div>
      </BaseModal2>
      <BaseModal2
        isOpen={!!openModalDeleteMultiCommunity}
        onClose={() => {
          setOpenModalDeleteMultiCommunity(false);
        }}
        title="Delete Comment"
        styleButtonConfirm={"bg-rose-500"}
        onSubmit={() => {
          handleDeleteCommunity("multi");
          setOpenModalDeleteMultiCommunity(false);
        }}
      >
        <div className="pt-2">
          <BaseText bold locale className="mt-30 mb-5">
            {`Are you sure you want to delete these ${listRowSelected.length} comments?`}
          </BaseText>
        </div>
      </BaseModal2>
    </>
  );
}
