import { useEffect, useState } from "react";

import { Modal } from "antd";
import { AnswerInterface } from "../../../../entities/answer.entity";
import { useLocalStorage } from "../../../../stores/localStorage";
import { BaseText } from "../../../../components";
import Images from "../../../../assets/gen";
import { classNames, formatTimeFull } from "../../../../utils/common";
import { useUserChatState } from "../store";
import { conversationApi } from "../../../../apis/conversationApi";
export const ViewRight = () => {
  const { conversationSelected, setConversationSelected } = useUserChatState(
    (state) => state
  );
  const { locale } = useLocalStorage((state) => state);
  const [displayImg, setDisplayImg] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);

  const getConversation = async () => {
    try {
      const params = {
        fields: JSON.stringify([
          "$all",
          {
            conversation: [
              "$all",
              { user: ["$all"] },
              { shop: ["$all", { user: ["$all"] }] },
            ],
          },
          { user: ["$all"] },
          { shop: ["$all", { user: ["$all"] }] },
        ]),
      };
      console.log("params", params);

      const { rows, count } = await conversationApi.getDetailConversation(
        conversationSelected?.id,
        params
      );
      setMessages(rows);
      console.log("row", rows);
    } catch (error) {
      console.log("errr", error);
    }
  };

  useEffect(() => {
    if (conversationSelected) getConversation();
  }, [conversationSelected]);

  // const buildHeader = () => {
  //   return (
  //     <>
  //       <div className="p-4 border-b flex flex-col  justify-between items-start questionSelected?s-center px-6">
  //         <div className="flex flex-row h-[50px] ">
  //           <img
  //             onClick={() =>
  //               setDisplayImg(questionSelected?.user?.avatar ?? "")
  //             }
  //             className="w-11 h-11 rounded-full object-cover cursor-pointer"
  //             src={questionSelected?.user?.avatar || Images.userDefault}
  //           />
  //           <div className="flex flex-1 flex-col ml-4">
  //             <div className="flex flex-row questionSelected?s-center">
  //               <BaseText size={16} bold>
  //                 {questionSelected?.user?.nickname || ""}
  //               </BaseText>
  //             </div>
  //             <div className="flex flex-row questionSelected?s-center">
  //               <BaseText size={14} medium>
  //                 ({questionSelected?.user?.username || ""})
  //               </BaseText>
  //               <BaseText size={14} medium className="ml-1">
  //                 {questionSelected?.user?.phone || ""}
  //               </BaseText>
  //             </div>
  //           </div>
  //         </div>
  //         <BaseText>{questionSelected?.content || ""}</BaseText>
  //         {questionSelected?.images && questionSelected?.images[0] && (
  //           <div className="mt-2 flex flex-wrap flex-row gap-2">
  //             {questionSelected?.thumbnails?.map((item) => (
  //               <div>
  //                 <img
  //                   onClick={() => setDisplayImg(item)}
  //                   className="w-14 h-14 rounded object-cover"
  //                   src={item}
  //                 />
  //               </div>
  //             ))}
  //           </div>
  //         )}
  //       </div>
  //     </>
  //   );
  // };

  const buildAdminMessage = (item: any) => {
    return (
      <div className="flex flex-row justify-end mt-4 ">
        <div className="flex flex-col buildStatus w-2/3 items-end">
          <div className="flex flex-row  gap-x-2">
            {item?.content && item?.content?.length > 0 && (
              <div className=" bg-[#DBE6FE] px-6 py-3 rounded-xl rounded-tr-none">
                <BaseText medium size={16}>
                  {item?.content || ""}
                </BaseText>
              </div>
            )}
            <img
              src={item?.shop?.user?.avatar || Images.logo}
              className="w-11 h-11 rounded-full"
            />
          </div>
          {item?.images && item?.images[0] && (
            <div className="mt-2 flex flex-wrap flex-row gap-2">
              {item?.images?.map((item: string) => (
                <div>
                  <img
                    onClick={() => setDisplayImg(item)}
                    className="w-14 h-14 rounded object-cover cursor-pointer"
                    src={item}
                  />
                </div>
              ))}
            </div>
          )}
          <div className="rounded-full bg-[#F8FAFC] px-3 py-1 mt-1">
            <BaseText size={12} medium>
              {formatTimeFull(item.created_at || new Date(), locale)}
            </BaseText>
          </div>
        </div>
      </div>
    );
  };

  const buildCustomerMessage = (item: any) => {
    return (
      <div className="flex flex-row justify-start mt-4">
        <div className="flex flex-col buildStatus w-2/3 items-start">
          <div className="flex flex-row gap-x-2">
            <img
              src={item.conversation?.shop?.thumbnails || Images.userDefault}
              className="w-11 h-11 rounded-full"
            />
            {item?.content && item?.content?.length > 0 && (
              <div className="bg-[#EEF2F6] px-6 py-3 rounded-xl rounded-tl-none">
                <BaseText medium size={16}>
                  {item?.content || ""}
                </BaseText>
              </div>
            )}
          </div>
          {item?.images && item?.images[0] && (
            <div className="mt-2 flex flex-wrap flex-row gap-2">
              {item?.images?.map((item: string) => (
                <div>
                  <img
                    onClick={() => setDisplayImg(item)}
                    className="w-14 h-14 rounded object-cover cursor-pointer"
                    src={item}
                  />
                </div>
              ))}
            </div>
          )}
          <div className="rounded-full bg-[#F8FAFC] px-3 py-1 mt-1">
            <BaseText size={12} medium>
              {formatTimeFull(item.created_at || new Date(), locale)}
            </BaseText>
          </div>
        </div>
      </div>
    );
  };

  const buildList = () => {
    return (
      <div className="overflow-auto h-full p-6 flex flex-col-reverse">
        {messages.map((item, index) => {
          if (item.user_id) return buildCustomerMessage(item);
          return buildAdminMessage(item);
        })}
      </div>
    );
  };

  return (
    <div
      className={classNames(
        "w-3/5  min-w-[458px] h-full  flex flex-col",
        conversationSelected && "border-l"
      )}
    >
      {conversationSelected && <>{buildList()}</>}
      <Modal
        centered
        footer={false}
        closable={false}
        open={displayImg.length > 0}
        onCancel={() => setDisplayImg("")}
      >
        <div className="flex h-full w-full justify-center items-center">
          <img src={displayImg} className="h-full object-contain" />
        </div>
      </Modal>
    </div>
  );
};
