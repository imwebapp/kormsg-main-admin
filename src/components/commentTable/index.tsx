import React, { useRef, useState } from "react";
import { Spin, Table, TableColumnsType, TablePaginationConfig } from "antd";
import BaseText from "../text";
import Images from "../../assets/gen";
import BaseTable from "../table";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { convertDateTime } from "../../utils/common";
import { BASE_URL_LINK_POST } from "../../utils/constants";
import { BaseModal2 } from "../modal/BaseModal2";
import { reviewApi } from "../../apis/reviewApi";
import { showError, showSuccess } from "../../utils/showToast";

type CommentProps = {
  data: any[];
  className?: string; // for tailwindcss
  pagination?: {};
  onRefresh?: (value: boolean) => void;
};

export default function CommentTable(props: CommentProps) {
  const { className, data, pagination, onRefresh } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [listRowSelected, setListRowSelected] = useState<string[]>([]);
  const [openModalDeleteComment, setOpenModalDeleteComment] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(false);

  const idComment = useRef("");

  const handleViewPost = (id: string) => {
    const url = `${BASE_URL_LINK_POST}/${id}`;
    window.open(url, "_blank");
  };
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setListRowSelected(newSelectedRowKeys as string[]);
  };
  const handleDeleteComment = async () => {
    try {
      setLoadingScreen(true);
      let result: any = await reviewApi.deleteComment(idComment.current);
      if (result.code === 200) {
        setLoadingScreen(false);
        showSuccess("Delete Comment Success");
        if (onRefresh) onRefresh(true);
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

  const renderType = (record: any) => {
    if (record?.post_id) {
      return (
        <BaseText locale bold className="text-primary">
          Post comments
        </BaseText>
      );
    } else if (record?.shop_id) {
      return (
        <BaseText locale bold className="text-primary">
          Shop comments
        </BaseText>
      );
    } else if (record?.parent_id) {
      return (
        <div className="flex flex-col gap-3">
          <BaseText bold className="text-primary">
            Reply
          </BaseText>
          <div className="flex items-center gap-1">
            <img src={Images.forward} className="w-6 h-6" />
            <img
              src={record?.parent?.user?.avatar || Images.avatarEmpty}
              className="rounded-full w-7 h-7"
            />
            <BaseText medium>
              {record?.parent?.user?.nickname || record?.parent?.user?.username}
            </BaseText>
          </div>
        </div>
      );
    } else {
      return (
        <BaseText locale bold className="text-primary">
          {record?.type}
        </BaseText>
      );
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
      title: t("Type"),
      render: (record) => renderType(record),
    },
    {
      title: t("Contents of comments"),
      render: (record) => (
        <div className="w-full line-clamp-3">
          <BaseText>{record?.content}</BaseText>
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
      title: t("Action"),
      render: (record) => (
        <div
          onClick={() => {
            if (record?.post_id) {
              handleViewPost(record?.post_id);
            }
          }}
        >
          <BaseText
            locale
            medium
            className="underline cursor-pointer text-primary"
          >
            View Post
          </BaseText>
        </div>
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
              setOpenModalDeleteComment(true);
              idComment.current = record.id;
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
      <BaseModal2
        isOpen={!!openModalDeleteComment}
        onClose={() => {
          setOpenModalDeleteComment(false);
        }}
        title="Delete Comment"
        styleButtonConfirm={"bg-rose-500"}
        onSubmit={() => {
          handleDeleteComment();
          setOpenModalDeleteComment(false);
        }}
      >
        <div className="pt-2">
          <BaseText bold locale className="mt-30 mb-5">
            Are you sure you want to delete this Comment?
          </BaseText>
        </div>
      </BaseModal2>
    </>
  );
}
