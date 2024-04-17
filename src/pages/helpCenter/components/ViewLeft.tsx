import Images from "../../../assets/gen";
import { BaseInput } from "../../../components/input/BaseInput";
import { SearchOutlined, CheckOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Pagination } from "antd";
import { BaseText } from "../../../components";
import { useEffect, useState } from "react";
import { classNames, convertParams, formatTime } from "../../../utils/common";
import {
  QUESTION_STATUS,
  QUESTION_STATUS_INFO,
} from "../../../utils/constants";
import { QuestionApi } from "../../../apis/questionApi";
import { useHelpCenterState } from "../store";
import { QuestionInterface } from "../../../entities/question.entity";

export const ViewLeft = () => {
  const [filterSelected, setFilterSelected] = useState<string>(
    QUESTION_STATUS.ALL
  );
  const [search, setSearch] = useState<string>("");
  const { questionSelected, setQuestionSelected } = useHelpCenterState(
    (state) => state
  );
  const [questions, setQuestions] = useState<QuestionInterface[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  const items: MenuProps["items"] = Object.values(QUESTION_STATUS).map(
    (item, index) => {
      return {
        key: item,
        label: (
          <div onClick={() => setFilterSelected(item)} className="px-2">
            <BaseText
              locale
              size={16}
              medium
              className={classNames(
                filterSelected === item ? "text-primary" : ""
              )}
            >
              {QUESTION_STATUS_INFO[item].text}
            </BaseText>
            {filterSelected === item && (
              <CheckOutlined
                className={classNames(
                  "ml-5",
                  filterSelected === item ? "text-primary" : ""
                )}
              />
            )}
          </div>
        ),
      };
    }
  );

  const getQuestion = async () => {
    try {
      setQuestionSelected(undefined);
      const { rows, count } = await QuestionApi.getQuestions(
        convertParams({
          limit: limit,
          page,
          order: [["created_at", "DESC"]],
          fields: ["$all", { user: ["$all"] }],
          filter: {
            ...(QUESTION_STATUS.ALL !== filterSelected &&
              filterSelected && { status: filterSelected }),
            ...(search.length > 0 && {
              $and: [
                {
                  $or: {
                    content: { $iLike: `%${search}%` },
                    "$user.nickname$": { $iLike: `%${search}%` },
                  },
                },
              ],
            }),
          },
        })
      );
      setQuestions(rows);
      setTotal(count);
    } catch (error) {
      console.log("errr", error);
    }
  };

  useEffect(() => {
    if (page > 0) getQuestion();
  }, [page]);

  useEffect(() => {
    setPage(0);
    setTimeout(() => {
      setPage(1);
    }, 50);
  }, [filterSelected, search]);

  const buildHeader = () => {
    return (
      <div className="border-b px-6 py-4">
        <div className="flex flex-row justify-between items-center h-[50px]">
          <Dropdown
            menu={{ items }}
            placement="bottomLeft"
            arrow={{ pointAtCenter: true }}
          >
            <img src={Images.filter} className="cursor-pointer w-6 h-6" />
          </Dropdown>
          <BaseInput
            placeholder="Search"
            styleInputContainer="!rounded-full"
            className="ml-6 flex-1"
            onSave={(value) => setSearch(value)}
            onBlur={(value) => setSearch(value)}
            iconLeft={
              <SearchOutlined className="mr-3 text-2xl text-darkNight500" />
            }
          />
        </div>
      </div>
    );
  };

  const buildStatus = (item: QuestionInterface) => {
    return (
      <div>
        <BaseText
          className={classNames(
            item.status === QUESTION_STATUS.COMPLETED
              ? "!text-[#2BB81F] bg-[#2BB81F] bg-opacity-30"
              : "",
            item.status === QUESTION_STATUS.PENDING
              ? "!text-[#0078FF] bg-[#0078FF] bg-opacity-30"
              : "",
            item.status === QUESTION_STATUS.MORE
              ? "!text-[#FF1400] bg-[#FF1400] bg-opacity-30"
              : "",
            "px-[10px] py-1 rounded"
          )}
          medium
          size={12}
          locale
        >
          {QUESTION_STATUS_INFO[item.status || ""].text}
        </BaseText>
      </div>
    );
  };

  const buildList = () => {
    return (
      <div className="overflow-auto h-full">
        {questions.map((item, index) => {
          return (
            <div
              onClick={() => setQuestionSelected(item)}
              key={index}
              className={classNames(
                "px-4 py-3 flex-row flex border-b cursor-pointer",
                questionSelected?.id === item?.id ? "bg-bgItemActive" : ""
              )}
            >
              <img
                className="w-11 h-11 rounded-full object-cover"
                src={item.user?.avatar || Images.userDefault}
              />
              <div className="flex flex-1 flex-col ml-4">
                <div className="flex flex-row items-center">
                  <BaseText size={16} bold>
                    {item.user?.nickname || ""}
                  </BaseText>
                  <div className="mx-4 w-1.5 h-1.5 rounded-full bg-black"></div>
                  <BaseText size={14} medium>
                    {formatTime(item.created_at)}
                  </BaseText>
                </div>
                <div className="flex flex-row items-center">
                  <BaseText size={14} medium>
                    ({item.user?.username || ""})
                  </BaseText>
                  <BaseText size={14} medium className="ml-1">
                    {item.user?.phone || ""}
                  </BaseText>
                </div>
                <BaseText size={16} className="mt-2 line-clamp-2">
                  {item.content}
                </BaseText>
              </div>
              {buildStatus(item)}
            </div>
          );
        })}
        <div className="flex flex-row justify-end p-6">
          <Pagination
            current={page}
            onChange={(page: number, pageSize: number) => {
              setPage(page);
            }}
            total={total}
            pageSize={limit}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="w-2/5 min-w-[458px] h-[calc(100vh-72px)] flex flex-col">
      {buildHeader()}
      {buildList()}
    </div>
  );
};
