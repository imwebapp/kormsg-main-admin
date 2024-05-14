import { useEffect, useState } from "react";
import { Pagination } from "antd";
import { BaseText } from "../../../../components";
import { User, classNames, formatTime } from "../../../../utils/common";
import Images from "../../../../assets/gen";
import { conversationApi } from "../../../../apis/conversationApi";
import { useUserChatState } from "../store";
import { ConversationInterface } from "../../../../entities";
interface IProps {
  dataUser?: User;
}
export const ViewLeft = (props: IProps) => {
  const { dataUser } = props;

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;
  const [conversations, setConversations] = useState<ConversationInterface[]>(
    []
  );
  const { conversationSelected, setConversationSelected } = useUserChatState(
    (state) => state
  );
  const getConversation = async () => {
    try {
      setConversationSelected(undefined);
      const params = {
        field: JSON.stringify(["$all", "$user"]),
        filter: JSON.stringify({ user_id: dataUser?.id }),
      };
      const { rows, count } = await conversationApi.getList(params);
      setTotal(count);
      setConversations(rows);
    } catch (error) {
      console.log("errr", error);
    }
  };

  const buildStatus = (item: ConversationInterface) => {
    return (
      // <div>
      //   <BaseText
      //     className={classNames(
      //       item.status === QUESTION_STATUS.COMPLETED
      //         ? "!text-[#2BB81F] bg-[#2BB81F] bg-opacity-30"
      //         : "",
      //       item.status === QUESTION_STATUS.PENDING
      //         ? "!text-[#0078FF] bg-[#0078FF] bg-opacity-30"
      //         : "",
      //       item.status === QUESTION_STATUS.MORE
      //         ? "!text-[#FF1400] bg-[#FF1400] bg-opacity-30"
      //         : "",
      //       "px-[10px] py-1 rounded"
      //     )}
      //     medium
      //     size={12}
      //     locale
      //   >
      //     {/* {QUESTION_STATUS_INFO[item.status || ""].text}1 */}1
      //   </BaseText>
      // </div>
      <div>123</div>
    );
  };
  const buildList = () => {
    return (
      <div className="overflow-auto h-full">
        {conversations.map((item, index) => {
          return (
            <div
              onClick={() => setConversationSelected(item)}
              key={index}
              className={classNames(
                " flex gap-3 self-stretch p-3 rounded-xl px-4 py-3 flex-row flex border-b cursor-pointer",
                conversationSelected?.id === item?.id ? "bg-bgItemActive" : ""
              )}
            >
              <img
                src={item.shop?.thumbnails || Images.userDefault}
                alt="Profile picture "
                className="shrink-0 w-14 h-14 rounded-full"
              />
              <div className="flex flex-col flex-1 my-auto">
                <div className="flex gap-1 justify-between w-full whitespace-nowrap leading-[150%]">
                  <div className="flex gap-1 text-base font-bold text-neutral-900">
                    <BaseText size={16} bold>
                      {item.user?.nickname || ""}
                    </BaseText>
                    <span className="inline-block px-2 py-1 text-sm font-bold leading-5 text-center text-blue-600 whitespace-nowrap bg-indigo-50 rounded">
                      Normal
                    </span>
                  </div>
                  <div className="flex gap-3 justify-center my-auto text-sm font-medium text-slate-500">
                    <BaseText size={14} medium>
                      {formatTime(item.created_at)}
                    </BaseText>
                    <div
                      className="shrink-0 my-auto w-3 h-3 bg-blue-500 rounded-xl"
                      aria-label="Online status indicator"
                    ></div>
                  </div>
                </div>
                <BaseText
                  size={16}
                  className="mt-1 text-base font-medium tracking-tight leading-6 text-slate-500"
                >
                  {item.last_message?.content}
                </BaseText>
              </div>
            </div>
          );
        })}
        {conversations.length > 0 && (
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
        )}
      </div>
    );
  };

  useEffect(() => {
    getConversation();
  }, []);
  return (
    <div className="w-2/5 min-w-[458px] h-full flex flex-col">
      {buildList()}
    </div>
  );
};