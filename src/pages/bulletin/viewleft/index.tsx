import { useEffect, useState } from "react";
import { BaseText } from "../../../components";
import { classNames } from "../../../utils/common";
import { PlusOutlined } from "@ant-design/icons";
import { BoardLinkInterface, ThemaInterface } from "../../../entities";
import { BoardLinkApi } from "../../../apis/boardLinkApi";
import { useBulletinState } from "../store";

export const NEW_ID = "NEW_ID";
export default function BulletinLeft() {
  const { boardSelected, setBoardSelected, setLastRefresh, lastRefresh } =
    useBulletinState((state) => state);
  const [boardLinks, setBoardLinks] = useState<Array<BoardLinkInterface>>([]);

  const _getBoardLinks = async () => {
    try {
      const respon = await BoardLinkApi.getList();
      setBoardLinks([{ id: "HOME", name: "Home" }, ...respon]);
    } catch (error) {}
  };

  const createBoardLink = async () => {
    try {
      const data = boardLinks.map((item) => item.id === NEW_ID);
      if (data[0]) return;
      setBoardLinks([{ id: NEW_ID, name: "New Link" }, ...boardLinks]);
      setBoardSelected({ id: NEW_ID, name: "New Link" });
    } catch (error) {}
  };

  useEffect(() => {
    _getBoardLinks();
  }, [lastRefresh]);

  return (
    <div className="w-[300px] border-r p-6 max-h-full overflow-auto no-scrollbar">
      <div className={classNames("flex pb-4 items-center justify-between")}>
        <BaseText bold locale size={16} className="">
          Main
        </BaseText>
        <PlusOutlined
          className={classNames("text-xl cursor-pointer")}
          onClick={createBoardLink}
        />
      </div>
      <div>
        {boardLinks.map((item: BoardLinkInterface, index: number) => {
          return (
            <div key={index} className="flex flex-col">
              <div
                className={classNames(
                  "px-3 py-2 mb-1 rounded flex items-center cursor-pointer",
                  boardSelected?.id === item.id ? "bg-dayBreakBlue50" : ""
                )}
                onClick={() => {
                  setBoardSelected(item);
                  setLastRefresh(Date.now());
                }}
              >
                <BaseText
                  bold
                  size={16}
                  className={classNames(
                    boardSelected?.id === item.id ? "text-dayBreakBlue500" : ""
                  )}
                >
                  {item.name}
                </BaseText>
              </div>
              <div className="flex flex-col pl-8">
                {(item.categories || []).map((elem, i) => {
                  return (
                    <BaseText
                      key={`category${i}`}
                      medium
                      size={16}
                      className="text-darkNight700"
                    >
                      {elem.category.name}
                    </BaseText>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
